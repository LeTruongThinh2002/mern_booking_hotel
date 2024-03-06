// DetailRow.tsx
interface Props {
  detail: string;
  onClick?: (event: any) => void; // Optional onClick handler
}

const DetailRow = ({detail, onClick}: Props) => {
  const handleClick = (event: any) => {
    onClick?.(event);
  };
  return (
    <div className='border-b border-slate-800 w-full pb-1 pt-2'>
      <span onClick={handleClick} className='text-slate-400'>
        {detail}
      </span>
    </div>
  );
};
export default DetailRow;
