import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosApi.jsx";

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
  const [currentModule, setCurrentModule] = useState("System");
  const [enabledItems, setEnabledItems] = useState({});
  const [columns, setColumns] = useState({ name: true, action: true });
  const [modules, setModules] = useState({});
  const [error, setError] = useState(null);

  const fetchModules = async (module) => {
    try {
      let response;
      if (module === "System") {
        response = await axios.get("/auth/perm/permissiongroup");
      } else if (module === "Student") {
        response = await axios.get("/auth/perm/permissionStudentParent");
      } else if (module === "Parent") {
        response = await axios.get("/auth/perm/permissionStudentParent");
      }

      if (response?.data?.success) {
        setModules((prev) => ({
          ...prev,
          [module]: response.data.data.map((item) => item.name), // Map to just names for display
        }));
      } else {
        setError(`Failed to fetch ${module} modules`);
      }
    } catch (err) {
      console.error(`Error fetching ${module} modules:`, err);
      setError(`Unable to load ${module} modules`);
    }
  };

  useEffect(() => {
    fetchModules(currentModule); // Fetch data for the default module on mount
  }, [currentModule]);

  const toggleItem = (module, item) => {
    setEnabledItems((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [item]: !prev[module]?.[item],
      },
    }));
  };

  const toggleColumnVisibility = (column) => {
    setColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return (
    <ModuleContext.Provider
      value={{
        currentModule,
        setCurrentModule,
        enabledItems,
        toggleItem,
        columns,
        toggleColumnVisibility,
        modules,
        error,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};

export const useModuleContext = () => useContext(ModuleContext);
