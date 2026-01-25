import BgLayout from "../component/BgLayout";
import SectionBg from "../component/Sectionbg";
import AboutHero from "./about/AboutHero";
import AboutVision from "./about/AboutVision";
import AboutGallery from "./about/AboutGallery";

const About = () => {
  return (
    <main>
      {/* Hero-style section */}
      <BgLayout>
        <AboutHero />
      </BgLayout>

      {/* Content sections */}
      <SectionBg>
        <AboutVision />
      </SectionBg>

      <AboutGallery />
    </main>
  );
};

export default About;
