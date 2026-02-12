import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";

const AboutGallery = () => {
  return (
    <section className="py-20 bg-[#0E0B3D]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-6">
        {[img1, img2, img3, img4].map((img, i) => (
          <img
            key={i}
            src={img}
            className="rounded-2xl object-cover"
          />
        ))}
      </div>
    </section>
  );
};

export default AboutGallery;
