import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Modal, Button } from "antd";
import { getter } from "../../../hooks/useLocalStorage";
import { ChevronDown } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const api = import.meta.env.VITE_PUBLIC_GREENSHOP_API;
const accessToken = getter({ key: "user" })?.user?._id;

function TrackOrder() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showProducts, setShowProducts] = useState(true);
  const [showBilling, setShowBilling] = useState(false);
  const queryClient = useQueryClient();

  const handleGetOrder = async () => {
    const accessToken = getter({ key: "user" })?.user?._id;
    const res = await axios.get(`${api}order/get-order?access_token=${accessToken}`)
    return res
  }

  const { data } = useQuery({
    queryKey: ["trackOrder"],
    queryFn: handleGetOrder,
  });

  const handleView = (order: any) => {
    setSelectedOrder(order);
    setOpenModal(true);
    setShowProducts(true);
    setShowBilling(false);
  };

  const handleDelete = () => {
    const accessToken = getter({ key: "user" })?.user?._id;
    axios.delete(`${api}order/delete-order?access_token=${accessToken}`, { data: { _id: selectedOrder._id }, })
      .then(() => {
        setOpenModal(false);
        queryClient.setQueryData(["trackOrder"], (oldData: any) => {
          return {
            ...oldData,
            data: {
              ...oldData.data, data: oldData.data.data.filter(
                (order: any) => order._id !== selectedOrder._id
              ),
            },
          };
        });
        toast.success('Order Canceled');
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error('Falied delete')
      });
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Track Your Orders</h2>

      {data?.data?.data?.map((order: any, i: number) => (
        <div key={i} className="bg-[#FBFBFB] flex items-center justify-between py-2 px-5 mb-4 rounded-md hover:bg-gray-100">
          <div className="w-[15%]">
            <p className="text-base font-semibold">Order Number</p>
            <p>{order._id.slice(-14)}</p>
          </div>
          <div className="w-[2px] h-12 bg-gray-400/50 rounded"></div>
          <div className="w-[15%]">
            <p className="text-base font-semibold">Date</p>
            <p>{new Date(order.created_at).toDateString()}</p>
          </div>
          <div className="w-[2px] h-12 bg-gray-400/50 rounded"></div>
          <div className="w-[10%]">
            <p className="text-base font-semibold">Total</p>
            <p className="text-[#45A358] font-medium">
              ${(order.extra_shop_info?.total_price?.toFixed(1)) || (order.extra_shop_info?.total?.toFixed(1)) || 0}
            </p>
          </div>
          <div className="w-[2px] h-12 bg-gray-400/50 rounded"></div>
          <div>
            <p className="text-base font-semibold">More</p>
            <button className="text-[#45A358] font-semibold" onClick={() => handleView(order)}>
              Get details
            </button>
          </div>
          <div className="w-[2px] h-12 bg-gray-400/50 rounded opacity-0"></div>

        </div>
      ))}
      <Modal
        open={openModal}
        onCancel={() => { setOpenModal(false); setShowProducts(true); setShowBilling(false) }}
        closeIcon={<span className="text-xl font-bold">×</span>}
        footer={[
          <Button key="cancel" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>,
          <Button key="delete" danger onClick={handleDelete}>
            Delete
          </Button>,
        ]}
        style={{ maxWidth: "1000px", width: "100%" }}
      >
        {selectedOrder && (
          <div className="text-sm w-full mx-auto relative">
            <p className="text-lg font-bold mb-4 mt-2">Order Confirmation</p>

            <div className="grid grid-cols-2 text-sm mb-4 gap-4">
              <div><b>Order Number</b><br />{selectedOrder._id.slice(-14)}</div>
              <div><b>Date</b><br />{new Date(selectedOrder.created_at).toDateString()}</div>
              <div className="text-[#46A358]"><b className="text-black">Total</b><br />${selectedOrder.extra_shop_info?.total_price?.toFixed(2) || selectedOrder.extra_shop_info?.total?.toFixed(2)}</div>
              <div><b>Payment Method</b><br />{selectedOrder.billing_address?.payment_method || selectedOrder.extra_shop_info?.method}</div>
            </div>

            <div
              className="flex items-center justify-between cursor-pointer border-b pb-2 mb-2"
              onClick={() => { setShowProducts(!showProducts); setShowBilling(!showBilling) }}
            >
              <p className="font-semibold">Order Details</p>
              <ChevronDown className={`transition-transform duration-300 ${showProducts ? "rotate-180" : ""}`} size={18} />
            </div>

            <div className={`transition-all duration-500 overflow-hidden ${showProducts ? "max-h-[300px]" : "max-h-0"}`}>
              <div className="overflow-y-auto max-h-[240px] pr-2">
                {selectedOrder.shop_list?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4 border-b py-2 min-h-[72px]">
                    <img src={item.main_image || ""} alt={item.title} className="w-12 h-12 object-cover" />
                    <div className="flex-grow">
                      <p>{item.title} <span className='text-xs text-gray-500'>( x{item.count || 1})</span> </p>
                      <p className="text-xs text-gray-500">SKU: {item._id}</p>
                    </div>
                    <p className="font-medium text-[#46A358]">${(item.price * (item.count || 1)).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex items-center justify-between cursor-pointer border-b pb-2 mt-6 mb-2"
              onClick={() => { setShowProducts(!showProducts); setShowBilling(!showBilling) }}
            >
              <p className="font-semibold">Billing Address</p>
              <ChevronDown className={`transition-transform duration-300 ${showBilling ? "rotate-180" : ""}`} size={18} />
            </div>

            <div className={`transition-all duration-500 overflow-hidden ${showBilling ? "max-h-[300px]" : "max-h-0"}`}>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div><b>Name</b><br />{selectedOrder.billing_address?.first_name || selectedOrder.billing_address?.name} {selectedOrder.billing_address?.last_name || selectedOrder.billing_address?.surname}</div>
                <div><b>Email</b><br />{selectedOrder.billing_address?.email}</div>
                <div><b>Phone</b><br />{selectedOrder.billing_address?.phone_number || "You didn't enter a number"}</div>
                <div><b>Address</b><br />{selectedOrder.billing_address?.street_address}, {selectedOrder.billing_address?.town}</div>
                <div><b>Zip</b><br />{selectedOrder.billing_address?.zip}</div>
                <div><b>Country</b><br />{selectedOrder.billing_address?.country}</div>
              </div>
            </div>

            <div className="mt-4 text-right text-sm">
              <p>Shipping: <b className="text-[#46A358]">${selectedOrder.extra_shop_info?.shiping || 16}</b></p>
              <p>Total: <b className="text-[#46A358]">${selectedOrder.extra_shop_info?.total_price?.toFixed(2) || selectedOrder.extra_shop_info?.total?.toFixed(2)}</b></p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TrackOrder;