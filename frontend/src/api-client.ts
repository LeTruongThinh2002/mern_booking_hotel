import {RegisterFormData} from './pages/Register';
import {SignInFormData} from './pages/SignIn';
import {
  BookingCard,
  HotelSearchResponse,
  HotelType,
  MonthlyChart,
  PaymentIntentResponse,
  UserType
} from '../../backend/src/shared/types';
import {BookingFormData} from './forms/BookingForm/BookingForm';
import {ChangeNameType} from './forms/ProfileForm/NameSection';
import {ChangeEmailType} from './forms/ProfileForm/EmailSection';
import {ChangePasswordType} from './forms/ProfileForm/PasswordSection';
import {ForgotFormData} from './pages/ForgotPassword';
import {ResetPasswordFormData} from './pages/ResetPassword';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('Error fetching user');
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const hotelBlock = async ({hotelId}: any) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/block`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      hotelId
    })
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message[0].msg || responseBody.message);
  }
};

export const chartData = async ({year}: any): Promise<MonthlyChart> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/chart`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      year
    })
  });
  if (!response.ok) {
    throw new Error('failed to fetch my hotels');
  }
  return response.json();
};

export const hotelDelete = async ({hotelId}: any) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelId}/delete`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hotelId
      })
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message[0].msg || responseBody.message);
  }
};

export const changeName = async ({firstName, lastName}: ChangeNameType) => {
  const response = await fetch(`${API_BASE_URL}/api/users/changeName`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName
    })
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message[0].msg || responseBody.message);
  }
};
export const changeEmail = async ({password, email}: ChangeEmailType) => {
  const response = await fetch(`${API_BASE_URL}/api/users/changeEmail`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email
    })
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message[0].msg || responseBody.message);
  }
};
export const changePassword = async ({
  password,
  newPassword,
  reNewPassword
}: ChangePasswordType) => {
  const response = await fetch(`${API_BASE_URL}/api/users/changePassword`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      newPassword,
      reNewPassword
    })
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message[0].msg || responseBody.message);
  }
};
export const vefiryEmail = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/verifyEmail`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message[0].msg || responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const forgotPassword = async (formData: ForgotFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/forgotpassword`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const verifyForgotPassword = async (formData: ResetPasswordFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/verifyForgotPassword?token=${formData.token}`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
  );

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Token invalid');
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error('Error during sign out');
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/add-hotel`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData
  });
  if (!response.ok) {
    throw new Error('failed to add hotel');
  }
  return response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error('failed to fetch hotels');
  }
  return response.json();
};

export const fetchPerformance = async () => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/performance`);
  if (!response.ok) {
    throw new Error('failed to fetch hotels');
  }
  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('failed to fetch my hotels');
  }
  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('failed to fetch hotel');
  }
  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
    {
      method: 'PUT',
      credentials: 'include',
      body: hotelFormData
    }
  );
  if (!response.ok) {
    throw new Error('failed to update hotel');
  }
  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append('destination', searchParams.destination || '');
  queryParams.append('checkIn', searchParams.checkIn || '');
  queryParams.append('checkOut', searchParams.checkOut || '');
  queryParams.append('adultCount', searchParams.adultCount || '');
  queryParams.append('childCount', searchParams.childCount || '');
  queryParams.append('page', searchParams.page || '1');
  queryParams.append('maxPrice', searchParams.maxPrice || '');
  queryParams.append('sortOption', searchParams.sortOption || '');

  searchParams.facilities?.forEach(facility =>
    queryParams.append('facilities', facility)
  );

  searchParams.types?.forEach(type => queryParams.append('types', type));
  searchParams.stars?.forEach(star => queryParams.append('stars', star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );
  if (!response.ok) {
    throw new Error('failed to search hotels');
  }
  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error('failed to fetch hotel');
  }
  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({numberOfNights})
    }
  );
  if (!response.ok) {
    throw new Error('failed to create payment intent');
  }
  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }
  );
  if (!response.ok) {
    throw new Error('failed room booking');
  }
};

export const fetchMyBookings = async (): Promise<
  [BookingCard[], BookingCard[]]
> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('failed to fetch my bookings');
  }
  return response.json();
};
