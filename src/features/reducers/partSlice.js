import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminInstance } from '../../utils/instanceUrl';

const initialState = {
  value: 0,
  status: 'idle',
  isSuccess:false,
  isLoading:false,
  isError:false,
  successMsg:'',
  errorMsg:'',
  allParts:[]
};


export const AddParts = createAsyncThunk(
    'part/AddParts',
    async(obj,{rejectWithValue,fulfillWithValue})=>{
      try {
        const res= await adminInstance.post(`types`,obj.values,{
            headers:{token:`${obj.token}`}
        })
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      } 
    }
)

export const EditPart = createAsyncThunk(
    'part/EditPart',
    async(obj,{rejectWithValue,fulfillWithValue})=>{
      try {
        const res= await adminInstance.patch(`types/${obj.id}`,obj.values,{
            headers:{token:`${obj.token}`}
        })
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      } 
    }
)

export const DeletePart = createAsyncThunk(
    'part/DeletePart',
    async(obj,{rejectWithValue,fulfillWithValue})=>{
      try {
        const res= await adminInstance.delete(`types/${obj.id}`,{
            headers:{token:`${obj.token}`}
        })
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      } 
    }
)

export const AllOFParts = createAsyncThunk(
    'part/AllOFParts',
    async(undefined,{rejectWithValue,fulfillWithValue})=>{
      try {
        const res= await adminInstance.get(`types`)
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      } 
    }
)


export const PartSlice = createSlice({
  name: 'part',
  initialState,
  reducers: {
   clearPartState:((state)=>{
     state.isError=false;
     state.isLoading=false;
     state.isSuccess=false;
     state.successMsg=''
     state.errorMsg=''
   }),
  },
  extraReducers:{
    //add part
    [AddParts.pending]:((state)=>{
        state.isLoading=true;
    }),
    [AddParts.fulfilled]:((state)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.successMsg="a new part has been created"
    }),
    [AddParts.rejected]:((state)=>{
        state.isLoading=false;
        state.isError=true;
        state.errorMsg="failed to create new part"
    }),

     //edit admin
     [EditPart.pending]:((state)=>{
        state.isLoading=true
    }),
    [EditPart.fulfilled]:((state)=>{
        state.isLoading=false
        state.isSuccess=true
        state.successMsg=`you have update part`
    }),
    [EditPart.rejected]:((state)=>{
        state.isLoading=false
        state.isError=true
    }),

    //delete admin
    [DeletePart.fulfilled]:((state)=>{
        state.isSuccess=true
        state.successMsg='part deleted successfully'
    }),

    //get all parts
    [AllOFParts.fulfilled]:((state,action)=>{
        state.allParts=[...action.payload]
    })
  }
});

export const { clearPartState } = PartSlice.actions;
export default PartSlice.reducer;
