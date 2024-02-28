import {hotelFacilities} from '../config/hotel-options-config';

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({selectedFacilities, onChange}: Props) => {
  return (
    <div className='lg:border-b border-slate-300 pb-5'>
      <h4 className='text-xl font-semibold mb-2'>Facilities</h4>
      {hotelFacilities.map((facility, index) => (
        <label key={index} className='flex items-center gap-2 lg:mb-0 mb-5'>
          <input
            type='checkbox'
            className='rounded lg:scale-100 scale-150'
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
