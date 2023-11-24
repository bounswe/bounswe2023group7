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
    <div style={{ maxWidth:"1152px", margin: '0 auto', padding: '20px', display: "flex",
    flexDirection:"column" }}>

      <Slider {...settings}>
        {games.map((game, index) => (
          <div key={index}>
            <Card style={{ margin: '0 10px', width: "auto", height:"100%", backgroundColor: "rgb(255, 255, 255, 0.6)" }}>
              <CardContent style={{
                color: "white",
                fontFamily: "Trebuchet MS, sans-serif",
                padding: "2.5rem 4rem",
                }}>
                {/* Display game information */}
                <Typography variant="h3" gutterBottom align="center" style={{
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: "Trebuchet MS, sans-serif",
                  padding: "0 0 20px",
                }}>
                Trending Games of the Day
                </Typography>
                <div style={{display: "flex", flexDirection: "row", gap: "36px"}}>
                <img src={game.image} alt={game.title} style={{ height: '400px', maxWidth:"100%" ,borderRadius: "10px" }} />
                <div style={{
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "20px", 
                  justifyContent: "center",
                  backgroundColor: "rgb(0,0,0, 0.6)",
                  borderRadius: "10px",
                  padding: "1rem",
                  }}>
                  <Typography variant="h4" align="center" style={{
                    backgroundColor: "rgb(0,0,0, 0.7)",
                    width: "fit-content",
                    borderRadius: "10px",
                    padding: "5px",
                    alignSelf: "center",
                  }}>
                    {game.title}
                  </Typography>
                  <Typography variant="h5" align="center">
                    {game.content}
                  </Typography>
                </div>
                </div>
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
