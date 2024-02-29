import {Link} from 'react-router-dom';
import {useAppContext} from '../contexts/AppContext';
import SignOutButton from './SignOutButton';
//import DropMenu from './DropMenu';

const Header = () => {
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
        <span className='flex space-x-2'>
          {isLoggedIn ? (
            <>
              <Link
                data-aos='fade-down'
                data-aos-duration='1500'
                className='flex items-center px-3 font-bold hover:bg-blue-600'
                to='/my-bookings'
              >
                My Bookings
              </Link>
              <Link
                data-aos='fade-down'
                data-aos-duration='1500'
                className='flex items-center px-3 font-bold hover:bg-blue-600'
                to='/my-hotels'
              >
                My Hotels
              </Link>
              <SignOutButton />
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
        </span>
        {/* <span className='flex space-x-2 visible lg:invisible'>
          <DropMenu />
        </span> */}
      </div>
    </div>
  );
};

export default Header;
