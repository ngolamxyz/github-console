import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BottomNavigation, BottomNavigationAction, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from 'react-router-dom';

export default function Footer() {
    const [value, setValue] = useState(0);
    const history = useHistory()
    const { path } = useRouteMatch();

    useEffect(() => {
        if (path === '/') {
            setValue(0)
        } else if (path === '/liked') {
            setValue(1)
        }
    }, [])

    return (
        <Container maxWidth="md" sx={{height: '72px', boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.05)"}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    if (newValue === 0) {
                        history.push('/')
                    } else {
                        history.push('/liked')
                    }


                }}
                sx={{justifyContent: "space-between"}}
                >
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Favorite" icon={<FavoriteIcon />} />
            </BottomNavigation>
        </Container> 
    )
}