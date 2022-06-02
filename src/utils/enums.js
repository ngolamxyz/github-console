import { FOLLOWERS_DETAILS, FOLLOWINGS_DETAILS, REPO_DETAILS } from "../api/queries";
import RepoInfo from "../components/RepoInfo";
import UserInfo from "../components/UserInfo";
import { queryFollowers, queryFollowings, queryRepos } from "../reducers/detailReducer";

export const CATEGORY = {
    repositories: {
        query: REPO_DETAILS,
        stateName: "repositories",
        action: queryRepos,
        component: RepoInfo
    },
    following: {
        query: FOLLOWINGS_DETAILS,
        stateName: "following",
        action: queryFollowings,
        component: UserInfo
    },
    followers: {
        query: FOLLOWERS_DETAILS,
        stateName: "followers",
        action: queryFollowers,
        component: UserInfo
    }
}