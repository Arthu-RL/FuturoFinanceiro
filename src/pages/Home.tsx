import { HeroBackground } from '@/components/Home/HeroBackground';
import { HeroGlobe } from '@/components/Home/HeroGlobe';
import { HeroHeadingSection } from '@/components/Home/HeroHeadingSection';

export default function Home() {
  return (
    <div className='grid grid-rows-[90vh_auto] gap-16 max-xl:grid-rows-[auto_auto] max-xl:gap-0'>
      <section className='grid w-full grid-cols-[1fr_1fr] justify-center px-28 max-2xl:px-10 max-xl:grid-cols-1 max-xl:grid-rows-1 max-xl:gap-24 max-xl:px-0'>
        <HeroBackground />
        <HeroHeadingSection />
        <HeroGlobe />
      </section>
    </div>
  );
}
