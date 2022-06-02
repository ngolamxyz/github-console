import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryFollowers } from "../reducers/detailReducer";
import UserInfo from "./UserInfo";


export default function Followers({ username }) {
    const dispatch = useDispatch();
    const followers = useSelector(state => state.user.followers);

    useEffect(() => {
        dispatch(queryFollowers(username));
    }, []);

    const items = followers.items.map(item => {
        return (
            <Grid item key={item.id} xs={6}>
                <UserInfo info={item} afterToggle={() => dispatch(queryFollowers(username))}/>
            </Grid>
        );
    });
    return (
        <Grid container spacing={2}>
            {items}
        </Grid>
    );
}
