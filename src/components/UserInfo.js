import { Avatar, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleFollowUser } from "../reducers/usersReducer";
import nFormatter from "../utils/nFormatter";

const UserBox = styled(Paper)
(({ theme, round }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
}));

const StyledBox = styled(UserBox)`
    display: flex;
    align-items: center;
    position: relative;
    &.MuiPaper-rounded {
        border-radius: 15px;
    }
    .avatar {
        width: 90px;
        height: 90px;
        margin-right: 10px;
        padding: 6px;
        .MuiAvatar-img {
            border-radius: 10px;
        }
    }
    .following-icon {
        width: 22px;
        height: 22px;
        position: absolute;
        top: 10px;
        right: 5px;
    }
    .details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 70px;
    }
    .following-details {
        font-size: 12px;
        font-weight: normal;
        line-height: 16px;
    }
    .username {
        font-weight: 700;
        line-height: 24px;
    }

`

export default function UserInfo({ info, afterToggle, onClick }) {
    const dispatch = useDispatch()
    const toggleFollowing = () => {
        dispatch(toggleFollowUser(info)).then(() => afterToggle ? afterToggle() : null)
    }
    return (
        <StyledBox onClick={onClick}>
            <Avatar className="avatar" src={info.avatarUrl} alt={info.login} variant="rounded"/>
            <div className="details">
                <div className="username">{info.login}</div>
                <div className="following-details">
                    <div className="following-details--followers">{info.followers ? nFormatter(info.followers.totalCount, 1) : 0 } followers</div>
                    <div className="following-details--followings">{info.following ? nFormatter(info.following.totalCount, 1) : 0 } followings</div>
                </div>
            </div>
            <svg className="following-icon" onClick={toggleFollowing}>
                <use xlinkHref={ `/imgs/sprite.svg#${info.viewerIsFollowing ? 'following-icon' : 'unfollowing-icon'}` } />
            </svg>
        </StyledBox>
    )
}