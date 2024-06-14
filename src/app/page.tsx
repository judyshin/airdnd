import Link from 'next/link'
import Category from '@/components/accommodation/categoryBundle/Category'
import getRoomsList from '@/app/apis/fetchMainPage/getRoomsList'
import Card from '@/components/card/card'
import InfiniteScroll from '@/components/infiniteScroll/scroll'

function RoomsItem({ accommodation }) {
  return (
    <Link href={`/rooms/${accommodation.accommodationId}`}>
      <Card
        accommodationName={accommodation.accommodationName}
        imageUrl={accommodation.imageUrl}
        pricePerDay={accommodation.pricePerDay}
        rating={accommodation.rating}
        guestFavorite={accommodation.guestFavorite}
      />
    </Link>
  )
}

export default async function Home() {
  // 설정한 id부터 40개의 숙소 데이터를 가져옵니다.
  const id = 1
  // 리스트에 어떤 항목을 포함할지 배열로 전달합니다.
  const fields = [
    'accommodationId',
    'accommodationName',
    'imageUrl',
    'guestFavorite',
    'rating',
    'pricePerDay',
  ]
  // 설정된 정보를 조회해서 배열로 반환된 정보를 할당합니다.
  const accommodations = await getRoomsList(id, fields)

  return (
    <div className='flex flex-col items-center justify-start'>
      <div className='w-full max-w-[1760px] grow items-center justify-between'>
        <Category />
      </div>
      <div className='mt-3 grid w-full max-w-[1760px] grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {accommodations.map((accommodation, index) => (
          <RoomsItem key={`RoomsItem-${index}`} accommodation={accommodation} />
        ))}
        <InfiniteScroll></InfiniteScroll>
      </div>
    </div>
  )
}
