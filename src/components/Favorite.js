import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { queryFavorites, queryNextPageFavorite, setFromServer, unFollowUser } from "../reducers/favoriteReducer";
import Footer from "./Footer";
import Header from "./Header";
import UserInfo from "./UserInfo";
import PeopleIcon from '@mui/icons-material/People';
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useEffect } from "react";

export default function Favorite() {
    const dispatch = useDispatch()
    const history = useHistory()
    const favorite = useSelector(state => state.favorite)
    const [sentryRef, { rootRef }] = useInfiniteScroll({
        loading: favorite.loading,
        hasNextPage: favorite.pageInfo.hasNextPage,
        onLoadMore: () => { 
            dispatch(queryNextPageFavorite(favorite.pageInfo.endCursor))
        },
        // disabled: !!error,
        rootMargin: '0px 0px 200px 0px',
    });
    useEffect(() => {
        if (favorite.fromServer) {
            dispatch(setFromServer())
            return;
        }
        dispatch(queryFavorites())
    }, [])

    const users = favorite.items.map(user => {
        return (
            <Grid item key={ user.id } xs={6}>
                <UserInfo info={ user }
                onClick={() => history.push(`/users/${user.login}`)}
                onToggleFollowing={() => dispatch(unFollowUser(user))}/>
            </Grid>
        )
    })

    return (
        <Stack maxWidth="md" height={'100vh'}>
            <Header title="Favorite"/>
            <Stack justifyContent="center" ref={rootRef} mx={{marginBottom: "auto"}}>
                {users.length > 0
                    ?<Grid container spacing={2} ref={rootRef} sx={{
                        maxHeight: 700,
                        padding: "0 0 10px 0",
                        overflow: "auto"}}>
                        {users}
                        {(favorite.loading || favorite.pageInfo.hasNextPage) && (
                            <Box ref={sentryRef} sx={{display: 'flex', justifyContent: 'center', width: "100%"}}><CircularProgress/></Box>
                        )}
                    </Grid>
                    : <Stack color={"#8b8a8b"} alignItems="center" justifyContent={"center"}>
                        <PeopleIcon sx={{width: "36px", height: "36px", flex: "1"}}/>
                        <p>Once you like people, you'll see them here.</p>
                    </Stack> 
                }
            </Stack>
            <Footer/>
        </Stack>
    )
}