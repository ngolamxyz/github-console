import { Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserInfo from "./UserInfo";
import SearchIcon from '@mui/icons-material/Search';
import { toggleFollowUser } from "../reducers/usersReducer";

export default function ResultList() {
    const usersData = useSelector(state => state.users)
    const history = useHistory()
    const dispatch = useDispatch()
    const gridItems = usersData.items.map(user =>
        <Grid item key={ user.id } xs={6}>
            <UserInfo info={ user }
             onToggleFollowing={() => dispatch(toggleFollowUser(user))}
             onClick={() => history.push(`/users/${user.login}`)}/>
        </Grid>
        )
    return (
        <Stack alignItems={"center"}>
        {gridItems.length > 0
            ?  <Grid container spacing={2} maxWidth={"md"}>
                {gridItems}
                </Grid>
            : (!usersData.loading && 
                <Stack alignItems={"center"}>
                    <SearchIcon sx={{color: "#8a8b8a", width: 36, height: 36}}/>
                    <p>No search result found for</p>
                    <strong>{usersData.search_query}</strong>
                </Stack>)
        }
        </Stack>
    )
}