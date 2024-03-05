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
};

const NameSection = ({firstName, lastName}: ChangeNameType) => {
  const [isEditing, setIsEditing] = useState(false); // Use a descriptive variable name
  const [isEditingLastName, setIsEditingLastName] = useState(false); // Use a descriptive variable name
  const [valueFirstName, setValueFirstName] = useState(firstName);
  const [valueLastName, setValueLastName] = useState(lastName);
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();

  const handleClick = (event: {target: any}) => {
    setIsEditing(prevIsEditing => !prevIsEditing); // Toggle state with concise logic
    const target = event.target; // Get mouse target
    setValueFirstName(firstName);
    if (
      target.classList.contains('fa-check') ||
      target.classList.contains('fa-times')
    ) {
      setIsEditing(false);
    }
  };
  const handleClickLastName = (event: {target: any}) => {
    setIsEditingLastName(prevIsEditing => !prevIsEditing); // Toggle state with concise logic
    const target = event.target; // Get mouse target
    setValueLastName(lastName);

    if (
      target.classList.contains('fa-check') ||
      target.classList.contains('fa-times')
    ) {
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
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'});
    }
  });

  const handleClickSaveFirstName = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    mutation.mutate({firstName: valueFirstName, lastName});
  };
  const handleClickSaveLastName = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    mutation.mutate({firstName, lastName: valueLastName});
  };

  return (
    <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
      <div className='grid grid-cols-1'>
        <h3 className='text-lg font-semibold text-slate-200'>First Name</h3>
        <div className='grid grid-cols-[9fr_1fr] gap-2 w-full'>
          {isEditing ? (
            <DetailRowInput
              name='firstName'
              detail={valueFirstName}
              onChange={handleChangeFirstName}
            />
          ) : (
            <div onClick={handleClick}>
              <DetailRow detail={valueFirstName} />
            </div>
          )}
          {isEditing && ( // Render icons only when editing
            <div
              onClick={handleClick}
              className='flex items-center justify-end lg:gap-2 gap-5'
            >
              <FaCheck
                onClick={handleClickSaveFirstName}
                className='cursor-pointer lg:text-lg text-xl fa-check'
              />
              <FaTimes className='cursor-pointer lg:text-lg text-xl fa-times' />
            </div>
          )}
        </div>
      </div>
      <div className='grid grid-cols-1'>
        <h3 className='text-lg font-semibold text-slate-200'>Last Name</h3>
        <div className='grid grid-cols-[9fr_1fr] w-full'>
          {isEditingLastName ? (
            <DetailRowInput
              name='lastName'
              detail={valueLastName}
              onChange={handleChangeLastName}
            />
          ) : (
            <div onClick={handleClickLastName}>
              <DetailRow detail={lastName} />
            </div>
          )}
          {isEditingLastName && ( // Render icons only when editing
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
          )}
        </div>
      </div>
    </div>
  );
};

export default NameSection;
