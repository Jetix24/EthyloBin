import { Suspense } from 'react'
import Header from "@/components/landingPage/Header";
import Characteristics from "@/components/landingPage/Characteristics";
import Pricing from "@/components/landingPage/Pricing";
import CTA from "@/components/landingPage/CTA";
import Footer from "@/components/Footer";
import CarouselText from '@/components/landingPage/CarouselText';
import getCurrentUser from '../actions/getCurrentUser';
import getSession from '../actions/getSession';

export default async function Home() {

  //const session = await getSession();
  //const user = await getCurrentUser();
  //const hasAccess = user?.hasAccess;

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <CTA/>
        <Characteristics/>
        <CarouselText />
        <Pricing/>      
      </main>
      <Footer />
    </>
  );
}