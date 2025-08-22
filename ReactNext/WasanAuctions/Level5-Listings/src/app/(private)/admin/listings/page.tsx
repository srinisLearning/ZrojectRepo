"use client";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import React from "react";
import { ICategory, IListing } from "@/interfaces";
import toast from "react-hot-toast";

import Spinner from "@/components/ui/spinner";
import InfoMessage from "@/components/ui/info-message";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
 
import { Edit2, Trash2, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllListings, deleteListingById } from "@/server-actions/listings";
import BidsOfListing from "./_components/bids-of-listing";
import { getDateTimeFormat } from "@/helpers/date-format";

function AdminListingsPage() {
  const [loading, setLoading] = React.useState(false);
  const [listings, setListings] = React.useState<IListing[]>([]);
  const [openBidsTable, setOpenBidsTable] = React.useState(false);
  const [selectedListing, setSelectedListing] = React.useState<IListing | null>(
    null
  );
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getAllListings();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch listings");
      }
      setListings(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteListingById(id);
      if (!response.success) {
        throw new Error(response.message || "Failed to delete listing");
      }
      toast.success("Listing deleted successfully");
      setListings((prev) => prev.filter((listing) => listing.id !== id));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete listing");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const columns = ["Id", "Name", "Category", "Image", "Created At", "Actions"];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <PageTitle title="Listings" />
        <Button onClick={() => router.push("/admin/listings/add")}>
          Add Listing
        </Button>
      </div>

      {listings.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              {columns.map((column) => (
                <TableHead
                  key={column}
                  className="text-left text-primary font-bold! p-2"
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((item: IListing) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.category ? item.category.name : "No Category"}
                </TableCell>
                <TableCell>
                  {item?.images!.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>{getDateTimeFormat(item.created_at)}</TableCell>
                <TableCell>
                  <div className="flex gap-5 p-2">
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => {
                        router.push(`/admin/listings/edit/${item.id}`);
                      }}
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => handleDeleteListing(item.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => {
                        setSelectedListing(item);
                        setOpenBidsTable(true);
                      }}
                    >
                      <List size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <InfoMessage message="No categories found. Please add a category to get started." />
      )}

      {selectedListing && openBidsTable && (
        <BidsOfListing
          openBidsTable={openBidsTable}
          setOpenBidsTable={setOpenBidsTable}
          onReload={fetchData}
          selectedListing={selectedListing}
        />
      )}
    </div>
  );
}

export default AdminListingsPage;
