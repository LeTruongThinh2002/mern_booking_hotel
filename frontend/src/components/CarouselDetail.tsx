// import Swiper core and required modules
import {EffectCoverflow, Pagination, Autoplay} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type Props = {
  images: string[];
};

export default ({images}: Props) => {
  if (!images) {
    return <div className='flex items-center'>No Images</div>;
  }
  return (
    <div className='grid w-full h-[500px] select-none'>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        pagination={{clickable: true}}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop
        className='mySwiper rounded-lg w-full pt-[50px] pb-[50px]'
      >
        {images.map(image => (
          <SwiperSlide
            className='bg-center bg-cover w-[400px] h-[400px]'
            key={image}
          >
            <img
              className='w-full block h-full object-cover object-center'
              src={image}
              alt={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
