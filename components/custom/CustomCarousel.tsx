'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface CustomCarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  delay?: number;
  enableButton?: boolean;
  className?: string;
}

export function CustomCarousel({
  items,
  autoPlay,
  delay = 2000,
  enableButton,
  className,
}: CustomCarouselProps) {
  const plugin = React.useRef(Autoplay({ delay, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={autoPlay ? [plugin.current] : []}
      //   onMouseEnter={plugin.current.stop}
      //   onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className={`w-full ${className}`}>{item}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {enableButton && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
