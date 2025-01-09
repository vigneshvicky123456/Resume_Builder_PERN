import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get all resumes for a specific accountUser_id
export const allResumes = createAsyncThunk('resumes/allResumes', async (accountUser_id) => {
   const response = await axios.get(`http://localhost:5000/resume/${accountUser_id}`);
   console.log('ASYNC allResumes',response.data);
   
   return response.data;
});

// Get a getLastResume for a specific accountUser_id
export const getLastResume = createAsyncThunk('resumes/getLastResume', async (accountUser_id) => {
  const response = await axios.get(`http://localhost:5000/resume/lastCreated/${accountUser_id}`);
  console.log('ASYNC getLastResume',response.data);
  
  return response.data;
});  

// Get a single resume by ID for a specific accountUser_id
export const getResumeById = createAsyncThunk('resumes/getResumeById', async ({ accountUser_id, id }) => {
      const response = await axios.get(`http://localhost:5000/resume/${accountUser_id}/${id}`);
      console.log('ASYNC getResumeById',response.data);
      
      return response.data;
});

// Create a new resume
export const createResume = createAsyncThunk('resumes/createResume', async (resumeData) => {
      const response = await axios.post("http://localhost:5000/resume", resumeData);
      console.log('ASYNC createResume resumeData',resumeData);
      
      return response.data;
});

// Update an existing resume
export const updateResume = createAsyncThunk('resumes/updateResume', async ({ id, resumeData }) => {
      const response = await axios.put(`http://localhost:5000/resume/${id}`, resumeData);
      return response.data;
});

// Delete a resume by ID
export const deleteResume = createAsyncThunk('resumes/deleteResume', async (id) => {
      const response = await axios.delete(`http://localhost:5000/resume/${id}`);
      return response.data;
});

  const resumeSlice = createSlice({
    name: 'resumes',
    initialState: {
      resumes: [],
      resume: null,
      getResume: [],
      selectedTemplateId : null,
    },
    reducers: {
      selectedId: (state, action) => {
        state.selectedTemplateId  = action.payload;
        console.log('slice selectedId ',state.selectedTemplateId );
      }
    },
    extraReducers: (builder) => {
      builder

        .addCase(allResumes.fulfilled, (state, action) => {
          state.resumes = action.payload;
        })
        .addCase(getLastResume.fulfilled, (state, action) => {
          state.resume = action.payload;
         // console.log('slice getlastresume',state.resume);
        })
        .addCase(getResumeById.fulfilled, (state, action) => {
          state.getResume = action.payload;
        })
        .addCase(createResume.fulfilled, (state, action) => {
          state.resumes.push(action.payload);
        })
        .addCase(updateResume.fulfilled, (state, action) => {
          const index = state.resumes.findIndex((r) => r.id === action.meta.arg.id);
          if (index !== -1) {
            state.resumes[index] = { ...state.resumes[index], ...action.meta.arg.resumeData };
          }
        })
        .addCase(deleteResume.fulfilled, (state, action) => {
          state.resumes = state.resumes.filter((r) => r.id !== action.meta.arg);
        })
        
    },
  });
  
  export const { selectedId } = resumeSlice.actions;
  
  export default resumeSlice.reducer;