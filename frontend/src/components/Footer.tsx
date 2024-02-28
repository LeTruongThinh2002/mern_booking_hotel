const Footer = () => {
  return (
    <div className='bg-transparent py-10'>
      <div className='container mx-auto flex justify-between items-center'>
        <span className='text-3xl font-bold tracking-tight'>
          MernHolidays.com
        </span>
        <span className=' font-bold tracking-tight flex gap-4'>
          <p className='cursor-pointer'>Privacy Policy</p>
          <p className='cursor-pointer'>Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
