import React from "react";
import BgLayout from "../component/BgLayout";
import Hero from "../component/Hero";
import Hero2 from "../component/Hero2";
import SectionBg from "../component/Sectionbg";

const Home = () => {
  return (
    <main>
      <BgLayout>
        <Hero />
      </BgLayout>
      <BgLayout>
        <Hero2 />
      </BgLayout>
    </main>
  );
};

export default Home;
