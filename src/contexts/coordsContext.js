import { createContext, useReducer, useContext } from 'react';

const initialState = {
    coords: { latitude: 0, longitude: 0 },
};

const coordsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COORDS':
            const { latitude, longitude } = action.coords;
            localStorage.coords = JSON.stringify({
                coords: { latitude, longitude },
            });
            return {
                ...state,
                coords: action.coords,
            };
        default:
            throw new Error(`UnHandled action type : ${action.type}`);
    }
};

const CoordsStateContext = createContext(null);
const CoordsDispatchContext = createContext(null);

export const CoordsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(coordsReducer, initialState);
    return (
        <CoordsStateContext.Provider value={state}>
            <CoordsDispatchContext.Provider value={dispatch}>
                {children}
            </CoordsDispatchContext.Provider>
        </CoordsStateContext.Provider>
    );
};

export const useCoordsState = () => {
    const state = useContext(CoordsStateContext);
    if (!state) throw new Error('cannot find CoordsProvider');
    return state;
};

export const useCoordsDispatch = () => {
    const dispatch = useContext(CoordsDispatchContext);
    if (!dispatch) throw new Error('cannot find CoordsProvider');
    return dispatch;
};
