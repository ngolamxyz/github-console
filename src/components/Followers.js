import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { queryFollowers, queryNextPageFollowers } from "../reducers/detailReducer";
import UserInfo from "./UserInfo";



export default function Followers({ username }) {
    const history = useHistory()
    const dispatch = useDispatch();
    const followers = useSelector(state => state.user.followers);

    const [sentryRef] = useInfiniteScroll({
        loading: followers.loading,
        hasNextPage: followers.pageInfo.hasNextPage,
        onLoadMore: () => { 
            dispatch(queryNextPageFollowers({login: username, after: followers.pageInfo.endCursor}))
        },
        // disabled: !!error,
        rootMargin: '0px 0px 400px 0px',
    });

    useEffect(() => {
        dispatch(queryFollowers({ login: username }));
    }, [username]);

    const items = followers.items.map(item => {
        return (
            <Grid item key={item.id} xs={6}>
                <UserInfo info={item}
                onClick={() => history.push(`/users/${item.login}`)}
                afterToggle={() => dispatch(queryFollowers({ login: username }))}/>
            </Grid>
        );
    });
    return (
        <Container>
            <Grid container spacing={2}>
                {items}
                {(followers.loading || followers.pageInfo.hasNextPage) && (
                    <Grid item ref={sentryRef}>
                        <h2>Loading....</h2>
                    </Grid>
                )}
            </Grid>
        </Container>
            
    );
}
