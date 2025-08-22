import React from "react";
import Header from "./header";
import { getLoggedInUser } from "@/actions/users";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { setUser } = usersGlobalStore() as IUsersStore;
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response: any = await getLoggedInUser();
      if (!response.success) {
        throw new Error(response.message);
      }
      setUser(response.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch user data");
      Cookies.remove("token");
      router.push("/?form=login");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Header />

      {loading ? <Spinner /> : <div className="p-5">{children}</div>}
    </div>
  );
}

export default PrivateLayout;
