import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryFavorites } from "../reducers/favoriteReducer";
import Footer from "./Footer";
import Header from "./Header";
import UserInfo from "./UserInfo";

export default function Favorite() {
    const dispatch = useDispatch()
    const favorite = useSelector(state => state.favorite)
    let users = [];
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
            </div>

            <Footer/>
        </>
    )
}