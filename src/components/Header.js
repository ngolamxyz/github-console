import { Stack, Switch, Tooltip, Typography, useTheme } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext } from "../ColorModeContext";

const label = { inputProps: { 'aria-label': 'Toggle dark mode' } };

export default function Header(props) {
  const history = useHistory()
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  return (
    <Stack direction={"row"} justifyContent="space-between" sx={{margin: "20px 0"}}>
        { props.title 
          ? <Typography variant="h5" fontWeight={"700"}>{props.title}</Typography>
          : <HomeIcon fontSize="large" onClick={() => history.push('/')} sx={{ cursor: "pointer"}}/>}
        <Tooltip title="Toggle dark mode" arrow>
            <Switch {...label} onChange={colorMode.toggleColorMode} checked={theme && (theme.palette.mode == 'dark')}/>
        </Tooltip>
    </Stack>
  )
}