/*import { useState, useEffect } from 'react';
import axios from 'axios';
const url = 'http://localhost:8080/api/genreDb?email=fatmasenaalci@gmail.com';
function Page1() {
  const [result, setResult] = useState([]);
  const variables = []
  useEffect(() => {
        axios.get(url).then((response) => {
        const json_string = JSON.stringify(response.data);
        var obj = JSON.parse(json_string);

        for (var x in obj){
          const variable = (obj[x].genre) +": "+ (obj[x].game_count)
          variables.push(variable)
        }
        return variables;
        /*window.alert(setResult(obj.map(getResult)));
        function getResult(item) {
          return  [item.genre,item.game_count].join(": ") + ", ";
        
        }

      })
      .catch((e) => {
        window.alert(e);
        return e
      });
    })
};

export default Page1;

import { Container, Typography, Grid, Paper, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import Genre from './get_genre.js';

const exampleData = {
  a: 154,
  b: 458,
  c: 140,
  d: 555,
  f: 152,
};

const GameList = ({ gameCounts }) => {
  return (
    <Grid  container spacing={5}>
      {Object.entries(gameCounts).map(([genre, count]) => (
        <Grid item xs={12} sm={6} md={4} key={genre}>
          <Paper style={{margin:'4px', background:"linear-gradient(30deg, rgb(157,223,251) 0%, rgb(231,247,254), rgb(157,223,251) 100%)" , padding: '16px' }}>
            <Typography variant="h6">{genre}</Typography>
            <Typography variant="body1">{count} games</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

const GameFilter = ({ genres, genreSelector}) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  const selectGenre = (event) => {
    setSelectedGenre(event.target.value);
    genreSelector(event.target.value);
  };

  return (
    <Paper style={{ padding: '16px', margin:'4px',  background:"linear-gradient(30deg, rgb(157,223,251) 0%, rgb(231,247,254), rgb(157,223,251) 100%)" }}>
      <Typography style={{ padding: '4px', fontSize:20 }} variant="h1">Select Genre:</Typography>
      <Select style={{width: '150px', height: '50px', margin:'8px' }} value={selectedGenre} onChange={selectGenre}>
        <MenuItem value="">All</MenuItem>
        {genres.map((genre) => (
          <MenuItem value={genre} key={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>
    </Paper>
  );
};

const Page1 = () => {
  const [gameCounts] = useState(exampleData);
  const [genres] = useState(Object.keys(exampleData));
  const [selectedGenre, setSelectedGenre] = useState('');

  const selectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredCounts = selectedGenre ? {[selectedGenre]: gameCounts[selectedGenre]}: gameCounts;

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ margin: '32px', fontWeight:'bold' }}>
        GAME LIST
      </Typography>
      <GameFilter genres={genres} genreSelector={selectGenre} />
      <Typography variant="h6" style={{ margin: '16px', align:"center" }}>
      {selectedGenre ? 'Showing ' + gameCounts[selectedGenre] + ' ' + selectedGenre + ' games':'Showing all ' + Object.values(gameCounts).reduce((a, b) => a + b, 0) + ' games'}
      </Typography>
      <GameList gameCounts={filteredCounts} />
    </Container>
  );
};

export default Page1;
*/
import { Container, Typography, Grid, Paper, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import Genre from './get_genre.js';

const GameList = ({ gameCounts, selectedGenre }) => {
  let filteredGameCounts = gameCounts;
  if (selectedGenre) {
    filteredGameCounts = { [selectedGenre]: gameCounts[selectedGenre] };
  }
  return (
    <Grid container spacing={5}>
      {Object.entries(filteredGameCounts).map(([genre, count]) => (
        <Grid item xs={12} sm={6} md={4} key={genre}>
          <Paper style={{ margin: '4px', background: "linear-gradient(30deg, rgb(157,223,251) 0%, rgb(231,247,254), rgb(157,223,251) 100%)", padding: '16px' }}>
            <Typography variant="h6">{genre}</Typography>
            <Typography variant="body1">{count} games</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};


const Page1 = () => {
  const [gameCounts, setGameCounts] = useState({});
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  const selectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" style={{ margin: '32px', fontWeight: 'bold' }}>
        GAME LIST
      </Typography>
      <Genre onResult={(data) => {
        const gameCounts = {};
        data.forEach((item) => {
          const [genre, count] = item.split(": ");
          gameCounts[genre] = parseInt(count, 10);
        });
        setGameCounts(gameCounts);
        setGenres(Object.keys(gameCounts));
      }} />
      <Typography variant="h6" style={{ margin: '16px', align: "center" }}>
      </Typography>
      <GameList gameCounts={gameCounts} selectedGenre={selectedGenre} />
    </Container>
  );
};


export default Page1;
