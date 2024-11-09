import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LnfContext = createContext();

export const LnfProvider = ({ children }) => {
  const [claimedItems, setClaimedItems] = useState([]);
  const [unclaimedItems, setUnclaimedItems] = useState([]);
  const [myClaimedItems, setMyClaimedItems] = useState([]);
  const [myUploadedItems, setMyUploadedItems] = useState([]);

  const fetchClaimedItems = async () => {
    const response = await axios.get('/api/lnf/claimed');
    setClaimedItems(response.data.items);
  };

  const fetchUnclaimedItems = async () => {
    const response = await axios.get('/api/lnf/unclaimed');
    setUnclaimedItems(response.data.items);
  };

  const fetchMyClaimedItems = async () => {
    const response = await axios.get('/api/lnf/my-claimed', { withCredentials: true });
    setMyClaimedItems(response.data.items);
  };

  const fetchMyUploadedItems = async () => {
    const response = await axios.get('/api/lnf/my-uploaded', { withCredentials: true });
    setMyUploadedItems(response.data.items);
  };

  const createLostAndFoundItem = async (form) => {
    const response = await axios.post('/api/lnf/create', form, { withCredentials: true });
    fetchUnclaimedItems();
    return response.data;
  };

  const claimItem = async (id) => {
    await axios.post(`/api/lnf/claim/${id}`, {}, { withCredentials: true });
    fetchUnclaimedItems();
    fetchClaimedItems();
    fetchMyClaimedItems();
  };

  const unclaimItem = async (id) => {
    await axios.post(`/api/lnf/unclaim/${id}`, {}, { withCredentials: true });
    fetchClaimedItems();
    fetchMyClaimedItems();
  };

  useEffect(() => {
    fetchClaimedItems();
    fetchUnclaimedItems();
    fetchMyClaimedItems();
    fetchMyUploadedItems();
  }, []);

  return (
    <LnfContext.Provider
      value={{
        claimedItems,
        unclaimedItems,
        myClaimedItems,
        myUploadedItems,
        createLostAndFoundItem,
        claimItem,
        unclaimItem,
      }}
    >
      {children}
    </LnfContext.Provider>
  );
};

export const useLnf = () => useContext(LnfContext);
