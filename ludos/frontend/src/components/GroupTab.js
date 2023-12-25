import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import GroupTopic from "./GroupTopic";

function GroupTab(data) {
  const [forum, setForum] = useState([]);
  useEffect(() => {
    const link = `http://${process.env.REACT_APP_API_URL}/group?gameId=${data.id}`;
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
    <Grid style={{ display: "grid", gap: "32px" }}>
      {forum &&
        forum.length > 0 &&
        forum.map((topic, key) => <GroupTopic topic={topic} key={key} />)}
    </Grid>
  );
}

export default GroupTab;
