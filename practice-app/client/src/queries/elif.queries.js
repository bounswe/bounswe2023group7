
import { useState } from 'react';
import { useQuery } from 'react-query'
import { useMutation } from 'react-query';
import axios from 'axios';


export function useFindLocation() {

  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  

  const fetchUserIP = async () => {
    try {
      const response = await axios.get('https://api.ipify.org/?format=json');
      const clientIP = response.data.ip;
      console.log('Client IP:', clientIP);
      return clientIP;
    } catch (error) {
      console.error('Error fetching user IP:', error);
      return null;
    } 
  };

  const findLocationQuery = useQuery(['findLocation'], async () => {
    const userIP = await fetchUserIP();
    if (userIP) {
      const response = await fetch(`http://localhost:8080/api/location/findLocation?ip_address=${userIP}`);
      return response.json();
    }
    return null;
  }, { 

    enabled: isQueryEnabled
  });

  return [findLocationQuery, setIsQueryEnabled];
}


export function useGetLocationHistory() {
  const token = localStorage.getItem('accessToken');
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const getLocationHistoryQuery = useQuery(['locationHistory'], async () => {

    const response =await fetch('http://localhost:8080/api/location/history', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      throw new Error('Unauthorized'); // Throw an error for 401 status code
    }
    
    return response.json();
  }, { 

    enabled: isLoadingHistory
  });

return [getLocationHistoryQuery, setIsLoadingHistory];

}



export function useAddLocation() {
  const fetchUserIP = async () => {
    try {
      const response = await axios.get('https://api.ipify.org/?format=json');
      const clientIP = response.data.ip;
      console.log('Client IP:', clientIP);
      return clientIP;
    } catch (error) {
      console.error('Error fetching user IP:', error);
      return null;
    }
  };

  const token = localStorage.getItem('accessToken');

  const addLocationMutation = useMutation(['addLocation'], async () => {
    const userIP = await fetchUserIP();
    if (userIP) {
      const response = await fetch(`http://localhost:8080/api/location/addLocation?ip_address=${userIP}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ip_address: userIP }),
      });

      if (response.status === 401) {
        throw new Error('Unauthorized'); // Throw an error for 401 status code
      }

      return response.json();
    }
    return null;
  });

  return addLocationMutation;
}



  