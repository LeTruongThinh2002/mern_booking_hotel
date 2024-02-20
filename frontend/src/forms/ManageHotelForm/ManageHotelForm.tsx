import {FormProvider, useForm} from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  const {handleSubmit} = formMethods;

  const onSubmit = handleSubmit((formData: HotelFormData) => {
    //create new FormData object & call our API
    console.log(formData);
  });
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className='flex flex-col gap-10'>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className='flex justify-end'>
          <button type='submit' className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
};
export default ManageHotelForm;
