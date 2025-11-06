import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectPaged, setPage } from "../products/productSlice";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.products.status);
  const error = useSelector((s) => s.products.error);
  const page = useSelector((s) => s.products.page);
  const pageSize = useSelector((s) => s.products.pageSize);
  const { items, total } = useSelector(selectPaged);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="container">
      <Filters />
      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={(p) => dispatch(setPage(p))}
      />
    </div>
  );
}
