import express, {Response, Request} from 'express';
import Hotel from '../models/hotels';
import {HotelSearchResponse} from '../shared/types';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort('-lastUpdated');
    res.json(hotels);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({message: 'Error fetching hotels'});
  }
});
router.get('/search', async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1');
    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments();
    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize)
      }
    };
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Something went wrong!'});
  }
});

export default router;
