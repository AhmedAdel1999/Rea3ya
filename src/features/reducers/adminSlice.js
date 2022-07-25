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
  allAdmins:[]
};


export const AddAdmins = createAsyncThunk(
  'admin/AddAdmins',
  async(obj,{rejectWithValue,fulfillWithValue})=>{
    try {
      const res= await adminInstance.post(`admins/`,obj)
      return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    } 
  }
)

export const EditAdmin = createAsyncThunk(
    'admin/EditAdmin',
    async(obj,{rejectWithValue,fulfillWithValue})=>{
      try {
        const res= await adminInstance.patch(`admins/${obj.id}`,obj.values)
        console.log(res)
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      } 
    }
)

export const DeleteAdmin = createAsyncThunk(
    'admin/DeleteAdmin',
    async(id,{rejectWithValue,fulfillWithValue})=>{
      try {
        const res= await adminInstance.delete(`admins/${id}`)
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      } 
    }
)

export const AllOFAdmins = createAsyncThunk(
    'admin/AllOFAdmins',
    async(undefined,{rejectWithValue,fulfillWithValue})=>{
      try {
        const res= await adminInstance.get(`admins/`)
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      } 
    }
  )

export const AdminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
   clearAdminState:((state)=>{
     state.isError=false;
     state.isLoading=false;
     state.isSuccess=false;
     state.successMsg=''
     state.errorMsg=''
   }),
  },
  extraReducers:{
    //add new admin
    [AddAdmins.pending]:((state)=>{
        state.isLoading=true
    }),
    [AddAdmins.fulfilled]:((state)=>{
        state.isLoading=false
        state.isSuccess=true
        state.successMsg=`you have added anew admin`
    }),
    [AddAdmins.rejected]:((state)=>{
        state.isLoading=false
        state.isError=true
    }),

    //edit admin
    [EditAdmin.pending]:((state)=>{
        state.isLoading=true
    }),
    [EditAdmin.fulfilled]:((state)=>{
        state.isLoading=false
        state.isSuccess=true
        state.successMsg=`you have update admin`
    }),
    [EditAdmin.rejected]:((state)=>{
        state.isLoading=false
        state.isError=true
    }),

    //delete admin
    [DeleteAdmin.fulfilled]:((state)=>{
        state.isSuccess=true
        state.successMsg='admin deleted successfully'
    }),

    //get all admins
    [AllOFAdmins.fulfilled]:((state,action)=>{
        state.allAdmins=[...action.payload.admins]
    }),
  }
});

export const { clearAdminState } = AdminSlice.actions;
export default AdminSlice.reducer;
