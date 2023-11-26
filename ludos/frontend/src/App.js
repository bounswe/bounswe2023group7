import ForumPage from "./pages/forumPage.js";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout.js";
import HomePage from "./pages/Homepage.js";
import GamePage from "./pages/GamePage.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignupPage.js";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.js";
import CreateGamePage from "./pages/CreateGamePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ForumsPage from "./pages/ForumsPage.js";
import ProfilePage from "./pages/ProfilePage";
import CreateThreadPage from "./pages/CreateThreadPage.js";
import ThreadPage from "./pages/ThreadPage.js"
import axios from "axios";
import SampleThreadPage from "./pages/SampleThreadPage.js";

function App() {
  const [games, setGames] = useState([]);
  const limit = 50; // Set the desired limit (number of games per request)
  const link = `http://${process.env.REACT_APP_API_URL}/game/?limit=${limit}`;

  const convertToSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
      .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
      .replace(/--+/g, "-"); // Replace multiple dashes with single dash
  };

  const generateGameRoutes = () => {
    return games.map((game) => {
      const slug = convertToSlug(game.title); // Convert the title to a slug

      return (
        <Route
          key={game.id}
          path={`/game/${slug}`} // Use the slug in the route path
          element={
            <Layout>
              {/* Render the GamePage component for each game */}
              <GamePage gameId={game.id} />
            </Layout>
          }
        />
      );
    });
  };
  useEffect(() => {
    axios
      .get(link)
      .then((response) => {
        setGames(response.data.items); // Set the games in state
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);
  const id = "a8a3c090-cc6c-4944-b203-13919c1d2aed";
  /*const game = {
    title: "God of War (2018)",
    coverLink:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    averageRating: 4.8,
    userRating: 4,
    followers: 5000000,
    systemRequirements: {
      minimum: {
        "Requires a 64-bit processor and operating system": true,
        "Operating System": "Windows 10 64-bit",
        Processor:
          "Intel i5-2500k (4 cores, 3.3 GHz) or AMD Ryzen 3 1200 (4 cores, 3.1 GHz)",
        Memory: "8 GB RAM",
        "Graphics Card": "NVIDIA GTX 960 (4 GB) or AMD R9 290X (4 GB)",
        DirectX: "Version 11",
        Storage: "70 GB available space",
        "Additional Notes": "DirectX feature level 11_1 required",
      },
      recommended: {
        "Requires a 64-bit processor and operating system": true,
        "Operating System": "Windows 10 64-bit",
        Processor:
          "Intel i5-6600k (4 cores, 3.5 GHz) or AMD Ryzen 5 2400 G (4 cores, 3.6 GHz)",
        Memory: "8 GB RAM",
        "Graphics Card": "NVIDIA GTX 1060 (6 GB) or AMD RX 570 (4 GB)",
        DirectX: "Version 11",
        Storage: "70 GB available space",
        "Additional Notes": "DirectX feature level 11_1 required",
      },
    },
    userCompilationDuration: 45, // Adjusted to integer
    averageUserCompilationDuration: 45.5, // Adjusted to float
    predecessors: ["God of War III", "God of War (2005)"],
    successors: ["God of War Ragnarok"],
    gameGuide:
      "A comprehensive game guide featuring tips, strategies, and in-depth walkthroughs to assist players in navigating the game world and mastering its challenges.",
    gameStory:
      "An epic adventure set in Norse mythology, where Kratos and his son Atreus embark on a journey filled with action, exploration, and emotional depth.",
    platforms: ["PlayStation 4", "PlayStation 5"],
    ageRestriction: "Mature (17+)",
    characters: ["Kratos", "Atreus", "Freya", "Baldur"],
    areas: ["Midgard", "Alfheim", "Helheim"],
    packages: [
      "Standard Edition",
      "Collector's Edition",
      "Digital Deluxe Edition",
    ],
    items: ["Leviathan Axe", "Spartan Rage", "Talismans"],
    gameBio:
      "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.",
    groups: ["Aesir", "Vanir"],
    tags: ["Action", "Adventure", "Mythology", "Hack and Slash"],
    releaseDate: "April 20, 2018",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment",
    reviews: [
      {
        username: "KratosFan87",
        timestamp: "2023-10-30T10:00:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "This game is a masterpiece, beautifully portraying the complex father-son dynamic between Kratos and Atreus. The graphics and storytelling are amazing, and their journey is truly heartwarming.",
      },
      {
        username: "GamerGod123",
        timestamp: "2023-10-30T11:30:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "I've played God of War multiple times, and it never gets old. Highly recommended.",
      },
      {
        username: "MythologyMaster",
        timestamp: "2023-10-30T13:45:00",
        rating: 4, // Integer rating between 1-5
        reviewText:
          "The combat mechanics are outstanding. Kratos' character development is impressive.",
      },
      {
        username: "RagnarokAwaits",
        timestamp: "2023-10-30T14:20:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "I can't wait for the next game in the series. God of War Ragnarok, here I come!",
      },
      {
        username: "AdventureSeeker",
        timestamp: "2023-10-30T16:15:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "The world design and exploration are top-notch. A must-play for any gamer.",
      },
    ],
    trivia:
      "Did you know? The game's director, Cory Barlog, drew inspiration from his own experiences as a father to create the emotional father-son dynamic between Kratos and Atreus.",
  };

  const game2 = {
    title: "Red Dead Redemption 2",
    coverLink:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Red_Dead_Redemption_II.jpg/220px-Red_Dead_Redemption_II.jpg",
    averageRating: 4.9,
    userRating: 4.7,
    followers: 8000000,
    systemRequirements: {
      minimum: {
        "Requires a 64-bit processor and operating system": true,
        "Operating System": "Windows 7 64-bit",
        Processor: "Intel Core i5-2500K or AMD FX-6300",
        Memory: "8 GB RAM",
        "Graphics Card": "NVIDIA GTX 770 2GB or AMD Radeon R9 280 3GB",
        DirectX: "Version 11",
        Storage: "150 GB available space",
        "Additional Notes": "DirectX feature level 11_1 required",
      },
      recommended: {
        "Requires a 64-bit processor and operating system": true,
        "Operating System": "Windows 10 64-bit",
        Processor: "Intel Core i7-4770K or AMD Ryzen 5 1500X",
        Memory: "12 GB RAM",
        "Graphics Card": "NVIDIA GTX 1060 6GB or AMD Radeon RX 480 4GB",
        DirectX: "Version 11",
        Storage: "150 GB available space",
        "Additional Notes": "DirectX feature level 11_1 required",
      },
    },
    userCompilationDuration: 60, // Adjusted to integer
    averageUserCompilationDuration: 59.5, // Adjusted to float
    predecessors: ["Red Dead Redemption"],
    successors: ["Red Dead Redemption 3"],
    gameGuide:
      "A comprehensive game guide with tips, strategies, and detailed walkthroughs to help players thrive in the Wild West.",
    gameStory:
      "An epic tale set in the late 1800s, following the adventures of Arthur Morgan and the Van der Linde gang as they navigate a changing world.",
    platforms: ["PlayStation 4", "Xbox One", "PC"],
    ageRestriction: "Mature (17+)",
    characters: [
      "Arthur Morgan",
      "John Marston",
      "Dutch van der Linde",
      "Sadie Adler",
    ],
    areas: ["The Heartlands", "Saint Denis", "Ambarino"],
    packages: ["Standard Edition", "Ultimate Edition", "Special Edition"],
    items: ["Lasso", "Repeater Carbine", "Bolt Action Rifle"],
    gameBio:
      "In the dying days of the Wild West, Arthur Morgan must choose between his loyalty to the gang and his own morals as they face the consequences of their actions.",
    groups: ["Van der Linde Gang", "Pinkertons", "O'Driscolls"],
    tags: ["Open World", "Action", "Adventure", "Western"],
    releaseDate: "October 26, 2018",
    developer: "Rockstar Games",
    publisher: "Rockstar Games",
    reviews: [
      {
        username: "WildWestExplorer",
        timestamp: "2023-10-30T10:00:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "A stunning open-world experience with unforgettable characters and a gripping story.",
      },
      {
        username: "OutlawCowboy",
        timestamp: "2023-10-30T11:30:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "Red Dead Redemption 2 is a masterpiece in storytelling and immersion.",
      },
      {
        username: "Gunslinger27",
        timestamp: "2023-10-30T13:45:00",
        rating: 4, // Integer rating between 1-5
        reviewText:
          "The attention to detail in this game is mind-blowing. A true work of art.",
      },
      {
        username: "WanderingBandit",
        timestamp: "2023-10-30T14:20:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "I can't wait to see what Red Dead Redemption 3 will bring. Rockstar never disappoints.",
      },
      {
        username: "WildernessSurvivor",
        timestamp: "2023-10-30T16:15:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "The vast open world of Red Dead Redemption 2 is a playground for exploration and adventure.",
      },
    ],
    trivia:
      "Did you know? The game's development involved extensive research into the Old West to ensure historical accuracy.",
  };
  const game3 = {
    title: "The Witcher 3: Wild Hunt",
    coverLink:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
    averageRating: 4.9,
    userRating: 4.8,
    followers: 6000000,
    systemRequirements: {
      minimum: {
        "Requires a 64-bit processor and operating system": true,
        "Operating System": "Windows 7 64-bit",
        Processor: "Intel Core i5-2500K or AMD Phenom II X4 940",
        Memory: "6 GB RAM",
        "Graphics Card": "NVIDIA GeForce GTX 660 or AMD Radeon HD 7870",
        DirectX: "Version 11",
        Storage: "35 GB available space",
        "Additional Notes": "DirectX feature level 11_0 required",
      },
      recommended: {
        "Requires a 64-bit processor and operating system": true,
        "Operating System": "Windows 10 64-bit",
        Processor: "Intel Core i7-3770 or AMD FX-8350",
        Memory: "8 GB RAM",
        "Graphics Card": "NVIDIA GeForce GTX 770 or AMD Radeon R9 290",
        DirectX: "Version 11",
        Storage: "35 GB available space",
        "Additional Notes": "DirectX feature level 11_0 required",
      },
    },
    userCompilationDuration: 80, // Adjusted to integer
    averageUserCompilationDuration: 79.5, // Adjusted to float
    predecessors: ["The Witcher 2: Assassins of Kings"],
    successors: ["The Witcher 4"],
    gameGuide:
      "A comprehensive game guide with tips, strategies, and extensive lore to help players navigate the world of The Witcher.",
    gameStory:
      "Embark on a quest as Geralt of Rivia, a monster hunter, as he searches for his adopted daughter, Ciri, in a vast open world filled with danger and magic.",
    platforms: ["PlayStation 4", "Xbox One", "PC", "Nintendo Switch"],
    ageRestriction: "Mature (17+)",
    characters: ["Geralt of Rivia", "Ciri", "Yennefer", "Triss Merigold"],
    areas: ["Velen", "Skellige Isles", "Novigrad"],
    packages: [
      "Standard Edition",
      "Game of the Year Edition",
      "Collector's Edition",
    ],
    items: ["Silver Sword", "Signs", "Potions"],
    gameBio:
      "In a war-torn world, Geralt must navigate political intrigue and confront mythical beasts while searching for his loved ones.",
    groups: ["Witchers", "Nilfgaard", "The Wild Hunt"],
    tags: ["Open World", "RPG", "Fantasy", "Adventure"],
    releaseDate: "May 19, 2015",
    developer: "CD Projekt Red",
    publisher: "CD Projekt",
    reviews: [
      {
        username: "WitcherFanatic",
        timestamp: "2023-10-30T10:00:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "The Witcher 3 is a masterpiece of storytelling, and the open world is incredibly detailed and immersive.",
      },
      {
        username: "MonsterHunter42",
        timestamp: "2023-10-30T11:30:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "The depth of the characters and the moral choices in the game make it a true gem in the RPG genre.",
      },
      {
        username: "MagicEnthusiast",
        timestamp: "2023-10-30T13:45:00",
        rating: 4, // Integer rating between 1-5
        reviewText:
          "The magic and lore of The Witcher world are captivating, and the game's expansions add even more value.",
      },
      {
        username: "NextWitcherGame",
        timestamp: "2023-10-30T14:20:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "I can't wait for The Witcher 4. CD Projekt Red knows how to create epic adventures.",
      },
      {
        username: "FantasyExplorer",
        timestamp: "2023-10-30T16:15:00",
        rating: 5, // Integer rating between 1-5
        reviewText:
          "The vast open world and the numerous side quests make The Witcher 3 an unforgettable experience.",
      },
    ],
    trivia:
      "Did you know? The Witcher 3: Wild Hunt is based on a series of books by Polish author Andrzej Sapkowski.",
  };*/

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/forums"
            element={
              <Layout>
                <ForumsPage />
              </Layout>
            }
          />
          <Route
            path="/create-game"
            element={
              <Layout>
                <CreateGamePage />
              </Layout>
            }
          />

          <Route
            path="/create-thread"
            element={
              <Layout>
                <CreateThreadPage />
              </Layout>
            }
          />
          <Route
            path="/game/Tekken-5"
            element={
              <Layout>
                <GamePage gameId={id} />
              </Layout>
            }
          />

          {generateGameRoutes()}
          {/*<Route
            path="/game/Red-Dead-Redemption-2"
            element={
              <Layout>
                <GamePage game={game2} />
              </Layout>
            }
          />*/}
          {/*<Route
            path="/game/Witcher-3"
            element={
              <Layout>
                <GamePage game={game3} />
              </Layout>
            }
          />*/}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/forum"
            element={
              <Layout>
                <ForumPage />
              </Layout>
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/change-password"
            element={
              <Layout>
                <ChangePasswordPage />
              </Layout>
            }
          />
          <Route
            path="/profile-page"
            element={
              <Layout>
                <ProfilePage />
              </Layout>
            }
          />
           <Route
            path="/thread/:threadId"
            element={
              <Layout>
                <ThreadPage />
              </Layout>
            }
          />
           <Route
            path="/thread/"
            element={
              <Layout>
                <SampleThreadPage />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router >
  );
}

export default App;
