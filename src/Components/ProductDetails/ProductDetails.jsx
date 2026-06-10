import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, useNavigate, Link } from "react-router";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import Navbar from "../../Pages/Shared/Navbar/Navbar";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { user, role } = useContext(AuthContext);

  const data = useLoaderData();
  const model = data?.result;

  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  if (!model) return <p>Loading...</p>;

  const canOrder = user && role !== "admin" && role !== "manager";

  const images = model.images?.length
    ? model.images
    : [model.productImage];

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/related/${model._id}`
        );
        const data = await res.json();
        setRelatedProducts(data?.result || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (model?._id) fetchRelated();
  }, [model?._id]);

  return (
    <div>

      {/* ✅ NAVBAR ADDED HERE */}
      <Navbar></Navbar>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* PRODUCT SECTION */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGES */}
          <div>
            <div className="h-[400px] rounded-xl overflow-hidden border">
              <img
                src={images[activeImage]}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2 mt-3">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 object-cover cursor-pointer border ${
                    activeImage === i ? "border-pink-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{model.productName}</h1>

            <p className="text-xl text-pink-500 font-semibold">
              {model.price} Tk
            </p>

            <p>{model.description}</p>

            <div className="space-y-1 text-sm">
              <p>Category: {model.category}</p>
              <p>Status: {model.Status}</p>
              <p>Stock: {model.availableQuantity}</p>
            </div>

            <button
              disabled={!canOrder}
              onClick={() => navigate(`/neworder/${model._id}`)}
              className="w-full bg-pink-500 text-white py-2 rounded-lg disabled:opacity-50"
            >
              Order Now
            </button>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">
            Related Products
          </h2>

          {relatedProducts.length === 0 ? (
            <p>No related products</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((item) => (
                <div key={item._id} className="border p-3 rounded-xl">
                  <img
                    src={item.productImage}
                    className="h-32 w-full object-cover rounded"
                  />

                  <h3 className="font-semibold mt-2">
                    {item.productName}
                  </h3>

                  <p>{item.price} Tk</p>

                  <Link
                    to={`/product-details/${item._id}`}
                    className="text-pink-500 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;