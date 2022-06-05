import { Box, CircularProgress, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { queryFollowings, queryNextPageFollowing, setFromServerFollowing, toggleFollowUserFollowingTab } from "../reducers/detailReducer";
import UserInfo from "./UserInfo";


const Following = ({ username }) => {
    const dispatch = useDispatch();
    const following = useSelector(state => state.user.following);
    const history = useHistory()

    const [sentryRef] = useInfiniteScroll({
        loading: following.loading,
        hasNextPage: following.pageInfo.hasNextPage,
        onLoadMore: () => { 
            dispatch(queryNextPageFollowing({login: username, after: following.pageInfo.endCursor}))
        },
        // disabled: !!error,
        rootMargin: '0px 0px 400px 0px',
    });

    useEffect(() => {
        if (following.fromServer) {
            dispatch(setFromServerFollowing())
            return;
        }
        dispatch(queryFollowings(username));
    }, [username]);

    const items = following.items.map(item => {
        return (
            <Grid item key={item.id} xs={6}>
                <UserInfo info={item}
                onClick={() => history.push(`/users/${item.login}`)}
                onToggleFollowing={() => dispatch(toggleFollowUserFollowingTab(item))}/>
            </Grid>
        );
    });
    return (
        <Container>
            <Grid container spacing={2}>
                {items}
                {(following.loading || following.pageInfo.hasNextPage) && (
                    <Box ref={sentryRef} sx={{display: 'flex', justifyContent: 'center', width: "100%"}}><CircularProgress/></Box>
                )}
            </Grid>
        </Container>
    );
}

export default Following