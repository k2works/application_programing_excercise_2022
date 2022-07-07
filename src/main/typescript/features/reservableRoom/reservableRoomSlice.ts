import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ReservableRoomService from "../../services/reservableRoomService";
import {RootState} from "../../app/store";

interface ValidationErrors {
    message: string
}

interface ReservableMeetingRoom {
    roomId: { value: number }
    reservedDate: { value: Date }
}

interface ReservableMeetingRooms {
    list: ReservableMeetingRoom[]
}

export type SliceState = {
    reservableRooms: ReservableMeetingRooms
    error: string | null | undefined
}

export const reservableRoomList = createAsyncThunk<any,
    any,
    {
        rejectValue: ValidationErrors
    }>(
    'reservableRoom/list',
    async ({rejectWithValue}) => {
        try {
            return await ReservableRoomService.list()
        } catch (e: any) {
            if (!e.response) {
                throw e
            }
            return rejectWithValue(e.response.data)
        }
    }
)

export const reservableRoomCreate = createAsyncThunk<any,
    any,
    {
        rejectValue: ValidationErrors
    }>(
    'meetingRoom/create',
    async (params: { roomId: number, reservedDate: Date }, {rejectWithValue}) => {
        try {
            return await ReservableRoomService.create(params)
        } catch (e: any) {
            if (!e.response) {
                throw e
            }
            return rejectWithValue(e.response.data)
        }
    }
)

export const reservableRoomDelete = createAsyncThunk<any,
    any,
    {
        rejectValue: ValidationErrors
    }>(
    'meetingRoom/delete',
    async (params: { roomId: number, reservedDate: Date }, {rejectWithValue}) => {
        try {
            return await ReservableRoomService.delete(params)
        } catch (e: any) {
            if (!e.response) {
                throw e
            }
            return rejectWithValue(e.response.data)
        }
    }
)

const initialState: SliceState = {
    reservableRooms: {list: []},
    error: null
}

export const reservableRoomSlice = createSlice({
    name: 'reservableRoom',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(reservableRoomList.pending, (state, action) => {
            state.error = null
        })
        builder.addCase(reservableRoomList.fulfilled, (state, action) => {
            state.reservableRooms = action.payload.data
        })
        builder.addCase(reservableRoomList.rejected, (state, action) => {
            if (action.payload) {
                state.error = action.payload.message
            } else {
                state.error = action.error.message
            }
        })
    }
})

export const reservableRoomState = (state: RootState) => state.reservableRoom

export default reservableRoomSlice.reducer
