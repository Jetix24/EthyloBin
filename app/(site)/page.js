import { Suspense } from 'react';
import Header from "@/components/landingPage/Header";
import Characteristics from "@/components/landingPage/Characteristics";
import Pricing from "@/components/landingPage/Pricing";
import CTA from "@/components/landingPage/CTA";
import Footer from "@/components/landingPage/Footer";
import CarouselText from '@/components/landingPage/CarouselText';
import FAQ from '@/components/landingPage/FAQ';
import Problem from '@/components/landingPage/Problem';
import FeaturesAccordion from '@/components/landingPage/FeaturesAccordion';

export default function Home() {

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <CTA />
        <Problem />
        <Characteristics />
        <CarouselText />
        <FeaturesAccordion />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
