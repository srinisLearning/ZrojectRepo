import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import usersGlobalStore, { IUsersStore } from "@/store/users-store";
import { LayoutDashboard } from "lucide-react";
import {
  ListChecks,
  ListCollapse,
  ListTodo,
  LogOut,
  ShoppingBag,
  User2,
  UserSquare,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "@/components/functional/logout-button";


function SidebarMenuItems({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}) {
  const { user } = usersGlobalStore() as IUsersStore;
  const pathname = usePathname();
  const router = useRouter();
  const iconSize = 14;
  const userMenuItems: any = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={iconSize} />,
      path: "/user/dashboard",
    },
    {
      title: "Listings",
      icon: <ShoppingBag size={iconSize} />,
      path : "/user/listings",
    }, 
    {
      title: "Bids Placed",
      icon: <ListChecks size={iconSize} />,
      path: "/user/bids-placed",
    },
    {
      title: "Bids Won",
      icon: <ListCollapse size={iconSize} />,
      path: "/user/bids-won",
    },
    {
      title: "Profile",
      icon: <UserSquare size={iconSize} />,
      path: "/user/profile",
    },
  ];
  const adminMenuItems: any = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={iconSize} />,
      path: "/admin/dashboard",
    },
    {
      title: "Listings",
      icon: <ListTodo size={iconSize} />,
      path: "/admin/listings",
    },
    {
      title: "Categories",
      icon: <ListCollapse size={iconSize} />,
      path: "/admin/categories",
    },
    {
      title: "Bids Placed",
      icon: <ListChecks size={iconSize} />,
      path: "/admin/bids-placed",
    },
    {
      title: "Users",
      icon: <User2 size={iconSize} />,
      path: "/admin/users",
    },
    {
      title: "Profile",
      icon: <UserSquare size={iconSize} />,
      path: "/admin/profile",
    },
  ];

  const menuItems: any =
    user?.role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <Sheet open={openSidebar} onOpenChange={(open) => setOpenSidebar(open)}>
      <SheetContent className="lg:max-w-[400px]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="p-5 h-full w-full mt-10">
          <div className="flex flex-col gap-6">
            {menuItems.map((item: any, index: number) => (
              <div
                className={`flex gap-5 items-center cursor-pointer p-3 ${
                  pathname === item.path
                    ? "bg-gray-100 rounded border border-primary"
                    : ""
                }`}
                key={index}
                onClick={() => {
                  setOpenSidebar(false);
                  router.push(item.path);
                }}
              >
                <div
                  className={`${
                    pathname === item.path ? "text-primary" : "text-black"
                  }`}
                >
                  {item.icon}
                </div>
                <h1
                  className={`text-sm ${
                    pathname === item.path ? "text-primary" : "text-black"
                  }`}
                >
                  {item.title}
                </h1>
              </div>
            ))}

            <LogoutButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SidebarMenuItems;