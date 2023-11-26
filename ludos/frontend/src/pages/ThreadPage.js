import React , {useEffect, useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button} from "@mui/material";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import ThreadComponent from "../components/ThreadComponent";
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ThreadPage = () => {
 const navigate = useNavigate();
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  const { threadId } = useParams(); // Get the id from URL params
  const [threadDetails, setThreadDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const userAccessToken = localStorage.getItem("accessToken");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [submission, setSubmission] = useState(1);
  const [numReplies, setNumReplies] = useState(1);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}/comment/${threadId}`, {
          headers: {
            Authorization: `Bearer ${userAccessToken}`, // Replace userAccessToken with the actual user's access token
            'Content-Type': 'application/json',
          },
        });

        setComments(response.data);
        setNumReplies(response.data.length + 1 );
      } catch (error) {
        console.error('Error fetching comments:', error);
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
        navigate('/signup'); // Change '/signup' to your sign-up route
        return;
      }

      if (!commentInput.trim()) {
        // Show an error toast or handle the case where the comment is empty
        toast.error('Please enter a non-empty comment.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return; // Prevent submitting an empty comment
      }

       axios.post(
        `http://${process.env.REACT_APP_API_URL}/comment/write-comment`,
        {
          parentId: threadId,
          text: commentInput,
        },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
            'Content-Type': 'application/json',
          },
        },
      ).then(() => {
        setSubmission(submission + 1);
    })

      
      setSnackbarOpen(false); // Close Snackbar after successful submission
      setCommentInput(''); // Reset comment input after submission
      setNumReplies(numReplies + 1);
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSnackbarOpen(false); // Close Snackbar in case of error
    }
  };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  
  console.log(threadId);
const link = `http://${process.env.REACT_APP_API_URL}/post/${threadId}`;

useEffect(() => {
  const fetchThread = async () => {
    try {
      const response = await axios.get(link, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setThreadDetails(response.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.error('Error fetching thread details:', error);
      setLoading(false); // In case of error, also set loading to false
    }
  };

  fetchThread();
}, [threadId]);

if (loading) {
  return <div>Loading...</div>; // Display a loading message while fetching data
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
    const sortedComments = comments.slice().sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateA - dateB;
    });

    return (
      <>
      <ToastContainer />
        <Grid item xs={12} sm={12} md={12} lg={12} style={{justifyContent: "center", display: "flex"}}>
        <Box p={5} style={boxStyle}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
            <Typography variant="body1" component="div" style={forumStyle}>
            {threadDetails.game.title}
            </Typography>
            <Grid style={{ display: "flex"}}>
            {threadDetails.tags &&
              threadDetails.tags.map((data1, index1) => (
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
            <Typography variant="h4" component="div" style={{
                color: "white", 
                alignSelf: "flex-start",
                fontSize: "2rem",
                paddingBottom: "1rem",
                }}>
               {threadDetails.title}
            </Typography>
            <Grid style={{
                display: "flex", 
                flexDirection: "row", 
                alignItems: "flex-start",
                paddingBottom: "10px",
                }}>
                <Person2OutlinedIcon style={{color: "white"}}/>
                <Typography variant="caption" component="div" style={{
                color: "white",
                marginTop: "3px",
                marginRight: "10px",
                }}>
               {threadDetails.user.username}
                </Typography>
                <AccessTimeOutlinedIcon style={{color: "white", marginRight: "3px"}}/>
                <Typography variant="caption" component="div" style={{
                color: "white",
                marginTop: "3px",
                marginRight: "10px",
                }}>
                {new Date(threadDetails.createdAt).toLocaleDateString('en-US', options)}
                </Typography>
                <MapsUgcOutlinedIcon style={{color: "white", marginRight: "3px"}}/>
                <Typography variant="caption" component="div" style={{
                color: "white",
                marginTop: "3px",
                }}>
                {numReplies}
                </Typography>
            </Grid>
            <Grid style={{display: "flex", flexDirection: "column", gap: "32px", alignSelf: "center"}}>
                <ThreadComponent 
                imgsrc={threadDetails.user.avatar}
                username={threadDetails.user.username}
                date={new Date(threadDetails.createdAt).toLocaleDateString('en-US', options)}
                content={threadDetails.body}
                contentImg={threadDetails.media}
                />
          
         
            {/* Display comments */}
            {sortedComments.map((comment, index) => (
              <ThreadComponent
                key={index}
                imgsrc={comment.author.avatar}
                username={comment.author.username}
                date={new Date(comment.timestamp).toLocaleDateString('en-US', options)}
                content={comment.text}
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
          style={{ color: "white", width: "920px", backgroundColor: "rgb(255,255,255,0.6)", borderRadius: "10px" }}
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
            vertical: 'bottom',
            horizontal: 'left',
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

}

  export default ThreadPage;