import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { AlignStartVertical } from "lucide-react";
import FilterBox from "./FilterBox";

export default function FilterBoxDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <AlignStartVertical className="cursor-pointer" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div>
          <FilterBox />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
