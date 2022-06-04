import { Grid, Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { queryUsers } from "../reducers/usersReducer";
import { ITEMS_PER_PAGE, MAX_PAGES } from "../utils/contants";
import UserInfo from "./UserInfo";
import SearchIcon from '@mui/icons-material/Search';

export default function ResultList() {
    const usersData = useSelector(state => state.users)
    const dispatch = useDispatch()
    const history = useHistory()
    const numberOfPages = Math.min(Math.ceil(parseInt(usersData.userCount)/ITEMS_PER_PAGE), MAX_PAGES)
    const gridItems = usersData.items.map(user =>
        <Grid item key={ user.id } xs={6}>
            <UserInfo info={ user } onClick={() => history.push(`/users/${user.login}`)}/>
        </Grid>
        )
    const handlePaging = (event, pageNumber) => {
        dispatch(queryUsers(pageNumber))
    }
    return (
        <Stack alignItems={"center"}>
            {gridItems.length > 0
                ?  <Grid container spacing={2} maxWidth={"md"}>
                    {gridItems}
                   </Grid>
                : (usersData.loading &&  <Stack alignItems={"center"}>
                    <SearchIcon sx={{color: "#8a8b8a", width: 36, height: 36}}/>
                    <p>No search result found for</p>
                    <strong>{usersData.search_query}</strong>
                </Stack>)
            }
            { gridItems.length > 0 && <Pagination count={numberOfPages} variant="outlined" shape="rounded" onChange={handlePaging} sx={{marginTop: "20px"}}/> }
        </Stack>
    )
}