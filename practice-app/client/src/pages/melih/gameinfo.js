import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");  
      const response = await axios.get(`https://example.com/api/search?query=${searchTerm}`, {headers: {"Authorization": accessToken}});
      setSearchResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResult && (
        <div>
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
