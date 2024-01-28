import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AlignStartVertical } from "lucide-react";
import FilterBox from "./FilterBox";
import { SearchParamsProps } from "../page";

export default function FilterBoxDrawer({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <AlignStartVertical className="cursor-pointer" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <FilterBox searchParams={searchParams} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
