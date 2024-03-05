import {UserType} from '../../../../backend/src/shared/types';
import EmailSection from './EmailSection';
import NameSection from './NameSection';
import PasswordSection from './PasswordSection';

export type Props = {
  user: UserType;
};

const ProfileForm = ({user}: Props) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      <h1 className='text-2xl font-bold border-b border-slate-600 pb-3'>
        My profile
      </h1>
      <div className='grid grid-cols-1 gap-5 lg:w-[800px] sm:w-[500px]'>
        <NameSection firstName={user.firstName} lastName={user.lastName} />
        <EmailSection email={user.email} />
        <PasswordSection />
      </div>
      <h1 className='text-2xl font-bold border-b border-slate-600 pt-2 pb-3'>
        Other
      </h1>
    </div>
  );
};
export default ProfileForm;
