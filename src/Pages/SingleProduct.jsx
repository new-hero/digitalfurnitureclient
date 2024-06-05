import { Link, useLoaderData } from "react-router-dom";

const SingleProduct = () => {
  const product= useLoaderData()
  const { title, price, description, img } = product;
  
  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure className="w-full my-3">
          <img src={img} alt="Shoes"  className="rounded-xl w-full h-auto" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{title}</h2>
          <h2 className="card-title">{price}</h2>
          <p>{description}</p>
          <Link to={'/dashboard/allProducts'} className="btn">GO Back</Link>          
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
