import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})

export const addItem = item => ({
    type: UserActionTypes.ADD_ITEM,
    payload: item
})