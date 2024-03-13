import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import * as apiClient from '../api-client';
import {useAppContext} from '../contexts/AppContext';
import {Link, useNavigate, useParams} from 'react-router-dom';

export type ResetPasswordFormData = {
  newPassword: string;
  reNewPassword: string;
  token: string;
};

const ResetPassword = () => {
  const {token} = useParams();
  console.log(token);
  const {showToast} = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<ResetPasswordFormData>();

  const mutation = useMutation(apiClient.verifyForgotPassword, {
    onSuccess: async () => {
      showToast({message: 'Reset password successful!', type: 'SUCCESS'});
      navigate('/sign-in');
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'});
    }
  });

  const onSubmit = handleSubmit(data => {
    mutation.mutate(data);
  });

  return (
    <div className='flex justify-center'>
      <form
        data-aos='fade-right'
        data-aos-duration='1500'
        className='flex flex-col gap-5 lg:w-[800px] sm:w-[500px]'
        onSubmit={onSubmit}
      >
        <input
          type='text'
          {...register('token', {required: 'Token is required'})}
          value={token}
          className='hidden'
        />
        <h2
          className='text-3xl text-transparent text-center font-bold pointer-events-none'
          style={{
            backgroundImage:
              'url(https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709083583/typeSelected.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundClip: 'text'
          }}
        >
          Reset Password
        </h2>
        <label className='text-lg font-bold grid gap-2'>
          New Password
          <input
            placeholder='Email Address'
            type='password'
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('newPassword', {required: 'This field is required'})}
          />
        </label>
        {errors.newPassword && (
          <span className='text-red-500'>{errors.newPassword.message}</span>
        )}
        <label className='text-lg font-bold grid gap-2'>
          Confirm Password
          <input
            placeholder='Email Address'
            type='password'
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('reNewPassword', {required: 'This field is required'})}
          />
        </label>
        {errors.reNewPassword && (
          <span className='text-red-500'>{errors.reNewPassword.message}</span>
        )}

        <span className='flex lg:flex-row flex-col gap-4'>
          <span className='basis-2/4 lg:text-lg text-xl'>
            Not Registered?{' '}
            <Link className='underline' to='/register'>
              Create an account here
            </Link>
          </span>
          <button
            type='submit'
            className='basis-2/4 rounded-lg bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
          >
            Reset Password
          </button>
        </span>
      </form>
    </div>
  );
};

export default ResetPassword;
