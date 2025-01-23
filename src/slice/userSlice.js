import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/users";

const initialState = {
  data: [],
  selectedUser: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
    setUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.data.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUsers, setUser, addUser, updateUser, deleteUser, setError } =
  userSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(setUsers(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchUser = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    dispatch(setUser(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post(API_URL, user);
    dispatch(addUser(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateUserData = (user) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${user.id}`, user);
    dispatch(updateUser(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const deleteUserData = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch(deleteUser(id));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default userSlice.reducer;
