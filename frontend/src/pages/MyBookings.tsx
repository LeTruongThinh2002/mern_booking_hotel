import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import CarouselAccessCard from '../components/CarouselAccessCard';

const MyBookings = () => {
  const {data: bookingData} = useQuery(
    'fetchMyBookings',
    apiClient.fetchMyBookings,
    {
      onSuccess: () => {},
      onError: () => {}
    }
  );
  if (
    !bookingData ||
    (bookingData[0].length === 0 && bookingData[1].length === 0)
  ) {
    return (
      <span className='select-none flex justify-center text-3xl'>
        No bookings found
      </span>
    );
  }

  return (
    <div className='space-y-5'>
      <h1
        data-aos='fade-right'
        data-aos-duration='2500'
        className='select-none text-3xl font-bold'
      >
        My Bookings
      </h1>
      <div className='flex flex-col gap-5'>
        <div>
          <CarouselAccessCard access={bookingData[0]} denied={bookingData[1]} />
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
