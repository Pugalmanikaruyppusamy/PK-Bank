import React, { createContext, useState, useEffect } from "react";

export const BankContext = createContext();

export function BankProvider({ children }) {
  const [account, setAccount] = useState(null); // Current logged-in account

  // Load last logged-in account
  useEffect(() => {
    const saved = localStorage.getItem("currentAccount");
    if (saved) setAccount(JSON.parse(saved));
  }, []);

  // Save current account to LocalStorage
  useEffect(() => {
    if (account) {
      localStorage.setItem("currentAccount", JSON.stringify(account));
    }
  }, [account]);

  return (
    <BankContext.Provider value={{ account, setAccount }}>
      {children}
    </BankContext.Provider>
  );
}
