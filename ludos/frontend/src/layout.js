import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "./components/sidebar"; // Import your Sidebar component
import Header from "./components/header"; // Import your Header component

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#0C1929", // Set the background color
        minHeight: "100vh",
        color: "dark grey",
        display: "flex", // Make it a flex container
        flexDirection: "column", // Stack the Header on top of the Sidebar
      }}
    >
      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar /> {/* Add the Sidebar component */}
        <Box sx={{ flex: 1 }}>
          <Header userLoggedIn={true} />
          <div className="content">{children}</div>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;