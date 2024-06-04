import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const CreateReview = () => {
  const { user } = useAuth();
  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const description = form.description.value;
    const img = user?.photoURL;
    if (!description || !img) {
      toast.error("Please Provide Information");
      return;
    }
    const review = {
      authorEmail: user?.email,
      authorName: user?.displayName || user?.email.split("@")[0],
      description,
      img,
      createAt: new Date(),
    };
    const sure = window.confirm("Are you sure blog save to db?");
    if (sure) {
      fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `barer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(review),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Review Added");
            form.reset();
          } else if (data.message) {
            toast.error(data.message);
          }
        });
    }
  };
  return (
    <div>
      <div className="my-10">
        <div className="card shrink-0 w-full max-w-lg mx-auto shadow-2xl bg-base-100">
          <h2 className=" mt-2 text-3xl text-center">Add A Review</h2>
          <form className="card-body" onSubmit={handleForm}>
            {/* description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blog Description</span>
              </label>
              <textarea
                maxLength={500}
                minLength={100}
                type="text"
                name="description"
                defaultValue=""
                placeholder="Say Something"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Add Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
