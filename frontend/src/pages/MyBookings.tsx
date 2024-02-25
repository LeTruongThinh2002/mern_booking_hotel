import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import {BiCheckCircle} from 'react-icons/bi';

const MyBookings = () => {
  const {data: bookingData} = useQuery(
    'fetchMyBookings',
    apiClient.fetchMyBookings,
    {
      onSuccess: () => {},
      onError: () => {}
    }
  );
  if (!bookingData || bookingData.length === 0) {
    return (
      <span className='flex justify-center text-3xl'>No bookings found</span>
    );
  }
  return (
    <div className='space-y-5'>
      <h1 className='text-3xl font-bold'>My Bookings</h1>
      {bookingData.map((hotel, index) => (
        <div
          key={index}
          className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5'
        >
          <div className='lg:w-full lg:h-[250px]'>
            <img
              title={hotel.name}
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className='w-full h-full object-cover object-center'
            />
          </div>
          <div className='flex flex-col gap-4'>
            <div className='text-2xl font-bold'>
              {hotel.name}
              <div className='text-xs font-normal'>
                {hotel.city}, {hotel.country}
              </div>
            </div>
            <div className=' overflow-y-auto max-h-[180px]'>
              {hotel.bookings.map((booking, key) => (
                <div key={key}>
                  <div className='flex'>
                    <div>
                      <div>
                        <span className='font-bold mr-2'>Dates: </span>
                        <span>
                          {new Date(booking.checkIn).toDateString()} -{' '}
                          {new Date(booking.checkOut).toDateString()}{' '}
                        </span>
                      </div>
                      <div>
                        <span className='font-bold mr-2'>Guests: </span>
                        <span>
                          {booking.adultCount} adults, {booking.childCount}{' '}
                          children
                        </span>
                      </div>
                    </div>
                    <div>
                      {new Date(booking.checkOut) < new Date() ? (
                        ''
                      ) : (
                        <BiCheckCircle className='text-gray-800 bg-yellow-300 rounded-full m-1' />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
