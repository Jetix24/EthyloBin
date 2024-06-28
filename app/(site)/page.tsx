import { Suspense } from 'react'
import Header from "@/components/landingPage/Header";
import Hero from "@/components/landingPage/Hero";
import Pricing from "@/components/Pricing";
import CTA from "@/components/landingPage/CTA";
import Footer from "@/components/Footer";
import CarouselText from '@/components/landingPage/CarouselText';
import getCurrentUser from '../actions/getCurrentUser';
import getSession from '../actions/getSession';

export default async function Home() {

  const session = await getSession();
  const user = await getCurrentUser();
  const hasAccess = user?.hasAccess;

  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <CTA session={session}/>
        <Hero />
        <CarouselText />
        <Pricing hasAccess={hasAccess} session={session}/>      
      </main>
      <Footer />
    </>
  );
}