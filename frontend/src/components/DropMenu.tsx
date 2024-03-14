import {Popover} from '@headlessui/react';
import {TbMapPinCheck, TbPigMoney} from 'react-icons/tb';
import {BsBuildingCheck, BsPersonBadge} from 'react-icons/bs';
import {HiMenu} from 'react-icons/hi';
import {VscSignOut} from 'react-icons/vsc';
import {useMutation, useQueryClient} from 'react-query';
import {useAppContext} from '../contexts/AppContext';
import * as apiClient from '../api-client';
import {Link} from 'react-router-dom';

const solutions = [
  {
    name: 'Your Bookings',
    description: 'The hotel rooms you have paid',
    href: '/my-bookings',
    icon: (
      <TbMapPinCheck
        className='text-3xl text-gray-600 group-hover:text-slate-200'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Your Hotels',
    description: 'The hotel rooms you posted',
    href: '/my-hotels',
    icon: (
      <BsBuildingCheck
        className='text-3xl text-gray-600 group-hover:text-slate-200'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Dashboard',
    description: 'Summary of spending and income data',
    href: '/dashboard',
    icon: (
      <TbPigMoney
        className='text-3xl text-gray-600 group-hover:text-slate-200'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Profile',
    description: 'Your personal information and account',
    href: '/profile',
    icon: (
      <BsPersonBadge
        className='text-3xl text-gray-600 group-hover:text-slate-200'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Log Out',
    description: 'Log out and log in other accounts',
    href: '#',
    icon: (
      <VscSignOut
        className='text-3xl text-gray-600 group-hover:text-slate-200'
        aria-hidden='true'
      />
    )
  }
];

const DropMenu = () => {
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
    <Popover className={'relative'}>
      <Popover.Button className='flex justify-end items-center text-3xl font-bold text-slate-200 mr-5'>
        <HiMenu aria-hidden='true' />
      </Popover.Button>
      <Popover.Panel className='absolute right-1/2 z-10 mt-2 flex w-screen max-w-lg -translate-x-1/2 px-4 transform translate-x-[10px]'>
        <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-orange-200 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
          <div className='p-4'>
            {solutions.map(item => (
              <Link to={item.href}>
                <div
                  onClick={item.name === 'Log Out' ? handleClick : undefined}
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-[url('https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709083583/typeSelected.gif')] hover:bg-no-repeat hover:bg-center hover:bg-cover"
                >
                  <div className='mt-1 flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-slate-800'>
                    {item.icon}
                  </div>
                  <div className='font-bold text-xl text-slate-900'>
                    {item.name}
                    <span className='absolute inset-0 ' />
                    <p className='mt-1 text-lg font-semibold text-slate-800'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
export default DropMenu;
