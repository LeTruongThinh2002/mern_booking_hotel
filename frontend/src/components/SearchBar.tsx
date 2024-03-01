import {FormEvent, useState} from 'react';
import {useSearchContext} from '../contexts/SearchContext';
import {MdTravelExplore} from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {TbCalendarHeart} from 'react-icons/tb';

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const urls = useLocation();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(
    new Date(checkIn.getTime() + 86400000)
  );
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate('/search');
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  if (urls.pathname === '/sign-in' || urls.pathname === '/register') {
    return <></>;
  }
  return (
    <div className='container pb-10 mx-auto'>
      <form
        data-aos='fade-right'
        data-aos-duration='1500'
        onSubmit={handleSubmit}
        className='-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4'
      >
        <div className='flex flex-row items-center flex-1 bg-white p-1'>
          <MdTravelExplore size={25} className='m-r2' />
          <input
            placeholder='Where are you going'
            className='text-md w-full p-1 focus:outline-none'
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
        </div>
        <div className='flex py-1 bg-white px-2'>
          <label className='items-center flex'>
            Adults:
            <input
              min={1}
              max={20}
              className='p-1 w-full focus:outlie-none font-bold'
              type='number'
              value={adultCount}
              onChange={e => setAdultCount(parseInt(e.target.value))}
            />
          </label>
          <label className='items-center flex'>
            Children:
            <input
              min={0}
              max={20}
              className='p-1 w-full focus:outlie-none font-bold'
              type='number'
              value={childCount}
              onChange={e => setChildCount(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <DatePicker
            selected={checkIn}
            onChange={date => {
              setCheckIn(date as Date);
            }}
            selectsStart
            icon={<TbCalendarHeart className='text-slate-400 text-xl' />}
            showIcon
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={new Date(checkOut.getTime() - 86400000)}
            placeholderText='Check-in Date'
            className='w-full bg-white p-2 focus:outline-none'
            wrapperClassName='min-w-full'
          />
        </div>
        <div>
          <DatePicker
            selected={checkOut}
            onChange={date => {
              setCheckOut(date as Date);
            }}
            selectsStart
            icon={<TbCalendarHeart className='text-slate-400 text-xl' />}
            showIcon
            startDate={new Date(checkIn.getTime() + 86400000)}
            endDate={checkOut}
            minDate={new Date(checkIn.getTime() + 86400000)}
            maxDate={maxDate}
            placeholderText='Check-out Date'
            className='w-full bg-white p-2 focus:outline-none'
            wrapperClassName='min-w-full'
          />
        </div>
        <div className='flex gap-1'>
          <button className='w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500'>
            Search
          </button>
          <button className='w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500'>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
