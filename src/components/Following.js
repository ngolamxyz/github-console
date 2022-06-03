import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { queryFollowings } from "../reducers/detailReducer";
import UserInfo from "./UserInfo";


const Following = ({ username }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const history = useHistory()

    useEffect(() => {
        dispatch(queryFollowings(username));
    }, []);

    const items = user.following.items.map(item => {
        return (
            <Grid item key={item.id} xs={6}>
                <UserInfo info={item}
                onClick={() => history.push(`/users/${item.login}`)}
                afterToggle={() => dispatch(queryFollowings(username))}/>
            </Grid>
        );
    });
    return (
        <Grid container spacing={2}>
            {items}
        </Grid>
    );
}

export default Following