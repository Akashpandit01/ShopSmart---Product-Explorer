import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "products/productSlice";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const { filtered, status } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div>
      <h1>ShopSmart</h1>
      <Filters />
      {status === "loading" && <p>Loading...</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {paginated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
