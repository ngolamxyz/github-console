import { Container, Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function PageNotFound() {
    return (
        <Container maxWidth="md" sx={{
            display: "flex",
            direction: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }}>
            <Stack sx={{
                color: "#8a8b8a",
            }} maxWidth="md" justifyContent="center" alignItems={"center"}>
                <ErrorOutlineIcon sx={{
                    width: "100px",
                    height: "100px"
                }}/>
                <Typography variant="h3">404</Typography>
                <Typography variant="h4">Page not found</Typography>
            </Stack>
        </Container>
    )
}