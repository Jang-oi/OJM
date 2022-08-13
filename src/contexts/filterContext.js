import { createContext, useReducer, useContext } from 'react';
import { filterInitialState } from '../utils/setting';

const initialState = {
    // anchor 값 top, bottom, left, right 로 위치 조정 가능
    anchorState: { left: false },
    filterCategory: {
        food: filterInitialState.food,
        distance: filterInitialState.distance,
    },
};

const filterReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_FILTER':
            return {
                ...state,
                filterCategory: initialState.filterCategory,
            };
        case 'SET_FILTER_FOOD_CATEGORY':
            return {
                ...state,
                filterCategory: {
                    ...state.filterCategory,
                    food: action.food,
                },
            };
        case 'SET_FILTER_DISTANCE':
            return {
                ...state,
                filterCategory: {
                    ...state.filterCategory,
                    distance: action.distance,
                },
            };
        case 'SET_ANCHOR_STATE':
            return {
                ...state,
                anchorState: action.anchorState,
            };
        default:
            throw new Error(`UnHandled action type : ${action.type}`);
    }
};

const FilterStateContext = createContext(null);
const FilterDispatchContext = createContext(null);

export const FilterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, initialState);
    return (
        <FilterStateContext.Provider value={state}>
            <FilterDispatchContext.Provider value={dispatch}>{children}</FilterDispatchContext.Provider>
        </FilterStateContext.Provider>
    );
};

export const useFilterState = () => {
    const state = useContext(FilterStateContext);
    if (!state) throw new Error('cannot find FilterProvider');
    return state;
};

export const useFilterDispatch = () => {
    const dispatch = useContext(FilterDispatchContext);
    if (!dispatch) throw new Error('cannot find FilterProvider');
    return dispatch;
};
