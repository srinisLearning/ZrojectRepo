"use client";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/ui/page-title";
import React from "react";
 
import { ICategory } from "@/interfaces";
import toast from "react-hot-toast";
import { deleteCategory, getAllCategories } from "@/server-actions/categories";
import Spinner from "@/components/ui/spinner";
 
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
 
import { Edit2, Trash2 } from "lucide-react";
import { getDateTimeFormat } from "@/helpers/date-format";
import CategoryForm from "./_components/category-form";
import InfoMessage from "@/components/ui/info-message";

function AdminCategoriesPage() {
  const [openCategoryForm, setOpenCategoryForm] = React.useState(false);
  const [formType, setFormType] = React.useState<"create" | "edit">("create");
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<ICategory | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getAllCategories();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteCategory(id);
      if (!response.success) {
        throw new Error(response.message || "Failed to delete category");
      }
      toast.success("Category deleted successfully");
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category");
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

  const columns = ["Id", "Name", "Image", "Created At", "Actions"];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <PageTitle title="Categories" />
        <Button
          onClick={() => {
            setOpenCategoryForm(true);
            setFormType("create");
          }}
        >
          Add Category
        </Button>
      </div>

      {categories.length > 0 ? (
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
            {categories.map((item: ICategory) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.image ? (
                    <img
                      src={item.image}
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
                        setSelectedCategory(item);
                        setFormType("edit");
                        setOpenCategoryForm(true);
                      }}
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => handleDeleteCategory(item.id)}
                    >
                      <Trash2 size={14} />
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

      {/* Render the list of categories here */}

      {openCategoryForm && (
        <CategoryForm
          openCategoryForm={openCategoryForm}
          setOpenCategoryForm={setOpenCategoryForm}
          onSuccess={() => {
            setOpenCategoryForm(false);
            fetchData();
          }}
          formType={formType}
          selectedCategory={selectedCategory!}
        />
      )}
    </div>
  );
}

export default AdminCategoriesPage;