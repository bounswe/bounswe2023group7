import { React, useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Avatar,
    List,
    Stack,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import ForumTopic from '../components/ForumTopic';
import { useParams, Link } from 'react-router-dom';


// Styled components
const HeaderBox = styled(Box)(({ theme }) => ({
    background: 'rgba(135,206,235)',
    borderRadius: '20px',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const MembersPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#FFDAB9',
    borderRadius: '20px',
    padding: theme.spacing(2),
    color: theme.palette.getContrastText('#FFDAB9'),
}));

const PostPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    margin: theme.spacing(1, 0),
    padding: theme.spacing(2),
    borderRadius: '20px',
}));

const JoinButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#9ACD32',
    color: theme.palette.getContrastText('#9ACD32'),
    borderRadius: '20px',
    padding: theme.spacing(1, 4),
    '&:hover': {
        backgroundColor: '#9ACD32',
    },
}));


const convertToSlug = (text) => {
    return text
        ?.toString()
        .toLowerCase()
        .trim()
        .replace(/[\s_]/g, "-") // Replace spaces or underscores with dashes
        .replace(/[^\w-]+/g, "") // Remove non-word characters except dashes
        .replace(/--+/g, "-"); // Replace multiple dashes with single dash
}

export default function GroupPage() {
    const { groupId } = useParams();

    const [threads, setThreads] = useState([]);
    const [auth, setAuth] = useState(false);
    const [game, setGame] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [members, setMembers] = useState([]);
    const [currentMembers, setCurrentMembers] = useState(0);
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);
    const [group, setGroup] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const axiosInstance = axios.create({
        baseURL: `http://${process.env.REACT_APP_API_URL}`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    });

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setAuth(true);
        }

        axiosInstance
            .get(`/group/${groupId}`)
            .then((response) => {
                setGroup(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (group) {
            axiosInstance
                .get(`/post?groupId=${groupId}&isLiked=false&isDisliked=false&order=ASC&orderByKey=numberOfLikes`)
                .then((response) => {
                    setThreads(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);


    return (
        <Container maxWidth="lg" sx={{ mt: 4, overflow: 'hidden' }}>
            <Box
                sx={{
                    borderRadius: '20px',
                    background: 'rgba(135,206,235)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '50px',
                }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={3}>
                        <Avatar sx={{ width: 200, height: 200 }} src={group?.logo} />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between' }}>
                            <Typography variant="h4" sx={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                fontWeight: 'bold',
                                color: '#0c1925',
                            }}>
                                {group?.name.toUpperCase()}
                            </Typography>
                            <Link to={`/game/${convertToSlug(group?.game?.title)}`} style={{ textDecoration: 'none' }}>
                                <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'center', fontSize: '30px' }}>{group?.game?.title}</Typography>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Stack direction="column" spacing={2} alignItems="center">
                            <JoinButton>Join</JoinButton>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" sx={{ mr: 1 }}>{group?.members?.length}/{group?.maxNumberOfMembers}</Typography>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>

            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Box sx={{
                        padding: '20px',
                        borderRadius: '20px',
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'flex-start' }}>Description</Typography>
                        <Typography variant="body1" paragraph sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            {group?.description}
                        </Typography>
                    </Box>
                    <Box sx={{
                        padding: '20px',
                        borderRadius: '20px',
                        my: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                    }}>
                        <Typography variant="h6" gutterBottom>Posts</Typography>
                        {auth ? (
                            <Box>
                                <List>
                                    {threads.map((topic, key) => (
                                        <ForumTopic key={key} topic={topic} />
                                    ))}
                                </List>
                                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                    Create Thread
                                </Button>
                                <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Create Thread</DialogTitle>
                                    <DialogContent>

                                    </DialogContent>
                                </Dialog>
                            </Box>
                        ) : (
                            (
                                <Box>
                                    <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>You must be logged in to see group threads.</Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        my={10}
                                        sx={{ mt: 5 }}
                                    >
                                        <Link to="/login" style={{ color: "white", textDecoration: 'none' }}>Login</Link>
                                    </Button>
                                </Box>
                            )
                        )}
                    </Box>
                </Grid>

                <Grid item xs={12} md={4} my={2}>
                    <MembersPaper elevation={3}>
                        <Typography variant="h6" gutterBottom>Members</Typography>
                        {auth ? (
                            <List>
                                {group?.members.map((member, index) => (
                                    <ListItem key={index} sx={{ backgroundColor: 'white', my: '10px', borderRadius: '20px', padding: '10px' }}>
                                        <ListItemAvatar>
                                            <Avatar alt={member?.username} src={member?.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={member?.username} />
                                    </ListItem>
                                ))}
                            </List>
                        ) :
                            (
                                <Box>
                                    <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>You must be logged in to see members.</Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        my={10}
                                        sx={{ mt: 5 }}
                                    >
                                        <Link to="/login" style={{ color: "white", textDecoration: 'none' }}>Login</Link>
                                    </Button>
                                </Box>
                            )
                        }
                    </MembersPaper>
                </Grid>
            </Grid>
        </Container >
    );
}


