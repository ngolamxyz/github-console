import { Avatar, Box, Paper, Rating, Stack, styled, Typography } from "@mui/material";
import nFormatter from "../utils/nFormatter";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

export default function UserInfo({ info, onToggleFollowing, onClick }) {
    const toggleFollowing = (event) => {
        event.preventDefault()
        event.stopPropagation()
        onToggleFollowing()
    }
    return (
        <Paper sx={{
            "&.MuiPaper-rounded": {
                borderRadius: "15px"
            },
            position: "relative",
            cursor: "pointer"
        }}>
            <Stack onClick={onClick} direction="row">
                <Avatar src={info.avatarUrl} alt={info.login} variant="rounded"
                sx={{width: "90px",
                    marginRight: "10px",
                    height: "90px", padding: "6px", ".MuiAvatar-img": {
                    borderRadius: "10px"
                }}}/>
                <Stack justifyContent={"space-between"} sx={{padding: "5px 0"}}>
                    <Typography sx={{
                        fontWeight: "700",
                        lineHeight: "24px"
                    }}>{info.login}</Typography>
                    <Stack sx={{
                        fontSize: "12px",
                        fontWeight: "normal",
                        lineHeight: "16px"
                    }}>
                        <Typography fontSize={"12px"} fontWeight="normal" lineHeight={"16px"}>{info.followers ? nFormatter(info.followers.totalCount, 1) : 0 } followers</Typography>
                        <Typography fontSize={"12px"} fontWeight="normal" lineHeight={"16px"}>{info.following ? nFormatter(info.following.totalCount, 1) : 0 } followings</Typography>
                    </Stack>
                </Stack>
                <Box sx={{
                    position: "absolute",
                    top: "10px",
                    right: "5px",
                    cursor: "pointer",
                    color: "#F44336"
                }} onClick={toggleFollowing}>
                     <StyledRating
                        name="customized-color"
                        value={info.viewerIsFollowing ? 1 : 0}
                        max={1}
                        precision={1}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    />
                </Box>
            </Stack>
        </Paper>
        
    )
}