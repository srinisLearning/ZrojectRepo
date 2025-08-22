"use client";
import { getAllCategories } from "@/server-actions/categories";
import { ICategory } from "@/interfaces";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const sortByOptions = [
  {
    label: "Minimum Bid (Low to High)",
    value: "min_bid_asc",
  },
  {
    label: "Minimum Bid (High to Low)",
    value: "min_bid_desc",
  },
];

function Filters() {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [category, setCategory] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const router = useRouter();

  const fetchCategories = async () => {
    const response: any = await getAllCategories();
    if (response.success) {
      setCategories(response.data);
    } else {
      setCategories([]);
    }
  };

  const handleFilter = () => {
    router.push(`/user/listings?category=${category}&sortBy=${sortBy}`);
  };

  const handleClearFilters = () => {
    setCategory(null);
    setSortBy(null);
    router.push(`/user/listings`); // Reset to the base listings page
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="category-select col-span-1">
        <h1 className="text-sm text-gray-600">Category</h1>
        <Select
          onValueChange={(value) => setCategory(value)}
          defaultValue={category?.toString()}
          value={category?.toString() || ""} // Ensure value is a string or empty string
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>

          <SelectContent className="w-full">
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="sort-select col-span-1 category-select">
        <h1 className="text-sm text-gray-600">Sort By</h1>
        <Select
          onValueChange={(value) => setSortBy(value)}
          defaultValue={sortBy?.toString()}
          value={sortBy?.toString() || ""} // Ensure value is a string or empty string
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Sort Option" />
          </SelectTrigger>

          <SelectContent className="w-full">
            {sortByOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-5 items-end">
        <Button variant={"outline"} onClick={handleClearFilters}>
          Clear Filters
        </Button>
        <Button onClick={handleFilter}>Apply Filters</Button>
      </div>
    </div>
  );
}

export default Filters;
