import "./App.css";
import DataRetriving from "./DataRetriving";
import NavBar from "./NavBar";
import { useState } from "react";
import axios from "axios";
import { Route,Routes,BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Technology from "./components/Technology";
import Entertainment from "./components/Entertainment";
import Business from "./components/Business";
import Health from "./components/Health";
import NotFound from "./components/NotFound";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categeory,setCategeory] = useState("articles");
  const [formData, setFormData] = useState({
    title: "",
    urlToImage: "",
    url: "",
    content: "",
    description: "Sample description",
    publishedAt: "2024-11-11T08:21:35Z",
    author: "John Doe",
  });

  const handleAddForm = () => {
    setFormData({
      title: "",
      urlToImage: "",
      url: "",
      content: "",
      description: "Sample description",
      publishedAt: "2024-11-11T08:21:35Z",
      author: "John Doe",
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
        .put(`http://localhost:4000/${categeory}/${formData.id}`, formData) 
        .then(() => {
          alert("Article Updated");
          window.location.assign("/");
        })
        .catch(() => {
          console.log("Error in Updating Article");
        });
    } else {
      axios
        .post(`http://localhost:4000/${categeory}`, formData)
        .then(() => {
          alert("Data Added");
          window.location.assign("/");
        })
        .catch(() => {
          console.log("Error in Adding Data");
        });
    }
  };
  const Props = {
    setCategeory,
    setShowForm,
    setIsEditing,
    setFormData,
    categeory,
    isEditing,
    formData,
    showForm,
  };

  return (
    <>
        <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<Home {...Props} />}></Route>
            <Route path="/technology" element={<Technology {...Props} />}></Route>
            <Route path="/entertainment" element={<Entertainment {...Props} />}></Route>
            <Route path="/business" element={<Business {...Props} />}></Route>
            <Route path="/health" element={<Health {...Props} />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
