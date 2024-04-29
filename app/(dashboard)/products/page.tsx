"use client";

import { DataTable } from "@/components/custom-ui/DataTable";
import Loader from "@/components/custom-ui/Loader";
import { productColumns } from "@/components/product/ProductColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();
  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", { method: "GET" });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("GET-products", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 max-sm:px-4 py-5">
      <div className="flex max-sm:flex-col max-sm:gap-2 md:items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="size-4 mr-2" /> Create Products
        </Button>
      </div>
      <Separator className="my-4 bg-grey-1" />
      <DataTable columns={productColumns} data={products} searchKey="title" />
    </div>
  );
};

export default ProductsPage;
