import DetailRow from '../../components/DetailRow';

export type Props = {
  email: string;
};

const EmailSection = ({email}: Props) => {
  return (
    <div className='grid grid-cols-1'>
      <div className='grid grid-cols-1'>
        <h3 className='text-lg font-semibold text-slate-200'>Email</h3>
        <DetailRow detail={email} />
      </div>
    </div>
  );
};

export default EmailSection;
