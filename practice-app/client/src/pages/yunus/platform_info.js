import React from "react";
import Box from '@mui/material/Box';

function PlatformInfo({ data }) {
  console.log(data);
  return (
    
    <div>
      <h2>The Platforms Where You Can Play This Game:</h2>
      {data.map((platform, index) => (
        <div key={index}>
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '5px',
            padding: '2rem',
            color: 'dark grey',
          }}
        >
          <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: 'dark grey',
        backgroundColor:'rgba(0, 0, 0, 0.4)',
      }}>
      {platform.platform_name}
    </Box>
    </Box>
          
          {/* vb. */}
        </div>
      ))}
    </div>
  );
}

export default PlatformInfo;