import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import clsx from 'clsx'
import { RootState } from '@/redux/store'
import { setBuildingType } from '@/redux/features/buildingTypeFilterSlice'

const buildingTypes = [
  { type: '단독 또는 다세대 주택', image: '/images/BuildingTypeHome.jpg' },
  { type: '아파트', image: '/images/BuildingTypeApart.jpg' },
  { type: '게스트용 별채', image: '/images/BuildingTypeVilla.jpg' },
  { type: '호텔', image: '/images/BuildingTypeHotel.jpg' },
]

const BuildingTypeFilter = () => {
  const dispatch = useDispatch()
  const selectedTypes = useSelector((state: RootState) => state.buildingTypeFilter.buildingTypes)

  const handleToggle = (type: string) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type]
    dispatch(setBuildingType(updatedTypes))
  }

  const BuildingTypeButton = ({ type, image, selected, onClick }) => (
    <button
      className={clsx(
        'flex h-32 w-1/5 cursor-pointer items-start justify-start rounded-lg p-3',
        { 'outline outline-2 outline-black': selected },
        { 'border border-solid border-gray-300': !selected },
      )}
      onClick={onClick}>
      <div className='flex h-full flex-col items-start justify-between gap-4'>
        <div className='flex flex-row items-start justify-start'>
          <Image alt={type} src={image} width={30} height={30} />
        </div>
        <div className='mt-auto text-left'>
          <p className='text-base font-semibold'>{type}</p>
        </div>
      </div>
    </button>
  )

  return (
    <div className='flex flex-col border-b border-solid border-slate-300 px-6 py-8'>
      <div className='flex flex-col pb-6'>
        <span className='text-2xl font-semibold'>건물 유형</span>
      </div>
      <div className='flex flex-row flex-wrap justify-between gap-2'>
        {buildingTypes.map(({ type, image }) => (
          <BuildingTypeButton
            key={type}
            type={type}
            image={image}
            selected={selectedTypes.includes(type)}
            onClick={() => handleToggle(type)}
          />
        ))}
      </div>
    </div>
  )
}

export default BuildingTypeFilter
