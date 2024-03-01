import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import BookingForm from '../forms/BookingForm/BookingForm';
import {useSearchContext} from '../contexts/SearchContext';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import {Elements} from '@stripe/react-stripe-js';
import {useAppContext} from '../contexts/AppContext';

const Booking = () => {
  const {stripePromise} = useAppContext();
  const search = useSearchContext();
  const {hotelId} = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      if (search.checkIn === search.checkOut) {
        search.checkOut = new Date(search.checkIn.getTime() + 86400000);
      }
      const nights =
        Math.abs(search.checkIn.getTime() - search.checkOut.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const {data: paymentIntentData} = useQuery(
    'createPaymentIntent',
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0
    }
  );

  const {data: hotel} = useQuery(
    'fetchHotelById',
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId
    }
  );

  const {data: currentUser} = useQuery(
    'fetchCurrentUser',
    apiClient.fetchCurrentUser
  );
  if (!hotel) {
    return <></>;
  }

  return (
    <div className='grid md:grid-cols-[1fr_2fr] gap-4'>
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        numberOfNights={numberOfNights || 1}
        adultCount={search.adultCount}
        childCount={search.childCount}
        hotel={hotel}
      />
      {(currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret
          }}
        >
          <BookingForm
            paymentIntent={paymentIntentData}
            currentUser={currentUser}
          />
        </Elements>
      )) || (
        <div>
          <div className='flex text-2xl justify-center'>
            Phòng đã đặt tại khách sạn vẫn còn hiệu lực.
          </div>
          <div className='flex text-2xl justify-center'>
            Vui lòng kiểm tra lại!
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
