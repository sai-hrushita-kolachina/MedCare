import { createContext, useState } from "react";
//eslint-disable-next-line
export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  const adminLogin = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  return (
    <AppContext.Provider value={{ admin, adminLogin, adminLogout }}>
      {children}
    </AppContext.Provider>
  );
}
