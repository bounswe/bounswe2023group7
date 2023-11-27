import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder'

const chipColors = ["primary", "secondary", "error"];

export default function SuggestedGame({ game }) {


    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={game.title}
                    height="300"
                    image={game.image}
                    title={game.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {game.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {game.description}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: '8px', justifyContent: 'center' }}>
                        {/* Here we use StarBorderIcon to represent the rating visually */}
                        <StarBorderIcon />
                        <Typography variant="subtitle1" style={{ marginLeft: '4px' }}>
                            {game.rating}
                        </Typography>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        {chipColors.map((color, index) => (
                            <Chip
                                key={index}
                                label={game.tags[index]}
                                color={color}
                                style={{ marginRight: '4px' }}
                            />
                        ))}
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}
