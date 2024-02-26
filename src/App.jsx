import { RouterProvider } from "react-router-dom";
import router from './Router/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

export default function App () {
  return (
    <>
      <RouterProvider router={ router } />
      <ToastContainer
        position="top-right"
        autoClose={ 3000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
    </>

  );
}
