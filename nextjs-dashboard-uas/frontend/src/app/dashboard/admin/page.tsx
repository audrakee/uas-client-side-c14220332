"use client";
import { useEffect, useState } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/api";
import { getUserSession, clearUserSession } from "@/lib/auth";
import ProductTable from "@/components/ProductTable";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Product = {
  id?: number;
  nama_produk: string;
  harga_satuan: number;
  quantity: number;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const sessionUser = getUserSession();
    setUser(sessionUser);

    if (!sessionUser || sessionUser.role !== "admin") router.push("/signin");
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  function fetchProducts() {
    getProducts().then(setProducts);
  }

  function handleAdd() {
    setEditProduct(null);
    setShowForm(true);
  }

  async function handleFormSubmit(product: Product) {
    if (editProduct) {
      await updateProduct(editProduct.id, product);
    } else {
      await addProduct(product);
    }
    setShowForm(false);
    fetchProducts();
  }

  async function handleEdit(product: Product) {
    setEditProduct(product);
    setShowForm(true);
  }

  async function handleDelete(id: number) {
    await deleteProduct(id);
    fetchProducts();
  }

  function handleCancel() {
    setShowForm(false);
    setEditProduct(null);
  }

  // --- Statistik dashboard (PASTI BENAR) ---
  // Pastikan quantity berupa number
  const productsFixed = products.map(p => ({
    ...p,
    quantity: Number(p.quantity),
  }));

  const totalProduk = productsFixed.length;
  const quantities = productsFixed.map((p) => p.quantity);
  const minQty = quantities.length > 0 ? Math.min(...quantities) : null;
  const maxQty = quantities.length > 0 ? Math.max(...quantities) : null;

  const stokTerendahList =
    minQty !== null
      ? productsFixed.filter((p) => p.quantity === minQty)
      : [];
  const stokTerbanyakList =
    maxQty !== null
      ? productsFixed.filter((p) => p.quantity === maxQty)
      : [];
  const stokKritis = productsFixed.filter((p) => p.quantity <= 5);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-fuchsia-200 to-pink-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8"
      >
        {/* Header dan Logout */}
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
        {/* Warning stok rendah */}
        {stokKritis.length > 0 && (
          <div className="mb-4 p-3 bg-pink-100 border border-pink-300 rounded-lg text-pink-700 text-sm shadow animate-pulse">
            ⚠️ Ada {stokKritis.length} produk stok &le; 5:{" "}
            {stokKritis.map((p) => p.nama_produk).join(", ")}
          </div>
        )}

        {/* CRUD Produk */}
        <button
          className="mb-4 bg-gradient-to-r from-green-400 via-fuchsia-400 to-pink-400 text-white font-bold px-5 py-2 rounded-xl shadow hover:scale-105 transition"
          onClick={handleAdd}
        >
          Tambah Produk
        </button>
        {showForm && (
          <ProductForm
            product={editProduct}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        )}
        <ProductTable
          products={productsFixed}
          isAdmin
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.div>
    </div>
  );
}
