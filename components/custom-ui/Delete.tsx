import { Trash } from "lucide-react";
import { Button } from "../ui/button";

const Delete = () => {
  return (
    <Button className="bg-red-1 text-white">
      <Trash className="size-4" />
    </Button>
  );
};

export default Delete;
