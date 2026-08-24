"use client";
import { Drawer, Button, InputNumber, Empty } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getImageUrl, formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, updateQty, removeItem, totalItems, totalPrice, drawerOpen, setDrawerOpen } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setDrawerOpen(false);
    router.push("/checkout");
  };

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <ShoppingCartOutlined style={{ fontSize: 20, color: "#d97706" }} />
          <span className="font-semibold text-stone-800">
            Your Cart {totalItems > 0 && `(${totalItems})`}
          </span>
        </div>
      }
      placement="right"
      onClose={() => setDrawerOpen(false)}
      open={drawerOpen}
      width={380}
      styles={{ body: { padding: "16px", display: "flex", flexDirection: "column", height: "100%" } }}
    >
      <div className="flex flex-col h-full">
        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <Empty
              image={<ShoppingCartOutlined style={{ fontSize: 64, color: "#d1d5db" }} />}
              description={<span className="text-stone-400">Your cart is empty</span>}
            />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-amber-50 rounded-xl p-3 border border-amber-100"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-stone-100 flex-shrink-0">
                    {item.image ? (
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🌿
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-800 leading-tight line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-amber-600 font-bold text-sm mt-0.5">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <InputNumber
                        min={1}
                        max={10}
                        value={item.qty}
                        onChange={(val) => updateQty(item.id, val)}
                        size="small"
                        style={{ width: 70 }}
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-stone-100 space-y-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-stone-600 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-amber-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="text-xs text-stone-400 text-center">
                Free delivery on prepaid orders
              </div>
              <Button
                type="primary"
                size="large"
                block
                onClick={handleCheckout}
                style={{ background: "#d97706", borderColor: "#d97706", fontWeight: 600 }}
              >
                Proceed to Checkout
              </Button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-full text-center text-sm text-stone-400 hover:text-stone-600 transition-colors py-1"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}
