import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';
import * as apiClient from '../api-client';
import {useAppContext} from '../contexts/AppContext';
import {Link, useLocation, useNavigate} from 'react-router-dom';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {showToast} = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({message: 'Sign In Successful!', type: 'SUCCESS'});
      await queryClient.invalidateQueries('validateToken');
      navigate(location.state?.from?.pathname || '/');
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
        <h2 className="text-3xl select-none text-transparent text-center font-bold pointer-events-none bg-[url('https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709083583/typeSelected.gif')] bg-center bg-cover bg-no-repeat bg-clip-text">
          SIGN IN
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
        <label className='text-lg select-none font-bold grid gap-2'>
          Password
          <input
            placeholder='Password'
            type='password'
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
          />
        </label>
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}

        <span className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
          <span className='lg:col-start-1 lg:col-end-2 lg:text-lg text-xl'>
            <div>
              Not Registered?{' '}
              <Link className='underline' to='/register'>
                Create an account here
              </Link>
            </div>
            <div>
              <Link
                className='underline text-sky-400 font-semibold'
                to='/forgot-password'
              >
                Forgot password?
              </Link>
            </div>
          </span>
          <button
            type='submit'
            className='lg:col-start-3 lg:col-end-3 rounded-lg bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
          >
            Log In
          </button>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
