import {VscLoading} from 'react-icons/vsc';

const LoadingFailed = () => {
  return (
    <div className='flex justify-center'>
      <div className='contain-performance'>
        <h3 className='grid animate-pulse select-none grid-cols-1 gap-5 place-items-center'>
          <span>
            <VscLoading className='text-3xl animate-spin' />
          </span>
          <span>Loading...</span>
        </h3>
      </div>
    </div>
  );
};

export default LoadingFailed;
