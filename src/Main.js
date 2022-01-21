import React, { useState, useEffect } from "react";
import {
  // FaBars,
  FaFolderPlus,
  // FaUserCircle,
  FaTrash,
  FaUser,
  FaBuffer,
  FaPlus
} from "react-icons/fa";
import { Link } from "react-router-dom";
import firestore from "./firebase";
import Utils from "./utils/utils";

const Main = ({ handleToggleSidebar }) => {
  const [charts, setCharts] = useState([]);
  const [chartsId, setChartsId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const utilsObject = new Utils(firestore);

  useEffect(() => {
    read();
  }, []);

  const read = () => {
    readFile()
      .then((data) => {
        setIsLoading(false);
        setCharts(data[0]);
        setChartsId(data[1]);
      })
      .catch((err) => console.log(err.message));
  };

  const readFile = async () => {
    const docs = await utilsObject.readData("issueModule");
    let arr = [],
      id = [];
    docs.forEach((cur) => {
      arr = [...arr, cur.data()];
      id = [...id, cur.id];
    });
    return [arr, id];
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    var filter, ul, li, a, i, txtValue;
    filter = searchTerm.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }, [searchTerm]);

  return (
    <main>
      {/* <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div> */}
      <header className="top-nav">
        <div>
          <Link to="/flow-chart" className="add-project">
            <FaFolderPlus />
            <span className="tab-text">New Project</span>
          </Link>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Projects"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="tab-container">
          <Link to="/" className="tab active-tab">
            <FaBuffer />
            <span className="tab-text"> Projects </span>
          </Link>
          <Link to="/new-node" className="tab">
            <FaBuffer />
            <span className="tab-text"> Nodes </span>
          </Link>
        </div>
      </header>
      <h1> Projects </h1>
      <ul className="main-content" id="myUL">
        {isLoading && <h1 style={{ textAlign: "center" }}>Loading...</h1>}
        <li className="main-content-grid">
          <Link to="/flow-chart" className="add-new-project">
            <FaPlus />
          </Link>
        </li>
        {Object.keys(charts).map((id) => {
          var d = new Date(charts[id].date);
          return (
            <li className="main-content-grid" key={id}>
              <Link
                to={{
                  pathname: "/edit",
                  state: `${charts[id].values}`,
                  id: `${chartsId[id]}`,
                  name: `${charts[id].name}`
                }}
                className="project-info"
              >
                <div className="content">
                  <div className="title">{charts[id].name}</div>
                  {/* <div className="author"> */}

                  <div className="project-date">
                    Edited on {`${d.toDateString()}`}
                  </div>
                  {/* </div> */}
                </div>
                <div className="action-container">
                  <div className="user-info">
                    <FaUser className="project-user" />
                    <span className="user-name">mukund shridaran</span>
                  </div>
                  <div>
                    <FaTrash
                      onClick={() => {
                        utilsObject
                          .deleteData("file", chartsId[id])
                          .then(() => read());
                      }}
                      className="project-delete"
                    />
                  </div>
                  {/* </FaTrash> */}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Main;
