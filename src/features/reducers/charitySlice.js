import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialInstance } from '../../utils/instanceUrl';

const initialState = {
  status: 'idle',
  isSuccess:false,
  isLoading:false,
  isError:false,
  successMsg:'',
  errorMsg:'',
  allCharities:[]
};

export const createCharity = createAsyncThunk(
  'charity/createCharity',
  async(obj,{fulfillWithValue,rejectWithValue})=>{
    try {
      const res = await initialInstance.post('charity',obj.values,{
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

export const updateCharity = createAsyncThunk(
  'charity/updateCharity',
  async(obj,{fulfillWithValue,rejectWithValue})=>{
    try {
      const res = await initialInstance.patch(`charity/${obj.id}`,obj.values,{
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

export const deleteCharity = createAsyncThunk(
  'charity/deleteCharity',
  async(obj,{fulfillWithValue,rejectWithValue})=>{
    try {
      const res = await initialInstance.delete(`charity/${obj.id}`,{
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

export const AllCharities = createAsyncThunk(
  'charity/AllCharities',
  async(obj,{fulfillWithValue,rejectWithValue})=>{
    try {
      const res = await initialInstance.get('charity')
      return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const CharityrSlice = createSlice({
  name: 'charity',
  initialState,
  reducers: {
    clearCharityState:((state)=>{
      state.isError=false;
      state.isLoading=false;
      state.isSuccess=false;
      state.successMsg=''
      state.errorMsg=''
    }),
  },
  extraReducers:{
    //create charity
    [createCharity.pending]:((state)=>{
      state.isLoading=true
    }),
    [createCharity.fulfilled]:((state)=>{
      state.isSuccess=true
      state.successMsg='you have successfully create new charity'
    }),
    [createCharity.rejected]:((state,action)=>{
      state.isError=true
      state.isLoading=false
      state.errorMsg=`${action.payload}`
    }),

    //update charity
    [updateCharity.pending]:((state)=>{
      state.isLoading=true
    }),
    [updateCharity.fulfilled]:((state)=>{
      state.isSuccess=true
      state.successMsg='you have successfully update charity'
    }),
    [updateCharity.rejected]:((state,action)=>{
      state.isError=true
      state.isLoading=false
      state.errorMsg=`${action.payload}`
    }),

    //delete charity
    [deleteCharity.fulfilled]:((state)=>{
      state.isSuccess=true
      state.successMsg=`charity deleted successfully`
    }),

    //get all charity
    [AllCharities.fulfilled]:((state,action)=>{
      state.allCharities=[...action.payload]
    })
  }
});

export const { clearCharityState } = CharityrSlice.actions;
export default CharityrSlice.reducer;
