import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Product = {
  id?: number;
  nama_produk: string;
  harga_satuan: number;
  quantity: number;
};

interface Props {
  product?: Product | null;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<Product>({
    nama_produk: "",
    harga_satuan: 0,
    quantity: 0
  });

  useEffect(() => {
    if (product) setForm(product);
    else setForm({ nama_produk: "", harga_satuan: 0, quantity: 0 });
  }, [product]);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nama_produk: "", harga_satuan: 0, quantity: 0 });
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="mb-6 p-5 border border-fuchsia-300 bg-white/90 rounded-2xl shadow-xl"
    >
      <h3 className="font-bold mb-4 text-fuchsia-700 text-lg">
        {product ? "Edit Produk" : "Tambah Produk"}
      </h3>
      <input
        type="text"
        name="nama_produk"
        placeholder="Nama Produk"
        className="w-full p-3 mb-3 rounded-xl bg-white border-2 border-blue-300 focus:border-fuchsia-400 outline-none text-gray-800 placeholder:text-gray-400 transition-all shadow"
        value={form.nama_produk}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="harga_satuan"
        placeholder="Harga Satuan"
        className="w-full p-3 mb-3 rounded-xl bg-white border-2 border-blue-300 focus:border-fuchsia-400 outline-none text-gray-800 placeholder:text-gray-400 transition-all shadow"
        value={form.harga_satuan}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        className="w-full p-3 mb-5 rounded-xl bg-white border-2 border-blue-300 focus:border-fuchsia-400 outline-none text-gray-800 placeholder:text-gray-400 transition-all shadow"
        value={form.quantity}
        onChange={handleChange}
        required
      />
      <div className="flex gap-2 justify-end">
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition"
        >
          {product ? "Update" : "Tambah"}
        </button>
        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}
