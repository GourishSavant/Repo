import React, { useState } from "react";
import Sidebar from "./studentsidebar";

import Modules from "../../pages/admin/modules"; // Make sure the import path is correct

const ParentComponent = () => {
  const [enabledModules, setEnabledModules] = useState({
    FrontOffice: true,
    Admin: false, // Add all the modules you want to control here
  });

  return (
    <div className="app-container">
      <Sidebar enabledModules={enabledModules} />
      <Modules setSidebarModules={setEnabledModules} />
    </div>
  );
};

export default ParentComponent;
