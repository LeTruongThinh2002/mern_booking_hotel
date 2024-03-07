import {useState} from 'react';
import DetailRow from '../../components/DetailRow';
import {useMutation, useQueryClient} from 'react-query';
import {useAppContext} from '../../contexts/AppContext';
import * as apiClient from '../../api-client';
import DetailRowInput from '../../components/DetailRowInput';
import {FaCheck, FaTimes} from 'react-icons/fa';

export type ChangePasswordType = {
  password: string;
  newPassword: string;
  reNewPassword: string;
};

const PasswordSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('*************');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();

  const setValue = () => {
    setPassword('*************');
    setNewPassword('');
    setReNewPassword('');
  };

  const handleClick = (event: {target: any}) => {
    setIsEditing(prevIsEditing => !prevIsEditing); // Toggle state with concise logic
    const target = event.target; // Get mouse target
    if (target.classList.contains('fa-times')) {
      setValue();
    }
    if (target.classList.contains('fa-check' || 'fa-times')) {
      setIsEditing(false);
    }
  };

  const handleChangePassword = (value: string) => {
    setPassword(value);
  };
  const handleChangeNewPassword = (value: string) => {
    setNewPassword(value);
  };
  const handleChangeReNewPassword = (value: string) => {
    setReNewPassword(value);
  };

  const mutation = useMutation(apiClient.changePassword, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({message: 'Change password successfully!', type: 'SUCCESS'});
      setValue();
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'});
      setValue();
    }
  });

  const handleClickSavePassword = () => {
    mutation.mutate({password, newPassword, reNewPassword});
  };

  return (
    <div className='grid grid-cols-1'>
      <h3 className='text-lg font-semibold text-slate-200'>Password</h3>
      {isEditing ? (
        <div className='grid grid-rows-3 gap-2'>
          <div className='w-full grid grid-cols-[9fr_1fr]'>
            <DetailRowInput
              name='password'
              placeholder='Password...'
              type='password'
              detail={password}
              onChange={handleChangePassword}
            />
          </div>
          <div className='w-full grid grid-cols-[9fr_1fr]'>
            <DetailRowInput
              name='newPassword'
              placeholder='New password...'
              type='password'
              detail={newPassword}
              onChange={handleChangeNewPassword}
            />
          </div>
          <div className='grid grid-cols-[9fr_1fr] w-full'>
            <DetailRowInput
              name='Renew Password'
              placeholder='Renew password...'
              type='password'
              detail={reNewPassword}
              onChange={handleChangeReNewPassword}
            />
            <div
              onClick={handleClick}
              className='flex items-center justify-end lg:gap-2 gap-5  border-b border-slate-800 '
            >
              <FaCheck
                type='submit'
                onClick={handleClickSavePassword}
                className='cursor-pointer lg:text-lg text-xl fa-check'
              />
              <FaTimes className='cursor-pointer lg:text-lg text-xl fa-times' />
            </div>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 w-full'>
          <DetailRow onClick={handleClick} detail={`*************`} />
        </div>
      )}
    </div>
  );
};

export default PasswordSection;
