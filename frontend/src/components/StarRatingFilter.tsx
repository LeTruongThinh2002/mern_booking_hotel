type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({selectedStars, onChange}: Props) => {
  return (
    <div className='lg:border-b border-slate-300 pb-5'>
      <h4 className='text-xl font-semibold mb-2'>Property Rating</h4>
      {['5', '4', '3', '2', '1'].map((star, index) => (
        <label key={index} className='flex items-center gap-2 lg:mb-0 mb-5'>
          <input
            type='checkbox'
            className='rounded lg:scale-100 scale-150'
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
