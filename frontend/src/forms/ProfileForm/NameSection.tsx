import {useState} from 'react';
import DetailRow from '../../components/DetailRow';
import DetailRowInput from '../../components/DetailRowInput';
import {FaCheck, FaTimes} from 'react-icons/fa';
import {useMutation, useQueryClient} from 'react-query';
import * as apiClient from '../../api-client';
import {useAppContext} from '../../contexts/AppContext';

export type ChangeNameType = {
  firstName: string;
  lastName: string;
  refetch: () => void;
};

const NameSection = ({firstName, lastName, refetch}: ChangeNameType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [valueFirstName, setValueFirstName] = useState(firstName);
  const [valueLastName, setValueLastName] = useState(lastName);
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();

  const handleClick = (event: {target: any}) => {
    setIsEditing(prevIsEditing => !prevIsEditing); // Toggle state with concise logic
    const target = event.target; // Get mouse target
    if (target.classList.contains('fa-check') && valueFirstName.length === 0) {
      setValueFirstName(firstName);
    }
    if (target.classList.contains('fa-check' || 'fa-times')) {
      setIsEditing(false);
    }
  };
  const handleClickLastName = (event: {target: any}) => {
    setIsEditingLastName(prevIsEditing => !prevIsEditing); // Toggle state with concise logic
    const target = event.target; // Get mouse target
    // if (target.classList.contains('fa-check') && valueLastName.length === 0) {
    //   setValueLastName(lastName);
    // }
    if (target.classList.contains('fa-check' || 'fa-times')) {
      setIsEditingLastName(false);
    }
  };

  const handleChangeFirstName = (value: string) => {
    setValueFirstName(value);
  };
  const handleChangeLastName = (value: string) => {
    setValueLastName(value);
  };

  const mutation = useMutation(apiClient.changeName, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({message: 'Change name successfully!', type: 'SUCCESS'});
      refetch();
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'});
    }
  });

  const handleClickSaveFirstName = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    mutation.mutate({
      firstName: valueFirstName,
      lastName,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      }
    });
  };
  const handleClickSaveLastName = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    mutation.mutate({
      firstName,
      lastName: valueLastName,
      refetch: function (): void {
        throw new Error('Function not implemented.');
      }
    });
  };

  return (
    <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
      <div className='grid grid-cols-1'>
        <h3 className='text-lg font-semibold select-none text-slate-200'>
          First Name
        </h3>
        {isEditing ? (
          <div className='grid grid-cols-[8fr_2fr] w-full'>
            <DetailRowInput
              name='firstName'
              type='text'
              placeholder='First name...'
              detail={valueFirstName}
              onChange={handleChangeFirstName}
            />
            <div
              onClick={handleClick}
              className='flex items-center justify-end lg:gap-2 gap-5  border-b border-slate-800 '
            >
              <FaCheck
                onClick={handleClickSaveFirstName}
                className='cursor-pointer lg:text-lg text-xl fa-check'
              />
              <FaTimes className='cursor-pointer lg:text-lg text-xl fa-times' />
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 w-full' onClick={handleClick}>
            <DetailRow detail={valueFirstName} />
          </div>
        )}
      </div>
      <div className='grid grid-cols-1'>
        <h3 className='text-lg font-semibold select-none text-slate-200'>
          Last Name
        </h3>
        {isEditingLastName ? (
          <div className='grid grid-cols-[8fr_2fr] w-full'>
            <DetailRowInput
              name='lastName'
              placeholder='Last name...'
              type='text'
              detail={valueLastName}
              onChange={handleChangeLastName}
            />
            <div
              onClick={handleClickLastName}
              className='flex items-center justify-end lg:gap-2 gap-5 border-b border-slate-800 '
            >
              <FaCheck
                onClick={handleClickSaveLastName}
                className='cursor-pointer lg:text-lg text-xl fa-check'
              />
              <FaTimes className='cursor-pointer lg:text-lg text-xl fa-times' />
            </div>
          </div>
        ) : (
          <div
            className='grid grid-cols-1 w-full'
            onClick={handleClickLastName}
          >
            <DetailRow detail={valueLastName} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NameSection;
