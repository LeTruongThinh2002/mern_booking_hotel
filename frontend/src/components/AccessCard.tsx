import numeral from 'numeral';
import {BookingCard} from '../../../backend/src/shared/types';

type Props = {
  card: BookingCard;
};

const AccessCard = ({card}: Props) => {
  return (
    <div className='flex hover:scale-125 flex-row gap-4 rounded-lg bg-sky-950 shadow-lg shadow-orange-400'>
      <img
        src={card.image}
        alt=''
        className='basis-1/4 rounded-s-lg object-cover object-center'
        width={100}
      />
      <div className='basis-3/4 flex flex-col gap-1'>
        <h2 className='font-bold text-xl truncate'>{card.hotelName}</h2>
        <span>Name: {card.name}</span>
        <span>Email: {card.email}</span>
        <span>Cost: {numeral(card.cost).format('0,0.00$')}</span>
        <div className='flex flex-row gap-5'>
          <span>Adult: {card.adult}</span>
          <span>Child: {card.child}</span>
        </div>
        <div className='flex flex-row gap-5'>
          <span>CheckIn: {new Date(card.checkIn).toDateString()}</span>
          <span>CheckOut: {new Date(card.checkOut).toDateString()}</span>
        </div>
        <span className='text-lg text-red-400'>
          Key: <span>{card.key}</span>
        </span>
      </div>
    </div>
  );
};

export default AccessCard;
