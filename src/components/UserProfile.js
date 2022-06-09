import { Avatar, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { queryUserDetail, setFromServerUserDetail } from "../reducers/detailReducer";
import LocationCityIcon from '@mui/icons-material/LocationCity';

export function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { username } = useParams();

    useEffect(() => {
        if (user.userDetail.fromServer) {
            dispatch(setFromServerUserDetail())
            return;
        }
        dispatch(queryUserDetail(username));
    }, [username]);
    return (
        <>
            <Stack alignItems="center" spacing={1}>
                <Avatar src={user.userDetail.avatarUrl} sx={{ width: 160, height: 160 }}/>
                <h2>{user.userDetail.name}</h2>
                <p>{user.userDetail.login}</p>
                {user.userDetail.location &&
                    <Stack direction={"row"} spacing={1}>
                        <LocationCityIcon fontSize="large"/>
                        <p>{user.userDetail.location}</p>
                    </Stack>}
            </Stack>
        </>
    );
}
