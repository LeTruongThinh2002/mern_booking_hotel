import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import {useAppContext} from './contexts/AppContext';

const App = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/W0DWl0L3DdM?si=Cguw7DKlyVAW97ug&autoplay=1'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
              ></iframe>
            </Layout>
          }
        />
        <Route
          path='/search'
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path='/register'
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path='/sign-in'
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path='/add-hotel'
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
          </>
        )}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default App;
