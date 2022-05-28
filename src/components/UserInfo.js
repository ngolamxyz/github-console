import { Avatar, Paper } from "@mui/material";
import styled from "styled-components";
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

export default function UserInfo({ user }) {
    return (
        <StyledBox>
            <Avatar className="avatar" src={user.avatarUrl} alt={user.login} variant="rounded"/>
            <div className="details">
                <div className="username">{user.login}</div>
                <div className="following-details">
                    <div className="following-details--followers">{user.followers ? nFormatter(user.followers.totalCount, 1) : 0 } followers</div>
                    <div className="following-details--flowing">{user.following ? nFormatter(user.following.totalCount, 1) : 0 } flowings</div>
                </div>
            </div>
            <svg className="following-icon">
                <use xlinkHref={ `/imgs/sprite.svg#${user.viewerIsFollowing ? 'following-icon' : 'unfollowing-icon'}` } />
            </svg>
        </StyledBox>
    )
}