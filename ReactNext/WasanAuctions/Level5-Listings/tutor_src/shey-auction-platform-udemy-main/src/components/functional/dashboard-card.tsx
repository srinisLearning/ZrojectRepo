import React from "react";
import { useRouter } from "next/navigation";

interface DashboardCardProps {
  title: string;
  description: string;
  value: string | number;
  showCurrency?: boolean;
  onClickPath?: string;
}

function DashboardCard({
  title,
  description,
  value,
  showCurrency = false,
  onClickPath,
}: DashboardCardProps) {
  const router = useRouter();
  return (
    <div
      className="p-5 border border-gray-500 flex flex-col gap-5 bg-gray-50 rounded cursor-pointer hover:border-primary"
      onClick={() => {
        if (onClickPath) {
          router.push(onClickPath);
        }
      }}
    >
      <h1 className="text-sm uppercase font-bold! text-primary">{title}</h1>
      <h1 className="text-6xl font-bold! text-gray-600 text-center">
        {showCurrency ? `$${value}` : value}
      </h1>
      <p className="text-xs text-gray-700">{description}</p>
    </div>
  );
}

export default DashboardCard;
