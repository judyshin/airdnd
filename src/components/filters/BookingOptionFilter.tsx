import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import clsx from 'clsx'
import { RootState } from '@/redux/store'
import { setBookingOptionFilter } from '@/redux/features/bookingOptionFilterSlice'

interface FilterOptionProps {
  title: string
  description: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function BookingOptionFilter(): React.ReactElement {
  const dispatch = useDispatch()
  const bookingOptions = useSelector((state: RootState) => state.bookingOptionFilter.bookingOptions)

  const options = [
    { title: '즉시 예약', description: '호스트 승인을 기다릴 필요 없이 예약할 수 있는 숙소' },
    {
      title: '셀프 체크인',
      description: '숙소에 도착한 후 복잡한 절차 없이 쉽게 입실할 수 있습니다.',
    },
    { title: '반려동물 동반 가능', description: '보조동물을 동반하시나요?' },
  ]

  const handleOptionChange = (option: string) => {
    const newOptions = bookingOptions.includes(option)
      ? bookingOptions.filter(opt => opt !== option)
      : [...bookingOptions, option]
    dispatch(setBookingOptionFilter(newOptions))
  }

  function Heading(): React.ReactElement {
    return (
      <div className='flex w-full flex-col pb-6'>
        <span className='text-2xl font-semibold'>예약 옵션</span>
      </div>
    )
  }

  function FilterOption({
    title,
    description,
    checked,
    onChange,
  }: FilterOptionProps): React.ReactElement {
    return (
      <div className='flex items-center justify-between pb-3 pr-1 pt-3.5'>
        <div className='flex w-full flex-col'>
          <div className='text-gray-900'>{title}</div>
          <div className='pt-1 text-sm text-gray-500'>{description}</div>
        </div>
        <label className='relative inline-flex cursor-pointer items-center'>
          <input type='checkbox' checked={checked} onChange={onChange} className='sr-only' />
          <div
            onClick={() =>
              onChange({
                target: { checked: !checked },
              } as React.ChangeEvent<HTMLInputElement>)
            }
            className='flex h-10 w-20 items-center justify-center'>
            <div
              className={clsx(
                'relative flex h-8 w-14 items-center rounded-full transition-colors duration-200',
                checked ? 'bg-black' : 'bg-gray-300',
              )}>
              <div
                className={clsx(
                  'absolute h-7 w-7 transform rounded-full border bg-white transition-transform duration-200',
                  checked ? 'translate-x-6 border-black' : 'translate-x-0 border-gray-300',
                )}>
                {checked && (
                  <FaCheck
                    className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-black'
                    size={12}
                  />
                )}
              </div>
            </div>
          </div>
        </label>
      </div>
    )
  }

  return (
    <div className='border-b border-solid border-slate-300 bg-white px-6 py-8'>
      <Heading />
      <div>
        {options.map(option => (
          <FilterOption
            key={option.title}
            title={option.title}
            description={option.description}
            checked={bookingOptions.includes(option.title)}
            onChange={() => handleOptionChange(option.title)}
          />
        ))}
      </div>
    </div>
  )
}

export default BookingOptionFilter
