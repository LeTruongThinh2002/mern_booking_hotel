import {useLocation} from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  const urls = useLocation();
  return (
    <div className='flex flex-col min-h-screen bg-slate-900 text-slate-400'>
      <Header />
      <Hero />
      <img
        title='background'
        src='https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709044083/docs_tinypng.d9e4dcdc_cjsb0g.png'
        className='absolute z-0 top-0 pointer-events-none opacity-25'
      />
      {urls.pathname === '/sign-in' || urls.pathname === '/register' ? (
        <div className='container mx-auto flex-1'>{children}</div>
      ) : (
        <>
          <div className='container mx-auto'>
            <SearchBar />
          </div>
          <div className='container mx-auto py-10 flex-1'>{children}</div>
        </>
      )}
      <Footer />

      {urls.pathname === '/sign-in' || urls.pathname === '/register' ? (
        <img
          title='background'
          src='https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709102253/pngegg_vlurf0.png'
          className='lg:visible invisible md:h-[800px] h-[300px] absolute z-0 right-0 bottom-0 pointer-events-none opacity-10'
          style={{transform: 'scaleX(-1)'}}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Layout;
