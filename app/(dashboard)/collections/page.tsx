"use client";

import { columns } from "@/components/collections/CollectionColumn";
import { DataTable } from "@/components/custom-ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const CollectionsPage = () => {
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

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button className="bg-blue-1 text-white">
          <Plus className="size-4 mr-2" /> Create Collection
        </Button>
      </div>
      <Separator className="my-4 bg-grey-1" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default CollectionsPage;
