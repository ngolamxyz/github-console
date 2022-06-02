import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryRepos } from "../reducers/detailReducer";
import RepoInfo from "./RepoInfo";


export default function Repositories({ username }) {
    const dispatch = useDispatch();
    const repos = useSelector(state => state.user.repositories);

    useEffect(() => {
        dispatch(queryRepos(username));
    }, []);

    const items = repos.items.map(item => {
        return (
            <Grid item key={item.id} xs={6}>
                <RepoInfo info={item} />
            </Grid>
        );
    });
    return (
        <Grid container spacing={2}>
            {items}
        </Grid>
    );
}
