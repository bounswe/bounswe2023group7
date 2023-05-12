import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {useGetLocationHistory} from "./elif.queries.js"
import Box from '@mui/material/Box';
import {useFindLocation} from "./elif.queries.js"
import {useAddLocation} from "./elif.queries.js"

export default function Page1() {

  const [getLocationHistoryQuery, setIsLoadingHistory] = useGetLocationHistory()
  const [findLocationQuery, setIsQueryEnabled] = useFindLocation()
  const addLocationMutation = useAddLocation();

  const [myLocation,setMyLocation] = useState();
  const [LocationHistory, setLocationHistory] = useState([]);
  const [isLoadingAddLocation, setIsLoadingAddLocation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showHistoryMessage, setShowHistoryMessage] = useState(false);

  const handleAddLocationToHistory = async () => {
    setIsLoadingAddLocation(true);
    try {
      await addLocationMutation.mutateAsync();
      setSuccessMessage('Location is added successfully ✅');
      setLocationHistory([]);
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000); // Hide the success message after 4 seconds
    } catch (error) {
      if (error.message === 'Unauthorized') {
        setSuccessMessage('Please login first');
      } else {
        console.log('Error:', error.message);
      }
    } finally {
      setIsLoadingAddLocation(false);
    }
  };
  
  const handleFindLocation = () => {

    setIsQueryEnabled(true);

    findLocationQuery.refetch();
  }

  const handleGetLocationHistory = () => {
    setIsLoadingHistory(true);
    getLocationHistoryQuery.refetch()
      .catch((error) => {
        if (error.message === 'Unauthorized') {
          setSuccessMessage('Please login first');
        } else {
          console.log('Error:', error.message);
        }
      })
      .finally(() => {
        setShowHistoryMessage(true);
      });
  };

  useEffect(() => {
    if (getLocationHistoryQuery?.data) {
      setLocationHistory(getLocationHistoryQuery.data["locationHistory"]);
    }
  }, [getLocationHistoryQuery.data]);

  
  useEffect(() => {

    if(findLocationQuery?.data){


      setMyLocation(findLocationQuery.data);

    }

 }, [findLocationQuery.data])


  console.log("findLocation", findLocationQuery?.data)
  console.log("locationHistory", getLocationHistoryQuery?.data )
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

    <Button variant='contained' style={{ marginTop:"20px", marginBottom:"20px"}} onClick={() => handleGetLocationHistory()}>Get My Location History</Button>
    {showHistoryMessage && ( // Show the history message when showHistoryMessage is true
    <Box style={{ fontSize: '14px', backgroundColor:"white" , display:"flex", flexDirection:"column", width:"fit-content", minWidth:"30%", alignSelf:"center", borderRadius:"10px" }}>
      {LocationHistory.length > 0 ? (
        LocationHistory.map((item) => (
          <div key={item._id}>
            <div><b>City:</b> {item.city}</div>
            <div><b>Region:</b> {item.region}</div>
            <div><b>Postal Code:</b> {item.postalCode}</div>
            <div><b>Country:</b> {item.country}</div>
            <div><b>Country Flag:</b> {item.countryFlag}</div>
            <div><b>Time:</b> {item.time}</div>
            <hr /> 
          </div>
        ))
      ) : (
        <div>You do not have a history yet or not logged in.</div>
      )}
    </Box>
  )}

<Button
    variant='contained'
    style={{ marginTop: '20px', marginBottom: '20px' }}
    onClick={handleAddLocationToHistory}
    disabled={isLoadingAddLocation}
  >
    {isLoadingAddLocation ? (
      <CircularProgress size={24} color='inherit' />
    ) : (
      'Add My Location to the History'
    )}
  </Button>

  {successMessage && (
  <Box
    style={{
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '5px',
      marginTop: '10px',
    }}
  >
    {successMessage}
  </Box>
)}
  </div>;
};

