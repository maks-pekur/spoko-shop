import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  product: { id, name, imageUrl, price },
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <Image width={215} height={215} src={imageUrl || ""} alt={name} />
        </div>

        <h4>{name}</h4>

        <p className="text-sm text-gray-400">
          {/* {ingredients?.map((ingredient) => ingredient.name).join(", ")} */}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Add
          </Button>
        </div>
      </Link>
    </div>
  );
};
