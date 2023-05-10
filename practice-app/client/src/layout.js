import React from 'react';
import Header from './components/header';
import Box from '@mui/material/Box';
import background from "./assets/background.jpg";

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        color: 'dark grey',
      }}
    >
      <Header />
      <div className="content">{children}</div>
    </Box>
  );
};

export default Layout;