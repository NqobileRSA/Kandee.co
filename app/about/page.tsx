import AboutHero from "./AboutHero";
import OurStory from "./Ourstory";
import Timeline from "./Timeline";
import OurTeam from "./Ourteam";
import WhyUs from "./WhyUs";
import Testimonials from "./Testimonials";

type Props = {};

const page = (props: Props) => {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <Timeline />
      <OurTeam />
      <WhyUs />
      <Testimonials />
    </main>
  );
};

export default page;
