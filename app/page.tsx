import Image from "next/image";
import Hero from "./home/Hero";
import FeaturedWork from "./home/FeaturedWork";
import OurProcess from "./home/OurProcess";
import Gallery from "./home/Gallery";
import About from "./home/AboutUs";
import OurServices from "./home/OurServices";
export default function Home() {
  return (
    <main className="">
      <Hero />
      <FeaturedWork />
      <OurProcess />
      <Gallery />
      <About />
      <OurServices />
    </main>
  );
}
