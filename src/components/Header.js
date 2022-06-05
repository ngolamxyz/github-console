import { Container, Stack, Switch, Tooltip } from "@mui/material";

const label = { inputProps: { 'aria-label': 'Toggle dark mode' } };

export default function Header(props) {
    return (
      <Stack direction={"row"} justifyContent="space-between" sx={{margin: "20px 0"}}>
          <h2>{props.title}</h2>
          <Tooltip title="Toggle dark mode" arrow>
              <Switch {...label} />
          </Tooltip>
      </Stack>
    )
}