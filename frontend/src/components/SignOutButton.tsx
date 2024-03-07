import {useMutation, useQueryClient} from 'react-query';
import * as apiClient from '../api-client';
import {useAppContext} from '../contexts/AppContext';
import {VscSignOut} from 'react-icons/vsc';

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({message: 'Signed Out!', type: 'SUCCESS'});
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'});
    }
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      title='Sign out'
      data-aos='fade-down'
      data-aos-duration='1500'
      onClick={handleClick}
      className='flex items-center text-3xl'
    >
      <VscSignOut className='hover:scale-150 hover:text-yellow-300' />
    </button>
  );
};

export default SignOutButton;
