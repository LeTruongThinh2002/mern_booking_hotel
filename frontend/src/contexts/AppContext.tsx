import React, {useContext, useEffect, useState} from 'react';
import Toast from '../components/Toast';
import {useQuery} from 'react-query';
import * as apiClient from '../api-client';
import {loadStripe, Stripe} from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>;
};

const stripePromise = loadStripe(STRIPE_PUB_KEY);

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const {isError} = useQuery('validateToken', apiClient.validateToken, {
    retry: false
  });

  const handleShowToast = (
    toastMessage: React.SetStateAction<ToastMessage | undefined>
  ) => {
    setToast(toastMessage);
    const timeoutId = setTimeout(() => {
      setToast(undefined);
    }, 5100);

    // Xóa timeout nếu component unmount
    return () => clearTimeout(timeoutId);
  };

  return (
    <AppContext.Provider
      value={{
        showToast: handleShowToast,
        isLoggedIn: !isError,
        stripePromise
      }}
    >
      {toast && <Toast message={toast.message} type={toast.type} />}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
