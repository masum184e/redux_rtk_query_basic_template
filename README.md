## Redux RTK Query Basic Template

<p textAlign="justify">RTK Query is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.</p>

## Preview
<img src="https://github.com/masum184e/redux_rtk_query_basic_template/blob/main/preview.png" >
<a href="https://redux-rtk-query-basic-template.vercel.app/"><b>Live View</b></a>

## Requirements

[Install Node On Your Device](https://nodejs.org/)

## Installation

```
npm install @reduxjs/toolkit react-redux
```

## How to Run

```
git clone https://github.com/masum184e/redux_rtk_query_basic_template.git
cd redux_rtk_query_basic_template
npm install
npm run dev
```

## Explaination

<p> We bassically need 4 different component:</p>

1. **provider:**

    The Provider component is provided by the react-redux library, which is the official React bindings for Redux. It is used at the top level of your React component tree to wrap your entire application. By doing so, it makes the Redux store available to all components in the application without needing to pass it explicitly through props at each level.

    ```jsx
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.jsx'
    import { Provider } from 'react-redux'
    import { store } from '../redux/store.js'
    import "./index.css"

    ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
        <App />
        </Provider>
    </React.StrictMode>,
    )

2. **store:**

    In Redux, the store is a central piece of the architecture that holds the state of your entire application. It serves as a single source of truth for your data.

    ```jsx
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

3. **slice:**

    Slices play a crucial role in managing the cache and fetching data from APIs. RTK Query simplifies data fetching and caching by automatically generating slices for you based on the endpoints you define.

    ```jsx
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

4. **consumer:**

    RTK Query automatically generates hooks for each endpoint you define using the `createApi` function. These hooks are named according to the convention `use{EndpointName}Query`, `use{EndpointName}Mutation` etc. Once you have fetched data using a query hook, you can consume it directly in your React components. The hook returns an object containing properties such as `data`, `isLoading`, `isFetching`, `error`, etc., which represent the current state of the data fetching process.

    ```jsx
    import { useState } from 'react';
    import { useAddPostMutation, useGetAllPostQuery } from './../../redux/slice/post';

    const Form = () => {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');

        const [addPost] = useAddPostMutation();
        const { refetch } = useGetAllPostQuery();

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await addPost({ title, description });
                setTitle('');
                setDescription('');
                await refetch();
            } catch (error) {
                console.error('Error adding post:', error);
            }
        };

        return (
            <>
                <div className="bg-[#764ABC] p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-white text-sm font-bold mb-2">Title</label>
                            <input type="text" id="title" name="title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-white text-sm font-bold mb-2">Description</label>
                            <textarea id="description" name="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none h-32" required></textarea>
                        </div>
                        <div className="flex items-center justify-end">
                            <button type="submit" className="bg-white text-[#764ABC] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                        </div>
                    </form>
                </div>
            </>
        );
    };

    export default Form;
