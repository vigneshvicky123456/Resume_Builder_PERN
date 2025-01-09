import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/contact';

// Get all contacts for a specific resume
export const allContacts = createAsyncThunk('contact/allContacts', async (resume_id) => {
    const response = await axios.get(`${BASE_URL}/${resume_id}`);
    return response.data;
});

// Get a contact by ID
export const getContactById = createAsyncThunk('contact/getContactById', async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
});

// Create a new contact
export const createContact = createAsyncThunk('contact/createContact', async (contactData) => {
    const response = await axios.post(BASE_URL, contactData);
    console.log('ASYNC createContact',response.data);
    
    return response.data;
});

// Update an existing contact
export const updateContact = createAsyncThunk('contact/updateContact', async ({ id, contactData }) => {
    const response = await axios.put(`${BASE_URL}/${id}`, contactData);
    return response.data;
});

// Delete a contact
export const deleteContact = createAsyncThunk('contact/deleteContact', async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
});

// Contact slice
const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    contact: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(allContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.contact = action.payload;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts[index] = { ...state.contacts[index], ...action.payload };
        }
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      })
  },
});

export default contactSlice.reducer;
