import { Separator } from "@/components/ui/separator";
import PriceSlider from "./_components/PriceSlider";
import { getCategories } from "@/lib/fetch/getCategories";
import { SearchParamsProps } from "../../page";
import CategorySelector from "./_components/CategorySelector";
import ClearFilterBtn from "./_components/ClearFilterBtn";

const FilterBox = async ({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) => {
  const { categories } = await getCategories();

  return (
    <div className="p-5 w-[12rem] ">
      <div className="space-y-5">
        <PriceSlider searchParams={searchParams} />
      </div>
      <Separator className="my-8" />
      <div className="space-y-5">
        <CategorySelector categories={categories} searchParams={searchParams} />
      </div>
      <br />
      <ClearFilterBtn />
    </div>
  );
};

export default FilterBox;
