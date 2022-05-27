import { Avatar, Paper } from "@mui/material";
import styled from "styled-components";

const UserBox = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
}));

export default function UserInfo({ user }) {
    return (
        <UserBox>
            <Avatar src={user.avatarUrl} alt={user.login} variant="rounded"/>
            <div>
                <div className="username">{user.login}</div>
                <div className="following-details">
                    <div className="following-details--followers">{user.followers ? user.followers.totalCount : 0 } followers</div>
                    <div className="following-details--flowing">{user.following ? user.following.totalCount : 0 } flowings</div>
                </div>

            </div>
        </UserBox>
    )
}