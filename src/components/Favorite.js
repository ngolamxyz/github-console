import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryFavorites } from "../reducers/favoriteReducer";
import { ITEMS_PER_PAGE, MAX_PAGES } from "../utils/contants";
import Footer from "./Footer";
import Header from "./Header";
import UserInfo from "./UserInfo";

export default function Favorite() {
    const dispatch = useDispatch()
    const favorite = useSelector(state => state.favorite)
    const [currPage, setCurrPage] = useState(1)
    let users = [];
    const numberOfPages = Math.min(Math.ceil(parseInt(favorite.totalCount)/ITEMS_PER_PAGE), MAX_PAGES)
    users = favorite.followingUsers.map(user => {
        return (
            <Grid item key={ user.id } xs={6}>
                <UserInfo user={ user } />
            </Grid>
        )
    })
    useEffect(() => {
        dispatch(queryFavorites())
        return () => { }
    }, [])
    return (
        <>
            <Header title="Search"/>
            <div className="body">
                {users.length > 0
                    ?<Grid container spacing={2}>
                        {users}
                    </Grid>
                    : <div>
                        <svg>
                            <use xlinkHref="/imgs/sprite.svg#people-icon"/>
                        </svg>
                        <p>Once you like people, you'll see them here.</p>
                    </div> 
                }
                <div>
                    <Button variant="outlined" onClick={() => {
                        setCurrPage(currPage - 1)
                        dispatch(queryFavorites("PREV"))}} disabled={currPage === 1}>Prev</Button>
                    <Button variant="outlined" onClick={() => {
                        setCurrPage(currPage + 1)
                        dispatch(queryFavorites("NEXT"))}} disabled={currPage === numberOfPages }>Next</Button>
                </div>
            </div>

            <Footer/>
        </>
    )
}