import express, {Request, Response} from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import Hotel from '../models/hotels';
import verifyToken from '../middleware/auth';
import {body} from 'express-validator';
import {HotelType, MonthlyTotals} from '../shared/types';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 //5MB
  }
});

// api/my-hotels
router.post(
  '/add-hotel',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Hotel type is required'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage('Price per night is required and must be a number'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Facilities are required')
  ],
  upload.array('imageFiles', 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const imagesUrls = await uploadImages(imageFiles);
      newHotel.imageUrls = imagesUrls;
      newHotel.userId = req.userId;
      newHotel.lastUpdated = new Date();
      newHotel.bookings = [];

      //2. if upload was successful, add the URLs to the new hotel

      //3. save the new hotel in our database
      const hotel = new Hotel(newHotel);
      await hotel.save();
      //4. return a 201 status
      res.status(201).send(hotel);
    } catch (e) {
      console.log('Error creating hotel: ', e);
      res.status(500).json({message: 'Somthing went wrong'});
    }
  }
);

router.post('/block', verifyToken, async (req: Request, res: Response) => {
  try {
    const {hotelId} = req.body;

    const hotel = await Hotel.findOne({_id: hotelId});
    if (!hotel) {
      return res.status(400).json({message: 'Hotel not found'});
    }
    hotel.block = hotel.block ? false : true;
    await hotel.save();
    res.status(200).send({message: 'Success!'});
  } catch (e) {
    res.status(500).json({message: 'Error fetching hotel'});
  }
});

router.delete(
  '/:hotelId/delete',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const {hotelId} = req.body;

      const hotel = await Hotel.findOneAndDelete({_id: hotelId});
      if (!hotel) {
        return res.status(400).json({message: 'Hotel not found'});
      }

      res.status(200).send({message: 'Success!'});
    } catch (e) {
      res.status(500).json({message: 'Error fetching hotel'});
    }
  }
);

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({userId: req.userId});
    res.json(hotels);
  } catch (e) {
    res.status(500).json({message: 'Error fetching hotel'});
  }
});

router.post('/chart', verifyToken, async (req: Request, res: Response) => {
  try {
    const {year} = req.body;
    const hotels = await Hotel.find();
    const myHotels = await Hotel.find({
      userId: req.userId
    });

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const ortherTotals: MonthlyTotals = {};
    const monthlyTotals: MonthlyTotals = {};
    months.reduce((acc, month) => {
      const totalCostForMonth = myHotels.reduce((sum, hotel) => {
        // Lọc các booking trong tháng và năm
        const bookingsForMonth = hotel.bookings.filter(booking => {
          const bookingMonth = booking.checkIn.getMonth();
          const bookingYear = booking.checkIn.getFullYear();

          return (
            months[bookingMonth] === month &&
            bookingYear === (year || new Date().getFullYear())
          );
        });

        // Tính tổng chi phí cho các booking trong tháng
        const totalCostForMonthForHotel = bookingsForMonth.reduce(
          (sum, booking) => sum + booking.totalCost,
          0
        );

        return sum + totalCostForMonthForHotel;
      }, 0);

      acc[month] = totalCostForMonth;
      return acc;
    }, monthlyTotals);
    months.reduce((acc, month) => {
      const totalCostForMonth = hotels.reduce((sum, hotel) => {
        // Lọc các booking trong tháng và năm
        const bookingsForMonth = hotel.bookings.filter(booking => {
          const bookingMonth = booking.checkIn.getMonth();
          const bookingYear = booking.checkIn.getFullYear();

          return (
            months[bookingMonth] === month &&
            bookingYear === (year || new Date().getFullYear())
          );
        });

        // Tính tổng chi phí cho các booking trong tháng
        const totalCostForMonthForHotel = bookingsForMonth.reduce(
          (sum, booking) => sum + booking.totalCost,
          0
        );

        return sum + totalCostForMonthForHotel;
      }, 0);

      acc[month] = totalCostForMonth;
      return acc;
    }, ortherTotals);
    res.json({monthlyTotals, ortherTotals});
  } catch (e) {
    res.status(500).json({message: 'Error fetching hotel'});
  }
});

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();

  try {
    const hotels = await Hotel.findOne({
      _id: id,
      userId: req.userId
    });
    res.json(hotels);
  } catch (e) {
    res.status(500).json({message: 'Error fetching hotel'});
  }
});

router.put(
  '/:hotelId',
  verifyToken,
  upload.array('imageFiles'),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId
        },
        updatedHotel,
        {new: true}
      );

      if (!hotel) {
        return res.status(404).json({message: 'hotel not found'});
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || [])
      ];

      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({message: 'Error updating hotel'});
    }
  }
);

export async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async image => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
