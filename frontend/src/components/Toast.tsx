import {Bounce, ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastProps = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

const Toast = ({message, type}: ToastProps) => {
  const notify = () => {
    if (type === 'SUCCESS') {
      toast(message, {
        icon: <>🚀</>,
        toastId: 1
      });
    } else {
      toast.error(message, {
        toastId: 1
      });
    }
  };
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        limit={3}
        transition={Bounce}
      />
      {type === 'SUCCESS' && notify()}
      {type === 'ERROR' && notify()}
    </>
  );
};

export default Toast;
