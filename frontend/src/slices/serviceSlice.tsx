import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPageParams, IServiceDeleteData, ServiceInitialInterface } from '@src/interfaces/IService'
import serviceService from '@src/services/serviceService'

const initialState = {
  service: {},
  services: {},
  error: null,
  success: false,
  loading: false,
  message: null,
} as ServiceInitialInterface

// Get a service
export const getService = createAsyncThunk('service/get', async (id: string, thunkAPI) => {
  try {
    const res = await serviceService.getService(id)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Get all services
export const getAllServices = createAsyncThunk('service/getAll', async (params: IPageParams, thunkAPI) => {
  try {
    const res = await serviceService.getAllServices(params)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Create a service
export const createService = createAsyncThunk('service/create', async (serviceData: FormData, thunkAPI) => {
  try {
    const res = await serviceService.createService(serviceData)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Create a service
export const updateService = createAsyncThunk('service/update', async (serviceData: FormData, thunkAPI) => {
  try {
    const res = await serviceService.updateService(serviceData)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

// Delete service
export const deleteService = createAsyncThunk('service/delete', async (id: string, thunkAPI) => {
  try {
    const res: IServiceDeleteData = await serviceService.deleteService(id)
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Check for errors
      return thunkAPI.rejectWithValue(e.response.data.errors[0])
    }
  }
})

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    resetServiceStates: state => {
      state.loading = false
      state.error = null
      state.success = false
      state.message = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getService.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getService.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.service = action.payload
      })
      .addCase(getService.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.service = {}
      })
      .addCase(getAllServices.pending, state => {
        state.loading = true
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.loading = false
        state.services = action.payload
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.services = {}
      })
      .addCase(createService.pending, state => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        state.service = action.payload
        state.message = 'Serviço criado com sucesso.'
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload
      })
      .addCase(updateService.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.success = true
        state.service = action.payload
        state.message = 'Serviço atualizado com sucesso.'
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteService.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.service = action.payload
        state.message = 'Serviço excluído com sucesso.'
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { resetServiceStates } = serviceSlice.actions
export default serviceSlice.reducer
