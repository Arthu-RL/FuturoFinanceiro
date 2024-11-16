import { ScrollArea } from '@/components/ui/scroll-area';
import { ElementType, ReactNode } from 'react';
import { ContentCarousel } from './ContentCarousel';

import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogSubtitle,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/animated-dialog';

type ContentDialogProps = {
  children: ReactNode;
  title: string;
  modalParam: string;
  Icon: ElementType;
  Image: ElementType;
  subtitle: string;
  slides: { heading: string; text: string }[];
};

export const ContentDialog = ({
  Icon,
  Image,
  modalParam,
  title,
  subtitle,
  slides,
  children,
}: ContentDialogProps) => {
  return (
    <Dialog transition={{ type: 'spring', stiffness: 200, damping: 24 }}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContainer modalParam={modalParam}>
        <DialogContent className='relative h-auto w-[500px] rounded-xl border bg-card max-sm:max-w-[90%]'>
          <ScrollArea className='h-fit max-sm:h-[90vh]' type='scroll'>
            <div className='relative px-6 py-8 max-sm:px-4 max-sm:py-6'>
              <div className='flex flex-col gap-4'>
                <DialogTitle className='flex items-center gap-3 text-xl font-semibold text-foreground max-sm:text-lg'>
                  <Icon />
                  {title}
                </DialogTitle>
                <Image className='mx-auto h-72 w-72 py-10' />
                <DialogSubtitle className='px-2 text-sm font-light text-foreground'>
                  {subtitle}
                </DialogSubtitle>
              </div>
              <ContentCarousel slides={slides} />
            </div>
          </ScrollArea>
          <DialogClose className='fill-accent outline-none' />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
};
