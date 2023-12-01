import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ForumTopic from "./ForumTopicForGame";

function GameForum(data) {
  const [forum, setForum] = useState([]);
  useEffect(() => {
    const link = `http://${process.env.REACT_APP_API_URL}/post?gameId=${data.id}&isLiked=false&isDisliked=false&order=ASC&orderByKey=numberOfLikes`;
    axios
      .get(link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setForum(response.data.items);
        console.log(forum);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid>
      {forum &&
        forum.length > 0 &&
        forum.map((topic, key) => <ForumTopic topic={topic} key={key} />)}
    </Grid>
  );
}

export default GameForum;
