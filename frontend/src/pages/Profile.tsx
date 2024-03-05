import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import ProfileForm from '../forms/ProfileForm/ProfileForm';
import {VscLoading} from 'react-icons/vsc';

const Profile = () => {
  const {data: currentUser} = useQuery(
    'fetchCurrentUser',
    apiClient.fetchCurrentUser
  );
  return (
    <div className='flex justify-center'>
      {currentUser ? (
        <ProfileForm user={currentUser} />
      ) : (
        <div className='contain-performance'>
          <h3 className='grid grid-cols-1 gap-5 place-items-center'>
            <span>
              <VscLoading className='text-3xl animate-spin' />
            </span>
            <span>Loading profile failed... Please reload this page!</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Profile;
