import { createAction, createReducer, isRejected } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger = (api) => (next) => (action) => {
  if (isRejected(action)) {
      next(showError(action.error.message))
  }

  return next(action)
}

export const showError = createAction('error/showError');
export const closeError = createAction('error/closeError');

const errorReducer = createReducer({ error: null, hasError: false },
    (builder) => {
        builder.addCase(showError, (state, action) => {
            state.error = action.payload
            state.hasError = true
        })
        builder.addCase(closeError, (state, action) => {
            state.error = null
            state.hasError = false
        })
    }
)

export default errorReducer;