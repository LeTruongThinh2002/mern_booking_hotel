import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import LatestDestinationCard from '../components/LatestDestinationCard';
import TrendingLocations from '../components/TrendingLocations';
import Performance from '../components/Performance';
import PulseNone from '../components/PulseNone';

const Home = () => {
  const {data: hotels} = useQuery('fetchQuery', apiClient.fetchHotels);
  const {data: performance} = useQuery(
    'fetchPerformance',
    apiClient.fetchPerformance
  );
  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2, 5) || [];
  let sortedHotels;
  if (hotels) {
    sortedHotels = [...hotels]
      .sort((a, b) => a.bookings.length - b.bookings.length)
      .reverse()
      .splice(0, 2);
  }
  return (
    <div>
      <div className='space-y-3'>
        <h2
          data-aos='fade-down'
          data-aos-duration='1500'
          className='text-3xl select-none text-center font-bold'
        >
          Trending Hotels
        </h2>
        <p
          className='select-none text-center'
          data-aos='fade-down'
          data-aos-duration='1500'
        >
          Hotels that are receiving the most interest and bookings at a certain
          <br></br>
          time. They may be newly opened hotels, recently renovated hotels, or
          <br></br>
          hotels that are simply receiving rave reviews.
        </p>
        <div className='grid gap-4'>
          {sortedHotels ? (
            <div className='grid md:grid-cols-2 grid-cols-1 mt-3 gap-4'>
              {sortedHotels.map((hotel, index) => (
                <LatestDestinationCard hotel={hotel} key={index} />
              ))}
            </div>
          ) : (
            <div className='flex lg:flex-row flex-col'>
              <PulseNone />
              <PulseNone />
              <PulseNone />
            </div>
          )}
        </div>
      </div>
      <div className='space-y-3'>
        <h2
          data-aos='fade-right'
          data-aos-duration='1500'
          className='text-3xl select-none mt-5 font-bold'
        >
          Trending Location
        </h2>
        <p
          className='select-none'
          data-aos='fade-right'
          data-aos-duration='1500'
        >
          The most chosen location today
        </p>
        <div className='grid gap-4'>
          <TrendingLocations hotels={hotels || []} />
        </div>
      </div>

      <div className='space-y-3'>
        <h2
          data-aos='fade-right'
          data-aos-duration='1500'
          className='text-3xl select-none mt-5 font-bold'
        >
          Latest Destination
        </h2>
        <p
          className='select-none'
          data-aos='fade-right'
          data-aos-duration='1500'
        >
          Most recent destiation added by our hosts
        </p>
        <div className='grid gap-4'>
          {topRowHotels.length !== 0 ? (
            <>
              <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                {topRowHotels.map((hotel, index) => (
                  <LatestDestinationCard hotel={hotel} key={index} />
                ))}
              </div>
              <div className='grid md:grid-cols-3 grid-cols-2 gap-4'>
                {bottomRowHotels.map((hotel, index) => (
                  <LatestDestinationCard hotel={hotel} key={index} />
                ))}
              </div>
            </>
          ) : (
            <div className='flex lg:flex-row  items-center flex-col'>
              <PulseNone />
              <PulseNone />
              <PulseNone />
            </div>
          )}
        </div>
      </div>

      <div className='space-y-3'>
        <h2
          data-aos='fade-up'
          data-aos-duration='1500'
          className='text-3xl select-none mt-5 text-center font-bold'
        >
          Website performance
        </h2>
        <Performance performance={performance} />
      </div>
    </div>
  );
};

export default Home;
