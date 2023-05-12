import { useState, useEffect } from 'react';
import axios from 'axios';
const url = 'http://localhost:8080/api/genreDb?email=fatmasenaalci@gmail.com';
function Genre(onResult) {
  const [result, setResult] = useState([]);
  useEffect(() => {
        axios.get(url).then((response) => {
        const json_string = JSON.stringify(response.data);
        var obj = JSON.parse(json_string);

        const variables = {}
        for (var x in obj){
          variables[obj[x].genre] = parseInt(obj[x].game_count)
        }
        setResult(variables);
        onResult(variables);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [onResult]);

  return (
    <div>
      {Object.entries(result).map(([genre, game_count]) => (
        <div key={genre}>
          {genre}: {game_count}
        </div>
      ))}
    </div>
  );
  
};

export default Genre;