import DataRetriving from "../DataRetriving";
import axios from "axios";

function Business({setCategeory,setShowForm,setIsEditing,setFormData,categeory,isEditing,formData,showForm}) {
  const handleAddForm = () => {
    setFormData({
      title: "",
      urlToImage: "",
      url: "",
      content: "",
      description: "The Current News has no available description. We regret for the inconvenience. ",
      publishedAt: "2024-11-11T08:21:35Z",
      author: "Mr.Bean",
    });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleUpdate = (data) => {
    setFormData(data);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);

    if (isEditing) {
      axios
        .put(`http://localhost:4000/${categeory}/${formData.id}`, formData) // Assuming each article has a unique `id`
        .then(() => {
          alert(`Article Updated in ${categeory}`);
          window.location.assign("/business");
        })
        .catch(() => {
          console.log("Error in Updating Article");
        });
    } else {
      axios
        .post(`http://localhost:4000/${categeory}`, formData)
        .then(() => {
          alert(`Data Added in ${categeory}`);
          window.location.assign("/business");
        })
        .catch(() => {
          console.log("Error in Adding Data");
        });
    }
  };

  return (
    <>
      {showForm ? (
        <div className="form-div">
          <form className="form" onSubmit={handleSubmit}>
            <span className="title">{isEditing ? "Edit Article" : "Add New Article"}</span>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="urlToImage" className="label">
              Image Url
            </label>
            <input
              type="text"
              id="urlToImage"
              name="urlToImage"
              className="input"
              value={formData.urlToImage}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="url" className="label">
              Website Url
            </label>
            <input
              type="text"
              id="url"
              name="url"
              className="input"
              value={formData.url}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="content" className="label">
              Description
            </label>
            <textarea
              id="content"
              name="content"
              className="input"
              rows={5}
              value={formData.content}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="submit">
              {isEditing ? "Update" : "Add"}
            </button>
          </form>
        </div>
      ) : (
        <>
          <DataRetriving handleUpdate={handleUpdate}  categeory="business" setCategeory={setCategeory}/>
          <button
            className="fixed-bottom text-end scroll-top me-3 mb-3 ms-auto bg-light create-btn"
            onClick={handleAddForm}
            style={{ color: "blue" }}
            data-toggle="tooltip"
            data-placement="top"
            title="Add News"
          >
            <i className="fa-regular fa-plus fa-xl"></i>
          </button>
        </>
      )}
    </>
  );
}

export default Business;
