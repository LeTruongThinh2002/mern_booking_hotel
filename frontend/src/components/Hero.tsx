const Hero = () => {
  return (
    <>
      <div className='bg-transparent pb-16'>
        <div className='container mx-auto flex flex-col gap-2'>
          <h1
            data-aos='fade-right'
            data-aos-duration='1500'
            className='text-5xl font-bold'
          >
            Find your next stay
          </h1>
          <p
            data-aos='fade-right'
            data-aos-duration='1500'
            className='text-2xl'
          >
            Search low prices low prices on hotels for your dream vacation...
          </p>
        </div>
      </div>
      <img
        title='background'
        src='https://res.cloudinary.com/dd0tbhnzl/image/upload/v1709044083/docs_tinypng.d9e4dcdc_cjsb0g.png'
        className='absolute z-0 top-0 pointer-events-none opacity-25'
      />
    </>
  );
};

export default Hero;
