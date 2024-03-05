type Props = {
  detail: string;
  name: string;
  onChange: (value: string) => void;
};

const DetailRowInput = ({detail, name, onChange}: Props) => {
  const handleChange = (event: {target: {value: string}}) => {
    onChange(event.target.value);
  };
  return (
    <div className='border-b border-slate-800 w-full pb-1 pt-2'>
      <input
        title={name}
        name={name}
        value={detail}
        onChange={handleChange}
        className='text-slate-400 outline-none bg-transparent lg:border-0'
      />
    </div>
  );
};
export default DetailRowInput;
