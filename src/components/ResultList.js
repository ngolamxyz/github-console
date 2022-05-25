import { List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";


export default function ResultList() {
    const users = useSelector(state => state.users.items)
    const listItems = users.map(user =>
        <ListItem key={user.id}>{user.login}</ListItem>
        )
    return (
        <List>
            {listItems}
        </List>
    )
}