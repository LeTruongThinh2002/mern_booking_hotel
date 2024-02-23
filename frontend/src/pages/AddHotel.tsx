import {useMutation} from 'react-query';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import {useAppContext} from '../contexts/AppContext';
import * as apiClient from '../api-client';

const AddHotel = () => {
  const {showToast} = useAppContext();
  const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({message: 'Hotel added successfully', type: 'SUCCESS'});
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    },
    onError: () => {
      showToast({message: 'Error Saving Hotel', type: 'ERROR'});
    }
  });
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
