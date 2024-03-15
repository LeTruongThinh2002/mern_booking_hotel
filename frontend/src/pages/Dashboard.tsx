import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import DashboardCard from '../components/DashboardCard';
import {IoLogoUsd} from 'react-icons/io';
import {GiCash} from 'react-icons/gi';
import {RiHandCoinLine, RiHotelLine} from 'react-icons/ri';
import numeral from 'numeral';
import ChartData from '../components/ChartData';
import PulseNone from '../components/PulseNone';
import {BsDatabaseFillDown} from 'react-icons/bs';
import {useEffect, useState} from 'react';
import {MdDateRange} from 'react-icons/md';
import LoadingFailed from '../components/LoadingFailed';

const Dashboard = () => {
  const defaultYear = new Date().getFullYear();
  const [year, setYear] = useState(defaultYear);

  const {data: chartData, refetch} = useQuery('chartData', () =>
    apiClient.chartData({year})
  );
  useEffect(() => {
    refetch();
  }, [year]);

  const handleChangeYear = (change: number) => {
    setYear(change);
  };

  const {data: user} = useQuery('fetchCurrentUser', apiClient.fetchCurrentUser);

  const {data: hotelData} = useQuery('fetchHotels', apiClient.fetchHotels, {
    onError: () => {}
  });
  let totalCost = 0;
  let totalBooking = 0;
  let totalSpending = 0;
  let totalHotel = 0;
  if (hotelData) {
    hotelData.map(hotel => {
      if (hotel.userId === user?._id) {
        totalHotel += 1;
        totalBooking += hotel.bookings.length;
        hotel.bookings.map(booking => {
          totalCost += booking.totalCost;
        });
      }

      hotel.bookings.map(booking => {
        if (booking.userId === user?._id) {
          totalSpending += booking.totalCost;
        }
      });
    });
  }
  let profitPayment = totalCost - totalSpending;
  return (
    <div className='grid lg:grid-cols-2 grid-cols-1 w-full lg:place-items-center gap-5'>
      {user ? (
        <div className='flex flex-col lg:items-start gap-5'>
          <h1 className='text-3xl select-none font-bold'>
            Total income and spending
          </h1>
          <div className='grid lg:grid-cols-2 lg:text-left text-center grid-cols-1 lg:gap-5 gap-1'>
            <DashboardCard
              title='Online Profit'
              body={numeral(totalCost).format('0,0.00$')}
              icon={
                <IoLogoUsd className='text-3xl text-green-400 scale-150 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
            <DashboardCard
              title='Guest Booking'
              body={totalBooking + ` times`}
              icon={
                <GiCash className='text-3xl text-yellow-400 scale-150 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
            <DashboardCard
              title='Spending'
              body={numeral(totalSpending).format('0,0.00$')}
              icon={
                <RiHandCoinLine className='text-3xl text-lime-300 scale-150 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
            <DashboardCard
              title='Profit Ratio'
              body={
                numeral(profitPayment).format('0,0.00$') +
                ` (${numeral(profitPayment / totalCost).format('0.00%')})`
              }
              icon={
                <BsDatabaseFillDown className='text-3xl text-red-600 scale-150 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
            <DashboardCard
              title='Your Register'
              body={totalHotel + ` hotel`}
              icon={
                <RiHotelLine className='text-3xl text-purple-400 scale-150 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
            <DashboardCard
              title='Year data'
              body={
                <select
                  onChange={event =>
                    handleChangeYear(Number(event.target.value))
                  }
                  title='Year data'
                  className='rounded-md w-full text-center border-b border-slate-200 group-hover:border-slate-800 bg-transparent text-slate-200 group-hover:text-slate-800'
                >
                  <option value={defaultYear}>{defaultYear}</option>
                  {[
                    defaultYear + 1,
                    defaultYear + 2,
                    defaultYear + 3,
                    defaultYear + 4
                  ].map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              }
              icon={
                <MdDateRange className='text-3xl text-rose-400 scale-150 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
          </div>
        </div>
      ) : (
        <LoadingFailed />
      )}
      {chartData ? (
        <ChartData chartData={chartData} year={year} />
      ) : (
        <PulseNone />
      )}
    </div>
  );
};

export default Dashboard;
