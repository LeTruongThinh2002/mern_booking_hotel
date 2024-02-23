import {useQuery} from 'react-query';
import {useSearchContext} from '../contexts/SearchContext';
import * as apiClient from '../api-client';
import {useState} from 'react';
import SearchResultsCard from '../components/SearchResultsCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import FacilitiesFilter from '../components/FacilitiesFilter';
import PriceFilter from '../components/PriceFilter';

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>('');

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption
  };

  const {data: hotelData} = useQuery(['searchHotels', searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars(prevStars =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter(star => star !== starRating)
    );
  };
  const handleHotelTypesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelTypes = event.target.value;
    setSelectedHotelTypes(prevStars =>
      event.target.checked
        ? [...prevStars, hotelTypes]
        : prevStars.filter(type => type !== hotelTypes)
    );
  };
  const handleFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFacilities = event.target.value;
    setSelectedFacilities(prevStars =>
      event.target.checked
        ? [...prevStars, selectedFacilities]
        : prevStars.filter(facility => facility !== selectedFacilities)
    );
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div className='rounded-lg border border-slate-300 p-5 h-fit top-10 lg:sticky'>
        <div className='space-y-5'>
          <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypesChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilitiesChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <span className='text-xl font-bold'>
            {hotelData?.pagination.total} Hotels founded
            {search.destination ? ` in ${search.destination}` : ''}
          </span>
          <select
            title='Sort by'
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className='p-2 border rounded-md'
          >
            <option value=''>Sort By</option>
            <option value='starRating'>Star rating</option>
            <option value='pricePerNightASC'>Min Price Per Night</option>
            <option value='pricePerNightDesc'>Max Price Per Night</option>
          </select>
        </div>
        {hotelData?.data.map((data, index) => (
          <SearchResultsCard key={index} hotel={data} />
        ))}
        <div>
          <Pagination
            onPageChange={page => setPage(page)}
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
