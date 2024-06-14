import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Filters } from '@/types/Filters'

const initialState: Partial<Filters> = {
  roomType: '',
}

const roomTypeFilterSlice = createSlice({
  name: 'roomTypeFilter',
  initialState,
  reducers: {
    setRoomTypeFilter: (state, action: PayloadAction<string>) => {
      state.roomType = action.payload
    },
    resetRoomTypeFilter: () => initialState,
  },
})

export const { setRoomTypeFilter, resetRoomTypeFilter } = roomTypeFilterSlice.actions
export default roomTypeFilterSlice.reducer
