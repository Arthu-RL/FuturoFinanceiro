import { Carousel, CarouselContent, CarouselIndicator, CarouselItem } from '@/components/ui/carousel';

type ContentCarousel = {
  slides: { heading: string; text: string }[];
};

export const ContentCarousel = ({ slides }: ContentCarousel) => {
  return (
    <Carousel>
      <CarouselContent>
        {slides.map(({ heading, text }) => (
          <CarouselItem key={heading} className='flex flex-col gap-1 px-2 pb-10 pt-2 max-sm:pb-7 max-sm:pt-3'>
            <span className='text-lg font-semibold max-sm:text-base'>{heading}</span>
            <p className='leading- text-sm'>{text}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselIndicator />
    </Carousel>
  );
};
