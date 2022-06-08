import { Stack } from "@mui/material"
import { useSelector } from "react-redux"
import { NavLink , Redirect, Route, Switch, useParams, useRouteMatch } from "react-router-dom"
import styled from "@emotion/styled"
import nFormatter from "../utils/nFormatter"
import Followers from "./Followers"
import Following from "./Following"
import Header from "./Header"
import Repositories from "./Repositories"
import { UserProfile } from "./UserProfile"
import PageNotFound from "./PageNotFound"


const Div = styled.div`
    a:link, a:visited, a:hover, a:active {
        text-decoration: none;
        pointer: cursor;
        color: currentColor;
        padding: 10px 20px 10px 20px;
        &.active {
            color: \#1976D2;
            border-bottom: 2px solid \#1976D2;
        }
    }
    .category-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 1;
    }
`



export default function UserDetail() {
    let { path, url } = useRouteMatch()
    const params = useParams()
    const user = useSelector(state => state.user.userDetail)
    const { username } = params
    return (
        <Div>
        <Header/>
        <Stack sx={{
            marginBottom: '3rem'
        }}>
            <UserProfile/>
            <Stack direction="row" spacing={2} justifyContent="center" style={{textTransform: 'uppercase'}}>
                <NavLink to={`/users/${username}/repositories`} activeClassName="active">
                    <div className="category-link">
                        <span>Repositories</span>
                        <span>({nFormatter(user.repositories.totalCount)})</span>
                    </div>
                </NavLink>
                <NavLink to={`/users/${username}/followers`} activeClassName="active">
                    <div className="category-link">
                        <span>Followers</span>
                        <span>({nFormatter(user.followers.totalCount)})</span>
                    </div>
                </NavLink>
                <NavLink to={`/users/${username}/following`} activeClassName="active">
                    <div className="category-link">
                        <span>Followings</span>
                        <span>({nFormatter(user.following.totalCount)})</span>
                    </div>
                    
                </NavLink>

            </Stack>
        </Stack>
        <Switch>
            <Route path={path} exact render={() => <Redirect to={`${url}/repositories`}/>}/>
            <Route path={`${path}/repositories`} exact render={() => <Repositories username={username}/>}/>
            <Route path={`${path}/followers`} exact component={() => <Followers username={username}/>}/>
            <Route path={`${path}/following`} exact component={() => <Following username={username}/>}/>
            <Route path='*'>
                <PageNotFound/>
            </Route>
        </Switch>
        </Div>
    )
}