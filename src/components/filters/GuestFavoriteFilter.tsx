import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import clsx from 'clsx'
import { RootState } from '@/redux/store'
import { toggleGuestFavorite } from '@/redux/features/guestFavoriteFilterSlice'

const GuestFavoriteFilter = () => {
  const dispatch = useDispatch()
  const isFavorite = useSelector((state: RootState) => state.guestFavoriteFilter.guestFavorite)

  const handleToggle = () => {
    dispatch(toggleGuestFavorite())
  }

  function Heading(): React.ReactElement {
    return (
      <div className='flex flex-col pb-6'>
        <span className='text-2xl font-semibold'>최고 수준의 숙소</span>
      </div>
    )
  }

  return (
    <div className='flex flex-col border-b border-solid border-slate-300 px-6 py-8'>
      <Heading />
      <div className='flex h-full w-full flex-row items-center justify-between'>
        <button
          className={clsx(
            'w-120 flex h-44 cursor-pointer items-center justify-start rounded-xl px-6 py-5',
            { 'outline outline-2 outline-black': isFavorite },
            { 'border border-solid border-slate-300': !isFavorite },
          )}
          onClick={handleToggle}>
          <div className='flex flex-col items-start justify-start'>
            <div className='flex flex-row items-center justify-start'>
              <Image
                alt='WingLeft'
                src={`/images/WingLeft.svg`}
                width={0}
                height={0}
                style={{ width: 30, height: 30 }}
              />
              <Image
                alt='WingRight'
                src={`/images/WingRight.svg`}
                width={0}
                height={0}
                style={{ width: 30, height: 30 }}
              />
            </div>
            <div className='h-15 text-left'>
              <p className='font-semibold'>게스트 선호</p>
              <p className='text-sm text-gray-500'>에어비앤비 게스트에게 가장 사랑받는 숙소</p>
            </div>
          </div>
        </button>
        <div className='w-88 h-38'></div>
      </div>
    </div>
  )
}

export default GuestFavoriteFilter
