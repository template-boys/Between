import { combineReducers } from 'redux';
import { v4 as UUIDGenerate } from 'uuid';

const INITIAL_STATE = {
    sessionID: UUIDGenerate(),
};

const testReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_AUTO_COMPLETE_SESSION_ID':
            return {
                sessionID: UUIDGenerate(),
            }
        default:
            return state
    }
};

export default combineReducers({
    testReducer: testReducer
});