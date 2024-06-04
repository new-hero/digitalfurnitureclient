import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const CreateBlog = () => {
  const { user } = useAuth();
  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const img = form.img.value;
    const category = form.category.value;
    if (!title || !description || !img || !category) {
      toast.error("Please Provide Information");
      return;
    }
    const blog = {
      title,
      authorEmail: user?.email,
      authorName: user?.displayName || user?.email.split('@')[0],
      description,
      img,
      category,
      createAt: new Date(),
    };
    const sure = window.confirm("Are you sure blog save to db?");
    if (sure) {
      fetch("https://digitalfurnitureserver.vercel.app/blogs", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `barer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(blog),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Blog Added");
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
          <h2 className=" mt-2 text-3xl text-center">Add A Blog</h2>
          <form className="card-body" onSubmit={handleForm}>
            {/* title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blog Title</span>
              </label>
              <input
                type="text"
                name="title"
                defaultValue=""
                placeholder="Blog title"
                className="input input-bordered"
                required
              />
            </div>

            {/* description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blog Description</span>
              </label>
              <input
                type="text"
                name="description"
                defaultValue=""
                placeholder="Blog Description"
                className="input input-bordered"
                required
              />
            </div>
            {/* img */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blog Image</span>
              </label>
              <input
                type="text"
                name="img"
                defaultValue=""
                placeholder="blog Image Url"
                className="input input-bordered"
                required
              />
            </div>
            {/* category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="input capitalize input-bordered"
                name="category"
                id="category"
              >
                <option value="table">table</option>
                <option value="chair">chair</option>
                <option value="sofa">sofa</option>
                <option value="bed">bed</option>
              </select>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Add blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
