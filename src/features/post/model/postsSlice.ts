import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts as fetchPostsAPI } from 'entities/Post/model/api';
import { Post } from 'entities/Post/model/types';

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Начальное состояние
const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Асинхронный thunk для получения постов
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetchPostsAPI();
  return response;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Дополнительные редьюсеры, если необходимо
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    updatePost(state, action) {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id,
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
