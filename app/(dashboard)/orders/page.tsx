import { DataTable } from "@/components/custom-ui/DataTable";
import { orderColumns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";

const OrdersPage = async () => {
  const res = await fetch("http://localhost:3000/api/orders");
  const order = await res.json();
  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable searchKey="_id" columns={orderColumns} data={order} />
    </div>
  );
};

export default OrdersPage;
