import { createContext, useContext, useState, useEffect } from 'react';
const API_URL = 'http://localhost:4000/api';

const LnfContext = createContext();

export const LnfProvider = ({ children }) => {
  const [claimedItems, setClaimedItems] = useState([]);
  const [unclaimedItems, setUnclaimedItems] = useState([]);
  const [myClaimedItems, setMyClaimedItems] = useState([]);
  const [myUploadedItems, setMyUploadedItems] = useState([]);

  const fetchClaimedItems = async () => {
    const response = await fetch(`${API_URL}/lnf/claimed`);
    const data = await response.json();
    setClaimedItems(data.items);
  };

  const fetchUnclaimedItems = async () => {
    const response = await fetch(`${API_URL}/lnf/unclaimed`);
    const data = await response.json();
    setUnclaimedItems(data.items);
  };

  const fetchMyClaimedItems = async () => {
    const response = await fetch(`${API_URL}/lnf/my-claimed`, { credentials: 'include' });
    const data = await response.json();
    setMyClaimedItems(data.items);
  };

  const fetchMyUploadedItems = async () => {
    const response = await fetch(`${API_URL}/lnf/my-uploaded`, { credentials: 'include' });
    const data = await response.json();
    setMyUploadedItems(data.items);
  };

  const createLostAndFoundItem = async (form) => {
    console.log("found "+form);
    const response = await fetch(`${API_URL}/lnf/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    const data = await response.json();
    fetchUnclaimedItems();
    return data;
  };

  const claimItem = async (id) => {
    await fetch(`${API_URL}/lnf/claim/${id}`, {
      method: 'POST',
      credentials: 'include',
    });
    fetchUnclaimedItems();
    fetchClaimedItems();
    fetchMyClaimedItems();
  };

  const unclaimItem = async (id) => {
    await fetch(`${API_URL}/lnf/unclaim/${id}`, {
      method: 'POST',
      credentials: 'include',
    });
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
