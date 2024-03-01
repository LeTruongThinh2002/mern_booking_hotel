import {useForm} from 'react-hook-form';
import DatePicker from 'react-datepicker';
import {useSearchContext} from '../../contexts/SearchContext';
import {useAppContext} from '../../contexts/AppContext';
import {useLocation, useNavigate} from 'react-router-dom';
import {TbCalendarHeart} from 'react-icons/tb';

type Props = {hotelId: string; pricePerNight: number};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({hotelId, pricePerNight}: Props) => {
  const search = useSearchContext();
  const {isLoggedIn} = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: {errors}
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount
    }
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate('/sign-in', {state: {from: location}});
  };
  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`, {state: {from: location}});
  };

  return (
    <div className='flex flex-col p-4 bg-blue-200 gap-4'>
      <h3 className='text-black text-md font-bol'>${pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className='grid grid-cols-1 gap-4 items-center'>
          <div>
            <DatePicker
              selected={checkIn}
              onChange={date => {
                setValue('checkIn', date as Date);
              }}
              selectsStart
              icon={<TbCalendarHeart className='text-slate-400 text-xl' />}
              showIcon
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={new Date(checkOut.getTime() - 86400000)}
              placeholderText='Check-in Date'
              className='min-w-full bg-white p-2 focus:outline-none'
              wrapperClassName='min-w-full'
            />
          </div>
          <div>
            <DatePicker
              selected={checkOut}
              onChange={date => {
                setValue('checkOut', date as Date);
              }}
              selectsStart
              icon={<TbCalendarHeart className='text-slate-400 text-xl' />}
              showIcon
              startDate={new Date(checkIn.getTime() + 86400000)}
              endDate={checkOut}
              minDate={new Date(checkIn.getTime() + 86400000)}
              maxDate={maxDate}
              placeholderText='Check-in Date'
              className='min-w-full bg-white p-2 focus:outline-none'
              wrapperClassName='min-w-full'
            />
          </div>
          <div className='flex py-1 bg-white px-2'>
            <label className='items-center flex'>
              Adults:
              <input
                className='p-1 w-full focus:outlie-none font-bold'
                type='number'
                min={1}
                max={20}
                {...register('adultCount', {
                  required: 'This field is required',
                  min: {
                    value: 1,
                    message: 'Adults must be at least 1'
                  },
                  valueAsNumber: true
                })}
              />
            </label>
            <label className='items-center flex'>
              Children:
              <input
                className='p-1 w-full focus:outlie-none font-bold'
                type='number'
                min={0}
                max={20}
                {...register('childCount', {
                  valueAsNumber: true
                })}
              />
            </label>
            {errors.adultCount && (
              <span className='text-red-500 text-sm font-semibold'>
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl'>
              Book Now
            </button>
          ) : (
            <button className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl'>
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
