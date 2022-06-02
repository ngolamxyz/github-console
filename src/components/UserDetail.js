import { Avatar, Grid, Paper, Stack } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Route, Switch, useParams, useRouteMatch } from "react-router-dom"
import { queryFollowers, queryFollowings, queryRepos, queryUserDetail } from "../reducers/detailReducer"
import UserInfo from "./UserInfo"

function ListRepos() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(queryRepos)
    }, [])

    const repos = useSelector(state => state.user.repositories)
    const repositories = repos.items.map(repo => {
        return (
            <Grid item key={ repo.id } xs={6}>
                <Paper>
                    <Stack>
                        <h2>{ repo.name }</h2>
                        <Stack>
                            <p>{ repo.stargazerCount } stars</p>
                            <p>{ repo.forkCount } forks</p>
                        </Stack>

                    </Stack>
                </Paper>
            </Grid>
        )
    })
    return (
        <Grid container spacing={2}>
            {repositories}
        </Grid>
    )
}

function ListFollowers() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(queryFollowers)
    }, [])

    const followers = useSelector(state => state.user.followers)
    const followersArr = followers.items.map(user => {
        return (
            <Grid item key={ user.id } xs={6}>
                <UserInfo user={user}/>
            </Grid>
        )
    })
    return (
        <Grid container spacing={2}>
            {followersArr}
        </Grid>
    )
}

function ListFollowing() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(queryFollowings)
    }, [])

    const following = useSelector(state => state.user.following)
    const followingsArr = following.items.map(user => {
        return (
            <Grid item key={ user.id } xs={6}>
                <UserInfo user={user}/>
            </Grid>
        )
    })
    return (
        <Grid container spacing={2}>
            {followingsArr}
        </Grid>
    )
}

function UserProfile() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const { username } = useParams()

    useEffect(() => {
        if(!user.userDetail.login) {
            dispatch(queryUserDetail(username))
        }
    }, [])
    return (
        <>
            {user.userDetail
                ? <Stack>
                    <Avatar src={user.userDetail.avatarUrl}/>
                    <h2>{user.userDetail.name}</h2>
                    <p>{user.userDetail.login}</p>
                    <Stack direction="row">
                        <svg>
                            <use xlinkHref="/imgs/sprite.svg#location-icon"/>
                        </svg>
                        <p>{user.userDetail.location}</p>
                    </Stack>
                </Stack>
                : ''}
            </>
    )
}

export default function UserDetail() {
    let { path, url } = useRouteMatch()
    const params = useParams()
    return (
        <Stack>
            <UserProfile/>
            <Switch>
                <Route path={path} exact render={() => <Redirect to={`${url}/repositories`}/>}/>
                <Route path={`${path}/repositories`} exact component={ListRepos}/>
                <Route path={`${path}/followers`} exact component={ListFollowers}/>
                <Route path={`${path}/following`} exact component={ListFollowing}/>
            </Switch>
        </Stack>
    )
}