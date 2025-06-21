const API_URL = "http://localhost:3001";

export async function signIn(username: string, password: string) {
  const res = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
  const data = await res.json();
  if (data.length === 1) {
    return data[0];
  }
  return null;
}

export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function addProduct(product: {nama_produk: string, harga_satuan: number, quantity: number}) {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(product)
  });
  return res.json();
}

export async function updateProduct(id: number, product: any) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(product)
  });
  return res.json();
}

export async function deleteProduct(id: number) {
  await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
}
