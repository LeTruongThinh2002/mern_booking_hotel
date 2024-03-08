import {Link} from 'react-router-dom';
import {useAppContext} from '../contexts/AppContext';
import SignOutButton from './SignOutButton';
import {BsBuildingCheck, BsPersonBadge} from 'react-icons/bs';
import {TbMapPinCheck} from 'react-icons/tb';
import DropMenu from './DropMenu';
import {useEffect, useMemo, useState} from 'react';

const Header = () => {
  const [size, setSize] = useState(window.innerWidth);

  // Use useMemo to avoid unnecessary re-renders based on window size
  const isLargeScreen = useMemo(() => size >= 1024, [size]);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setSize]);

  const {isLoggedIn} = useAppContext();
  return (
    <div className='bg-slate-900 py-6'>
      <img
        title='background'
        src='https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709044083/docs_tinypng.d9e4dcdc_cjsb0g.png'
        className='absolute z-0 top-0 pointer-events-none opacity-25'
      />
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl font-bold tracking-tight'>
          <Link to='/'>Booking.com</Link>
        </span>
        {isLoggedIn ? (
          <>
            {isLargeScreen ? (
              <span className='grid grid-cols-4 lg:gap-20 gap-14'>
                <Link
                  title='Your booking'
                  className='flex items-center text-3xl '
                  to='/my-bookings'
                >
                  <TbMapPinCheck className='hover:scale-150 hover:text-yellow-300' />
                </Link>
                <Link
                  title='Your hotels'
                  className='flex items-center text-3xl'
                  to='/my-hotels'
                >
                  <BsBuildingCheck className='hover:scale-150 hover:text-yellow-300' />
                </Link>
                <Link
                  title='Profile'
                  className='flex items-center text-3xl'
                  to='/profile'
                >
                  <BsPersonBadge className='hover:scale-150 hover:text-yellow-300' />
                </Link>
                <SignOutButton />
              </span>
            ) : (
              <span>
                <DropMenu />
              </span>
            )}
          </>
        ) : (
          <Link
            to='/sign-in'
            className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100'
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
