import {useQuery} from 'react-query';
import {useParams} from 'react-router-dom';
import * as apiClient from '../api-client';
import {AiFillStar} from 'react-icons/ai';
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';
import {IoLocationOutline} from 'react-icons/io5';
import CarouselDetail from '../components/CarouselDetail';

const Detail = () => {
  const {hotelId} = useParams();
  const {data: hotel} = useQuery(
    'fetchHotelById',
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({length: hotel.starRating}).map(() => (
            <AiFillStar className='fill-yellow-400' />
          ))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel.name}</h1>
        <div className='flex items-center'>
          <IoLocationOutline className='mr-1' />
          {hotel.city}, {hotel.country}
        </div>
      </div>

      <CarouselDetail images={hotel.imageUrls} />
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 select-none'>
        {hotel.facilities.map((facility, index) => (
          <div key={index} className='border border-slate-300 rounded-sm p-3'>
            {facility}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        <div className='whitespace-pre-line'>{hotel.description}</div>
        <div className='h-fit'>
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
