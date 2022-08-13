import { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import { filterInitialState } from '../utils/setting';
import { filterApply } from '../utils/common';

const initialState = {
    totalStore: null,
    store: null,
    isStoreDialog: true,
};

const storeReducer = (state, action) => {
    switch (action.type) {
        case 'GET_STORE_SUCCESS':
            return {
                ...state,
                store: action.data,
                totalStore: action.totalStore,
            };
        case 'GET_STORE_ERROR':
            return {
                ...state,
                error: action.error,
            };
        case 'SET_STORE':
            return {
                ...state,
                store: action.data,
                isStoreDialog: action.isStoreDialog,
            };
        case 'SET_STORE_DIALOG':
            return {
                ...state,
                isStoreDialog: action.isStoreDialog,
            };
        default:
            throw new Error(`UnHandled action type : ${action.type}`);
    }
};

const StoreStateContext = createContext(null);
const StoreDispatchContext = createContext(null);

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);
    return (
        <StoreStateContext.Provider value={state}>
            <StoreDispatchContext.Provider value={dispatch}>{children}</StoreDispatchContext.Provider>
        </StoreStateContext.Provider>
    );
};

export const useStoreState = () => {
    const state = useContext(StoreStateContext);
    if (!state) throw new Error('cannot find StoreProvider');
    return state;
};

export const useStoreDispatch = () => {
    const dispatch = useContext(StoreDispatchContext);
    if (!dispatch) throw new Error('cannot find StroeProvider');
    return dispatch;
};

/**
 * 가게 리스트를 가져오는 함수
 * @param dispatch
 * @param coords
 * @returns {Promise<void>}
 */
export const getStore = async (dispatch, coords) => {
    try {
        const response = await axios.get(`/test/ojm/store?searchCoord=${coords.longitude};${coords.latitude}`);
        const store = response.data.data;
        const filterApplyStore = filterApply(filterInitialState, store);
        dispatch({
            type: 'GET_STORE_SUCCESS',
            totalStore: store,
            data: filterApplyStore,
        });
    } catch (e) {
        dispatch({
            type: 'GET_STORE_ERROR',
            error: e,
        });
    }
};
