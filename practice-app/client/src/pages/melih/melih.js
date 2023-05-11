import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Page1 = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div>MELİH GEZER</div>
      <Button
        variant="contained"
        component={Link}
        to="/gameinfo"
        sx={{
          backgroundColor: '#424242',
          color: '#FFFFFF',
          minWidth: '260px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Search Game
      </Button>
    </div>
  );
};

export default Page1;

