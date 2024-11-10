"use client";

import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

export const StoreContext = createContext();

export const useStoreContext = () => useContext(StoreContext);

export const StoreContextProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [myStore, setMyStore] = useState(null);

  const fetchStores = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/allstores`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error("Error fetching stores");
      
      const data = await response.json();
      setStores(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchMyStore = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/mystore`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error("Error fetching your store");

      const data = await response.json();
      setMyStore(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Create a new store
  const createStore = async (organizationName) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationName }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error("Error creating store");

      const data = await response.json();
      toast.success(data.message);
      fetchMyStore();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addAdToStore = async (adId, organizationName) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/add-ad/${organizationName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error("Error adding ad to store");
  
      const data = await response.json();
      setMyStore(data); 
      toast.success("Ad added to store!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeAdFromStore = async (adId, organizationName) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/remove-ad/${organizationName}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId }),
        credentials: 'include',
      });
      if (!response.ok) throw new Error("Error removing ad from store");

      const data = await response.json();
      setMyStore(data);
      toast.success("Ad removed from store!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteStore = async (storeId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/store/delete-store/${storeId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error("Error deleting store");

      const data = await response.json();
      toast.success(data.message);
      setMyStore(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <StoreContext.Provider value={{
      stores,
      myStore,
      fetchStores,
      fetchMyStore,
      createStore,
      addAdToStore,
      removeAdFromStore,
      deleteStore,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
