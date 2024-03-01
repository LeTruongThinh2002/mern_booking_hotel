import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <div className='flex flex-col min-h-screen bg-slate-900 text-slate-400'>
      <Header />
      <Hero />
      <SearchBar />
      <div className='container mx-auto flex-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
