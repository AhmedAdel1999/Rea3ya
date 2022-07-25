import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialInstance } from '../../utils/instanceUrl';

const initialState = {
  value: 0,
  status: 'idle',
  isSuccess:false,
  isLoading:false,
  isError:false,
  successMsg:'',
  errorMsg:'',
  allTransactions:[],
  userTransactions:[]
};


export const createTransactions = createAsyncThunk(
  'transactions/createTransactions',
  async(obj,{rejectWithValue,fulfillWithValue})=>{
    try {
      let res = await initialInstance.post(`transactions`,obj.values,{
        headers:{
            token:`${obj.token}`
        }
      })
      return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getAllTransactions = createAsyncThunk(
    'transactions/getAllTransactions',
    async(undefined,{rejectWithValue,fulfillWithValue})=>{
      try {
        let res = await initialInstance.get(`transactions`)
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      }
    }
)

export const getUserTransactions = createAsyncThunk(
    'transactions/getUserTransactions',
    async(id,{rejectWithValue,fulfillWithValue})=>{
      try {
        let res = await initialInstance.get(`transactions/${id}`)
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      }
    }
)


export const TransactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
   clearTransactionsState:((state)=>{
     state.isError=false;
     state.isLoading=false;
     state.isSuccess=false;
     state.successMsg=''
     state.errorMsg=''
   })
  },
  extraReducers:{
    //create Transactions
    [createTransactions.pending]:((state)=>{
        state.isLoading=true
    }),
    [createTransactions.fulfilled]:((state)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.successMsg=`payment done successfully`
    }),
    [createTransactions.rejected]:((state)=>{
        state.isLoading=false;
        state.isError=true;
        state.errorMsg=`payment failed`
    }),

    //get all Transactions
    [getAllTransactions.fulfilled]:((state,action)=>{
        state.allTransactions=[...action.payload]
    }),

    //get user Transactions
    [getUserTransactions.fulfilled]:((state,action)=>{
        state.allTransactions=[...action.payload]
    }),
  }
});

export const { clearTransactionsState } = TransactionsSlice.actions;
export default TransactionsSlice.reducer;
