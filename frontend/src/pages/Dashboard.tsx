import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import {VscLoading} from 'react-icons/vsc';
import DashboardCard from '../components/DashboardCard';
import {IoLogoUsd} from 'react-icons/io';
import {GiCash} from 'react-icons/gi';
import {RiHandCoinLine} from 'react-icons/ri';
import numeral from 'numeral';
import ChartData from '../components/ChartData';
import PulseNone from '../components/PulseNone';
//import {useState} from 'react';

const Dashboard = () => {
  //const [year, setYear] = useState(new Date().getFullYear());
  const {data: chartData} = useQuery('chartData', apiClient.chartData);
  // const handleChangeYear = (change: number) => {
  //   setYear(change);
  // };

  const {data: user} = useQuery('fetchCurrentUser', apiClient.fetchCurrentUser);

  const {data: hotelData} = useQuery('fetchHotels', apiClient.fetchHotels, {
    onError: () => {}
  });
  let totalCost = 0;
  let totalBooking = 0;
  let totalSpending = 0;
  if (hotelData) {
    hotelData.map(hotel => {
      if (hotel.userId === user?._id) {
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
              data-aos='fade-right'
              data-aos-duration='2000'
              title='Online Profit'
              body={numeral(totalCost).format('0,0.00$')}
              icon={
                <IoLogoUsd className='text-3xl text-green-600 scale-150 text-slate-200 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
            <DashboardCard
              data-aos='fade-left'
              data-aos-duration='1500'
              title='Guest Booking'
              body={totalBooking + ` times`}
              icon={
                <GiCash className='text-3xl text-yellow-400 scale-150 text-slate-200 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
            <DashboardCard
              data-aos='fade-top'
              data-aos-duration='1000'
              title='Spending'
              body={numeral(totalSpending).format('0,0.00$')}
              icon={
                <RiHandCoinLine className='text-3xl text-red-700 scale-150 text-slate-200 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
            <DashboardCard
              data-aos='fade-bottom'
              data-aos-duration='2500'
              title='Profit Ratio'
              body={
                numeral(profitPayment).format('0,0.00$') +
                ` (${numeral(profitPayment / totalCost).format('0.00%')})`
              }
              icon={
                <RiHandCoinLine className='text-3xl text-red-700 scale-150 text-slate-200 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
              }
            />
          </div>
        </div>
      ) : (
        <div className='contain-performance'>
          <h3 className='grid grid-cols-1 gap-5 place-items-center'>
            <span>
              <VscLoading className='text-3xl animate-spin' />
            </span>
            <span>Loading data failed... Please reload this page!</span>
          </h3>
        </div>
      )}
      {chartData ? (
        <ChartData chartData={chartData} year={null} />
      ) : (
        <PulseNone />
      )}
    </div>
  );
};

export default Dashboard;
