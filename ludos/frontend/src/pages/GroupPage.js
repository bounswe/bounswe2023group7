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
    Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios';
import ForumTopic from '../components/ForumTopicForGame';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CreateGroupThreadForm from '../components/CreateGroupThreadForm';
import EditGroupForm from '../components/EditGroupForm';


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
    const navigate = useNavigate();
    const { groupId } = useParams();

    const [threads, setThreads] = useState([]);
    const [auth, setAuth] = useState(false);
    const [members, setMembers] = useState([]);
    const [group, setGroup] = useState(null);
    const [createThreadDialogOpen, setCreateThreadDialogOpen] = useState(false);
    const [editGroupDialogOpen, setEditGroupDialogOpen] = useState(false);
    const [isJoined, setIsJoined] = useState(false);

    const axiosInstance = axios.create({
        baseURL: `http://${process.env.REACT_APP_API_URL}`,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
    });

    const handleJoin = () => {
        axiosInstance
            .put(`/group/join/${groupId}`)
            .then((response) => {
                axiosInstance
                    .get(`/group/${groupId}`)
                    .then((response) => {
                        setMembers(response.data.members);
                        setIsJoined(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleLeave = () => {
        axiosInstance
            .put(`/group/leave/${groupId}`)
            .then((response) => {
                axiosInstance
                    .get(`/group/${groupId}`)
                    .then((response) => {
                        setMembers(response.data.members);
                        setIsJoined(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleMemberClick = (member) => {
        navigate(`/profile-page/${member.id}`);
    }

    const handleEditGroupOpen = () => {
        setEditGroupDialogOpen(true);
    };

    const handleEditGroupClose = () => {
        setEditGroupDialogOpen(false);
    };

    const handleClickOpen = () => {
        setCreateThreadDialogOpen(true);
    };

    const handleClose = () => {
        setCreateThreadDialogOpen(false);
    };



    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setAuth(true);
        }

        axiosInstance
            .get(`/group/${groupId}`)
            .then((response) => {
                setGroup(response.data);
                setMembers(response.data.members);
                setIsJoined(response.data.isJoined);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });


        axiosInstance
            .get(`/user/info`)
            .then((response) => {
                localStorage.setItem("userId", response.data.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axiosInstance
            .get(`/post?groupId=${groupId}&isLiked=false&isDisliked=false&order=ASC&orderByKey=numberOfLikes`)
            .then((response) => {
                setThreads(response.data.items);
                console.log(response.data.items);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    return (
        <Container maxWidth="lg" sx={{ mt: 4, overflow: 'hidden', marginBottom: '5s0px' }}>
            <Box
                sx={{
                    borderRadius: '20px',
                    background: '#569CB1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                }}>
                <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid item spacing={2} sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Grid item xs={3} sx={{ display: 'flex', flexDirection: "column", alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            {localStorage.getItem("userId") === group?.admin?.id ? (
                                <Button
                                    size='small'
                                    variant='contained'
                                    style={{ backgroundColor: '#68A849', color: 'white', fontWeight: 'bold', borderRadius: '10px' }}
                                    onClick={handleEditGroupOpen}
                                >
                                    Edit Group
                                </Button>)
                                : null}
                            <Avatar sx={{ width: 200, height: 200, borderRadius: '15px', marginTop: '20px' }} src={group?.logo} />
                        </Grid>
                        <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                                <Typography variant="h4" sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}>
                                    {group?.name.toUpperCase()}
                                </Typography>
                                <Link to={`/game/${convertToSlug(group?.game?.title)}`} style={{ textDecoration: 'none' }}>
                                    <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'center', fontSize: '25px', color: "#E6E6E6" }}>{group?.game?.title}</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Stack direction="column" spacing={2} alignItems="center">
                                <Button
                                    onClick={isJoined ? handleLeave : handleJoin}
                                    variant="contained"
                                    color={isJoined ? "primary" : "secondary"}
                                    sx={{ borderRadius: '10px', fontWeight: 'bold', paddingX: '20px', paddingY: '10px' }}

                                >
                                    {isJoined ? "Leave" : "Join"}
                                </Button>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="body1" sx={{ mr: 1 }}>{members?.length}/{group?.maxNumberOfMembers}</Typography>
                                    <PeopleIcon />
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <div>
                            {group?.tags.map((tag, index) => (
                                <Chip
                                    key={index}
                                    label={tag}
                                    color="primary"
                                    style={{ marginRight: '4px', backgroundColor: '#F75C03', fontWeight: 'bold' }}
                                />
                            ))}
                        </div>
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
                        backgroundColor: '#2F5B7A',
                        color: 'white',
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold' }}>Description</Typography>
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
                        backgroundColor: '#2F5B7A',
                        color: 'white',
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold' }}>Posts</Typography>

                        {auth ? (isJoined ? (
                            <Box spacing={2}>
                                {threads?.map((topic, key) => (
                                    <ForumTopic style={{ backgroundColor: 'blue' }} key={key} topic={topic} />
                                ))}
                                <Button variant="outlined" sx={{ color: 'white' }} onClick={handleClickOpen}>
                                    Create Thread
                                </Button>
                            </Box>
                        ) : (
                            <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>You must be a member to see the group threads.</Typography>
                        )
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
                    <MembersPaper elevation={3} style={{ backgroundColor: '#68A849' }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'flex-start', fontWeight: 'bold' }}>Members</Typography>
                        {auth ? (isJoined ? (
                            <List>
                                {members.map((member, index) => (
                                    <ListItem
                                        key={index}
                                        onClick={() => handleMemberClick(member)}
                                        sx={{
                                            backgroundColor: 'white',
                                            my: '10px',
                                            borderRadius: '20px',
                                            padding: '10px',
                                            '&:hover': {
                                                backgroundColor: 'lightgray',
                                                cursor: 'pointer',
                                            },
                                        }}>
                                        <ListItemAvatar>
                                            <Avatar alt={member?.username} src={member?.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText primary={member?.username} secondary={member?.username === group?.admin?.username ? "Admin" : null} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>You must be a member to see the group members.</Typography>
                        )
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

            <Dialog
                xs={12}
                open={createThreadDialogOpen}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title" style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>Create Thread</DialogTitle>
                <DialogContent>
                    <CreateGroupThreadForm group={group} game={group?.game} />
                </DialogContent>
            </Dialog>

            <Dialog
                fullWidth
                maxWidth="sm"
                open={editGroupDialogOpen}
                onClose={handleEditGroupClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <DialogContent style={{ display: 'flex' }}>
                    <EditGroupForm group={group} game={group?.game} />
                </DialogContent>
            </Dialog>


        </Container >

    );
}


