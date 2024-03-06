type Props = {
  detail: string;
  name: string;
  placeholder: string | 'input your text...';
  type: string | 'text';
  onChange: (value: string) => void;
};

const DetailRowInput = ({detail, placeholder, type, name, onChange}: Props) => {
  const handleChange = (event: {target: {value: string}}) => {
    onChange(event.target.value);
  };
  return (
    <div className='border-b border-slate-800 w-full pb-1 pt-2'>
      <input
        title={name}
        placeholder={placeholder}
        type={type}
        name={name}
        value={detail}
        onChange={handleChange}
        className='text-slate-400 bg-transparent w-full outline-none lg:border-0'
      />
    </div>
  );
};
export default DetailRowInput;
