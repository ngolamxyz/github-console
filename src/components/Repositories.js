import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDispatch, useSelector } from "react-redux";
import { queryNextPageRepos, queryRepos } from "../reducers/detailReducer";
import RepoInfo from "./RepoInfo";


export default function Repositories({ username }) {
    const dispatch = useDispatch();
    const repos = useSelector(state => state.user.repositories);

    const [sentryRef] = useInfiniteScroll({
        loading: repos.loading,
        hasNextPage: repos.pageInfo.hasNextPage,
        onLoadMore: () => { 
            dispatch(queryNextPageRepos({login: username, after: repos.pageInfo.endCursor}))
        },
        // disabled: !!error,
        rootMargin: '0px 0px 400px 0px',
    });

    useEffect(() => {
        dispatch(queryRepos(username));
    }, [username]);

    const items = repos.items.map(item => {
        return (
            <Grid item key={item.id} xs={6}>
                <RepoInfo info={item} />
            </Grid>
        );
    });
    return (
        <Container>
            <Grid container spacing={2}>
                {items}
                {(repos.loading || repos.pageInfo.hasNextPage) && (
                    <Grid item ref={sentryRef}>
                        <h2>Loading....</h2>
                    </Grid>
                )}
            </Grid>
        </Container>
        
    );
}
