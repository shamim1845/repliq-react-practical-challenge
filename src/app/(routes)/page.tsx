import HomeCarousel from "@/components/HomeCarousel";
import CategoryCarousel from "./_homeComponents/CategoryCarousel";
import HowItWorks from "./_homeComponents/HowItWorks";

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
