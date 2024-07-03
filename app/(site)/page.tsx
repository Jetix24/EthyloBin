import { Suspense } from 'react'
import Header from "@/components/landingPage/Header";
import Characteristics from "@/components/landingPage/Characteristics";
import Pricing from "@/components/landingPage/Pricing";
import CTA from "@/components/landingPage/CTA";
import Footer from "@/components/Footer";
import CarouselText from '@/components/landingPage/CarouselText';

export default async function Home() {

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <CTA/>
        <Characteristics/>
        <CarouselText/>
        <Pricing/>      
      </main>
      <Footer />
    </>
  );
}