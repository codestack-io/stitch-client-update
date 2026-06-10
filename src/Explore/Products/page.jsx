import React, { useEffect, useState } from "react";
import ProductCards from "../../Components/ProductCards/ProductCards";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const limit = 8;

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      const query = new URLSearchParams({
        search,
        category,
        sort,
        page,
        limit,
      });

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products?${query}`
      );

      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [search, category, sort, page]);

  return (
    <div className="px-4 md:px-10 py-10">

      {/* ================= SEARCH ================= */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded-xl w-full"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CATEGORY FILTER */}
        <select
          className="border px-4 py-2 rounded-xl"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="shirt">Shirt</option>
          <option value="pant">Pant</option>
          <option value="dress">Dress</option>
        </select>

        {/* SORTING */}
        <select
          className="border px-4 py-2 rounded-xl"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="lowToHigh">Price Low → High</option>
          <option value="highToLow">Price High → Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.result?.map((item) => (
          <ProductCards key={item._id} model={item} />
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center mt-10 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded"
        >
          Prev
        </button>

        <span className="px-4 py-2">
          Page {page}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Products;