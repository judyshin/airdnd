import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { setRoomTypeFilter } from '@/redux/features/roomTypeFilterSlice'
import { RootState } from '@/redux/store'

interface FilterButtonProps {
  value: string
  currentFilter: string
  onClick: (value: string) => void
  className?: string
}

const desc: { [key: string]: string } = {
  '': '방, 집 전체 등 원하는 숙소 유형을 검색해 보세요.',
  방: '단독으로 사용하는 방이 있고, 공용 공간도 있는 형태입니다.',
  '집 전체': '집 전체를 단독으로 사용합니다.',
}

function RoomTypeFilter(): React.ReactElement {
  const dispatch = useDispatch()
  const roomTypeFilter = useSelector((state: RootState) => state.roomTypeFilter.roomType)

  const handleRoomTypeClick = (value: string) => {
    dispatch(setRoomTypeFilter(value))
  }

  function Heading(): React.ReactElement {
    return (
      <div className='flex flex-col pb-6'>
        <span className='text-2xl font-semibold'>숙소 유형</span>
        <span className='pt-2 text-sm text-gray-500'>{desc[roomTypeFilter]}</span>
      </div>
    )
  }

  function FilterButton({ value, currentFilter, onClick, className = '' }: FilterButtonProps) {
    return (
      <button
        onClick={() => onClick(value)}
        className={clsx('w-1/3 border px-2 py-4', className, {
          'bg-black text-white': currentFilter === value,
          'border-gray-300 bg-white text-black': currentFilter !== value,
        })}>
        {value || '모든 유형'}
      </button>
    )
  }

  return (
    <div className='flex flex-col border-b border-solid border-slate-300 px-6 py-8'>
      <Heading />
      <div className='flex h-16 w-full flex-row overflow-hidden px-10'>
        <FilterButton
          value=''
          currentFilter={roomTypeFilter}
          onClick={handleRoomTypeClick}
          className='rounded-l-lg'
        />
        <FilterButton value='방' currentFilter={roomTypeFilter} onClick={handleRoomTypeClick} />
        <FilterButton
          value='집 전체'
          currentFilter={roomTypeFilter}
          onClick={handleRoomTypeClick}
          className='rounded-r-lg'
        />
      </div>
    </div>
  )
}

export default RoomTypeFilter
