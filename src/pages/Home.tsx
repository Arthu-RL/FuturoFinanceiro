import { HeroBackground } from '@/components/Home/Hero/HeroBackground';
import { HeroGlobe } from '@/components/Home/Hero/HeroGlobe';
import { HeroHeading } from '@/components/Home/Hero/HeroHeading';
import { AboutUsBackground } from '@/components/Home/AboutUs/AboutUsBackground';
import { AboutUsHeading } from '@/components/Home/AboutUs/AboutUsHeading';
import { Fragment } from 'react/jsx-runtime';
import { AboutUsCards } from '@/components/Home/AboutUs/AboutUsCards';

export default function Home() {
  return (
    <Fragment>
      <section className='relative grid w-full grid-cols-2 justify-center pb-40 pl-56 pr-40 pt-40 max-2xl:pl-36 max-2xl:pr-20 max-2xl:pt-10 max-xl:grid-cols-1 max-xl:gap-10 max-xl:pb-8 max-xl:pl-20 max-xl:pr-10 max-sm:gap-24 max-sm:px-4 max-sm:pt-20'>
        <HeroBackground />
        <HeroHeading />
        <HeroGlobe />
      </section>
      <section
        id='#about'
        className='relative grid w-full justify-center gap-40 overflow-hidden pb-36 pl-56 pr-40 pt-36 max-2xl:pl-36 max-2xl:pr-20 max-2xl:pt-24 max-xl:gap-24 max-xl:pb-8 max-xl:pl-[6.5rem] max-xl:pr-10 max-sm:gap-24 max-sm:px-4 max-sm:pt-10'
      >
        <AboutUsBackground />
        <AboutUsHeading />
        <AboutUsCards />
      </section>
    </Fragment>
  );
}
