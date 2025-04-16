import ProductCard from "../../../ProductCard";
import { useState, useRef, useEffect, FC } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFlowers } from "../../../../hooks/LikeFn";
import { MainMappingLoading } from "../../../Loading";
import { MainMappingProps, ParamsSet, Product, ProductsResponse } from "../../../../../types/HomeTypes";
import { Select } from "antd";

const MainMapping: FC<MainMappingProps> = ({ currentPage, setCurrentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSortOrder] = useState<string>(searchParams.get("sort") || "default-sorting");
  const [selectedFilter, setSelectedFilter] = useState<string>(searchParams.get("type") || "all-plants");
  const topRef = useRef<HTMLDivElement | null>(null);
  const onePage = 9;
  const category: string = searchParams.get("category") || "house-plants";
  const min: number | string = searchParams.get("range_min") || 0;
  const max: number | string = searchParams.get("range_max") || 1000;

  useEffect(() => {
    setSearchParams<ParamsSet>({ category, sort, type: selectedFilter, range_min: min, range_max: max });
  }, [category, sort, selectedFilter, min, max]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { data: products = { data: [] }, error, isLoading, isFetching } = useQuery<ProductsResponse>({
    queryKey: ["flower", category, sort, selectedFilter, min, max],
    queryFn: () => fetchFlowers({ queryKey: ["flower", category, sort, selectedFilter, min, max] }),
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const totalPages = Math.ceil(products?.data?.length / onePage);
  const paginatedProducts = products?.data?.slice((currentPage - 1) * onePage, currentPage * onePage);

  return (
    <div className="w-[76%] lg:pl-5 pt-0 max-lg:w-full">
      <div ref={topRef} className="flex justify-between items-center mb-10">
        <ul className="flex justify-start  items-center gap-5 font-semibold">
          {[{ label: "All Plants", value: "all-plants" }, { label: "New Arrivals", value: "new-arrivals" }, { label: "Sale", value: "sale" }].map(({ label, value }) => (
            <li key={value} className={`cursor-pointer border-b ${selectedFilter === value ? "text-[#46A358] border-b-[#46A358]" : "hover:text-[#46A358] border-b-transparent"} transi`} onClick={() => { setSelectedFilter(value); setSearchParams({ category, sort, type: value, range_min: min, range_max: max }); }}>
              {label}
            </li>
          ))}
        </ul>
        <div className="flex max-md:hidden justify-end gap-3 items-center font-semibold">
          <p>Sorting:
            <Select defaultValue="default-sorting" value={sort} onChange={(value) => {setSortOrder(value);}}
              options={[
                { value: "default-sorting", label: "Default Sorting" },
                { value: "the-cheapest", label: "The Cheapest" },
                { value: "most-expensive", label: "Most Expensive" },
              ]}
              style={{ width: 160 }}
            />
          </p>
        </div>
        <button className="md:hidden"><SlidersHorizontal /></button>
      </div>

      {isLoading || isFetching ? (
        <MainMappingLoading length={9} />) : paginatedProducts?.length > 0 ? (<>
          <div className="grid grid-cols-2 sm:grid-cols-3 justify-items-center gap-5">
            {paginatedProducts.map((product: Product, index: number) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
          <div className="flex justify-center sm:justify-end items-center gap-2 mt-5">
            <button className="p-2 bg-gray-200 rounded disabled:opacity-40" disabled={currentPage === 1} onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}>
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-[#46A358] text-white" : "bg-gray-200"}`}>
                {i + 1}
              </button>
            ))}
            <button className="p-2 bg-gray-200 rounded disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}>
              <ChevronRight />
            </button>
          </div>
        </>) : (<div className="text-3xl">No any Product </div>)}
    </div>
  );
};

export default MainMapping;