import { Fragment } from 'react/jsx-runtime';
import { Footer } from '@/components/Home/Footer/Footer';
import { Content } from '@/components/Home/Content';
import { AboutUs } from '@/components/Home/AboutUs';
import { Hero } from '@/components/Home/Hero';

export default function Home() {
  return (
    <Fragment>
      <section className='relative grid w-full grid-cols-2 justify-center pb-40 pl-56 pr-40 pt-40 max-2xl:pl-36 max-2xl:pr-20 max-2xl:pt-10 max-xl:grid-cols-1 max-xl:gap-10 max-xl:pb-8 max-xl:pl-20 max-xl:pr-10 max-sm:gap-24 max-sm:px-4 max-sm:pt-20'>
        <Hero.Background />
        <Hero.Heading />
        <Hero.Globe />
      </section>
      <section
        id='#about'
        className='relative grid w-full justify-center gap-40 overflow-hidden pb-36 pl-56 pr-40 pt-36 max-2xl:pl-36 max-2xl:pr-20 max-2xl:pt-24 max-xl:gap-24 max-xl:pb-8 max-xl:pl-[6.5rem] max-xl:pr-10 max-sm:gap-24 max-sm:px-4 max-sm:pt-10'
      >
        <AboutUs.Background />
        <AboutUs.Heading />
        <AboutUs.Cards />
      </section>
      <section
        id='#content'
        className='relative grid w-full justify-center gap-40 overflow-hidden pb-20 pl-56 pr-40 pt-36 max-2xl:pl-36 max-2xl:pr-20 max-2xl:pt-24 max-xl:gap-24 max-xl:pb-8 max-xl:pl-[6.5rem] max-xl:pr-10 max-sm:gap-10 max-sm:px-4 max-sm:pt-16'
      >
        <div className='absolute -left-[10%] top-0 z-20 hidden h-[1px] w-[120%] bg-line-horizontal-dark bg-line-pattern-horizontal line-mask-horizontal dark:block'></div>
        <div className='absolute -left-[10%] top-0 z-20 h-[1px] w-[120%] bg-line-horizontal-light bg-line-pattern-horizontal line-mask-horizontal dark:hidden'></div>
        <Content.Background />
        <Content.Heading />
        <Content.Cards />
        <div className='absolute -left-[10%] bottom-0 z-20 hidden h-[1px] w-[120%] bg-line-horizontal-dark bg-line-pattern-horizontal line-mask-horizontal dark:block'></div>
        <div className='absolute -left-[10%] bottom-0 z-20 h-[1px] w-[120%] bg-line-horizontal-light bg-line-pattern-horizontal line-mask-horizontal dark:hidden'></div>
      </section>

      <Footer />
    </Fragment>
  );
}
