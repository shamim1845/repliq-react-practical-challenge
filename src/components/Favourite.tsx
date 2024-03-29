import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Favourite = () => {
  return (
    <Sheet>
      <SheetTrigger className="relative" title="Your Wishlist">
        <Heart className="cursor-pointer" />
        <Badge
          variant="default"
          className="absolute -top-5  px-1.5 py-0.5 bg-green-600"
        >
          5
        </Badge>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Favourite;
