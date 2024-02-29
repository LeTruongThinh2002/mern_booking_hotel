import {GiTimeBomb} from 'react-icons/gi';
import {LiaHotelSolid} from 'react-icons/lia';
import {SiGoogleearth} from 'react-icons/si';
import {TfiLocationPin} from 'react-icons/tfi';

const Performance = ({performance}: any) => {
  let totalLocations = 0;
  let totalBookings = 0;
  let totalHotels = 0;
  if (performance) {
    // 1. Total locations (cities)
    totalLocations = performance[0].length || 0;
    // 2. Total bookings (sum of counts)
    totalBookings =
      performance[0].reduce(
        (acc: any, city: {count: any}) => acc + city.count,
        0
      ) || 0;

    // 3. Total hotels (provided data)
    totalHotels = performance[1] || 0;
  }

  const now = new Date();
  const date2024 = new Date(2024, 1, 20);
  const daysElapsed = Math.floor(
    (now.getTime() - date2024.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      data-aos='fade-up'
      data-aos-duration='1500'
      className='grid lg:grid-cols-4 grid-cols-1 gap-4 content-evenly p-4 rounded-lg bg-gray-200'
      style={{
        backgroundImage:
          'url(https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709083583/typeSelected.gif)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className='contain-performance'>
        <h3 className='grid grid-cols-1 gap-2 place-items-center'>
          <span>
            <TfiLocationPin className='text-3xl animate-bounce' />
          </span>
          <span> Location </span>
          <span>{totalLocations}</span>
        </h3>
      </div>
      <div className='contain-performance'>
        <h3 className='grid grid-cols-1 gap-2 place-items-center'>
          <span>
            <SiGoogleearth className='text-3xl animate-spin' />
          </span>
          <span>Booking</span>
          <span>{totalBookings}</span>
        </h3>
      </div>
      <div className='contain-performance'>
        <h3 className='grid grid-cols-1 gap-2 place-items-center'>
          <span>
            <LiaHotelSolid className='text-3xl animate-[wiggle_0.5s_ease-in-out_infinite]' />
          </span>
          <span> Hotels </span>
          <span>{totalHotels}</span>
        </h3>
      </div>
      <div className='contain-performance'>
        <h3 className='grid grid-cols-1 gap-2  place-items-center'>
          <span>
            <GiTimeBomb className='text-3xl animate-pulse' />
          </span>
          <span> Operating time </span>
          <span>{daysElapsed}</span>
        </h3>
      </div>
    </div>
  );
};

export default Performance;
