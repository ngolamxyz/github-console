import { Box, CircularProgress, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { queryFollowers, queryNextPageFollowers, setFromServerFollowers, toggleFollowUser } from "../reducers/detailReducer";
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
        if (followers.fromServer) {
            dispatch(setFromServerFollowers())
            return;
        }
        dispatch(queryFollowers({ login: username }));
    }, [username]);

    const items = followers.items.map(item => {
        return (
            <Grid item key={item.id + item.createdAt} xs={12} sm={6} md={4}>
                <UserInfo info={item}
                onClick={() => history.push(`/users/${item.login}`)}
                onToggleFollowing={() => dispatch(toggleFollowUser(item))}/>
            </Grid>
        );
    });
    return (
        <Container>
            <Grid container spacing={1}>
                {items}
                {(followers.loading || followers.pageInfo.hasNextPage) && (
                    <Box ref={sentryRef} sx={{display: 'flex', justifyContent: 'center', width: "100%"}}><CircularProgress/></Box>
                )}
            </Grid>
        </Container>
            
    );
}
