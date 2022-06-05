import { Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { queryFavorites, queryNextPageFavorite } from "../reducers/favoriteReducer";
import Footer from "./Footer";
import Header from "./Header";
import UserInfo from "./UserInfo";
import PeopleIcon from '@mui/icons-material/People';
import useInfiniteScroll from "react-infinite-scroll-hook";

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
    const users = favorite.items.map(user => {
        return (
            <Grid item key={ user.id } xs={6}>
                <UserInfo info={ user }
                onClick={() => history.push(`/users/${user.login}`)}
                afterToggle={() => dispatch(queryFavorites())}/>
            </Grid>
        )
    })

    return (
        <Stack maxWidth="md" height={'100vh'}>
            <Header title="Search"/>
            <Stack justifyContent="center" ref={rootRef} mx={{marginBottom: "auto"}}>
                {users.length > 0
                    ?<Grid container spacing={2} ref={rootRef} sx={{
                        maxHeight: 700,
                        padding: "0 0 10px 0",
                        overflow: "auto"}}>
                        {users}
                        {(favorite.loading || favorite.pageInfo.hasNextPage) && (
                            <div ref={sentryRef}>
                                <h2>Loading....</h2>
                            </div>
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