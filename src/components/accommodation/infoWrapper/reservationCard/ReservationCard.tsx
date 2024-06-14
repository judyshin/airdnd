'use client'

import { getDayDiff } from '@/utils/formatingDate'
import { formatWithComma, priceWithDays, totalPrice } from '@/utils/formatingPrice'
import useCalendar from '@/hooks/useCalendar'
import { useState } from 'react'
import CalendarButton from './CalendarModalButton'
import ReservationCalendarModal from './ReservationCalendarModal'

function ReservationCard(pricePerDay) {
  const feePerDay = pricePerDay.pricePerDay

  const { start, end, handleDateChange, handleRefreshDates } = useCalendar()

  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false)
  // const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  function open() {
    setIsCalendarModalOpen(true)
  }

  function close() {
    setIsCalendarModalOpen(false)
  }

  function handleReservationButtonClick() {
    if (start !== null && start !== end) {
      // console.log('예약 됐습니다')
    } else {
      setIsCalendarModalOpen(true)
    }
  }

  return (
    <div className='sticky left-0 top-8 rounded-xl border border-solid border-neutral-200 bg-white p-5 shadow-lg'>
      <div className='Text-neutral-800 font-[’SF Pro’] relative mb-6 text-left text-[22px] font-semibold'>
        {start !== null && start !== end ? ( // 두 날짜가 다 선택되면 보여지기
          <span>
            {formatWithComma(feePerDay)} <div className='inline text-base font-normal'>/박</div>
          </span>
        ) : (
          <div className='text-lg'>날짜를 입력하여 요금을 확인하세요</div>
        )}
      </div>

      <div className='mb-3 rounded-lg border border-solid border-neutral-400 text-left'>
        <CalendarButton start={start} end={end} open={open} isOpen={isCalendarModalOpen} />
        {isCalendarModalOpen && (
          <ReservationCalendarModal
            start={start}
            end={end}
            handleDateChange={handleDateChange}
            close={close}
            handleRefreshDates={handleRefreshDates}
          />
        )}
        <div className='border-t border-solid border-neutral-400 py-2 pl-2'>
          <div className='mb-1 text-[10px] font-extrabold'>인원</div>
          <div className='text-sm'>{`게스트 n명`}</div>
        </div>
      </div>

      <button
        className='my-1 w-full rounded-lg bg-rose-600 py-4 text-white'
        onClick={handleReservationButtonClick}>
        {start !== null && start !== end ? '예약하기' : '예약 가능 여부 보기'}
      </button>

      {start !== null && start !== end && (
        <main>
          <div className="font-['SF Pro'] my-3 text-center text-sm font-normal text-zinc-600">
            예약 확정 전에는 요금이 청구되지 않습니다.
          </div>
          <div className='my-6 flex flex-row justify-between overflow-hidden'>
            <div className='underline'>{priceWithDays(feePerDay, getDayDiff(start, end))}</div>
            <div>{totalPrice(feePerDay, getDayDiff(start, end))}</div>
          </div>
          <hr />
          <div className='mb-1 mt-6 flex flex-row justify-between overflow-hidden font-semibold'>
            <div>총 합계</div>
            <div>{totalPrice(feePerDay, getDayDiff(start, end))}</div>
          </div>
        </main>
      )}
    </div>
  )
}

export default ReservationCard
