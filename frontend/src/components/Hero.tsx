import {TypeAnimation} from 'react-type-animation';

const Hero = () => {
  return (
    <>
      <div className='bg-transparent select-none pb-16'>
        <div className='container mx-auto flex flex-col gap-2'>
          <h1
            data-aos='fade-right'
            data-aos-duration='1500'
            className='text-5xl  font-bold'
          >
            <TypeAnimation
              preRenderFirstString={false}
              sequence={[
                1000,
                'Find your in Interlaken',
                1000,
                'Find your in Los Angeles',
                1000,
                'Find your in Oia',
                1000,
                'Find your in Venice',
                1000,
                'Find your in Eiffel',
                1000,
                'Find your in Yosemite',
                1000,
                'Find your in Osaka',
                1000,
                'Find your in Ubud',
                1000,
                'Find your in my heart',
                1000,
                'Find your next stay'
              ]}
              speed={1}
            />
          </h1>
          <p
            data-aos='fade-right'
            data-aos-duration='1500'
            className='text-2xl'
          >
            <TypeAnimation
              preRenderFirstString={false}
              cursor={false}
              sequence={[
                1000,
                ' Search low prices on hotels for your dream vacation...'
              ]}
              speed={10}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
