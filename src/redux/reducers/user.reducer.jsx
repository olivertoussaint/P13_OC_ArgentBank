import { GET_USERPROFILE, EDIT_USERNAME, LOGOUT } from "../actions/type.actions";

/* Initial user state */
const initialState = {
    status: 'VOID',
    userData: {},
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERPROFILE_LOADING':
            return {
                ...state,
                status: 'LOADING',
            };

        case GET_USERPROFILE:
            return {
                ...state,
                status: 'SUCCEEDED',
                userData: action.payload,
                error: null,
            };

        case 'FETCH_USERPROFILE_FAILED':
            return {
                ...state,
                status: 'FAILED',
                error: action.payload,
            };

        case EDIT_USERNAME: 
            return {
                ...state,
                status: 'MODIFIED',
                userData: {
                    ...state.userData,
                    username: action.payload,
                },
                error: null,
            };

        case 'EDIT_USERNAME_FAILED':
            return {
                ...state,
                status: 'FAILED',
                error: action.payload,
            };

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};
