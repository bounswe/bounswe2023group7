import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./favorite-games.css"
import { AuthContext } from '../../helpers/AuthContext';
function FavoriteGames() {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const {authState, setAuthState} = useContext(AuthContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (!authState.status) {
      navigate("/signin");
    }
    else {
      axios.get("http://localhost:8080/api/favorite-games",{headers:{"Authorization":localStorage.getItem("accessToken")}})
      .then((response) => {
        setFavoriteGames(response.data);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setAuthState({status: false});
        }
        setMessage(e.response.data.message);
      });;
    }
  }, [navigate, authState, setAuthState]);

  const handleGameRemove = (game) => {
    axios.delete(`http://localhost:8080/api/favorite-games?appId=${game.appId}`,{headers:{"Authorization":localStorage.getItem("accessToken")}})
      .then((response) => {
        setMessage(response.data.message);
        axios.get("http://localhost:8080/api/favorite-games",{headers:{"Authorization":localStorage.getItem("accessToken")}})
          .then((response) => {
            setFavoriteGames(response.data);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            setAuthState({status: false});
          }
          setMessage(e.response.data.message);
        });
      }).catch((e) => {
        if (e.response.status === 401) {
          setAuthState({status: false});
        }
        setMessage(e.response.data.message);
      });
  };

  const handleSearch = () => {
    axios.get(`http://localhost:8080/api/favorite-games/search?searchValue=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((e) => {
        setMessage(e.response.data.message);
      });
  };

  const handleGameAdd = (game) => {
    axios.post(`http://localhost:8080/api/favorite-games?appId=${game.appid}`,{}, {headers:{"Authorization":localStorage.getItem("accessToken")}})
      .then((response) => {
        setMessage(response.data.message);
        axios.get("http://localhost:8080/api/favorite-games",{headers:{"Authorization":localStorage.getItem("accessToken")}})
          .then((response) => {
            setFavoriteGames(response.data);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            setAuthState({status: false});
          }
          setMessage(e.response.data.message);
        });
      }).catch((e) => {
        if (e.response.status === 401) {
          setAuthState({status: false});
        }
        setMessage(e.response.data.message);
      });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);
  return (
    <div className="favorite-games-page">
      {message && <div className="message">{message}</div>}
      <div className="search">
        <h2>Search Games</h2>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>  
        <ul>
          {searchResults.map((game) => (
            <li key={game.appid} onClick={() => handleGameAdd(game)}>
              <img src={game.logo} alt={game.name} />
              <div className="game-name-container">
                <p className="game-name">{game.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="favorite-games">
        <h2>Favorite Games</h2>
        <ul>
          {favoriteGames.map((game) => (
            <li key={game.appId} onClick={() => handleGameRemove(game)}>
              <img src={game.header_image} alt={game.name} />
              <div className="game-name-container">
                <p className="game-name">{game.name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FavoriteGames;
