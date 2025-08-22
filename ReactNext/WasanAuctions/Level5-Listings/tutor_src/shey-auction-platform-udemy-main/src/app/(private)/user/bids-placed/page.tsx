"use client";
import { getBidsByUserId } from "@/actions/bids";
import InfoMessage from "@/components/ui/info-message";
import PageTitle from "@/components/ui/page-title";
import Spinner from "@/components/ui/spinner";
import { IBid } from "@/interfaces";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
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
import { getDateTimeFormat } from "@/helpers/date-formats";

function BidsPlacedByUser(props: any) {
  const { status } = props;
  const [loading, setLoading] = React.useState(true);
  const [bids, setBids] = React.useState<IBid[]>([]);
  const { user } = usersGlobalStore() as IUsersStore;

  const fetchBids = async () => {
    setLoading(true);
    const response = await getBidsByUserId(user?.id || "");
    if (response.success) {
      let filteredBids: any[] = [];

      if (status) {
        filteredBids = response.data.filter((bid: IBid) => bid.status === status);
      }
      setBids(status === "won" ? filteredBids : response.data);
    } else {
      toast.error(response.message || "Failed to fetch bids");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchBids();
    }
  }, [user]);

  if (loading) {
    return <Spinner />;
  }
  const columns = [
    "Bid Id ",
    "Listing ",
    "Bid Amount",
    "Bid Placed On",
    "Result Date",
    "Status",
  ];
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title={status === "won" ? "Bids Won" : "Bids Placed"} />

      {!loading && bids.length === 0 && (
        <InfoMessage
          message={
            status === "won"
              ? "You have not won any bids yet."
              : "You have not placed any bids yet."
          }
        />
      )}

      {bids.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              {columns.map((col, index) => (
                <TableHead key={index} className="text-primary font-bold!">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell>{bid.id}</TableCell>
                <TableCell>{bid.listing?.name || "N/A"}</TableCell>
                <TableCell>$ {bid.bid_amount.toFixed(2)}</TableCell>
                <TableCell>{getDateTimeFormat(bid.created_at)}</TableCell>
                <TableCell>
                  {getDateTimeFormat(bid.listing?.result_announcement_at || "")}
                </TableCell>
                <TableCell>{bid.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default BidsPlacedByUser;
