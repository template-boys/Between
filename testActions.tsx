export const setSessionID = () => (
    {
        type: 'SET_AUTO_COMPLETE_SESSION_ID',
    }
);

export const setLocationOne = (location) => (
    {
        type: 'SET_LOCATION_ONE',
        payload: location
    }
);

export const setLocationTwo = (location) => (
    {
        type: 'SET_LOCATION_TWO',
        payload: location
    }
);