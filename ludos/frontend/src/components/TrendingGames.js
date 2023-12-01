import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
} from '@mui/material';

const TrendingGameItem = ({ game }) => (
    <ListItem button>
        <ListItemAvatar>
            <Avatar alt={game.name} src={game.imageUrl} variant="square" />
        </ListItemAvatar>
        <ListItemText primary={game.name} />
    </ListItem>
);

// Pass the trendingGames array as a prop
const TrendingGames = ({ games }) => (
    <Card elevation={3}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Trend Now!
            </Typography>
            <List component="nav" aria-label="trending games">
                {games.map((game, index) => (
                    <React.Fragment key={index}>
                        <TrendingGameItem game={game} />
                        {index < games.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </CardContent>
    </Card>
);

export default TrendingGames;
