export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  verify: boolean;
};

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  newProperty: string;
  bookings: BookingType[];
  block: boolean;
};

export type MonthlyChart = {
  monthlyTotals: MonthlyTotals[];
  ortherTotals: MonthlyTotals[];
};
export type MonthlyTotals = {
  [month: string]: number;
};

export type BookingCard = {
  image: string;
  hotelName: string;
  name: string;
  email: string;
  cost: number;
  adult: number;
  child: number;
  checkIn: Date;
  checkOut: Date;
  key: string;
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
