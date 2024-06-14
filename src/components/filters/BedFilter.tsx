import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBedrooms, setBeds, setBathrooms } from '@/redux/features/bedFilterSlice'
import { RootState } from '@/redux/store'

interface FilterButtonProps {
  value: number | null
  selectedValue: number | null
  handleClick: (value: number | null) => void
  label: string
  className: string
}

interface FilterButtonsProps {
  selectedValue: number | null
  handleClick: (value: number | null) => void
  label: string
}

function BedFilter(): React.ReactElement {
  const dispatch = useDispatch()
  const { bedRooms, beds, bathRooms } = useSelector((state: RootState) => state.bedFilter)

  const handleBedroomClick = (value: number | null) => {
    dispatch(setBedrooms(value))
  }

  const handleBedClick = (value: number | null) => {
    dispatch(setBeds(value))
  }

  const handleBathroomClick = (value: number | null) => {
    dispatch(setBathrooms(value))
  }

  function Heading() {
    return (
      <div className='flex flex-col pb-6'>
        <span className='text-2xl font-semibold'>침실과 침대</span>
      </div>
    )
  }

  function FilterButton({
    value,
    selectedValue,
    handleClick,
    label,
    className,
  }: FilterButtonProps) {
    return (
      <div className='pb-1 pr-2.5 pt-1'>
        <button
          onClick={() => handleClick(value)}
          className={`${className} h-10 flex-grow rounded-full border px-5 py-2.5 text-sm ${selectedValue === value ? 'bg-black text-white' : 'border-gray-300 bg-white text-black'}`}>
          {label}
        </button>
      </div>
    )
  }

  function FilterButtons({ selectedValue, handleClick, label }: FilterButtonsProps) {
    return (
      <div className='flex flex-col '>
        <label className='px-0.5 pb-5 pt-1 text-base font-medium text-gray-700'>{label}</label>
        <div className='flex justify-between'>
          <FilterButton
            value={null}
            selectedValue={selectedValue}
            handleClick={handleClick}
            label='상관없음'
            className='w-26'
          />
          {[1, 2, 3, 4, 5, 6, 7].map(value => (
            <FilterButton
              key={value}
              value={value}
              selectedValue={selectedValue}
              handleClick={handleClick}
              label={`${value}`}
              className='w-14'
            />
          ))}
          <FilterButton
            value={8}
            selectedValue={selectedValue}
            handleClick={handleClick}
            label='8+'
            className='w-14'
          />
        </div>
      </div>
    )
  }

  return (
    <div className='border-b border-solid border-slate-300 px-6 py-8'>
      <Heading />
      <div className='flex h-[306px] flex-col justify-between'>
        <FilterButtons selectedValue={bedRooms} handleClick={handleBedroomClick} label='침실' />
        <FilterButtons selectedValue={beds} handleClick={handleBedClick} label='침대' />
        <FilterButtons selectedValue={bathRooms} handleClick={handleBathroomClick} label='욕실' />
      </div>
    </div>
  )
}

export default BedFilter
