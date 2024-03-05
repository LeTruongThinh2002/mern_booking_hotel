// DetailRow.tsx
interface Props {
  detail: string;
  onClick?: () => void; // Optional onClick handler
}

const DetailRow = ({detail, onClick}: Props) => {
  return (
    <div className='border-b border-slate-800 w-full pb-1 pt-2'>
      <span onClick={onClick} className='text-slate-400'>
        {detail}
      </span>
    </div>
  );
};
export default DetailRow;
