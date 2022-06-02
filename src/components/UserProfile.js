import { Avatar, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { queryUserDetail } from "../reducers/detailReducer";

export function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { username } = useParams();

    useEffect(() => {
        if (!user.userDetail.login) {
            dispatch(queryUserDetail(username));
        }
    }, []);
    return (
        <>
            {user.userDetail
                ? <Stack>
                    <Avatar src={user.userDetail.avatarUrl} />
                    <h2>{user.userDetail.name}</h2>
                    <p>{user.userDetail.login}</p>
                    <Stack direction="row">
                        <svg>
                            <use xlinkHref="/imgs/sprite.svg#location-icon" />
                        </svg>
                        <p>{user.userDetail.location}</p>
                    </Stack>
                </Stack>
                : ''}
        </>
    );
}
