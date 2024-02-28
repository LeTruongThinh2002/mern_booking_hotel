import {hotelTypes} from '../config/hotel-options-config';

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({selectedHotelTypes, onChange}: Props) => {
  return (
    <div className='lg:border-b border-slate-300 pb-5'>
      <h4 className='text-xl font-semibold mb-2'>Types</h4>
      <div className='grid lg:grid-cols-1 grid-cols-2 lg:gap-1 gap-2'>
        {hotelTypes.map((type, index) => (
          <label key={index} className='flex items-center gap-2 lg:mb-0 mb-5'>
            <input
              type='checkbox'
              className='rounded lg:scale-100 scale-150'
              value={type}
              checked={selectedHotelTypes.includes(type)}
              onChange={onChange}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelTypesFilter;
