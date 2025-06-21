// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "@/lib/api";
// import { setUserSession } from "@/lib/auth";

// export default function SignInPage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (!form.username || !form.password) {
//       setError("Username dan Password harus diisi!");
//       return;
//     }
//     const user = await signIn(form.username, form.password);
//     if (!user) {
//       setError("Username atau password salah!");
//     } else {
//       setUserSession(user);
//       if (user.role === "admin") {
//         router.push("/dashboard/admin");
//       } else {
//         router.push("/dashboard/user");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Sign In</h2>
//         {error && <div className="mb-2 text-red-600">{error}</div>}
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="w-full p-2 border mb-3 rounded"
//           value={form.username}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full p-2 border mb-4 rounded"
//           value={form.password}
//           onChange={handleChange}
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
//       </form>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signIn } from "@/lib/api";
// import { setUserSession } from "@/lib/auth";
// import { motion } from "framer-motion";

// export default function SignInPage() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     if (!form.username || !form.password) {
//       setError("Username dan Password harus diisi!");
//       return;
//     }
//     const user = await signIn(form.username, form.password);
//     if (!user) {
//       setError("Username atau password salah!");
//     } else {
//       setUserSession(user);
//       if (user.role === "admin") {
//         router.push("/dashboard/admin");
//       } else {
//         router.push("/dashboard/user");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400">
//       <motion.form
//         initial={{ opacity: 0, scale: 0.9, y: 60 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         onSubmit={handleSubmit}
//         className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-700 via-fuchsia-700 to-pink-600 bg-clip-text text-transparent">
//           Sign In
//         </h2>
//         {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="w-full p-3 mb-4 rounded-xl bg-white border-2 border-blue-400 focus:border-fuchsia-400 outline-none text-gray-800 placeholder:text-gray-400 transition-all shadow-lg"
//           value={form.username}
//           onChange={handleChange}
//           autoComplete="username"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full p-3 mb-6 rounded-xl bg-white border-2 border-blue-400 focus:border-fuchsia-400 outline-none text-gray-800 placeholder:text-gray-400 transition-all shadow-lg"
//           value={form.password}
//           onChange={handleChange}
//           autoComplete="current-password"
//         />
//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-500 text-white font-semibold p-3 rounded-xl shadow-md hover:scale-105 transition"
//         >
//           Login
//         </button>
//       </motion.form>
//       <div className="mt-6 text-white/80 text-xs text-center select-none">
//         <span>Demo: user1/password123, admin1/adminpassword</span>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/api";
import { setUserSession } from "@/lib/auth";
import { motion } from "framer-motion";

export default function SignInPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Username dan Password harus diisi!");
      return;
    }
    const user = await signIn(form.username, form.password);
    if (!user) {
      setError("Username atau password salah!");
    } else {
      setUserSession(user);
      if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/user");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-400 via-fuchsia-300 to-pink-200">
      <motion.form
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-700 via-fuchsia-700 to-pink-600 bg-clip-text text-transparent">
          Sign In
        </h2>
        {error && <div className="mb-3 text-center text-red-600 font-medium">{error}</div>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 mb-4 rounded-xl bg-white border-2 border-blue-400 focus:border-fuchsia-400 outline-none text-gray-800 placeholder:text-gray-400 transition-all shadow-lg"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-xl bg-white border-2 border-blue-400 focus:border-fuchsia-400 outline-none text-gray-800 placeholder:text-gray-400 transition-all shadow-lg"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-500 text-white font-semibold p-3 rounded-xl shadow-md hover:scale-105 transition"
        >
          Login
        </button>
      </motion.form>
      <div className="mt-6 text-white/80 text-xs text-center select-none drop-shadow">
        Demo: <span className="font-mono">user1/password123</span>, <span className="font-mono">admin1/adminpassword</span>
      </div>
    </div>
  );
}


