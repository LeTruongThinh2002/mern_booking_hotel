import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import * as apiClient from '../api-client';
import {useAppContext} from '../contexts/AppContext';
import {Link, useNavigate} from 'react-router-dom';

export type ForgotFormData = {
  email: string;
};

const ForgotPassword = () => {
  const {showToast} = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<ForgotFormData>();

  const mutation = useMutation(apiClient.forgotPassword, {
    onSuccess: async () => {
      showToast({
        message: 'Send email reset password successful!',
        type: 'SUCCESS'
      });
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
    <div className='flex my-5 justify-center'>
      <form
        data-aos='fade-right'
        data-aos-duration='1500'
        className='flex flex-col gap-5 lg:w-[800px] sm:w-[500px]'
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl select-none text-transparent text-center font-bold pointer-events-none bg-[url('https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709083583/typeSelected.gif')] bg-center bg-cover bg-no-repeat bg-clip-text">
          FORGOT PASSWORD
        </h2>
        <label className='text-lg select-none font-bold grid gap-2'>
          Email
          <input
            placeholder='Email Address'
            type='email'
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('email', {required: 'This field is required'})}
          />
        </label>
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
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
            Send email reset new password
          </button>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;
