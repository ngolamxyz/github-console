import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";

export default function ResultList() {
    const users = useSelector(state => state.users.items)
    const gridItems = users.map(user =>
        <Grid item key={ user.id } xs={6}>
            <UserInfo user={ user } />
        </Grid>
        )
    return (
        <Grid container spacing={2}>
            {gridItems}
        </Grid>
    )
}