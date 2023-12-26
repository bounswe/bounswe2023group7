import React from "react";
import CreateEntityForm from "../components/CreateEntityForm"; // Adjust the path based on your project structure
import { useLocation } from "react-router-dom";

const CreateEntityPage = () => {
  // You can add any additional state or logic specific to this page
  const location = useLocation();
  console.log(location);
  const entity = location.state;
  return (
    <div>
      <CreateEntityForm entity={entity} />
    </div>
  );
};

export default CreateEntityPage;
