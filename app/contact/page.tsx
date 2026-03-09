import ContactHero from "./ContactHero";

import Contact from "./ContactComponents";

type Props = {};

const page = (props: Props) => {
  return (
    <main>
      <ContactHero />
      <Contact />
    </main>
  );
};

export default page;
