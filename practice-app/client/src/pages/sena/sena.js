import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Select, MenuItem } from '@mui/material';

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
