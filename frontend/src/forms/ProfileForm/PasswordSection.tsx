import DetailRow from '../../components/DetailRow';

const PasswordSection = () => {
  return (
    <div className='grid grid-cols-1'>
      <div className='grid grid-cols-1'>
        <h3 className='text-lg font-semibold text-slate-200'>Password</h3>
        <DetailRow detail={'***************'} />
      </div>
    </div>
  );
};

export default PasswordSection;
