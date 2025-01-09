import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/experience"; 

// Async Thunks
// Get all experiences by resume_id
export const allExperiences = createAsyncThunk("experiences/allExperiences", async (resume_id) => {
    const response = await axios.get(`${BASE_URL}/${resume_id}`);
    return response.data; 
});

// Add a new experience
export const addExperience = createAsyncThunk("experiences/addExperience", async (experience) => {
    const response = await axios.post(BASE_URL, experience);
    console.log('ASYNC addExperience',response.data);
    
    return response.data;
});

// Update an experience
export const updateExperience = createAsyncThunk("experiences/updateExperience", async ({ id, updates }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, updates);
    return { id, updates, message: response.data.message };
});

// Delete an experience
export const deleteExperience = createAsyncThunk("experiences/deleteExperience", async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return { id, message: response.data.message };
});


const experienceSlice = createSlice({
  name: "experiences",
  initialState: {
    experiences: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(allExperiences.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experiences = action.payload;
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.experiences.push(action.payload);
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        const { id, updates } = action.payload;
        const index = state.experiences.findIndex((exp) => exp.id === id);
        if (index !== -1) {
          state.experiences[index] = { ...state.experiences[index], ...updates };
        }
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.experiences = state.experiences.filter((exp) => exp.id !== action.payload.id);
      })
     
  },
});

export default experienceSlice.reducer;
