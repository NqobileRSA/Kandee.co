import React from "react";
import ServicesHero from "./ServicesHero";
import ServiceSections from "./ServiceSections";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <ServicesHero />
      <ServiceSections />
    </>
  );
};

export default page;
