import Parallax from "../parallax";
import heroBgPic from "@/assets/hero-bg.jpg";

export const ParallaxLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Parallax
      bgImage={heroBgPic.src}
      bgImageAlt="Background Image"
      strength={200}
    >
      <section
        id="contact"
        className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center bg-black bg-opacity-50 text-white"
      >
        {children}
      </section>
    </Parallax>
  );
};
