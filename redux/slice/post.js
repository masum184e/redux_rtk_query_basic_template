import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postApiSlice = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL
    }),

    endpoints: (builder) => ({
        getAllPost: builder.query({
            query: () => ({
                url: "posts",
                method: "GET"
            })
        })
    })
})

export const { useGetAllPostQuery } = postApiSlice;