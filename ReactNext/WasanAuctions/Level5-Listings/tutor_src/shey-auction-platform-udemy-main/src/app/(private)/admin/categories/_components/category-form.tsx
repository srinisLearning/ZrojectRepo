import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { uploadFileAndGetUrl } from "@/helpers";
import { createCategory, updateCategory } from "@/actions/categories";
import { ICategory } from "@/interfaces";

interface CategoryFormProps {
  openCategoryForm: boolean;
  setOpenCategoryForm: (open: boolean) => void;
  onSuccess: () => void;
  formType?: "create" | "edit";
  selectedCategory?: ICategory;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string(),
  image: z.string().optional(),
});

function CategoryForm({
  openCategoryForm,
  setOpenCategoryForm,
  onSuccess,
  formType = "create",
  selectedCategory,
}: CategoryFormProps) {
  const [loading, setLoading] = React.useState(false);
  const [selectedImageFile, setSelectedImageFile] = React.useState<File | null>(
    null
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedCategory?.name || "",
      description: selectedCategory?.description || "",
      image: selectedCategory?.image || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      let response: any = null;
      let newImageUrl = form.getValues("image");
      if (selectedImageFile) {
        const urlResponse = await uploadFileAndGetUrl(selectedImageFile);
        if (!urlResponse.success) {
          throw new Error(urlResponse.message);
        }
        newImageUrl = urlResponse.data?.url || "";
      }

      if (formType === "create") {
        response = await createCategory({
          name: values.name,
          description: values.description,
          image: newImageUrl,
        });
      } else {
        response = await updateCategory(selectedCategory?.id!, {
          name: values.name,
          description: values.description,
          image: newImageUrl || selectedCategory?.image || "",
        });
      }

      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(
        formType === "create"
          ? "Category created successfully"
          : "Category updated successfully"
      );
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "An error occurred while logging in");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog open={openCategoryForm} onOpenChange={setOpenCategoryForm}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-bold! text-primary">
            {formType === "create" ? "Create Category" : "Edit Category"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => {
                        const files = e.target.files;
                        setSelectedImageFile(files ? files[0] : null);
                      }}
                      type="file"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(selectedImageFile || form.getValues("image")) && (
              <div className="mt-4">
                <img
                  src={
                    selectedImageFile
                      ? URL.createObjectURL(selectedImageFile)
                      : form.getValues("image")
                  }
                  alt="Selected"
                  className="w-20 h-20 rounded-md object-contain"
                />
              </div>
            )}

            <div className="flex justify-end items-center gap-5">
              <Button
                title="Cancel"
                variant="outline"
                type="button"
                onClick={() => setOpenCategoryForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-max" disabled={loading}>
                {formType === "create" ? "Create Category" : "Update Category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryForm;
