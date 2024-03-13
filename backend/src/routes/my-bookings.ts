import express, {Request, Response} from 'express';
import verifyToken from '../middleware/auth';
import Hotel from '../models/hotels';
import {HotelType, BookingCard} from '../shared/types';

const router = express.Router();

// /api/my-bookings
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: {$elemMatch: {userId: req.userId}}
    });

    const results = hotels.map(hotel => {
      const userBookings = hotel.bookings.filter(
        booking => booking.userId === req.userId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings
      };

      return hotelWithUserBookings;
    });
    const toDay = new Date();
    let access: BookingCard[] = [];
    let denied: BookingCard[] = [];
    results.map(hotel => {
      hotel.bookings.map(book => {
        const date = new Date(book.checkOut);

        if (date < toDay || hotel.block) {
          denied.push({
            image: hotel.imageUrls[0],
            hotelName: hotel.name,
            name: book.firstName + ' ' + book.lastName,
            email: book.email,
            cost: book.totalCost,
            adult: book.adultCount,
            child: book.childCount,
            checkIn: book.checkIn,
            checkOut: book.checkOut,
            key: book._id
          });
        } else {
          access.push({
            image: hotel.imageUrls[0],
            hotelName: hotel.name,
            name: book.firstName + ' ' + book.lastName,
            email: book.email,
            cost: book.totalCost,
            adult: book.adultCount,
            child: book.childCount,
            checkIn: book.checkIn,
            checkOut: book.checkOut,
            key: book._id
          });
        }
      });
    });
    const myBooking = [access, denied];
    res.status(200).send(myBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Unable to fetch bookings'});
  }
});

export default router;
