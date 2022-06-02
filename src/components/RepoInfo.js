import { Paper, Stack } from "@mui/material";
export default function RepoInfo({ info }) {
    return (
        <Paper>
            <Stack>
                <h2>{ info.name }</h2>
                <Stack>
                    <p>{ info.stargazerCount } stars</p>
                    <p>{ info.forkCount } forks</p>
                </Stack>

            </Stack>
        </Paper>
    )

}