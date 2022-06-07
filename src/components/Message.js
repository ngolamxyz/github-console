import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeError } from "../reducers/errorsHandler";

export default function Message() {
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const handleClose = function() {
        dispatch(closeError())
    }
    return (
        <Snackbar open={error.hasError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>{error.error}</Alert>
        </Snackbar>
    )
}