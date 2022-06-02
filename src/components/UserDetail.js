import { Stack } from "@mui/material"
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import { Category } from "./Category"
import { UserProfile } from "./UserProfile"

export default function UserDetail() {
    let { path, url } = useRouteMatch()
    return (
        <Stack>
            <UserProfile/>
            <Switch>
                <Route path={path} exact render={() => <Redirect to={`${url}/repositories`}/>}/>
                <Route path={`${path}/:category`} exact component={Category}/>
            </Switch>
        </Stack>
    )
}