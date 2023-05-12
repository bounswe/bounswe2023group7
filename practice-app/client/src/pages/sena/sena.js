import React, { useState } from 'react';
import axios from 'axios';

function Genre( ) {
  const [result, setResult] = useState([]);
  
  const handleClick = () => {
    axios.get(`http://${process.env.REACT_APP_API_URL}/api/genreDb?email=fatmasenaalci@gmail.com`)
      .then((response) => {
        const json_string = JSON.stringify(response.data);
        var obj = JSON.parse(json_string);

        const variables = {}
        for (var x in obj){
          variables[obj[x].genre] = parseInt(obj[x].game_count)
        }
        setResult(variables);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <body>
    <div>
      <button style={{ padding: '30px',width:'200px', height:'100px', margin:'8px', fontSize:'20px', background:"linear-gradient(30deg, rgb(187,242,214,0.4) 0%, rgb(231,247,254), rgb(187,242,21,0.2) 100%)" }} onClick={handleClick}>Genres and Game Counts</button>
      {Object.entries(result).map(([genre, game_count]) => (
        <div style={{ padding: '3px', marginLeft:'800px',marginRight:'800px',marginTop:'10px',  background:"linear-gradient(30deg, rgb(187,242,214,0.4) 0%, rgb(231,247,254), rgb(187,242,21,0.2) 100%)" }} key={genre}>
          {genre}: {game_count}
        </div>
      ))}
    </div>
    <div style={{ marginBottom:"5px", marginTop:"20px",fontSize:"12px",align:"center"}}>All data comes from our database system.</div>
    </body>
  );
}

export default Genre;
