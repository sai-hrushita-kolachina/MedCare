import { createContext, useState } from "react";
// eslint-disable-next-line
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  const getDoctorsData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/get`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setDoctors(data);
      } else {
        console.log("Invalid doctors data format:", data);
      }
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
  };

  const getAllDoctors = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/alldoctors`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setAllDoctors(data);
      } else {
        console.log("Invalid all doctors data:", data);
      }
    } catch (error) {
      console.log("Error fetching all doctors:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        doctors,
        getDoctorsData,
        allDoctors,
        getAllDoctors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
