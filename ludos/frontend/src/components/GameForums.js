import axios from "axios";
import React, { useEffect } from "react";

function GameForum(data) {
  useEffect(() => {
    const link = `http://${process.env.REACT_APP_API_URL}/post?gameId=${data.id}/`;
    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <></>;
}

export default GameForum;
