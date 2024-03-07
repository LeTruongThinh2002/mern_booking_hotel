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
    <div className='bg-transparent py-6'>
      <div className='container mx-auto flex justify-between'>
        <span
          data-aos='fade-down'
          data-aos-duration='1500'
          className='text-3xl font-bold tracking-tight'
        >
          <Link to='/'>Booking.com</Link>
        </span>
        {isLoggedIn ? (
          <>
            {isLargeScreen ? (
              <span className='grid grid-cols-4 lg:gap-20 gap-14'>
                <Link
                  title='Your booking'
                  data-aos='fade-down'
                  data-aos-duration='1500'
                  className='flex items-center text-3xl'
                  to='/my-bookings'
                >
                  <TbMapPinCheck className='hover:scale-150 hover:text-yellow-300' />
                </Link>
                <Link
                  title='Your hotels'
                  data-aos='fade-down'
                  data-aos-duration='1500'
                  className='flex items-center text-3xl'
                  to='/my-hotels'
                >
                  <BsBuildingCheck className='hover:scale-150 hover:text-yellow-300' />
                </Link>
                <Link
                  title='Profile'
                  data-aos='fade-down'
                  data-aos-duration='1500'
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
            data-aos='fade-down'
            data-aos-duration='1500'
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
