import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialInstance } from '../../utils/instanceUrl';

const initialState = {
  status: 'idle',
  isSuccess:false,
  isError:false,
  allComments:[]
};

export const createComment = createAsyncThunk(
  'comment/createComment',
  async(obj,{fulfillWithValue,rejectWithValue})=>{
    try {
      const res = await initialInstance.post(`charity/${obj.id}/comments`,{message:obj.message},{
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

export const deleteComment = createAsyncThunk(
    'comment/deleteComment',
    async(obj,{fulfillWithValue,rejectWithValue})=>{
      try {
        const res = await initialInstance.delete(`charity/${obj.id}/comments/${obj.comId}`,{
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

export const updateComment = createAsyncThunk(
    'comment/updateComment',
    async(obj,{fulfillWithValue,rejectWithValue})=>{
      try {
        const res = await initialInstance.patch(`charity/${obj.id}/comments/${obj.comId}`,{message:obj.message},{
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

export const allCharityComments = createAsyncThunk(
    'comment/allCharityComments',
    async(obj,{fulfillWithValue,rejectWithValue})=>{
      try {
        const res = await initialInstance.get(`charity/${obj.id}/comments`)
        return fulfillWithValue(res.data)
      } catch (error) {
        return rejectWithValue(error)
      }
    }
  )


export const CommentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    clearCommentState:((state)=>{
      state.isError=false;
      state.isSuccess=false;
    }),
  },
  extraReducers:{
    //create comment
    [createComment.fulfilled]:((state)=>{
        state.isSuccess=true
    }),

    //update comment
    [updateComment.fulfilled]:((state)=>{
        state.isSuccess=true
    }),

    //delete comment
    [deleteComment.fulfilled]:((state)=>{
        state.isSuccess=true
    }),

    //get all charity comment
    [allCharityComments.fulfilled]:((state,action)=>{
        console.log(action.payload)
      state.allComments=[...action.payload]
    })
  }
});

export const { clearCommentState } = CommentsSlice.actions;
export default CommentsSlice.reducer;
