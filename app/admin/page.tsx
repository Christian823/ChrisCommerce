import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Admin from "../components/admin/Admin";
import { getProducts } from "../lib/api";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const products = await getProducts();

  return <Admin products={products} />;
}