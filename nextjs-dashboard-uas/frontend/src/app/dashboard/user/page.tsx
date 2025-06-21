"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { getUserSession, clearUserSession } from "@/lib/auth";
import ProductTable from "@/components/ProductTable";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Product = {
  id: number;
  nama_produk: string;
  harga_satuan: number;
  quantity: number;
};

export default function UserDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const totalProduk = products.length;

  useEffect(() => {
  const sessionUser = getUserSession();
  setUser(sessionUser);

  if (!sessionUser) router.push("/signin");
  getProducts().then(setProducts);
  // eslint-disable-next-line
}, []);

  // Statistik dashboard user
const quantities = products.map((p) => p.quantity);
const minQty = quantities.length > 0 ? Math.min(...quantities) : undefined;
const maxQty = quantities.length > 0 ? Math.max(...quantities) : undefined;

const stokTerendahList =
  typeof minQty === "number"
    ? products.filter((p) => p.quantity === minQty)
    : [];
const stokTerbanyakList =
  typeof maxQty === "number"
    ? products.filter((p) => p.quantity === maxQty)
    : [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-fuchsia-200 to-pink-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 via-fuchsia-700 to-pink-600 bg-clip-text text-transparent">
            Welcome, {user?.username}
          </h2>
          <button
            className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition"
            onClick={() => {
              clearUserSession();
              router.push("/signin");
            }}
          >
            Logout
          </button>
        </div>
        {/* Statistik Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-white/80 rounded-xl p-4 shadow text-center border-l-4 border-indigo-400">
            <div className="text-2xl font-bold text-indigo-600">{totalProduk}</div>
            <div className="text-gray-500 text-sm">Total Produk</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 shadow text-center border-l-4 border-pink-400">
            <div className="text-lg font-semibold text-pink-500">
              {stokTerendahList.length > 0
                ? stokTerendahList.map((p) => p.nama_produk).join(", ")
                : "-"}
            </div>
            <div className="text-gray-500 text-xs">Stok Paling Sedikit</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 shadow text-center border-l-4 border-fuchsia-400">
            <div className="text-lg font-semibold text-fuchsia-500">
              {stokTerbanyakList.length > 0
                ? stokTerbanyakList.map((p) => p.nama_produk).join(", ")
                : "-"}
            </div>
            <div className="text-gray-500 text-xs">Stok Terbanyak</div>
          </div>
        </div>
        <ProductTable products={products} />
      </motion.div>
    </div>
  );
}