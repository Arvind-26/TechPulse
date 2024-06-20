import { createContext, useState, useEffect } from 'react';
import React from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedValues, setSharedValues] = useState({ value1: null, value2: null });

  useEffect(() => {
    const storedValues = localStorage.getItem('sharedValues');
    if (storedValues) {
      setSharedValues(JSON.parse(storedValues));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sharedValues', JSON.stringify(sharedValues));
  }, [sharedValues]);


  return (
    <AppContext.Provider value={{ sharedValues, setSharedValues}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
