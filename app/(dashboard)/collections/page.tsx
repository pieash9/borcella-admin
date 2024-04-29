"use client";

import { collectionColumns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom-ui/DataTable";
import Loader from "@/components/custom-ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CollectionsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/collections", { method: "GET" });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("GET-collection", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 max-sm:px-4 py-5">
      <div className="flex max-sm:flex-col max-sm:gap-2 md:items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/collections/new")}
        >
          <Plus className="size-4 mr-2" /> Create Collection
        </Button>
      </div>
      <Separator className="my-4 bg-grey-1" />
      <DataTable
        columns={collectionColumns}
        data={collections}
        searchKey="title"
      />
    </div>
  );
};

export default CollectionsPage;
