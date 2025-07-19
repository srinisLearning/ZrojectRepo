import React, { useEffect } from "react"; 
import toast from "react-hot-toast"; 
import { IUser } from "@/interfaces";
 
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/store/users-store";
 
import { getCurrentUserFromSupabase } from "@/server-actions/users";
import { getCurrentUserActiveSubscription } from "@/server-actions/subscriptions";
import Spinner from "@/components/spinner";
import Header from "./header";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser, setCurrentSubscription } =
    usersGlobalStore() as IUsersGlobalStore;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response: any = await getCurrentUserFromSupabase();
      if (!response.success) {
        throw new Error(response.error);
      } else {
        setUser(response.data);

        // get and store current subscription
        const subsResponse: any = await getCurrentUserActiveSubscription(
          response.data.id
        );
        if (subsResponse.success) {
          setCurrentSubscription(subsResponse.data);
        }
      }
    } catch (error: any) {
      setError(error.message || "An error occurred while fetching user data");
      toast.error("An error occurred while fetching user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Spinner parentHeight={"100vh"} />;
  }

  if (error) {
    return <div className="p-5 text-sm">{error}</div>;
  }

  return (
    <div>
      <Header user={user} />
      <div className="p-5">{children}</div>
    </div>
  );
}

export default PrivateLayout;