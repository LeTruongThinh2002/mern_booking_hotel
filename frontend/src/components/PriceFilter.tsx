type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({selectedPrice, onChange}: Props) => {
  return (
    <div>
      <h4 className='text-xl font-semibold mb-2'>Max Price</h4>
      <select
        title='Max Price'
        className=' p-2 border border-gray-300 rounded-md w-full focus:border-blue-500 '
        value={selectedPrice}
        onChange={e =>
          onChange(e.target.value ? parseInt(e.target.value) : undefined)
        }
      >
        <option value=''>Select max price</option>
        {[50, 100, 200, 300, 500].map(price => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
