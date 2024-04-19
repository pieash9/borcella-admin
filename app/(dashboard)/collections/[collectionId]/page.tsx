"use client";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom-ui/Loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/collections/${params.collectionId}`);
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Try again!");
      console.log("Collection-GET", error);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <CollectionForm initialData={collectionDetails} />
    </div>
  );
};

export default CollectionDetails;
