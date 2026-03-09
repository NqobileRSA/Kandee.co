import React from "react";
import GalleryHero from "./GalleryHero";
import GallerySections from "./GallerySections";

type Props = {};

const page = (props: Props) => {
  return (
    <main>
      <GalleryHero />
      <GallerySections />
    </main>
  );
};

export default page;
