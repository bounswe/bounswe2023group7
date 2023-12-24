import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Recogito } from "@recogito/recogito-js";
import "@recogito/recogito-js/dist/recogito.min.css";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import ThreadComponent from "../components/ThreadComponent";
import CommentComponent from "../components/CommentComponent";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ThreadPage = () => {
  const navigate = useNavigate();
  const convertToSlug = (text) => {
    return text
      ?.toString()
      .toLowerCase()
      .trim()
      .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
      .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
      .replace(/--+/g, "-"); // Replace multiple dashes with single dash
  };

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const { threadId } = useParams(); // Get the id from URL params
  const [threadDetails, setThreadDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const userAccessToken = localStorage.getItem("accessToken");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [submission, setSubmission] = useState(1);
  const [numReplies, setNumReplies] = useState(1);
  const [numLikes, setNumLikes] = useState(0);
  const [numDislikes, setNumDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isUpcomingTitle, setIsUpcomingTitle] = useState(false);
  const [launchingDate, setLaunchingDate] = useState("");
  const [demoLink, setDemoLink] = useState("");
  //const [ownerId, setOwnerId] = useState("");
  const onAnnotationCreated = async (annotation) => {
    const postData = formatAnnotationData(annotation);
    //await sendAnnotationData(postData, "create");
  };

  const formatAnnotationData = (annotation) => {
    console.log("annotation start", annotation.start);
    console.log("annotation end", annotation.end);
    console.log("annotation", annotation);
    console.log("source", window.location.href);
    return {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      type: "Annotation",
      body: annotation.body[0].value,
      target: {
        source: window.location.href,
        selector: {
          start: annotation.target.selector[1].start, // Adjust based on your specific requirements
          end: annotation.target.selector[1].end, // Adjust based on your specific requirements
        },
      },
    };
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_API_URL}/comment/${threadId}`,
          {
            headers: {
              Authorization: `Bearer ${userAccessToken}`, // Replace userAccessToken with the actual user's access token
              "Content-Type": "application/json",
            },
          },
        );

        setComments(response.data);
        setNumReplies(response.data.length + 1);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [submission]);

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  // ... (previous code remains unchanged)

  const handleCommentSubmit = async () => {
    try {
      if (!userAccessToken) {
        // Redirect to the sign-up page if the user is not logged in
        navigate("/signup"); // Change '/signup' to your sign-up route
        return;
      }

      if (!commentInput.trim()) {
        // Show an error toast or handle the case where the comment is empty
        toast.error("Please enter a non-empty comment.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return; // Prevent submitting an empty comment
      }

      axios
        .post(
          `http://${process.env.REACT_APP_API_URL}/comment/write-comment`,
          {
            parentId: threadId,
            text: commentInput,
          },
          {
            headers: {
              Authorization: `Bearer ${userAccessToken}`,
              "Content-Type": "application/json",
            },
          },
        )
        .then(() => {
          setSubmission(submission + 1);
        });

      setSnackbarOpen(false); // Close Snackbar after successful submission
      setCommentInput(""); // Reset comment input after submission
      setNumReplies(numReplies + 1);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setSnackbarOpen(false); // Close Snackbar in case of error
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const element = document.getElementById(`title-thread-${threadId}`);

    if (element) {
      console.log("!");
      const annotator = new Recogito({
        content: `title-thread-${threadId}`, // ID of the element that contains the text
      });

      annotator.on("createAnnotation", onAnnotationCreated);
      //annotator.on("updateAnnotation", onAnnotationUpdated);
      //annotator.on("deleteAnnotation", onAnnotationDeleted);

      return () => annotator.destroy();
    }
  }, []);

  //console.log(threadId);
  const link = `http://${process.env.REACT_APP_API_URL}/post/${threadId}`;

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(link, {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
            "Content-Type": "application/json",
          },
        });

        setThreadDetails(response.data);
        setNumLikes(response.data.numberOfLikes);
        setNumDislikes(response.data.numberOfDislikes);
        setIsDisliked(response.data.isDisliked);
        setIsLiked(response.data.isLiked);

        if (response.data.upcomingTitle != null) {
          setIsUpcomingTitle(response.data.upcomingTitle.isUpcomingTitle);
          setDemoLink(response.data.upcomingTitle.demoLink);
          setLaunchingDate(response.data.upcomingTitle.launchingDate);
          //console.log("upcoming", response.data.upcomingTitle.isUpcomingTitle);
        } else {
          setIsUpcomingTitle(false);
        }

        //setOwnerId(response.data.user.id);
        console.log(response.data);
        setLoading(false); // Set loading to false when data is fetched}

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching thread details:", error);
        setLoading(false); // In case of error, also set loading to false
      }
    };

    fetchThread();
  }, []);

  if (loading) {
    return <h1 style={{ color: "white" }}>Loading...</h1>; // Display a loading message while fetching data
  }

  if (!threadDetails) {
    return <div>Error fetching data...</div>; // Display an error message if data is not available
  }

  const boxStyle = {
    backgroundColor: "rgba(30, 30, 30, 0.9)",
    borderRadius: "10px",
    maxWidth: "960px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const tagBox = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(50, 150, 30)",
    color: "white",
    height: "6px",
    borderRadius: "10px",
    padding: "5px",
    marginRight: "5px",
  };
  const forumStyle = {
    backgroundColor: "rgb(200, 10, 10)",
    color: "white",
    borderRadius: "10px",
    padding: "5px",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const upcomingStyle = {
    backgroundColor: "green",
    color: "white",
    borderRadius: "10px",
    padding: "3px",
    marginBottom: "8px",
    fontWeight: "bold",
    alignSelf: "flex-start",
  };
  const sortedComments = comments.slice().sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateA - dateB;
  });

  return (
    <>
      <ToastContainer />
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        style={{ justifyContent: "center", display: "flex" }}
      >
        <Box p={5} style={boxStyle}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <a
              href={`/game/${convertToSlug(threadDetails?.game?.title)}`}
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body1" component="div" style={forumStyle}>
                {threadDetails?.game?.title}
              </Typography>
            </a>

            <Grid style={{ display: "flex" }}>
              {threadDetails?.tags &&
                threadDetails?.tags.map((data1, index1) => (
                  <Typography
                    variant="caption"
                    component="div"
                    style={tagBox}
                    key={index1}
                  >
                    {data1}
                  </Typography>
                ))}
            </Grid>
          </Grid>
          <Typography
            variant="h4"
            id={`title-thread-${threadId}`}
            component="div"
            style={{
              color: "white",
              alignSelf: "flex-start",
              fontSize: "2rem",
              paddingBottom: "1rem",
            }}
          >
            {threadDetails?.title}
          </Typography>

          {isUpcomingTitle && (
            <>
              <Typography variant="body2" component="div" style={upcomingStyle}>
                Upcoming Title
              </Typography>
              <Grid
                spacing={2}
                style={{
                  paddingBottom: "1rem",
                  alignItems: "center",
                  display: "flex",
                  gap: "16px",
                  justifyContent: "flex-start",
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    component="div"
                    style={{ color: "green", fontWeight: "600" }}
                  >
                    Launching Date:{" "}
                    <span style={{ color: "white" }}>
                      {" "}
                      {new Date(launchingDate).toLocaleDateString(
                        "en-US",
                        options,
                      )}
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      style={{
                        color: "white",
                        fontWeight: "600",
                        padding: "4px",
                        backgroundColor: "green",
                        borderRadius: "10px",
                      }}
                    >
                      View Demo
                    </Typography>
                  </a>
                </Grid>
              </Grid>
            </>
          )}
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              paddingBottom: "10px",
            }}
          >
            <Person2OutlinedIcon style={{ color: "white" }} />
            <a
              href={`/profile-page/${threadDetails?.user?.id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="caption"
                component="div"
                style={{
                  color: "white",
                  marginTop: "3px",
                  marginRight: "10px",
                }}
              >
                {threadDetails?.user?.username}
              </Typography>
            </a>
            <AccessTimeOutlinedIcon
              style={{ color: "white", marginRight: "3px" }}
            />
            <Typography
              variant="caption"
              component="div"
              style={{
                color: "white",
                marginTop: "3px",
                marginRight: "10px",
              }}
            >
              {new Date(threadDetails?.createdAt).toLocaleDateString(
                "en-US",
                options,
              )}
            </Typography>
            <MapsUgcOutlinedIcon
              style={{ color: "white", marginRight: "3px" }}
            />
            <Typography
              variant="caption"
              component="div"
              style={{
                color: "white",
                marginTop: "3px",
              }}
            >
              {numReplies}
            </Typography>
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "32px",
              alignSelf: "center",
            }}
          >
            <ThreadComponent
              imgsrc={threadDetails?.user?.avatar}
              username={threadDetails?.user?.username}
              date={new Date(threadDetails?.createdAt).toLocaleDateString(
                "en-US",
                options,
              )}
              content={threadDetails?.body}
              contentImg={threadDetails?.media}
              userId={threadDetails?.user?.id}
              numLikes={numLikes}
              numDislikes={numDislikes}
              threadId={threadId}
              isLiked={isLiked}
              isDisliked={isDisliked}
              isUpcomingTitle={isUpcomingTitle}
              launchingDate={launchingDate}
              demoLink={demoLink}
            />

            {/* Display comments */}
            {sortedComments.map((comment, index) => (
              <CommentComponent
                key={index}
                imgsrc={comment?.author?.avatar}
                username={comment?.author?.username}
                date={new Date(comment?.timestamp).toLocaleDateString(
                  "en-US",
                  options,
                )}
                content={comment?.text}
                userId={comment?.author?.id}
                likeCount={comment.likeCount}
                dislikeCount={comment.dislikeCount}
                commentId={comment.id}
                likedUsers={comment.likedUsers}
                dislikedUsers={comment.dislikedUsers}

                // Add any other necessary props for the ThreadComponent
              />
            ))}
            {/* ... (existing code) */}

            <TextField
              multiline
              required
              rows={4}
              variant="outlined"
              label="Write Your Reply..."
              value={commentInput}
              onChange={handleCommentChange}
              style={{
                color: "white",
                width: "920px",
                backgroundColor: "rgb(255,255,255,0.6)",
                borderRadius: "10px",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
              style={{ alignSelf: "flex-end", gap: "10px" }}
            >
              Submit Comment
            </Button>
          </Grid>
          {/* Snackbar for comment submission */}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={snackbarOpen}
            autoHideDuration={3000} // Adjust the duration as needed
            onClose={() => setSnackbarOpen(false)}
            message="Submitting comment..."
          />
        </Box>
      </Grid>
    </>
  );
};

export default ThreadPage;
