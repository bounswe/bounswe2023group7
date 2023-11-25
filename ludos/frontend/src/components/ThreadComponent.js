import React  from "react";
import { Grid, Box, Typography} from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ReplyIcon from '@mui/icons-material/Reply';


function ThreadComponent({imgsrc, username, date, content}){

    return(
        <Grid style={{display: "flex", flexDirection: "row"}}>
                <Grid style={{ 
                    display: "flex", 
                    flexDirection: "column",
                    backgroundColor: "rgb(200,200,200,0.6)",
                    padding: "5px",
                    maxWidth: "300px",
                    width: "100%" ,
                    borderBottomLeftRadius: "10px",
                    borderTopLeftRadius: "10px",
                    paddingTop: "20px",
                    }}>
                        <Box
                        component="img"
                        sx={{
                            height: 96,
                            width: 96,
                            borderRadius: "50%",
                            alignSelf: "center",
                            paddingBottom: "10px",
                        }}
                        src={imgsrc}
                            />
                        <Typography variant="subtitle1" component="div" style={{
                            color: "white",
                            marginTop: "3px",
                            }}>
                            @{username}
                        </Typography>

                </Grid>
                <Grid style={{ 
                    display: "flex", 
                    justifyContent: "flex-start",
                    flexDirection: "column", 
                    backgroundColor: "rgb(255,255,255,0.6)",
                    padding: "5px",
                    maxWidth: "620px",
                    width: "100%" ,
                    borderBottomRightRadius: "10px",
                    borderTopRightRadius: "10px",
                    }}>
                        <Typography variant="caption" component="div" style={{
                            color: "white",
                            marginTop: "3px",
                            marginRight: "10px",
                            display: "flex",
                            marginLeft: "10px",
                            marginBottom: "10px",
                            }}>
                            {date}
                        </Typography>

                        <Typography variant= "body2" component= "div" style={{
                            color: "white",
                            marginTop: "3px",
                            marginRight: "10px",
                            display: "flex",
                            marginLeft: "10px",
                            textAlign: "left",
                            lineHeight: "1.7",
                            }}>
                           {content}
                        </Typography>
                        <Grid style={{display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                            <div style={{
                                width: "560px",
                                height: "1px",
                                color: "rgb(180, 180, 180)",
                                backgroundColor: "rgb(200, 200, 200)",
                                margin: "5% 5% 3% 5%",
                                alignSelf:"center",
                                }}>
                            </div>
                            <Grid style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "15px",
                                justifyContent: "flex-end",
                                marginRight: "20px",
                            }}>
                            <ThumbUpIcon/>
                            <ThumbDownAltIcon/>
                            <ReplyIcon/>
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>
    );
}

export default ThreadComponent;