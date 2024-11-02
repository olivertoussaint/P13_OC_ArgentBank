import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, updateUserProfile } from '../../services/ApiService';

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
  status: 'idle',
  error: null,
};

// Thunk pour gérer la connexion
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { token, user } = await loginUser(email, password);
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk pour mettre à jour le profil utilisateur
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ token, firstName, lastName }, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUserProfile(token, { firstName, lastName });
      return updatedUser;
    } catch (error) {
      //return rejectWithValue(error.message);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      // Supprimer le token du localStorage/sessionStorage
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion du login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.status = 'succeeded';
        state.error = null;

        // Sauvegarder le token dans le localStorage pour maintenir l'authentification
  localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Gestion de la mise à jour du profil
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload, // Mise à jour du prénom et du nom de l'utilisateur
        };
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
