import {useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';
import * as apiClient from '../api-client';
import {useAppContext} from '../contexts/AppContext';
import {Link, useNavigate} from 'react-router-dom';

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {showToast} = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: {errors}
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({message: 'Registration Success!', type: 'SUCCESS'});
      await queryClient.invalidateQueries('validateToken');
      navigate('/');
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
        <h2
          className='text-3xl uppercase text-transparent text-center font-bold pointer-events-none'
          style={{
            backgroundImage:
              'url(https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709083583/typeSelected.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundClip: 'text'
          }}
        >
          Create an account
        </h2>
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
          <label className=' text-lg font-bold grid gap-2'>
            First Name
            <input
              type='text'
              className='border rounded w-full py-1 px-2 font-normal'
              {...register('firstName', {required: 'This field is required'})}
            />
            {errors.firstName && (
              <span className='text-red-500'>{errors.firstName.message}</span>
            )}
          </label>
          <label className=' text-lg font-bold grid gap-2'>
            Last Name
            <input
              type='text'
              className='border rounded w-full py-1 px-2 font-normal'
              {...register('lastName', {required: 'This field is required'})}
            />
            {errors.lastName && (
              <span className='text-red-500'>{errors.lastName.message}</span>
            )}
          </label>
        </div>
        <label className=' text-lg font-bold grid gap-2'>
          Email
          <input
            type='email'
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('email', {required: 'This field is required'})}
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}
        </label>
        <label className=' text-lg font-bold grid gap-2'>
          Password
          <input
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
          {errors.password && (
            <span className='text-red-500'>{errors.password.message}</span>
          )}
        </label>
        <label className=' text-lg font-bold grid gap-2'>
          Confirm Password
          <input
            type='password'
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('confirmPassword', {
              validate: val => {
                if (!val) {
                  return 'This field is required';
                } else if (watch('password') !== val) {
                  return "Your passwords don't match";
                }
              }
            })}
          />
          {errors.confirmPassword && (
            <span className='text-red-500'>
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <span className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
          <span className='lg:col-start-1 lg:col-end-2 text-lg'>
            Have an account?{' '}
            <Link className='underline' to='/sign-in'>
              Sign In here
            </Link>
          </span>
          <button
            type='submit'
            className='lg:col-start-3 lg:col-end-3 rounded-lg bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
          >
            Create account
          </button>
        </span>
      </form>
    </div>
  );
};

export default Register;
