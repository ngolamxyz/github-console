import { Switch, Tooltip } from "@mui/material";

const label = { inputProps: { 'aria-label': 'Toggle dark mode' } };
export default function Header(props) {
    return (
        <>
            <h2>{props.title}</h2>
            <div className="header-darkmode">
                <Tooltip title="Toggle dark mode" arrow>
                    <Switch {...label} />
                </Tooltip>
            </div>
        </>
    )
}