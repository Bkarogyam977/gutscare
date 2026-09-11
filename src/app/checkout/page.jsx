"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Button, Modal, message, Divider, Tag } from "antd";
import {
  CheckCircleFilled,
  ShoppingOutlined,
  ArrowLeftOutlined,
  CreditCardOutlined,
  CarOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useCart } from "@/context/CartContext";
import { useTenant } from "@/providers/TenantProvider";
import { getImageUrl, formatPrice } from "@/lib/utils";

const COD_LIMIT = 50000;
const FREE_DELIVERY_THRESHOLD = 499;
const DELIVERY_CHARGE = 59;

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
  "West Bengal","Delhi","Jammu & Kashmir","Ladakh","Chandigarh","Puducherry",
];

function PaymentPending({ orderId, total, paymentUrl, onCancel }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
        {/* Pulsing payment icon */}
        <div className="relative w-20 h-20 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-50" />
          <div className="relative w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCardOutlined style={{ fontSize: 36, color: "#2563eb" }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-stone-900 mb-1">Awaiting Payment</h1>
        <p className="text-stone-500 text-sm mb-4">Your order is reserved — complete the payment to confirm</p>

        {orderId && (
          <div className="bg-stone-50 rounded-xl px-4 py-3 mb-4 flex justify-between items-center">
            <span className="text-stone-500 text-sm">Order ID</span>
            <span className="font-mono font-semibold text-amber-600">#{orderId}</span>
          </div>
        )}
        <div className="bg-stone-50 rounded-xl px-4 py-3 mb-6 flex justify-between items-center">
          <span className="text-stone-500 text-sm">Amount</span>
          <span className="font-bold text-stone-900 text-lg">{formatPrice(total)}</span>
        </div>

        <a
          href={paymentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full mb-3"
        >
          <Button
            type="primary"
            size="large"
            block
            style={{ background: "#2563eb", borderColor: "#2563eb", fontWeight: 700, height: 52, fontSize: 16 }}
          >
            Open Payment Page →
          </Button>
        </a>

        <p className="text-xs text-stone-400 mb-6">
          Payment opens in a new tab — UPI · Debit/Credit Card · Net Banking
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700 text-left space-y-1 mb-6">
          <p>1. Click "Open Payment Page" above</p>
          <p>2. Complete your payment in the new tab</p>
          <p>3. You will be redirected to a confirmation page</p>
        </div>

        <Button
          size="small"
          type="text"
          onClick={onCancel}
          style={{ color: "#9ca3af", fontSize: 12 }}
        >
          Cancel & go back to home
        </Button>
      </div>
    </div>
  );
}

function OrderSuccess({ orderId, total, onContinue }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircleFilled style={{ fontSize: 48, color: "#22c55e" }} />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Order Placed!</h1>
        {orderId && (
          <p className="text-stone-500 text-sm mb-1">
            Order ID:{" "}
            <span className="font-mono font-semibold text-amber-600">#{orderId}</span>
          </p>
        )}
        <p className="text-2xl font-bold text-amber-600 mt-2 mb-4">
          {formatPrice(total)}
        </p>
        <div className="bg-amber-50 rounded-xl p-4 text-sm text-stone-600 mb-6 text-left space-y-1.5">
          <p>✓ Our team will call you to confirm delivery</p>
          <p>✓ Dispatch within 1–2 business days</p>
          <p>✓ Delivery in 3–7 business days</p>
          <p>✓ Pay on delivery in cash</p>
        </div>
        <Button
          type="primary"
          size="large"
          block
          onClick={onContinue}
          style={{ background: "#d97706", borderColor: "#d97706", fontWeight: 600 }}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { store_name } = useTenant();
  const router = useRouter();
  const [form] = Form.useForm();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [savedFormValues, setSavedFormValues] = useState(null);

  const deliveryCharge = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const grandTotal = totalPrice + deliveryCharge;
  const isCODBlocked = grandTotal > COD_LIMIT;

  if (success?.payment_method === "online") {
    return (
      <PaymentPending
        orderId={success.order_id}
        total={success.total}
        paymentUrl={success.payment_url}
        onCancel={() => {
          clearCart();
          router.push("/");
        }}
      />
    );
  }

  if (success?.payment_method === "cod") {
    return (
      <OrderSuccess
        orderId={success.order_id}
        total={success.total}
        onContinue={() => {
          clearCart();
          router.push("/");
        }}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingOutlined style={{ fontSize: 64, color: "#d1d5db" }} />
          <p className="text-stone-500 mt-4 mb-6">Your cart is empty.</p>
          <Button
            onClick={() => router.push("/")}
            icon={<ArrowLeftOutlined />}
            style={{ borderColor: "#d97706", color: "#d97706" }}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    try {
      const values = await form.validateFields();
      setSavedFormValues(values);
      setPaymentModalOpen(true);
    } catch {
      // validation errors shown inline
    }
  };

  const placeOrder = async (paymentMethod) => {
    setOrderLoading(true);
    try {
      const v = savedFormValues;
      const payload = {
        name: v.name,
        mobile: v.mobile,
        email: v.email || "",
        building: v.building,
        street: v.street,
        city: v.city,
        state: v.state,
        pincode: v.pincode,
        payment_method: paymentMethod,
        items: items.map((i) => ({
          product_id: i.id,
          product_name: i.name,
          unit_price: i.price,
          mrp: i.price,
          qty: i.qty,
        })),
        store_name,
        total_amount: grandTotal,
        delivery_charge: deliveryCharge,
      };

      const orderRes = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        message.error(orderData.error || "Failed to place order. Please try again.");
        return;
      }

      if (paymentMethod === "online") {
        const payRes = await fetch("/api/payment/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: orderData.order_id,
            amount: grandTotal,
            email: v.email || "",
            mobile: v.mobile,
          }),
        });
        const payData = await payRes.json();

        if (!payRes.ok || !payData.success) {
          message.error(payData.error || "Payment initiation failed. Please try COD or contact us.");
          return;
        }

        const { EncData, MerchantId, BankId, TerminalId } = payData;
        const paymentUrl = `https://payment.bkarogyam.com/process_data/?EncData=${EncData}&MerchantId=${MerchantId}&BankId=${BankId}&TerminalId=${TerminalId}`;
        setPaymentModalOpen(false);
        setSuccess({ order_id: orderData.order_id, total: grandTotal, payment_method: "online", payment_url: paymentUrl });
      } else {
        setPaymentModalOpen(false);
        setSuccess({ order_id: orderData.order_id, total: grandTotal, payment_method: "cod" });
      }
    } catch {
      message.error("Something went wrong. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-amber-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-stone-500 hover:text-amber-600 transition-colors"
          >
            <ArrowLeftOutlined style={{ fontSize: 18 }} />
          </button>
          <img
            src="https://bkarogyam.com/favicon.ico"
            alt="BK Arogyam"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-bold text-stone-900">Checkout</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ---- Form ---- */}
          <div className="lg:col-span-3">
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
            >
              {/* Contact */}
              <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm mb-5">
                <h2 className="font-semibold text-stone-800 mb-4">Contact Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                    className="mb-0"
                  >
                    <Input placeholder="Ramesh Kumar" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="mobile"
                    label="Mobile Number"
                    rules={[
                      { required: true, message: "Please enter your mobile" },
                      { pattern: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile" },
                    ]}
                    className="mb-0"
                  >
                    <Input placeholder="9876543210" size="large" maxLength={10} />
                  </Form.Item>
                </div>
                <Form.Item name="email" label="Email (optional)" className="mb-0 mt-4">
                  <Input placeholder="you@example.com" size="large" type="email" />
                </Form.Item>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm mb-5">
                <h2 className="font-semibold text-stone-800 mb-4">Delivery Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Form.Item
                    name="building"
                    label="Flat / House / Building No."
                    rules={[{ required: true, message: "Required" }]}
                    className="mb-0"
                  >
                    <Input placeholder="B-42, 2nd Floor" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="street"
                    label="Street / Area / Locality"
                    rules={[{ required: true, message: "Required" }]}
                    className="mb-0"
                  >
                    <Input placeholder="Shyam Nagar, Near Bus Stand" size="large" />
                  </Form.Item>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[{ required: true, message: "Required" }]}
                    className="mb-0"
                  >
                    <Input placeholder="Bhopal" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="state"
                    label="State"
                    rules={[{ required: true, message: "Required" }]}
                    className="mb-0"
                  >
                    <Select placeholder="Select state" size="large" showSearch>
                      {STATES.map((s) => (
                        <Select.Option key={s} value={s}>
                          {s}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="pincode"
                    label="Pincode"
                    rules={[
                      { required: true, message: "Required" },
                      { pattern: /^\d{6}$/, message: "6-digit pincode" },
                    ]}
                    className="mb-0"
                  >
                    <Input placeholder="462001" size="large" maxLength={6} />
                  </Form.Item>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                size="large"
                block
                style={{
                  background: "#d97706",
                  borderColor: "#d97706",
                  color: "#fff",
                  fontWeight: 700,
                  height: 52,
                  fontSize: 16,
                  borderRadius: 12,
                }}
              >
                Place Order — {formatPrice(grandTotal)}
              </Button>
            </Form>
          </div>

          {/* ---- Order Summary ---- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 sticky top-24">
              <h2 className="font-semibold text-stone-800 mb-4">
                Order Summary ({totalItems} item{totalItems > 1 ? "s" : ""})
              </h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-amber-50 border border-amber-100 flex-shrink-0">
                      {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">
                          🌿
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-700 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">Qty: {item.qty}</p>
                      <p className="text-sm font-semibold text-amber-600">
                        {formatPrice(Math.round(item.price) * item.qty)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Divider className="my-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-stone-600">Delivery</span>
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    <span className="text-stone-700">{formatPrice(deliveryCharge)}</span>
                  )}
                </div>
                {deliveryCharge > 0 && (
                  <p className="text-xs text-stone-400">
                    Add {formatPrice(FREE_DELIVERY_THRESHOLD - totalPrice)} more for free delivery
                  </p>
                )}
              </div>
              <Divider className="my-3" />
              <div className="flex justify-between font-bold text-stone-900 text-base">
                <span>Total</span>
                <span className="text-amber-600 text-lg">{formatPrice(grandTotal)}</span>
              </div>
              <div className="mt-4 space-y-1.5 text-xs text-stone-500">
                <p>✓ 100% Authentic Products</p>
                <p>✓ Easy Returns</p>
                <p>✓ Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Payment Method Modal ---- */}
      <Modal
        open={paymentModalOpen}
        onCancel={() => !orderLoading && setPaymentModalOpen(false)}
        footer={null}
        title="Choose Payment Method"
        centered
        width={420}
      >
        <div className="py-2">
          <div className="bg-amber-50 rounded-xl p-3 mb-5 flex justify-between items-center">
            <span className="text-stone-600 text-sm">Order Total</span>
            <span className="font-bold text-amber-600 text-lg">{formatPrice(grandTotal)}</span>
          </div>

          <div className="space-y-3">
            {/* COD */}
            <button
              onClick={() => !orderLoading && !isCODBlocked && placeOrder("cod")}
              disabled={isCODBlocked || orderLoading}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                isCODBlocked
                  ? "border-stone-100 bg-stone-50 opacity-60 cursor-not-allowed"
                  : "border-stone-200 hover:border-amber-400 hover:bg-amber-50 cursor-pointer"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <CarOutlined style={{ fontSize: 20, color: "#d97706" }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-stone-800">Cash on Delivery</p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isCODBlocked
                    ? "Not available for orders above ₹50,000"
                    : "Pay in cash when your order arrives"}
                </p>
              </div>
              {isCODBlocked && (
                <WarningOutlined style={{ color: "#f59e0b", fontSize: 18 }} />
              )}
            </button>

            {/* Online Payment */}
            <button
              onClick={() => !orderLoading && placeOrder("online")}
              disabled={orderLoading}
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-stone-200 hover:border-amber-400 hover:bg-amber-50 text-left transition-all cursor-pointer disabled:opacity-60"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <CreditCardOutlined style={{ fontSize: 20, color: "#3b82f6" }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-stone-800">Pay Online</p>
                  <Tag color="blue" style={{ fontSize: 10, lineHeight: "16px" }}>
                    ICICI
                  </Tag>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  UPI, Debit/Credit Card, Net Banking
                </p>
              </div>
            </button>
          </div>

          {orderLoading && (
            <p className="text-center text-sm text-stone-400 mt-4">
              Processing your order...
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
}
