'use client'

import { useDispatch, useSelector } from 'react-redux'
import { IoMdClose } from 'react-icons/io'
import { useEffect, useMemo, useRef } from 'react'
import { RootState } from '@/redux/store'
import { useGetRoomsCountQuery } from '@/redux/apiSlice'
import PriceRangeFilter from '@/components/filters/PriceRangeFilter'
import RoomTypeFilter from '@/components/filters/RoomTypeFilter'
import BedFilter from '@/components/filters/BedFilter'
import AmenitiesFilter from '@/components/filters/AmenitiesFilter'
import BookingOptionFilter from '@/components/filters/BookingOptionFilter'
import GuestFavoriteFilter from '@/components/filters/GuestFavoriteFilter'
import BuildingTypeFilter from '@/components/filters/BuildingTypeFilter'
import { resetPriceRangeFilter } from '@/redux/features/priceRangeFilterSlice'
import { resetRoomTypeFilter } from '@/redux/features/roomTypeFilterSlice'
import { resetBedFilter } from '@/redux/features/bedFilterSlice'
import { resetAmenitiesFilter } from '@/redux/features/amenitiesFilterSlice'
import { resetBookingOptionFilter } from '@/redux/features/bookingOptionFilterSlice'
import { resetGuestFavorite } from '@/redux/features/guestFavoriteFilterSlice'
import { resetBuildingType } from '@/redux/features/buildingTypeFilterSlice'
import { closeModal, setModalScrollPosition } from '@/redux/features/modalSlice'
import Portal from '@/portal/Portal'

function FilterModal() {
  const dispatch = useDispatch()
  const scrollRef = useRef<HTMLDivElement>(null)
  const modalScrollPosition = useSelector((state: RootState) => state.modal.modalScrollPosition)
  const priceRangeFilter = useSelector((state: RootState) => state.priceRangeFilter)
  const roomTypeFilter = useSelector((state: RootState) => state.roomTypeFilter)
  const bedFilter = useSelector((state: RootState) => state.bedFilter)
  const amenitiesFilter = useSelector((state: RootState) => state.amenitiesFilter)
  const bookingOptionFilter = useSelector(
    (state: RootState) => state.bookingOptionFilter.bookingOptions,
  )
  const guestFavorite = useSelector((state: RootState) => state.guestFavoriteFilter.guestFavorite)
  const buildingTypes = useSelector((state: RootState) => state.buildingTypeFilter.buildingTypes)

  const filters = useMemo(
    () => ({
      priceMin: priceRangeFilter.priceMin || null,
      priceMax: priceRangeFilter.priceMax || null,
      roomType: roomTypeFilter.roomType || '',
      bedRooms: bedFilter.bedRooms || null,
      beds: bedFilter.beds || null,
      bathRooms: bedFilter.bathRooms || null,
      amenities: amenitiesFilter.amenities.length > 0 ? amenitiesFilter.amenities : [],
      bookingOptions: bookingOptionFilter.length > 0 ? bookingOptionFilter : [],
      guestFavorite: guestFavorite || null,
      buildingTypes: buildingTypes.length > 0 ? buildingTypes : [],
    }),
    [
      priceRangeFilter,
      roomTypeFilter,
      bedFilter,
      amenitiesFilter,
      bookingOptionFilter,
      guestFavorite,
      buildingTypes,
    ],
  )

  const handleApplyFilters = () => {
    // 검색 로직 후추
    dispatch(closeModal())
  }

  const handleClearFilters = () => {
    dispatch(resetAmenitiesFilter())
    dispatch(resetBedFilter())
    dispatch(resetPriceRangeFilter())
    dispatch(resetRoomTypeFilter())
    dispatch(resetBookingOptionFilter())
    dispatch(resetGuestFavorite())
    dispatch(resetBuildingType())
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  const { data, error, isLoading } = useGetRoomsCountQuery(filters)

  function Header() {
    return (
      <div className='relative flex items-center justify-center rounded-t border-b border-solid border-slate-200 px-6'>
        <button
          onClick={handleCloseModal}
          className='absolute left-4 border-0 p-1 transition hover:opacity-70'>
          <IoMdClose size={18} />
        </button>
        <div className='flex h-16 items-center text-lg font-semibold'>필터</div>
      </div>
    )
  }

  function Footer() {
    return (
      <div className='flex w-full items-center justify-between border-t border-solid border-gray-300 px-6 py-4'>
        <button
          onClick={handleClearFilters}
          className='rounded-lg bg-white px-4 py-3 font-semibold text-black transition hover:opacity-80'>
          전체 해제
        </button>
        <button
          onClick={handleApplyFilters}
          className='h-12 rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:opacity-80'>
          {roomTypeFilter.roomType === '방'
            ? '방'
            : roomTypeFilter.roomType === '집 전체'
              ? '집 전체 숙소'
              : '숙소'}{' '}
          {isLoading ? 'Loading...' : data?.count}개 보기
        </button>
        {error && <p className='text-red-500'>데이터를 가져오는데 실패했습니다.</p>}
      </div>
    )
  }

  // 컴포넌트 마운트될때 스크롤 위치를 복원
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = modalScrollPosition
    }
  }, [modalScrollPosition])

  // 컴포넌트가 언마운트될 때 스크롤 위치를 저장
  useEffect(
    () => () => {
      if (scrollRef.current) {
        dispatch(setModalScrollPosition(scrollRef.current.scrollTop))
      }
    },
    [dispatch],
  )

  return (
    <Portal>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70 p-10 outline-none focus:outline-none'>
        <div className='max-h-3xl h-full w-full max-w-3xl overflow-hidden'>
          <div className='flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
            <Header />
            <div ref={scrollRef} className='flex-auto overflow-y-auto'>
              <PriceRangeFilter />
              <RoomTypeFilter />
              <BedFilter />
              <AmenitiesFilter />
              <BookingOptionFilter />
              <GuestFavoriteFilter />
              <BuildingTypeFilter />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default FilterModal
