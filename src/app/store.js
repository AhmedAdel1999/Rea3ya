import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import hardSet from 'reduxjs-toolkit-persist/lib/stateReconciler/hardSet'
import thunk from 'redux-thunk';
import userSlice from '../features/reducers/userSlice'
import charitySlice from '../features/reducers/charitySlice';
import AdminSlice from '../features/reducers/adminSlice';
import PartSlice from '../features/reducers/partSlice';
import CommentsSlice from '../features/reducers/commentSlice';
import TransactionsSlice from '../features/reducers/transactionsSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: hardSet,
};

const reducers = combineReducers({
  user: userSlice,
  charity:charitySlice,
  admin:AdminSlice,
  part:PartSlice,
  comment:CommentsSlice,
  transactions:TransactionsSlice
});

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: [thunk]
});