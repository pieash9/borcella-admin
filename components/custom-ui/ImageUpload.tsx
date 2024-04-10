import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { FC } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ value, onChange, onRemove }) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, i) => (
          <div key={i} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10 ">
              <Button
                className="bg-red-1 text-white"
                onClick={() => onRemove(url)}
                size="sm"
              >
                <Trash className="size-4 " />
              </Button>
            </div>
            <Image
              src={url}
              alt="collections"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="mzzgxh4m" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button className="bg-grey-1 text-white" onClick={() => open()}>
              <Plus className="size-4 mr-4" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
