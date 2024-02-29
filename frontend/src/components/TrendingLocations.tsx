import unidecode from 'unidecode';
import {HotelType} from '../../../backend/src/shared/types';
import {useSearchContext} from '../contexts/SearchContext';
import {useNavigate} from 'react-router-dom';
type Props = {
  hotels: HotelType[];
};

const TrendingLocations = ({hotels}: Props) => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const trendingLocations: {city: string; count: number}[] =
    hotels
      ?.reduce((acc: {city: string; count: number}[], hotel) => {
        const city = hotel.city.split(',').reverse()[0].trim();
        const count = hotel.bookings.length;

        const existingCity = acc.find(location => location.city === city);
        if (existingCity) {
          existingCity.count += count;
        } else {
          acc.push({city, count});
        }
        return acc;
      }, [])
      .sort((a, b) => a.count - b.count)
      .reverse() || [];

  if (trendingLocations.length === 0) {
    return <div>No trending Locations</div>;
  }
  const topTrending = trendingLocations.splice(0, 2);
  const bottomTrending = trendingLocations.splice(0, 3);
  const handleSubmit = (city: string) => {
    search.saveSearchValues(city, search.checkIn, search.checkOut, 1, 0);
    navigate('/search');
  };
  return (
    <>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-4 group'>
        {topTrending.map((lct, index) => (
          <div
            key={index}
            className='relative cursor-pointer overflow-hidden rounded-md hover:shadow-2xl hover:shadow-slate-400 hover:transition-all hover:duration-300'
            onClick={() => handleSubmit(lct.city)}
          >
            <div
              className='h-[300px]'
              data-aos='fade-left'
              data-aos-duration='1500'
            >
              <img
                className='w-full h-full object-cover object-center'
                src={`https://res.cloudinary.com/dd0tbhnzl/image/upload/v1708661832/${unidecode(
                  lct.city
                )
                  .replace(/\s/g, '')
                  .toLowerCase()}.webp`}
                onError={event => {
                  (event.target as HTMLImageElement).src =
                    'https://res.cloudinary.com/dd0tbhnzl/image/upload/v1708661832/none.webp';
                }}
                alt={lct.city}
                title={lct.city}
              />
            </div>
            <div className='absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md grid grid-cols-2 gap-4'>
              <span className='col-start-1 col-end-2 text-white font-bold trachking-tight text-3xl'>
                {lct.city}
              </span>
              <span className='col-start-3 col-end-3 text-white font-bold trachking-tight text-3xl'>
                {lct.count} checkin
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {bottomTrending.map((lct, index) => (
          <div
            onClick={() => handleSubmit(lct.city)}
            key={index}
            className='relative cursor-pointer overflow-hidden rounded-md hover:shadow-2xl hover:shadow-slate-400 hover:transition-all hover:duration-300'
          >
            <div
              className='h-[300px]'
              data-aos='fade-left'
              data-aos-duration='1500'
            >
              <img
                className='w-full h-full object-cover object-center'
                src={`https://res.cloudinary.com/dd0tbhnzl/image/upload/v1708661832/${unidecode(
                  lct.city
                )
                  .replace(/\s/g, '')
                  .toLowerCase()}.webp`}
                onError={event => {
                  (event.target as HTMLImageElement).src =
                    'https://res.cloudinary.com/dd0tbhnzl/image/upload/v1708661832/none.webp';
                }}
                alt={lct.city}
                title={lct.city}
              />
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md'>
              <span className='lg:col-start-1 lg:col-end-3 text-white font-bold trachking-tight text-3xl truncate lines-2 overflow-hidden text-ellipsis'>
                {lct.city}
              </span>
              <span className='lg:col-start-3 lg:col-end-3 text-white font-bold trachking-tight text-3xl'>
                {lct.count} checkin
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TrendingLocations;
