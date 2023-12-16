import React from "react";
import CreateGameForm from "../components/CreateGameForum"; // Adjust the path based on your project structure
import { useLocation } from "react-router-dom";

const CreateGamePage = () => {
  const location = useLocation();
  console.log(location);
  const formData = location.state;

  return (
    <div>
      <CreateGameForm formData={formData} />
    </div>
  );
};

export default CreateGamePage;
