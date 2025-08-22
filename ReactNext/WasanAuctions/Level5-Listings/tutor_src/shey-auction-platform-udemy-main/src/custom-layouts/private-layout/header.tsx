import { Button } from "@/components/ui/button";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import { Menu } from "lucide-react";
import React from "react";
import SidebarMenuItems from "./sidebar";

function Header() {
  const { user } = usersGlobalStore() as IUsersStore;
  const [openSidebar, setOpenSidebar] = React.useState(false);
  return (
    <div className="bg-primary flex justify-between items-center">
      <h1 className="text-xl font-bold! text-white px-5 py-6">S.H.E.Y</h1>
      <div className="flex pr-5 gap-5 items-center">
        <h1 className="text-sm text-white">{user?.name}</h1>
        <Button onClick={() => setOpenSidebar(true)}>
          <Menu />
        </Button>
      </div>

      {openSidebar && (
        <SidebarMenuItems
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      )}
    </div>
  );
}

export default Header;
