import React from "react";
import axios from "axios";
import "./NewsCard.css";

function NewsCard({
  title,
  url,
  resourcelink,
  content,
  author,
  description,
  publishedAt,
  element,
  handleUpdate,
  categeory,
}) {
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const contentFull = content;

  content = content.slice(0, 100);
  let len = content.length - 1;
  while (len > 0 && content[len] !== " ") {
    len--;
  }

  // let publishedYear = parseInt(publishedAt.slice(0, 4));
  // let publishedMonth = months[parseInt(publishedAt.slice(5, 7)) - 1];
  // let publishedDate = parseInt(publishedAt.slice(8, 10));

  content = content.slice(0, len);

  if (!url) {
    url =
      "https://img.freepik.com/premium-vector/breaking-news-world-map-background_87788-86.jpg";
  }


  const handleDelete = ()=>{
    console.log(element.id)
    axios.delete(`http://localhost:4000/${categeory}/${element.id}`)
    .then(()=>{
        alert('data Deleted')
        if(categeory==="general")
        window.location.assign(`/`);
        else
        window.location.assign(`/${categeory}`)
    })
    .catch(()=>{
        console.error("Error in Deleting");
        
    })
  }

  const handleUpdateNews = () =>{
    handleUpdate(element);
  }

  return (
    <React.Fragment>
      <div
        className="card mt-5 mx-2 rounded-4"
        style={{ width: "400px", height: "500px" }}
      >
        <img
          src={url}
          className="card-img-top rounded-3"
          alt=" 404 Image Not Found"
        />
        <div className="card-body">
          <h5 className="card-title">{title.slice(0, 30) + " ..."}</h5>
          <p className="card-text">
            {content}
            <a
              href={resourcelink}
              target="_blank"
              rel="noreferrer"
              className="resourceLink ms-2"
            >
              Read More.
            </a>
          </p>
          <div className="published-details">
            <button className="btn btn-warning card-btn" onClick={handleUpdateNews}>
              <i
                className="fa-solid fa-pen-to-square "
                style={{ color: "#ffffff" }}
              ></i>
            </button>
            <button className="btn btn-danger card-btn" onClick={handleDelete}>
              <i
                className="fa-solid fa-trash-can"
                style={{ color: "#ffffff" }}
              ></i>{" "}  
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default NewsCard;
