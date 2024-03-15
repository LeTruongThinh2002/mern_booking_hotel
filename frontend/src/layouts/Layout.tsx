import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-r from-orange-800 to-indigo-950 text-slate-400'>
      <div className='sticky top-0 left-0 w-full z-50'>
        <Header />
      </div>
      <Hero />
      <SearchBar />
      <div className='container mx-auto flex-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
