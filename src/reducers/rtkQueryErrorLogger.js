import { isRejected } from '@reduxjs/toolkit';
import { showError } from './errorsHandler';


export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    if (isRejected(action)) {
        next(showError(action.error.message));
    }

    return next(action);
};
