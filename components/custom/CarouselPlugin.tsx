'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 30000, stopOnInteraction: false })
  );

  const images = [
    '/images/IMG_0243.png',
    '/images/IMG_0270.png',
    '/images/IMG_0400.png',
    '/images/IMG_0436.png',
    '/images/IMG_0436.png',
    '/images/IMG_1021.png',
    '/images/IMG_1027.png',
  ];

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full min-h-screen"
    >
      <CarouselContent>
        {images.map((url, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex items-center justify-center w-full min-h-screen">
                <Image
                  className="min-h-screen"
                  aria-hidden
                  src={url}
                  alt="Globe icon"
                  width={1000}
                  height={1000}
                  priority
                  style={{
                    height: '100%', // Set height to 95% of the parent
                    width: 'auto', // Keep the width ratio
                    objectFit: 'contain', // Ensure the image is fully visible
                  }}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute top-1/2 left-2 flex items-center justify-center">
        <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
      </div>
      <div className="absolute top-1/2 right-2 flex items-center justify-center">
        <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-primary/90" />
      </div>
    </Carousel>
  );
}
