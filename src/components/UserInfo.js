import { Avatar, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { queryFavorites, unFollowUser } from "../reducers/favoriteReducer";
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
        width: 9rem;
        height: 9rem;
        margin-right: 10px;
        padding: .6rem;
        .MuiAvatar-img {
            border-radius: 10px;
        }
    }
    .following-icon {
        width: 2.2rem;
        height: 2.2rem;
        position: absolute;
        top: 10px;
        right: 5px;
    }
    .details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 7rem;
    }
    .following-details {
        font-size: 1.2rem;
        font-weight: normal;
        line-height: 1.6rem;
    }
    .username {
        font-weight: 700;
        font-size: 1.6rem;
        line-height: 24px;
    }

`

export default function UserInfo({ info }) {
    const dispatch = useDispatch()
    const toggleFollowing = () => {
        dispatch(toggleFollowUser(info)).then(() => dispatch(queryFavorites()))
    }
    return (
        <StyledBox>
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