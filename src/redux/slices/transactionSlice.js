import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTransactions as fetchTransactionsApi } from '../services/ApiService';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (accountId, { rejectWithValue }) => {
    try {
      const jwtToken = localStorage.getItem('token');
      const data = await fetchTransactionsApi(accountId, jwtToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTransactions: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;


