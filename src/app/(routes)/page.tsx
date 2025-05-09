import HomeCarousel from "@/components/HomeCarousel";
import CategoryCarousel from "./_homeComponents/CategoryCarousel";
import HowItWorks from "./_homeComponents/HowItWorks";
import RecentProducts from "@/app/_homeComponents/RecentProducts";

export default function Home() {
  return (
    <div>
      <HomeCarousel />
      <CategoryCarousel />
      <hr className="container" />
      <RecentProducts />
      <hr className="container" />
      <HowItWorks />
    </div>
  );
}
