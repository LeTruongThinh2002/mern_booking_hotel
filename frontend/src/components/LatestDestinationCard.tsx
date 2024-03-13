import {Link} from 'react-router-dom';
import {HotelType} from '../../../backend/src/shared/types';
import {AiFillStar} from 'react-icons/ai';
import {IoLocationOutline} from 'react-icons/io5';

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({hotel}: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className='relative cursor-pointer overflow-hidden rounded-md'
    >
      <div
        className='h-[300px] group'
        data-aos='fade-down'
        data-aos-duration='1500'
      >
        <img
          className='w-full h-full object-cover object-center group-hover:scale-150 transition-all duration-1000'
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          title={hotel.name}
        />
      </div>
      <div className='absolute top-0 p-4 grid grid-cols-5 gap-1 bg-black bg-opacity-50 rounded-lg m-4'>
        {Array.from({length: hotel.starRating}).map((_, index) => (
          <AiFillStar key={index} className='fill-yellow-500 text-lg' />
        ))}
      </div>

      <div className='absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md grid grid-cols-2 gap-4'>
        <span className='col-start-1 col-end-3 text-white font-bold trachking-tight text-3xl truncate ...'>
          {hotel.name}
          <div className='flex text-sm text-gray-300 '>
            <IoLocationOutline className='mr-1' />
            {hotel.city}, {hotel.country}
          </div>
        </span>

        <span className='col-start-3 col-end-3 text-white font-bold trachking-tight text-3xl'>
          {hotel.bookings.length} checkin
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
