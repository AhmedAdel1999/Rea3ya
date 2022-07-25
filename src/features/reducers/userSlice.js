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
  token:null,
  role:null,
  userData:{},
  allUsers:[]
};


export const login = createAsyncThunk(
  'user/login',
  async(obj,{rejectWithValue,fulfillWithValue})=>{
    try {
      let res = await initialInstance.post(`login`,obj)
      return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const register = createAsyncThunk(
  'user/register',
  async(obj,{rejectWithValue,fulfillWithValue})=>{
    try {
      const res= await initialInstance.post(`users`,obj) 
      return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    } 
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async(obj,{rejectWithValue,fulfillWithValue})=>{
    try {
      const res= await initialInstance.patch(`users/${obj.id}`,obj.value)
      console.log(res.data)
      return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    } 
  }
)

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async(undefined,{rejectWithValue,fulfillWithValue})=>{
    try {
      const res= await initialInstance.get(`users/`)
      return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    } 
  }
)

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   clearUserState:((state)=>{
     state.isError=false;
     state.isLoading=false;
     state.isSuccess=false;
     state.successMsg=''
     state.errorMsg=''
   }),
   logout:((state)=>{
     state.token=null;
     state.role=null;
     state.userData={}
   })
  },
  extraReducers:{
    //register dispatching
    [register.pending]:((state)=>{
      state.isLoading=true;
    }),
    [register.fulfilled]:((state,action)=>{
      state.isSuccess=true;
      state.isLoading=false
      if(action.payload.user.link_){
        state.userData={...action.payload.user.resault,link:action.payload.user.resault.link_}
        state.role=action.payload.user.resault.role;
        state.token=action.payload.token
      }else{
        state.userData={...action.payload.user}
        state.role=action.payload.user.role;
        state.token=action.payload.token
      }      
      state.successMsg=`you have created new account`
    }),
    [register.rejected]:((state,action)=>{
      state.isError=true;
      state.isLoading=false
      state.errorMsg=`${action.payload.message}`
    }),

    //login dispatching
    [login.pending]:((state)=>{
      state.isLoading=true;
    }),
    [login.fulfilled]:((state,action)=>{
      console.log(action.payload)
      state.isSuccess=true;
      if(action.payload?.link){
        state.userData={...action.payload.user,...action.payload.link}
      }else{
        state.userData=action.payload.user
      }
      state.role=action.payload?.user?.role || action.payload.role;
      state.token=action.payload.token
      state.successMsg=`you have login successfully`
    }),
    [login.rejected]:((state,action)=>{
      state.isError=true;
      state.isLoading=false;
      state.errorMsg=`${action.payload.message}`
    }),

    //update user dispatching
    [updateUser.pending]:((state)=>{
      state.isLoading=true;
    }),
    [updateUser.fulfilled]:((state,action)=>{
        state.isSuccess=true;
        state.isLoading=false;
        if(action.payload.user?.resualt){
          state.userData={...action.payload.user.resualt,...action.payload.user.link_}
        }else{
          state.userData={...action.payload.user}
        }
        state.successMsg=`profile updated successfully`
    }),
    [updateUser.rejected]:((state,action)=>{
      state.isError=true;
      state.isLoading=false;
      state.errorMsg=`${action.payload.message}`
    }),

    //get all users
    [getAllUsers.fulfilled]:((state,action)=>{
      state.allUsers=[...action.payload.users]
    })
  }
});

export const { clearUserState,logout } = UserSlice.actions;
export default UserSlice.reducer;
