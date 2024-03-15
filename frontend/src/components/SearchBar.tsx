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
  if (
    urls.pathname.startsWith('/sign-in') ||
    urls.pathname.startsWith('/register') ||
    urls.pathname.startsWith('/forgot-password') ||
    urls.pathname.startsWith('/reset-password')
  ) {
    return <></>;
  }
  return (
    <div className='container pb-10 mx-auto z-40'>
      <form
        data-aos='fade-right'
        data-aos-duration='1500'
        onSubmit={handleSubmit}
        className='-mt-8 p-3 bg-gradient-to-r from-sky-600 via-pink-500 to-yellow-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4'
      >
        <div className='flex flex-row rounded-md bg-slate-800 items-center flex-1 p-1'>
          <MdTravelExplore size={25} className='m-r2' />
          <input
            placeholder='Where are you going'
            className='text-md bg-transparent text-slate-200 w-full p-1 focus:outline-none'
            value={destination}
            onChange={e => setDestination(e.target.value)}
          />
        </div>
        <div className='flex py-1 rounded-md bg-slate-800 px-2'>
          <span className='items-center flex'>
            Adults:
            <input
              min={1}
              max={20}
              className='p-1 w-full bg-transparent text-slate-200 focus:outlie-none font-bold'
              type='number'
              value={adultCount}
              onChange={e => setAdultCount(parseInt(e.target.value))}
            />
          </span>
          <span className='items-center text-slate-200 flex'>
            Children:
            <input
              min={0}
              max={20}
              className='p-1 w-full bg-transparent text-slate-200 focus:outlie-none font-bold'
              type='number'
              value={childCount}
              onChange={e => setChildCount(parseInt(e.target.value))}
            />
          </span>
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
            className='w-full bg-slate-800 h-[40px] rounded-md text-slate-200 p-2 focus:outline-none'
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
            className='w-full  bg-slate-800 h-[40px] rounded-md text-slate-200 p-2 focus:outline-none'
            wrapperClassName='min-w-full'
          />
        </div>
        <div className='flex lg:col-start-5 lg:col-end-5 col-start-2 col-end-2 gap-2'>
          <button
            className={`w-2/3 bg-gradient-to-r from-sky-600 to-red-500 rounded-md text-slate-100 h-full p-2 font-bold text-xl shadow-md shadow-slate-800 hover:bg-[url('https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709083583/typeSelected.gif')] hover:bg-no-repeat hover:bg-center hover:bg-cover hover:text-slate-800`}
          >
            Search
          </button>
          <button
            className={`w-1/3 bg-red-700 rounded-md text-slate-100 h-full p-2 font-bold text-xl hover:shadow-md hover:shadow-slate-800 hover:bg-[url('https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709083583/typeSelected.gif')] hover:bg-no-repeat hover:bg-center hover:bg-cover hover:text-slate-800`}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
