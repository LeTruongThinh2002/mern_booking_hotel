import {Link} from 'react-router-dom';
import {useMutation, useQuery} from 'react-query';
import * as apiClient from '../api-client';
import {BsBuilding, BsMap} from 'react-icons/bs';
import {BiHotel, BiMoney, BiStar} from 'react-icons/bi';
import CarouselDetail from '../components/CarouselDetail';
import {useAppContext} from '../contexts/AppContext';
import {useState} from 'react';

const MyHotels = () => {
  const [showDescription, setShowDescription] = useState(-1);
  const {showToast} = useAppContext();

  const handleDescription = (num: number) => {
    if (num === showDescription) {
      setShowDescription(-1);
    } else {
      setShowDescription(num);
    }
  };

  const {data: hotelData, refetch} = useQuery(
    'fetchMyHotels',
    apiClient.fetchMyHotels,
    {
      onSuccess: () => {}
    }
  );
  const {mutate: hotelBlock} = useMutation(apiClient.hotelBlock, {
    onSuccess: () => {
      showToast({message: 'Change complete!', type: 'SUCCESS'});
      refetch();
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'});
    }
  });

  const {mutate: hotelDelete} = useMutation(apiClient.hotelDelete, {
    onSuccess: () => {
      showToast({message: 'Delete complete!', type: 'SUCCESS'});
      refetch();
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'});
    }
  });
  const handleBlock = (hotelId: string) => {
    hotelBlock({hotelId});
  };
  const handleDelete = (hotelId: string) => {
    hotelDelete({hotelId});
  };

  if (!hotelData) {
    return <span>No hotels founded</span>;
  }

  return (
    <div className='space-y-5'>
      <span className='flex justify-between'>
        <h1
          data-aos='fade-right'
          data-aos-duration='2500'
          className='text-3xl select-none font-bold'
        >
          My Hotels
        </h1>
        <Link
          data-aos='fade-left'
          data-aos-duration='1500'
          to='/add-hotel'
          className='flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'
        >
          Add hotel
        </Link>
      </span>
      <div className='grid grid-cols-1 gap-8'>
        {hotelData.map((hotel, index) => (
          <div
            data-aos='fade-right'
            data-aos-duration='1500'
            key={index}
            className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'
          >
            <h2 className='text-2xl select-none font-bold'>{hotel.name}</h2>

            <CarouselDetail images={hotel.imageUrls} />

            <div
              onClick={() => handleDescription(index)}
              className={
                showDescription !== index
                  ? `cursor-pointer whitespace-pre-line line-clamp-6`
                  : `cursor-pointer whitespace-pre-line`
              }
            >
              {hotel.description}
            </div>
            <div className='grid lg:grid-cols-5 grid-cols-2 gap-2'>
              <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                <BsMap className='mr-1' />
                <p className='truncate select-none'>
                  {hotel.city}, {hotel.country}
                </p>
              </div>
              <div className='border select-none border-slate-300 rounded-sm p-3 flex items-center'>
                <BsBuilding className='mr-1' />
                {hotel.type}
              </div>
              <div className='border select-none border-slate-300 rounded-sm p-3 flex items-center'>
                <BiMoney className='mr-1' />${hotel.pricePerNight} per night
              </div>
              <div className='border select-none border-slate-300 rounded-sm p-3 flex items-center'>
                <BiHotel className='mr-1' />
                {hotel.adultCount} adults,
                {hotel.childCount} children
              </div>
              <div className='border select-none border-slate-300 rounded-sm p-3 flex items-center'>
                <BiStar className='mr-1' />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className='flex justify-end gap-5'>
              <div
                onClick={() => handleDelete(hotel._id)}
                className='cursor-pointer flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'
              >
                Delete
              </div>
              <div
                onClick={() => handleBlock(hotel._id)}
                className='cursor-pointer flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'
              >
                {hotel.block ? 'Blocked' : 'Open'}
              </div>
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className='flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
