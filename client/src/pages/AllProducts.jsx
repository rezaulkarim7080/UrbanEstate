import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { getProduct } from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/Loader";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import "../pagination/PaginationBox.css";

const AllProducts = () => {
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(
    () => {
      if (error) {
        return alert(error);
      }
      dispatch(getProduct());
    },
    [dispatch],
    error
  );

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="py-10
        "
        >
          <div className="px-6">
            <div className="grid md:grid-cols-4 gap-5">
              {products &&
                products.map((product) => (
                  <div className="hover:shadow-2xl hover:rounded-2xl">
                    <Product key={product._id} product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
