import {useState} from 'react';
import DetailRow from '../../components/DetailRow';
import {useMutation, useQueryClient} from 'react-query';
import {useAppContext} from '../../contexts/AppContext';
import * as apiClient from '../../api-client';
import DetailRowInput from '../../components/DetailRowInput';
import {FaCheck, FaTimes} from 'react-icons/fa';

export type ChangeEmailType = {
  password: string;
  email: string;
  verify: boolean;
  refetch: () => void;
};

const EmailSection = ({email, verify, refetch}: ChangeEmailType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState(email);
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();

  const handleClick = (event: {target: any}) => {
    setIsEditing(prevIsEditing => !prevIsEditing); // Toggle state with concise logic
    const target = event.target; // Get mouse target

    if (target.classList.contains('fa-check' || 'fa-times')) {
      setIsEditing(false);
    }
  };

  const handleChangeEmail = (value: string) => {
    setMail(value);
  };
  const handleChangePassword = (value: string) => {
    setPassword(value);
  };

  const mutation = useMutation(apiClient.changeEmail, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({message: 'Change email successfully!', type: 'SUCCESS'});
      setPassword('');
      refetch();
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'});
      setMail(email);
      setPassword('');
    }
  });
  const mutationVerify = useMutation(apiClient.vefiryEmail, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({message: 'Send verify email successfully!', type: 'SUCCESS'});
      refetch();
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'});
    }
  });

  const handleClickSaveEmail = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    mutation.mutate({
      password,
      email: mail,
      verify,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      }
    });
  };
  const handleClickVerify = () => {
    mutationVerify.mutate();
  };

  return (
    <div className='grid grid-cols-1'>
      <h3 className='text-lg font-semibold select-none text-slate-200'>
        Email
      </h3>
      {isEditing ? (
        <div className='grid grid-rows-2 gap-2'>
          <div className='w-full grid grid-cols-[9fr_1fr]'>
            <DetailRowInput
              name='password'
              placeholder='Password...'
              type='password'
              detail={password}
              onChange={handleChangePassword}
            />
          </div>
          <div className='grid grid-cols-[9fr_1fr] w-full'>
            <DetailRowInput
              name='email'
              placeholder='Email...'
              type='email'
              detail={mail}
              onChange={handleChangeEmail}
            />
            <div
              onClick={handleClick}
              className='flex items-center justify-end lg:gap-2 gap-5  border-b border-slate-800 '
            >
              <FaCheck
                type='submit'
                onClick={handleClickSaveEmail}
                className='cursor-pointer lg:text-lg text-xl fa-check'
              />
              <FaTimes className='cursor-pointer lg:text-lg text-xl fa-times' />
            </div>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-[8fr_2fr] w-full'>
          <DetailRow onClick={handleClick} detail={mail} />
          <div className='border-b border-slate-800 flex justify-end items-center'>
            {verify ? (
              <span className='border border-green-500 rounded-md text-green-500 flex justify-center items-center p-1'>
                Verify
              </span>
            ) : (
              <span
                onClick={handleClickVerify}
                className='lg:w-1/2 cursor-pointer border border-red-500 rounded-md text-red-500 flex justify-center items-center'
              >
                No verify
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailSection;
