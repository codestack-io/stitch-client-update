const Blogs = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Our Blogs
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              How to Take Accurate Body Measurements
            </h2>
            <p>
              Learn how to measure yourself correctly before placing a tailoring
              order.
            </p>
            <button className="btn btn-primary mt-4">
              Read More
            </button>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Choosing the Perfect Fabric
            </h2>
            <p>
              Cotton, Linen, Silk or Denim? Discover which fabric suits your
              style.
            </p>
            <button className="btn btn-primary mt-4">
              Read More
            </button>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Latest Fashion Trends in 2026
            </h2>
            <p>
              Stay updated with the newest tailoring and fashion trends.
            </p>
            <button className="btn btn-primary mt-4">
              Read More
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Blogs;