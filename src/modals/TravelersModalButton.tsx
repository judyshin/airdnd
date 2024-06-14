'use client'

import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { openModal } from '@/redux/features/modalSlice'
import TravelersModal from '@/SearchModal/TravelersModal'
import { RootState } from '@/redux/store'
import Portal from '@/portal/Portal'

function TravelersModalButton() {
  const dispatch = useDispatch()
  const isOpen = useSelector((state: RootState) => state.modal.isOpen)

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalProps: {},
      }),
    )
  }

  return (
    <div className='flex items-center justify-center'>
      <button
        onClick={handleOpenModal}
        className='flex h-full cursor-pointer flex-col items-center justify-center rounded-lg border-[1px] border-solid border-neutral-300 px-0 py-2 transition hover:shadow-md'>
        <span className='flex flex-row items-center justify-between gap-2 px-4 pb-0 pt-0.5'>
          <Image
            alt={'FilterIcon'}
            src={`/images/FilterIcon.svg`}
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <span className='text-xs font-semibold'>필터</span>
        </span>
      </button>
      {isOpen && (
        <Portal>
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70 p-10 outline-none focus:outline-none'>
            <div className='max-h-3xl h-full w-full max-w-3xl overflow-hidden'>
              <div className='flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
                <TravelersModal />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}

export default TravelersModalButton
