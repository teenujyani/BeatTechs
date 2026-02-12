import React from "react";
import BgLayout from "../component/BgLayout";
import Hero from "../component/Hero";
import Hero2 from "../component/Hero2";
import SectionBg from "../component/Sectionbg";
import Hero3 from "../component/Hero3";

const Home = () => {
  return (
    <main>
      <BgLayout>
        <Hero />
      </BgLayout>
      <BgLayout>
        <Hero2 />
      </BgLayout>
      <BgLayout>
        <Hero3 />
      </BgLayout>
    </main>
  );
};

export default Home;
