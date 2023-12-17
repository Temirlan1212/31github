import { ObjectId } from "bson";
import { ProductDataTable } from "./components/product-data-table";

const fetchData = async () => {
  const result = await fetch(process.env.URL + "/api/product", { cache: "no-store" });
  if (result.ok) return result.json();
  return [];
};

export default async function Page() {
  const id = new ObjectId();
  const data = await fetchData();

  return (
    <div>
      <ProductDataTable slug={String(id)} data={data} loading={false} />
    </div>
  );
}
