// import Swiper core and required modules
import {EffectCoverflow, Pagination} from 'swiper/modules';

import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import {BookingCard} from '../../../backend/src/shared/types';
import AccessCard from './AccessCard';
import PulseNone from './PulseNone';
import DeniedCard from './DeniedCard';

type Props = {
  access: BookingCard[];
  denied: BookingCard[];
};

const CarouselAccessCard = ({access, denied}: Props) => {
  return (
    <div className='grid grid-cols-1 gap-5 w-full select-none'>
      <div>
        <h2 className='text-xl select-none font-bold'>Access Card</h2>
        {access ? (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: -90,
              depth: 0,
              modifier: 1,
              slideShadows: false
            }}
            modules={[EffectCoverflow, Pagination]}
            pagination={{clickable: true}}
            loop
            className='mySwiper rounded-lg w-full'
          >
            {access.map((card, index) => (
              <SwiperSlide
                key={index}
                className='bg-center bg-cover w-[450px] h-[450px] flex items-center'
              >
                <AccessCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <PulseNone />
        )}
      </div>
      <div>
        <h2 className='text-xl select-none font-bold'>Denied Card</h2>
        {denied ? (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: -90,
              depth: 0,
              modifier: 1,
              slideShadows: false
            }}
            modules={[EffectCoverflow, Pagination]}
            pagination={{clickable: true}}
            loop
            className='mySwiper rounded-lg w-full'
          >
            {denied.map((card, index) => (
              <SwiperSlide
                key={index}
                className='bg-center bg-cover w-[450px] h-[450px] flex items-center'
              >
                <DeniedCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <PulseNone />
        )}
      </div>
    </div>
  );
};

export default CarouselAccessCard;
