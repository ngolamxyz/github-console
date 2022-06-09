import { Paper, Stack, Typography } from "@mui/material";
export default function RepoInfo({ info }) {
    return (
        <Paper sx={{
            "&.MuiPaper-rounded": {
                borderRadius: "15px"
            }
        }}>
            <Stack justifyContent={"space-between"} sx={{
                padding: "10px",
                height: "90px"
            }}>
                <Typography sx={{
                    fontWeight: "700",
                    lineHeight: "24px",
                }}>{info.name}</Typography>
                <Stack>
                    <Typography fontSize={"12px"} fontWeight="normal" lineHeight="16px">{ info.stargazerCount } stars</Typography>
                    <Typography fontSize={"12px"} fontWeight="normal" lineHeight="16px">{ info.forkCount } forks</Typography>
                </Stack>

            </Stack>
        </Paper>
    )

}