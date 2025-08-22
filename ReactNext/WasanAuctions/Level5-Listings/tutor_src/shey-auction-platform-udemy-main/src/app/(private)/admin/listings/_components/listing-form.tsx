"use client";
import { getAllCategories } from "@/actions/categories";
import { ICategory, IListing } from "@/interfaces";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadFileAndGetUrl } from "@/helpers";
import { addListing, updateListingById } from "@/actions/listings";
import { useRouter } from "next/navigation";

interface ListingFormProps {
  formType: "add" | "edit";
  listingData?: Partial<IListing>;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().optional(),
  category_id: z.string().min(1, {
    message: "Category is required",
  }),
  auction_start_at: z.string().min(1, {
    message: "Auction start date is required",
  }),
  auction_end_at: z.string().min(1, {
    message: "Auction end date is required",
  }),
  result_announcement_at: z.string().min(1, {
    message: "Result announcement date is required",
  }),
  minimum_bid: z.number().min(0, {
    message: "Minimum bid must be a positive number",
  }),
  images: z.array(z.string()).optional(),
});

function ListingForm({ formType, listingData }: ListingFormProps) {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedImageFiles, setSelectedImageFiles] = React.useState<File[]>(
    []
  );
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: listingData?.name || "",
      description: listingData?.description || "",
      category_id: listingData?.category_id?.toString() || "",
      auction_start_at: listingData?.auction_start_at || "",
      auction_end_at: listingData?.auction_end_at || "",
      result_announcement_at: listingData?.result_announcement_at || "",
      minimum_bid: listingData?.minimum_bid || 0,
      images: listingData?.images || [],
    },
  });

  const fetchData = async () => {
    try {
      const response: any = await getAllCategories();
      if (response.success) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setCategories([]);
    }
  };

  const handleSelectedImagefileDelete = (index: number) => {
    setSelectedImageFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  const handleExistingImageDelete = (url: string) => {
    const existing = form.getValues("images") || [];
    const updatedImages = existing.filter((image) => image !== url);
    form.setValue("images", updatedImages);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      let response = null;
      let imageUrls: any[] = form.getValues("images") || [];

      for (const file of selectedImageFiles) {
        const imageUrlResponse = await uploadFileAndGetUrl(file);
        if (imageUrlResponse.success) {
          imageUrls.push(imageUrlResponse.data?.url);
        }
      }

      if (formType === "add") {
        response = await addListing({
          ...values,
          images: imageUrls,
        });
      } else {
        response = await updateListingById(listingData?.id || "", {
          ...values,
          images: imageUrls,
        });
      }

      if (response?.success) {
        toast.success(
          formType === "add"
            ? "Listing added successfully"
            : "Listing updated successfully"
        );
        router.push("/admin/listings");
      } else {
        throw new Error(response?.message || "Failed to add listing");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 category-select">
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category Id</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="auction_start_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auction Start At</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="auction_end_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auction End At</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="result_announcement_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Result Announcement At</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1">
              <FormField
                control={form.control}
                name="minimum_bid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Bid</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <h1 className="text-sm">Select images to upload (optional):</h1>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = e.target.files;
                setSelectedImageFiles([
                  ...selectedImageFiles,
                  ...(files ? Array.from(files) : []),
                ]);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            {selectedImageFiles.map((file, index) => (
              <div
                className="flex flex-col gap-1 p-2 border rounded-md"
                key={index}
              >
                <img
                  src={URL.createObjectURL(file)}
                  className="w-20 h-20 object-contain"
                />
                <span
                  className="text-sm underline cursor-pointer"
                  onClick={() => handleSelectedImagefileDelete(index)}
                >
                  Delete
                </span>
              </div>
            ))}

            {form?.getValues("images")!.map((url, index) => (
              <div
                className="flex flex-col gap-1 p-2 border rounded-md"
                key={url}
              >
                <img src={url} className="w-20 h-20 object-contain" />
                <span
                  className="text-sm underline cursor-pointer"
                  onClick={() => handleExistingImageDelete(url)}
                >
                  Delete
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center gap-5">
            <Button
              title="Cancel"
              variant="outline"
              type="button"
              onClick={() => router.push("/admin/listings")}
              className="w-max"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-max" disabled={loading}>
              {formType === "add" ? "Add Listing" : "Update Listing"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ListingForm;
