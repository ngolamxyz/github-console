import { Stack, Switch, Tooltip, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from "react-router-dom";

const label = { inputProps: { 'aria-label': 'Toggle dark mode' } };

export default function Header(props) {
  const history = useHistory()
  return (
    <Stack direction={"row"} justifyContent="space-between" sx={{margin: "20px 0"}}>
        { props.title 
          ? <Typography variant="h5" fontWeight={"700"}>{props.title}</Typography>
          : <HomeIcon fontSize="large" onClick={() => history.push('/')} sx={{ cursor: "pointer"}}/>}
        <Tooltip title="Toggle dark mode" arrow>
            <Switch {...label} />
        </Tooltip>
    </Stack>
  )
}