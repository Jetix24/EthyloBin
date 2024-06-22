import { Suspense } from 'react'
import Header from "@/components/landingPage/Header";
import Hero from "@/components/landingPage/Hero";
import Pricing from "@/components/Pricing";
import CTA from "@/components/landingPage/CTA";
import Footer from "@/components/Footer";
import CarouselText from '@/components/landingPage/CarouselText';

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <CTA />
        <Hero />
        <CarouselText />
        <Pricing />      
      </main>
      <Footer />
    </>
  );
}