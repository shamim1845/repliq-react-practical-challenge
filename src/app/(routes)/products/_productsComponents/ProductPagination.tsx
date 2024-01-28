import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PRODUCTS_PER_PAGE } from "@/lib/fetch/getProducts";
import { SearchParamsProps } from "../page";
import { cn, generateSearchParams } from "@/lib/utils";

const ProductPagination = ({
  totalProducts,
  searchParams,
}: {
  totalProducts: number;
  searchParams: SearchParamsProps;
}) => {
  const currentPage = parseInt(searchParams.page || "1");
  const totalPage = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  if (totalPage <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/products?${generateSearchParams({
              ...searchParams,
              page: (currentPage - 1).toString(),
            })}`}
            className={cn(currentPage <= 1 && "hidden")}
          />
        </PaginationItem>

        {Array.from({
          length: totalPage,
        }).map((_, index) => (
          <PaginationItem key={index + 1}>
            <PaginationLink
              href={`/products?${generateSearchParams({
                ...searchParams,
                page: (index + 1).toString(),
              })}`}
              className={cn(currentPage === index + 1 && "bg-brandPrimary")}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`/products?${generateSearchParams({
              ...searchParams,
              page: (currentPage + 1).toString(),
            })}`}
            className={cn(currentPage === totalPage && "hidden")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
