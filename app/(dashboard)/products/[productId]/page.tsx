"use client";

import Loader from "@/components/custom-ui/Loader";
import ProductForm from "@/components/product/ProductForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductsDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`);
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Try again!");
      console.log("product-GET", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <ProductForm initialData={productDetails} />
    </div>
  );
};

export default ProductsDetails;
