import { motion } from "framer-motion";
type Product = { id: number; nama_produk: string; harga_satuan: number; quantity: number; };

interface Props {
  products: Product[];
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

export default function ProductTable({ products, isAdmin, onEdit, onDelete }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto shadow-2xl rounded-2xl bg-white/90"
    >
      <table className="w-full rounded-2xl text-sm sm:text-base">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-pink-100">
            <th className="p-3 text-left font-bold text-indigo-900">Nama Produk</th>
            <th className="p-3 text-left font-bold text-indigo-900">Harga Satuan</th>
            <th className="p-3 text-left font-bold text-indigo-900">Quantity</th>
            {isAdmin && <th className="p-3 text-left font-bold text-indigo-900">Action</th>}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-indigo-50 transition border-b last:border-0">
              <td className="p-3 text-gray-800">{p.nama_produk}</td>
              <td className="p-3 text-gray-800">Rp {p.harga_satuan.toLocaleString()}</td>
              <td className="p-3 text-gray-800">{p.quantity}</td>
              {isAdmin && (
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => onEdit?.(p)}
                    className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-lg shadow hover:scale-105 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(p.id)}
                    className="px-3 py-1 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg shadow hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
