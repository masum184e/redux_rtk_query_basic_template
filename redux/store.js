import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postApiSlice } from './slice/post';

export const store = configureStore({
    reducer: {
        [postApiSlice.reducerPath]: postApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postApiSlice.middleware)
});

setupListeners(store.dispatch);
