import React , {useEffect, useState} from "react";
import { Grid, Box, Typography, TextField, Button} from "@mui/material";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import ThreadComponent from "../components/ThreadComponent";


export default function CreateThreadPage() {
    const [replyContent, setReplyContent] = useState('');
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleReplyChange = (event) => {
        setReplyContent(event.target.value);
      };
    
      const handleReplySubmit = () => {
        // You can add logic here to handle submitting the reply content
        console.log("Reply submitted:", replyContent);
        // Resetting the reply content after submission
        setReplyContent('');
      };

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


    return (
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
                The Witcher 3
            </Typography>
            <Grid style={{ display: "flex"}}>
                <Typography
                    variant="caption"
                    component="div"
                    style={tagBox}
                    >
                    discussion
                </Typography>

            </Grid>
            </Grid>
            <Typography variant="h4" component="div" style={{
                color: "white", 
                alignSelf: "flex-start",
                fontSize: "2rem",
                paddingBottom: "1rem",
                }}>
                The Witcher 3 was amazing! What do you think???
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
                AhriFoxie
                </Typography>
                <AccessTimeOutlinedIcon style={{color: "white", marginRight: "3px"}}/>
                <Typography variant="caption" component="div" style={{
                color: "white",
                marginTop: "3px",
                marginRight: "10px",
                }}>
                Dec 20, 2023
                </Typography>
                <MapsUgcOutlinedIcon style={{color: "white", marginRight: "3px"}}/>
                <Typography variant="caption" component="div" style={{
                color: "white",
                marginTop: "3px",
                }}>
                9
                </Typography>
            </Grid>
            <Grid style={{display: "flex", flexDirection: "column", gap: "32px", alignSelf: "center"}}>
                <ThreadComponent 
                imgsrc="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_27.jpg"
                username="AhriFoxie"
                date="Dec 20, 2023"
                content="Hey everyone! I recently finished playing The Witcher 3 and I'm absolutely blown away by this game. The storyline, the characters, the open-world—it's all so immersive and engaging. What are your thoughts on The Witcher 3? Favorite quests or characters? Let's discuss!"
                />
                <ThreadComponent 
                imgsrc="https://img.wattpad.com/c90dc9c60617cc0b0970b1c8eeef09ed383f99d2/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f76582d4974533075434f704275673d3d2d3131372e3136373136363361333535386265353839353431383136353735322e6a7067?s=fit&w=720&h=720"
                username="YagamiLight"
                date="Dec 20, 2023"
                content="I couldn't agree more! The Witcher 3 is hands down one of the best RPGs ever made. The depth of the quests and the moral choices you have to make really immerse you into Geralt's world. The Bloody Baron questline was so emotionally impactful for me. How about you all?"
                />
                <ThreadComponent 
                imgsrc="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_42.jpg"
                username="ILoveNanami"
                date="Dec 20, 2023"
                content="Oh, definitely! The Witcher 3 is a masterpiece. The attention to detail is insane. I loved exploring every nook and cranny of the map, uncovering hidden stories and side quests. Gwent, anyone? That card game within the game became an addiction for me!"/>
                <ThreadComponent 
                imgsrc="https://media.newyorker.com/photos/5d0be56fe140839b70c68120/master/pass/Phillips-Neon-Genesis-Evangelion.jpg"
                username="ValorantMonkey"
                date="Dec 21, 2023"
                content="The Witcher 3 is iconic! The character development is off the charts. Yennefer, Triss, and Ciri are all so well-written. And the DLCs—Hearts of Stone and Blood and Wine—were just as phenomenal as the main game. The whole experience is just unforgettable."/>

                <ThreadComponent 
                    imgsrc="https://www.animeexplained.com/wp-content/uploads/2023/06/nanami-jjk.jpg"
                    username="KingOfGames"
                    date="Dec 21, 2023"
                    content="I have mixed feelings. While I appreciate the game's depth and storytelling, the combat mechanics felt a bit clunky at times. Some of the movement and combat controls could've been smoother, in my opinion. But overall, the narrative more than makes up for it."/>

                <ThreadComponent 
                    imgsrc="https://i0.wp.com/www.spielanime.com/wp-content/uploads/2023/09/Bungou-Stray-Dogs_-How-to-be-like-Osamu-Dazai_-Explained-2.jpg?resize=1200%2C675&ssl=1"
                    username="DazaiTheBest"
                    date="Dec 22, 2023"
                    content="I'm a huge fan of the books, and I think The Witcher 3 did an incredible job bringing Geralt's world to life. The attention to the lore and staying true to the source material was commendable. The landscapes and music captured the essence of the Witcher universe perfectly."/>

                <ThreadComponent 
                    imgsrc="https://i.pinimg.com/736x/3c/00/fd/3c00fd0fc1a20feb2bc97bc818d8467d.jpg"
                    username="RedHeadChiliPeppers"
                    date="Dec 23, 2023"
                    content="The Witcher 3 is one of those rare games that set the bar so high for RPGs. The decisions you make actually matter and impact the game's outcome. The world feels alive, and the side quests are as compelling as the main storyline. CD Projekt Red really outdid themselves with this one!"/>

                <ThreadComponent 
                    imgsrc="https://cdn.vox-cdn.com/thumbor/w-O9PRGBVQL4LA7q36YWrtZrlnI=/0x0:1147x647/1200x800/filters:focal(483x233:665x415)/cdn.vox-cdn.com/uploads/chorus_image/image/70221420/Jotaro.0.jpeg"
                    username="JojoTheBizarre"
                    date="Dec 24, 2023"
                    content="I just started playing The Witcher 3, and I'm already hooked! The depth of the game is staggering. Any tips for a newbie like me? I'm overwhelmed by the sheer amount of content!"/>
                <ThreadComponent 
                    imgsrc="https://i.pinimg.com/736x/45/af/1d/45af1df4afb8b36be580e86f072a1858.jpg"
                    username="AnyaCutiePie"
                    date="Dec 25, 2023"
                    content="Welcome to the world of The Witcher! My advice: take your time exploring and doing side quests. Don't rush through the main story; immerse yourself in the world and enjoy the journey. Also, don't underestimate the power of preparing for battles—potions and oils make a huge difference!"/>
                    <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Write Your Reply..."
                    value={replyContent}
                    onChange={handleReplyChange}
                    style={{ color: "white", width: "920px", backgroundColor:"rgb(255,255,255,0.6)", borderRadius: "10px" }}
                    />
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReplySubmit}
                    style={{ alignSelf: "flex-end", gap: "10px"}}
                    >
                    Submit Reply
                    </Button>
            </Grid>
            
        </Box>
        </Grid>
    );

}