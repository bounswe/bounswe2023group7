import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Typography, Card, CardContent } from '@material-ui/core';
import './TrendingGamesSlider.css'; // Create this CSS file for custom styles

const TrendingGamesSlider = ({ games }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    effect: 'slide',
  };

  return (
    <div style={{ maxWidth:"1152px", maxHeight: "500px", margin: '0 auto', padding: '20px', display: "flex",
    flexDirection:"column" }}>

      <Slider {...settings}>
        {games.map((game, index) => (
          <div key={index}>
            <Card style={{ margin: '0 10px', width: "auto", height:"100%", backgroundColor: "rgb(255, 255, 255, 0.6)" }}>
              <CardContent>
                {/* Display game information */}
                <img src={game.image} alt={game.title} style={{ height: '400px' }} />
                <Typography variant="h6" align="center">
                  {game.title}
                </Typography>
                {/* Other game details */}
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingGamesSlider;
