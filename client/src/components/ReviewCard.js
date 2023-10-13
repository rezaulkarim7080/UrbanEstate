import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from "react-redux";

const ReviewCard = ({ review }) => {
    const { error, loading, isAuthenticated, user } = useSelector(
        (state) => state.user
    );

    return (
        <div className="py-2">
            <div className="border-solid border-black border-[1px] rounded-lg p-5 py-5">
                <div className='flex gap-3'>
                    <FaUserCircle size={30} />
                    <img src={review.reviewImage} alt={review.name} />
                    <h1>{review.name}</h1>
                    <h1>{review.createdAt.slice(0, 10)}</h1>
                    <h1>user: {review.user}</h1>
                    <h1>id: {review._id}</h1>
                </div>
                <h1>{review.comment}</h1>
            </div>
        </div>
    );
}

export default ReviewCard;
