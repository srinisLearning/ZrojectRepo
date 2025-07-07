import { IUser } from "@/interfaces";
import { getCurrentUserDataFromMongoDB } from "@/server-actions/users";
import { Alert, Drawer, message } from "antd";
import { Menu } from "lucide-react";
import React, { useEffect } from "react";
import MenuItems from "./menu-items";
import { usersGlobalStore, IUsersGlobalStore } from "@/store/user-store";
import Spinner from "@/components/spinner";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [showMenuItems, setShowMenuItems] = React.useState(false);
  const { loggedinUserData, setLoggedinUserData } =
    usersGlobalStore() as IUsersGlobalStore;
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserDataFromMongoDB();
      if (response.success) {
        setLoggedinUserData(response.data as IUser);
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    // text will be replaced with a spinner (todo item)
    return (
      <div className="flex justify-center items-center h-screen">
         <Spinner />
      </div>
    );
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div>
      <div className="flex justify-between items-center bg-primary p-5">
        <img src="/images/logo.png" className="h-14 w-20" />
        <div className="flex gap-5 text-white text-sm">
          <span>{loggedinUserData?.name}</span>

          <Menu
            size={16}
            className="cursor-pointer"
            onClick={() => setShowMenuItems(!showMenuItems)}
          />
        </div>
      </div>
      <div className="p-5">{children}</div>

      {showMenuItems && loggedinUserData && (
        <Drawer open={showMenuItems} onClose={() => setShowMenuItems(false)}>
          <MenuItems loggedinUserData={loggedinUserData} />
        </Drawer>
      )}
    </div>
  );
}

export default PrivateLayout;
function useUsersGlobalStore(): {
  loggedinUserData: any;
  setLoggedinUserData: any;
} {
  throw new Error("Function not implemented.");
}