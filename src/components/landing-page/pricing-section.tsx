import Pricing from "../pricing/pricing";
import { ParallaxLayout } from "./parallax-layout";

const PricingSection = () => {
  return (
    <ParallaxLayout>
      <div className="container px-4 md:px-6">
        <Pricing />
      </div>
    </ParallaxLayout>
  );
};

export default PricingSection;
