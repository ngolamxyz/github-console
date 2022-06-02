import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CATEGORY } from "../utils/enums";

export function Category() {
    const dispatch = useDispatch();
    const params = useParams();
    const { category } = params;
    console.log("CATEGORY: ", category);
    const Comp = CATEGORY[category].component;
    useEffect(() => {
        dispatch(CATEGORY[category].action);
    }, []);
    console.log(CATEGORY[category].stateName);
    const state = useSelector(state => state.user[CATEGORY[category].stateName]);
    const items = state.items.map(item => {
        return (
            <Grid item key={item.id} xs={6}>
                <Comp info={item} />
            </Grid>
        );
    });
    return (
        <Grid container spacing={2}>
            {items}
        </Grid>
    );
}
