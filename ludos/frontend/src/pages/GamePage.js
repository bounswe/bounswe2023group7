import React, { useEffect, useState } from 'react';
import {Container, Grid,Box } from '@mui/material';




function GamePage() {

  
  useEffect(() => {
        

    
        
  }, []);

  return (
       <Container style={{ backgroundColor: '#f0f0f0' }}>
         <Grid container spacing={1} >
             <Grid item xs={12} sm={12} md={12} lg={1} >
               <Box p={5}>
               <Grid item xs={12} sm={12} md={12} lg={12} >
               <img 
                src="https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg"
                alt="new"
                />
                </Grid>
               </Box>
             </Grid>
         </Grid>
       </Container>
  );
}


export default GamePage;