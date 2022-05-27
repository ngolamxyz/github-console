import { Avatar, Paper } from "@mui/material";
import styled from "styled-components";

const UserBox = styled(Paper)(({ theme }) => ({
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
    .avatar {
        width: 7rem;
        height: 7rem;
        margin-right: 2rem;
    }
    .following-icon {
        width: 2rem;
        height: 2rem;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
                    <div className="following-details--followers">{user.followers ? user.followers.totalCount : 0 } followers</div>
                    <div className="following-details--flowing">{user.following ? user.following.totalCount : 0 } flowings</div>
                </div>
            </div>
            <svg className="following-icon">
                <use xlinkHref="/imgs/sprite.svg#following-icon"/>
            </svg>
        </StyledBox>
    )
}