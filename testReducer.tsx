import { combineReducers } from 'redux';
import { v4 as UUIDGenerate } from 'uuid';

const INITIAL_STATE = {
    sessionID: UUIDGenerate(),
};

const testReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_AUTO_COMPLETE_SESSION_ID':
            return {
                ...state,
                sessionID: UUIDGenerate(),
            }
        case 'SET_LOCATION_ONE':
            return {
                ...state,
                locationOne: action.payload,
            }
        case 'SET_LOCATION_TWO':
            return {
                ...state,
                locationTwo: action.payload,
            }
        default:
            return state
    }
};

export default combineReducers({
    testReducer: testReducer
});