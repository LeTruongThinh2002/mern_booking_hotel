import {useMutation, useQuery} from 'react-query';
import {useParams} from 'react-router-dom';
import * as apiClient from '../api-client';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import {useAppContext} from '../contexts/AppContext';

const EditHotel = () => {
  const {hotelId} = useParams();
  const {showToast} = useAppContext();

  const {data: hotel} = useQuery('fetchMyHotelById', () => apiClient.fetchMyHotelById(hotelId || ''), {
    enabled: !!hotelId
  });

  const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({message: 'Hotel updated successfully', type: 'SUCCESS'});
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    },
    onError: () => {
      showToast({message: 'Error Saving Hotel', type: 'ERROR'});
    }
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return <ManageHotelForm onSave={handleSave} hotel={hotel} isLoading={isLoading} />;
};

export default EditHotel;
