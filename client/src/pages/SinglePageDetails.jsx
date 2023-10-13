/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import PageNavigation from "../components/PageNavigation";
import ReviewPost from "../components/ReviewPost";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productAction";
import { Carousel } from "react-responsive-carousel";
import Rating from "../components/Rating";
import ReviewCard from "../components/ReviewCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { addItemsToCart } from "../actions/cartAction";

const SinglePageDetails = ({ review }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <div className="py-14 px-10">
      {/*End pagination here */}

      <div className="md:grid md:grid-cols-3  shadow-xl rounded-l-2xl bg-orange-300 gap-6 items-center">
        {/* part -1 */}
        <div>
          <img
            src={product.images}
            alt={product.name}
            className="rounded-l-2xl"
          />
        </div>

        {/* part -2 */}

        <div className=" col-span-2">
          <h1 className="font-semibold text-3xl">{product.name}</h1>
          <h1 className="font-thin">product id: {product._id}</h1>

          <h1 className="text-3xl font-medium py-2">$ {product.price}</h1>

          <h1>description :{product.description}</h1>
        </div>
      </div>

      {/* Product review */}

      <div className="flex items-center gap-3 py-10">
        <div className="w-full bg-black h-[1px]"></div>
        <div className="text-xl font-bold">Reviews</div>
        <div className="w-full bg-black h-[1px]"></div>
      </div>
      {user ? (
        <div>
          <ReviewPost />
        </div>
      ) : (
        <div>Please login for post review</div>
      )}

      {/* revies  */}

      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}

      {/* <div> */}
      {/* <img src={user} alt="User" /> */}
      {/* <p>{review.name}</p>

        <span className="">{review.comment}</span>
      </div> */}

      {/* <div className="px-5 ">
        <h1 className="py-5 text-xl font-semibold text-center">
          Product review
        </h1>
        <div>
          {product.reviews && product.reviews[0] ? (
            <div>
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (

            <h1>No review Yet </h1>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default SinglePageDetails;
