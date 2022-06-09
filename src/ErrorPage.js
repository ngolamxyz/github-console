import { Container, Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { renderToString } from "react-dom/server";

function ErrorPage({error}) {
    return (
        <Container maxWidth="md">
            <Stack sx={{
                color: "#8a8b8a",
                height: "100vh"
            }} justifyContent="center" alignItems={"center"}>
                <ErrorOutlineIcon sx={{
                    width: "100px",
                    height: "100px"
                }}/>
                <Typography variant="h3">400</Typography>
                <Typography variant="h4">{error}</Typography>
            </Stack>
        </Container>
    )
}


export default function getErrorPage(error) {

    const markup = renderToString(
        <ErrorPage error={error}/>
    )

    const html = `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Github Console</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <div id="root">${markup}</div>
        
    </body>
    </html>`
    return html;
}
