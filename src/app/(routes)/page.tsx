import HomeCarousel from "@/components/HomeCarousel";
import CategoryCarousel from "./CategoryCarousel";
import HowItWorks from "./HowItWorks";

export default function Home() {
  return (
    <div>
      <HomeCarousel />
      <CategoryCarousel />
      <hr className="container" />
      <HowItWorks />
    </div>
  );
}
