import React from "react";
import Box from "@mui/material/Box";
import Sidebar from "./components/sidebar"; // Import your Sidebar component

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#0C1929", // Set the background color
        minHeight: "100vh",
        color: "dark grey",
        display: "flex", // Make it a flex container
      }}
    >
      <Sidebar /> {/* Add the Sidebar component */}
      <Box sx={{ flex: 1 }}>
        <div className="content">{children}</div>
      </Box>
    </Box>
  );
};

export default Layout;
