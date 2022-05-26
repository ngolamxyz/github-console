import { Avatar, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";

const UserBox = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
}));

export default function UserInfo({ user }) {
    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState({})

    useEffect(() => {
        let cancel = false;
        setLoading(true)
        window.octokit.request(`GET /users/${user.login}`).then((response) => {
            if (cancel) return;
            setDetail(response.data)
            setLoading(false)
        })
        return () => {
            cancel = true
        }
    }, [])

    return (
        <UserBox>
            <Avatar src={user.avatar_url} alt={user.login} variant="rounded"/>
            <div>
                <div className="username">{user.login}</div>
                <div className="following-details">
                    <div className="following-details--followers">{ detail ? detail.followers : "" } followers</div>
                    <div className="following-details--flowing">{ detail ? detail.following : ""} flowings</div>
                </div>

            </div>
        </UserBox>
    )


}