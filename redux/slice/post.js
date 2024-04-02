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
        }),
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `posts/${postId}`,
                method: 'DELETe'
            })
        }),
        addPost: builder.mutation({
            query: (newPost) => ({
                url: "posts",
                method: 'POST',
                body: newPost
            })
        })
    })
})

export const { useGetAllPostQuery, useDeletePostMutation, useAddPostMutation } = postApiSlice;