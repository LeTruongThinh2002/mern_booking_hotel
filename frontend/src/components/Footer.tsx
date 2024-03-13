import {Link, useLocation} from 'react-router-dom';

const Footer = () => {
  const urls = useLocation();
  return (
    <>
      <div className='bg-transparent py-10'>
        <div className='container mx-auto flex lg:flex-row flex-col gap-2 justify-between items-center'>
          <span className='text-3xl font-bold tracking-tight select-none'>
            Booking.com
          </span>
          <span className=' font-bold  tracking-tight flex gap-4'>
            <p className='cursor-pointer '>
              <Link target='_blank' to={`https://github.com/LeTruongThinh2002`}>
                Contact creator
              </Link>
            </p>
            <p className='select-none'>~</p>
            <p className='cursor-pointer'>
              <Link
                target='_blank'
                to={`https://github.com/LeTruongThinh2002/mern_booking_hotel`}
              >
                Source code website
              </Link>
            </p>
          </span>
        </div>
      </div>
      {urls.pathname === '/sign-in' || urls.pathname === '/register' ? (
        <img
          title='background'
          src='https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709102253/pngegg_vlurf0.png'
          className='lg:visible invisible md:h-[800px] h-[300px] absolute z-0 right-0 bottom-0 pointer-events-none opacity-10'
          style={{transform: 'scaleX(-1)'}}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Footer;
