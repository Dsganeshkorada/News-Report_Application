import "./DataRetriving.css";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import React from "react";
import axios from "axios";
function DataRetriving({  handleUpdate,categeory,setCategeory }) {
  const [data, setData] = useState(null);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    // fetch(
    //   "https://newsapi.org/v2/everything?q=keyword&apiKey=ed55692f748a4b65983c31487846d8a3"
    // )
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error("API request failed");
    //     }
    //   })
    // .then((data) => {
    //     const shuffledData = shuffleArray(data.articles);
    //     console.log(data);
    //     setData(shuffledData);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    axios.get(`http://localhost:4000/${categeory}`)
        .then((res)=>{
           console.log(res.data)
           const shuffledData = shuffleArray(res.data);
           setData(shuffledData);
           console.log(categeory)
           setCategeory(categeory);
        })
      .catch((error) => {
        console.error(error);
      });
  }, [categeory]);

  return (
    <React.Fragment>
      {data ? (
        <React.Fragment>
          <div className="container-fluid d-flex justify-content-evenly align-items-center flex-wrap mt-4">
            {data.map((element, index) => {
              return (
                <NewsCard
                  key={index}
                  title={element.title}
                  url={element.urlToImage}
                  resourcelink={element.url}
                  content={element.content}
                  author={element.author}
                  description={element.description}
                  publishedAt={element.publishedAt}
                  element={element}
                  handleUpdate={() => handleUpdate(element)} 
                  categeory={categeory}
                />
              );
            })}
          </div>
        </React.Fragment>
      ) : (
        <div className="loader">
          <svg viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
      )}
    </React.Fragment>
  );
}

export default DataRetriving;
