import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IBid, IListing } from "@/interfaces";
import { getBidsByListingId, updateWinnerBid } from "@/server-actions/bids";
 
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
import toast from "react-hot-toast";
import InfoMessage from "@/components/ui/info-message";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { getDateTimeFormat } from "@/helpers/date-format";

interface BidsOfListingProps {
  openBidsTable: boolean;
  setOpenBidsTable: (open: boolean) => void;
  onReload: () => void;
  selectedListing: IListing;
}

function BidsOfListing({
  openBidsTable,
  setOpenBidsTable,
  onReload,
  selectedListing,
}: BidsOfListingProps) {
  const [loading, setLoading] = React.useState(false);
  const [bids, setBids] = React.useState<IBid[]>([]);

  const fetchBids = async () => {
    setLoading(true);
    try {
      const response = await getBidsByListingId(selectedListing.id);
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch bids");
      }
      setBids(response.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch bids");
    } finally {
      setLoading(false);
    }
  };

  const selectWinner = async () => {
    try {
      // find the highest bid
      const highestBid = bids.reduce((prev, current) => {
        return (prev.bid_amount || 0) > (current.bid_amount || 0)
          ? prev
          : current;
      });

      // find the users with the highest bid
      const winningBids = bids.filter(
        (bid) => bid.bid_amount === highestBid.bid_amount
      );

      let winnerBid = winningBids[0];

      // if winningBids has more than one bid, find winner using Math.random()
      if (winningBids.length > 1) {
        const randomIndex = Math.floor(Math.random() * winningBids.length);
        winnerBid = winningBids[randomIndex];
      }

      const winnerUserId = winnerBid.user?.id;
      const response = await updateWinnerBid({
        bidId: winnerBid.id,
        listingId: selectedListing.id,
        winnderId: winnerUserId || "",
      });

      if (!response.success) {
        throw new Error(response.message || "Failed to select winner");
      }
      toast.success("Winner selected successfully");
      onReload();
      setOpenBidsTable(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to select winner");
    }
  };

  const columns = [
    "Bid Id",
    "User",
    "Bid Amount",
    "Bid Placed On",
    "Result Date",
    "Status",
  ];

  React.useEffect(() => {
    fetchBids();
  }, []);
  return (
    <Dialog open={openBidsTable} onOpenChange={setOpenBidsTable}>
      <DialogContent className="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold! text-primary flex justify-between items-center mt-4">
            Bids of {selectedListing.name}
            <Button
              disabled={
                selectedListing.winner_id
                  ? true
                  : false ||
                    dayjs(selectedListing.result_announcement_at).isAfter(
                      dayjs()
                    )
              }
              onClick={selectWinner}
            >
              Select Winner
            </Button>
          </DialogTitle>
        </DialogHeader>

        {loading && <Spinner />}
        {!loading && bids.length === 0 && (
          <InfoMessage message="No bids placed yet." />
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
                  <TableCell>{bid.user?.name || "N/A"}</TableCell>
                  <TableCell>$ {bid.bid_amount.toFixed(2)}</TableCell>
                  <TableCell>{getDateTimeFormat(bid.created_at)}</TableCell>
                  <TableCell>
                    {getDateTimeFormat(
                      selectedListing.result_announcement_at || ""
                    )}
                  </TableCell>
                  <TableCell>{bid.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default BidsOfListing;
