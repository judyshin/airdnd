import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAmenitiesFilter } from '@/redux/features/amenitiesFilterSlice'
import { RootState } from '@/redux/store'
import { setModalScrollPosition } from '@/redux/features/modalSlice'

interface AmenityItemProps {
  amenity: string
  checked: boolean
  handleAmenitiesChange: (e: ChangeEvent<HTMLInputElement>) => void
}

interface AmenityCategoryProps {
  title: string
  amenities: { itemId: number; label: string }[]
  handleAmenitiesChange: (e: ChangeEvent<HTMLInputElement>) => void
  amenitiesFilter: string[]
}

const amenityCategories = [
  { categoryId: 1, label: '필수' },
  { categoryId: 2, label: '특징' },
  { categoryId: 3, label: '위치' },
  { categoryId: 4, label: '안전' },
]

const amenityItems = [
  { itemId: 1, categoryId: 1, label: '무선 인터넷' },
  { itemId: 2, categoryId: 1, label: '세탁기' },
  { itemId: 3, categoryId: 1, label: '에어컨' },
  { itemId: 4, categoryId: 1, label: '주방' },
  { itemId: 5, categoryId: 1, label: '건조기' },
  { itemId: 6, categoryId: 1, label: '난방' },
  { itemId: 7, categoryId: 1, label: '업무 전용 공간' },
  { itemId: 8, categoryId: 1, label: 'TV' },
  { itemId: 9, categoryId: 1, label: '헤어드라이어' },
  { itemId: 10, categoryId: 1, label: '다리미' },
  { itemId: 11, categoryId: 2, label: '수영장' },
  { itemId: 12, categoryId: 2, label: '대형 욕조' },
  { itemId: 13, categoryId: 2, label: '무료 주차 공간' },
  { itemId: 14, categoryId: 2, label: '전기차 충전시설' },
  { itemId: 15, categoryId: 2, label: '아기 침대' },
  { itemId: 16, categoryId: 2, label: '킹사이즈 침대' },
  { itemId: 17, categoryId: 2, label: '헬스장' },
  { itemId: 18, categoryId: 2, label: '바비큐 그릴' },
  { itemId: 19, categoryId: 2, label: '야침식사' },
  { itemId: 20, categoryId: 2, label: '실내 벽난로' },
  { itemId: 21, categoryId: 2, label: '흡연 가능' },
  { itemId: 22, categoryId: 3, label: '해변에 인접' },
  { itemId: 23, categoryId: 3, label: '수변' },
  { itemId: 24, categoryId: 4, label: '화재경보기' },
  { itemId: 25, categoryId: 4, label: '일산화탄소 경보기' },
]

function AmenitiesFilter(): React.ReactElement {
  const dispatch = useDispatch()
  const amenitiesFilter = useSelector((state: RootState) => state.amenitiesFilter.amenities) || []
  const [isExpanded, setIsExpanded] = useState(false)

  const LIMIT = 6

  // ref 검토 필요
  const toggleExpand = () => {
    if (isExpanded) {
      dispatch(setModalScrollPosition(1000))
    }
    setIsExpanded(!isExpanded)
  }

  const handleAmenitiesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      dispatch(setAmenitiesFilter([...amenitiesFilter, value]))
    } else {
      dispatch(setAmenitiesFilter(amenitiesFilter.filter(v => v !== value)))
    }
  }

  function Heading(): React.ReactElement {
    return (
      <div className='flex w-full flex-col pb-6'>
        <span className='text-2xl font-semibold'>편의시설</span>
      </div>
    )
  }

  function AmenityItem({ amenity, checked, handleAmenitiesChange }: AmenityItemProps) {
    return (
      <div className='flex w-1/2 flex-row'>
        <label key={amenity} className='inline-flex flex-grow items-center gap-4 py-3'>
          <input
            type='checkbox'
            name='amenities'
            value={amenity}
            checked={checked}
            onChange={handleAmenitiesChange}
            className='form-checkbox h-6 w-6 text-black accent-black'
          />
          <span className='pl-2 text-gray-700'>{amenity}</span>
        </label>
      </div>
    )
  }

  function AmenityCategory({
    title,
    amenities,
    handleAmenitiesChange,
    amenitiesFilter,
  }: AmenityCategoryProps): React.ReactElement {
    return (
      <div className='w-full'>
        <h3 className='text-md pb-3 pt-2 font-semibold text-gray-800'>{title}</h3>
        <div className='flex flex-wrap'>
          {amenities.map(amenity => (
            <AmenityItem
              key={amenity.itemId}
              amenity={amenity.label}
              checked={amenitiesFilter.includes(amenity.label)}
              handleAmenitiesChange={handleAmenitiesChange}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='flex w-full flex-col items-start border-b border-solid border-slate-300 px-6 py-8'>
      <Heading />
      {amenityCategories.slice(0, isExpanded ? amenityCategories.length : 1).map(category => (
        <div className='mt-6 w-full' key={category.categoryId}>
          <AmenityCategory
            title={category.label}
            amenities={amenityItems
              .slice(0, isExpanded ? amenityItems.length : LIMIT)
              .filter(item => item.categoryId === category.categoryId)}
            handleAmenitiesChange={handleAmenitiesChange}
            amenitiesFilter={amenitiesFilter}
          />
        </div>
      ))}
      <div
        onClick={toggleExpand}
        className='cursor-pointer text-black underline underline-offset-4 focus:outline-none'>
        {isExpanded ? '접기' : '더 보기'}
      </div>
    </div>
  )
}

export default AmenitiesFilter
