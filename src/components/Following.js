import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import { queryFollowings, queryNextPageFollowing } from "../reducers/detailReducer";
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
        dispatch(queryFollowings(username));
    }, [username]);

    const items = following.items.map(item => {
        return (
            <Grid item key={item.id} xs={6}>
                <UserInfo info={item}
                onClick={() => history.push(`/users/${item.login}`)}
                afterToggle={() => dispatch(queryFollowings(username))}/>
            </Grid>
        );
    });
    return (
        <Container>
            <Grid container spacing={2}>
                {items}
                {(following.loading || following.pageInfo.hasNextPage) && (
                    <Grid item ref={sentryRef}>
                        <h2>Loading....</h2>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
}

export default Following