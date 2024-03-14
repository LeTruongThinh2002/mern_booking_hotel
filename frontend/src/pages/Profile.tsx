import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import ProfileForm from '../forms/ProfileForm/ProfileForm';
import LoadingFailed from '../components/LoadingFailed';

const Profile = () => {
  const {data: currentUser, refetch} = useQuery(
    'fetchCurrentUser',
    apiClient.fetchCurrentUser
  );
  return (
    <>
      {currentUser ? (
        <div className='flex justify-center'>
          <ProfileForm user={currentUser} refetch={refetch} />
        </div>
      ) : (
        <LoadingFailed />
      )}
    </>
  );
};

export default Profile;
