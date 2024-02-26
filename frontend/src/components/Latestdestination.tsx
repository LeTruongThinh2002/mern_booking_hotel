import {Link} from 'react-router-dom';
import {HotelType} from '../../../backend/src/shared/types';

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({hotel}: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className='relative cursor-pointer overflow-hidden rounded-md'
    >
      <div className='h-[300px]'>
        <img
          className='w-full h-full object-cover object-center'
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          title={hotel.name}
        />
      </div>
      <div className='absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md'>
        <span className='text-white font-bold trachking-tight text-3xl'>
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
