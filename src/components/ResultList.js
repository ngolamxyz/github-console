import { Grid, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { queryUsers } from "../reducers/usersReducer";
import { ITEMS_PER_PAGE, MAX_PAGES } from "../utils/contants";
import UserInfo from "./UserInfo";

export default function ResultList() {
    const usersData = useSelector(state => state.users)
    const dispath = useDispatch()
    const numberOfPages = Math.min(Math.ceil(parseInt(usersData.userCount)/ITEMS_PER_PAGE), MAX_PAGES)
    const gridItems = usersData.items.map(user =>
        <Grid item key={ user.id } xs={6}>
            <UserInfo user={ user } />
        </Grid>
        )
    const handlePaging = (event, pageNumber) => {
        dispath(queryUsers(pageNumber))
    }
    return (
        <>
            {gridItems.length > 0
                ?  <Grid container spacing={2}>
                    {gridItems}
                   </Grid>
                : <div>
                    <svg>
                        <use xlinkHref="/imgs/sprite.svg#lookup-icon"/>
                    </svg>
                    <p>No search result found for</p>
                    <strong>{usersData.search_query}</strong>
                </div>
            }
            <Pagination count={numberOfPages} variant="outlined" shape="rounded" onChange={handlePaging}/>
        </>
    )
}