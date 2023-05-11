
import { useState } from 'react';
import { useQuery } from 'react-query'
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

  