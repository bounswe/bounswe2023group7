import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import {useFindLocation} from "../../queries/elif.queries.js"

export default function Page1() {


  const [findLocationQuery, setIsQueryEnabled] = useFindLocation()

  const [myLocation,setMyLocation] = useState();

  
  const handleFindLocation = () => {

    setIsQueryEnabled(true);

    findLocationQuery.refetch();
  }

  useEffect(() => {

    if(findLocationQuery?.data){


      setMyLocation(findLocationQuery.data);

    }

 }, [findLocationQuery.data])


  console.log("findLocation", findLocationQuery?.data)
  return <div style={{display:"flex", flexDirection:"column", alignItems:"center"}} >

    <Button variant='contained' style={{ marginTop:"20px", marginBottom:"20px"}} onClick={() => handleFindLocation()}>Find My Location</Button>

    {myLocation&&<Box style={{backgroundColor:"white" , display:"flex", flexDirection:"column", width:"fit-content", minWidth:"30%", alignSelf:"center", padding:"20px", borderRadius:"10px" }}> 


      {findLocationQuery.isRefetching ? <CircularProgress style={{alignSelf:"center"}} />
      : 
      <React.Fragment>
      <div><b>{myLocation.ip}</b></div>
      <div><b>City :</b> { myLocation?.city}</div>
      <div><b>Postal Code :</b> { myLocation?.postal_code}</div>
      <div><b>Region :</b> { myLocation?.region}</div>
      <div><b>Country :</b> { myLocation?.country}</div>
      <div><b>Country Code :</b> { myLocation?.country_flag}</div>
      <div><b>Time :</b> { myLocation?.time}</div>
      </React.Fragment>
      }

      

    </Box>}


     
  </div>;
};

