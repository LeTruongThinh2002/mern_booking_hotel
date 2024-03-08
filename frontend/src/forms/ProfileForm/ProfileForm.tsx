import {IoLogoUsd} from 'react-icons/io';
import {UserType} from '../../../../backend/src/shared/types';
import DashboardCard from '../../components/DashboardCard';
import EmailSection from './EmailSection';
import NameSection from './NameSection';
import PasswordSection from './PasswordSection';
import {useQuery} from 'react-query';
import * as apiClient from '../../api-client';
import {GiCash} from 'react-icons/gi';
import {RiHandCoinLine} from 'react-icons/ri';

export type Props = {
  user: UserType;
};

const ProfileForm = ({user}: Props) => {
  const {data: hotelData} = useQuery('fetchMyHotels', apiClient.fetchMyHotels, {
    onError: () => {}
  });
  let totalCost = 0;
  let totalBooking = 0;
  let totalSpending = 0;
  if (hotelData) {
    hotelData.map(hotel => {
      totalBooking += hotel.bookings.length;
      hotel.bookings.map(booking => {
        totalCost += booking.totalCost;
        if (booking.userId === user._id) {
          totalSpending += booking.totalCost;
        }
      });
    });
  }
  return (
    <div className='grid grid-cols-1 gap-4'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold border-b border-slate-600 pb-3'>
          My profile
        </h1>
        <div className='grid grid-cols-1 gap-5'>
          <NameSection firstName={user.firstName} lastName={user.lastName} />
          <EmailSection email={user.email} password={''} verify={user.verify} />
          <PasswordSection />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold border-b border-slate-600 pt-2 pb-3'>
          Other
        </h1>
        <div className='grid lg:grid-cols-3 grid-cols-2 gap-5'>
          <DashboardCard
            title='Online Profit'
            body={totalCost + `.00$`}
            icon={
              <IoLogoUsd className='text-3xl text-green-400 scale-150 text-slate-200 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
            }
          />
          <DashboardCard
            title='Guest Booking'
            body={totalBooking + ` times`}
            icon={
              <GiCash className='text-3xl text-yellow-400 scale-150 text-slate-200 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
            }
          />
          <DashboardCard
            title='Spending'
            body={totalSpending + `.00$`}
            icon={
              <RiHandCoinLine className='text-3xl text-red-600 scale-150 text-slate-200 rounded-full p-1 shadow-md shadow-black group-hover:bg-sky-900' />
            }
          />
        </div>
      </div>
    </div>
  );
};
export default ProfileForm;
