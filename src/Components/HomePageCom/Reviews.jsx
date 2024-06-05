import { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://digitalfurnitureserver.vercel.app/reviews")
      .then((response) => response.json())
      .then((json) => setReviews(json));
  }, [reviews]);
  return (
    <div className="my-10 bg-slate-200">
      <h3 className="text-center text-3xl text-green-500 py-10">
        Reviews
      </h3>
      <div className="overflow-x-auto py-10">
        <div className="flex gap-3">
          {reviews &&
            reviews.map((review) => (
              <div key={review._id} className="w-full">
                <div className="w-[500px] min-h-[500px]  flex flex-col p-10 justify-between rounded-lg  bg-white">
                  <p>{review?.description}</p>

                  <div className="flex justify-center my-10">
                    <img
                      src={review?.img}
                      className="w-12 h-12 rounded-full"
                      alt=""
                    />
                    <div className="text-left">
                      <p>Name:- {review?.authorName}</p>
                      <p>Email:- {review?.authorEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
