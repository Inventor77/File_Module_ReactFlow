import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaRegFileImage,
  FaStream,
  FaRegEdit,
  FaBuffer,
  FaCode,
  FaPlus,
  FaEdit
} from "react-icons/fa";
import Popup from "reactjs-popup";
import firestore from "../../firebase";
import Utils from "../../utils/utils";

// import Aside from "../../Aside";
import "./index.css";

const NewNode = () => {
  // const [toggled, setToggled] = useState(false);
  // const handleToggleSidebar = (value) => {
  //   setToggled(value);
  // };

  var location = useLocation();
  const elemen = JSON.parse(location.state);
  const projectName = location.name;
  const description = location.description;
  const id = location.id;
  const [docId, setDocId] = useState();
  const [nodes, setNodes] = useState(elemen);
  const text = elemen.textField === "true" ? true : false;
  const area = elemen.textArea === "true" ? true : false;
  const image = elemen.Image === "true" ? true : false;
  const text2 = elemen.textField2 === "true" ? true : false;
  const area2 = elemen.textArea2 === "true" ? true : false;
  const image2 = elemen.Image2 === "true" ? true : false;
  const text3 = elemen.textField3 === "true" ? true : false;
  const area3 = elemen.textArea3 === "true" ? true : false;
  const image3 = elemen.Image3 === "true" ? true : false;
  const code = elemen.code === "true" ? true : false;
  const code2 = elemen.code2 === "true" ? true : false;
  const code3 = elemen.code3 === "true" ? true : false;
  const [nodeTextField, setNodeTextField] = useState(text);
  const [nodeTextField2, setNodeTextField2] = useState(text2);
  const [nodeTextField3, setNodeTextField3] = useState(text3);
  const [nodeTextArea, setNodeTextArea] = useState(area);
  const [nodeTextArea2, setNodeTextArea2] = useState(area2);
  const [nodeTextArea3, setNodeTextArea3] = useState(area3);
  const [nodeImage, setNodeImage] = useState(image);
  const [nodeImage2, setNodeImage2] = useState(image2);
  const [nodeImage3, setNodeImage3] = useState(image3);
  const [nodeName, setNodeName] = useState(projectName);
  const [nodeDesc, setNodeDesc] = useState(description);
  const [codeNode, setCodeNode] = useState(code);
  const [codeNode2, setCodeNode2] = useState(code2);
  const [codeNode3, setCodeNode3] = useState(code3);
  const utilsObject = new Utils(firestore);

  useEffect(() => {
    docIdList();
  }, [nodes]);

  const docIdList = () => {
    readFile()
      .then((data) => {
        setDocId(data);
      })
      .catch((err) => console.log(err.message));
  };

  const readFile = async () => {
    const docs = await utilsObject.readData("custom_nodes");
    let id = [];
    docs.forEach((current) => {
      id = [...id, current.id];
    });
    return id;
  };

  const length = Object.keys(nodes).length;
  var number = 7;

  const saveNode = () => {
    if (nodeName === "") {
      alert("Please provide name of the node");
      return;
    }
    if (nodeDesc === "") {
      alert("Please provide description of the node");
      return;
    }
    setNodes((el) => ({
      ...el,
      name: `${nodeName}`,
      Description: `${nodeDesc}`
    }));
  };

  const updateNode = async (id, data) => {
    await utilsObject.updateData("node", id, data);
  };
  useEffect(() => {
    var data = nodes;
    if (docId === undefined) {
      console.log("error");
    } else {
      updateNode(docId[id], data);
      // console.log();
    }
  }, [nodes]);

  const settingNodes = () => {
    setNodes((el) => ({
      ...el
    }));
  };

  return (
    <div className="app">
      {/* <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <div className={`app ${toggled ? "toggled" : ""}`}>
        <Aside toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      </div> */}
      <main>
        <header className="top-nav">
          <div>
            <Popup
              trigger={
                <div className="add-field">
                  <FaPlus />
                  <span className="tab-text">Add Fields</span>
                </div>
              }
              modal
              nested
            >
              {(close) => (
                <div className="modal">
                  <div className="header">
                    {" "}
                    Select the Field Type you want in your Node{" "}
                  </div>
                  <div className="content">
                    <div className="node-wrapper-field-container">
                      <div
                        className="node-wrapper-field"
                        onClick={() => {
                          setNodeTextField(true);
                          if (length < number) {
                            if (nodeTextField === false) {
                              setNodes((el) => ({
                                ...el,
                                textField: "true"
                              }));
                            }
                          } else {
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            close();
                            return;
                          }

                          if (length < number) {
                            if (nodeTextField === true) {
                              setNodeTextField2(true);
                              setNodes((el) => ({
                                ...el,
                                textField2: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }

                          if (length < number) {
                            if (nodeTextField2 === true) {
                              setNodeTextField3(true);
                              setNodes((el) => ({
                                ...el,
                                textField3: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }
                          close();
                        }}
                      >
                        <h6>
                          {" "}
                          <FaStream />
                          <span>Text Field</span>
                        </h6>
                      </div>
                      <div
                        className="node-wrapper-field"
                        onClick={() => {
                          setNodeTextArea(true);
                          if (length < number) {
                            if (nodeTextArea === false) {
                              setNodes((el) => ({
                                ...el,
                                textArea: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }

                          if (length < number) {
                            if (nodeTextArea === true) {
                              setNodeTextArea2(true);
                              setNodes((el) => ({
                                ...el,
                                textArea2: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }

                          if (length < number) {
                            if (nodeTextArea2 === true) {
                              setNodeTextArea3(true);
                              setNodes((el) => ({
                                ...el,
                                textArea3: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }
                          close();
                        }}
                      >
                        <h6>
                          {" "}
                          <FaRegEdit />
                          <span>Text Area</span>
                        </h6>
                      </div>
                      <div
                        className="node-wrapper-field"
                        onClick={() => {
                          setNodeImage(true);
                          if (length < number) {
                            if (nodeImage === false) {
                              setNodes((el) => ({
                                ...el,
                                Image: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }

                          if (length < number) {
                            if (nodeImage === true) {
                              setNodeImage2(true);
                              setNodes((el) => ({
                                ...el,
                                Image2: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }

                          if (length < number) {
                            if (nodeImage2 === true) {
                              setNodeImage3(true);
                              setNodes((el) => ({
                                ...el,
                                Image3: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }
                          close();
                        }}
                      >
                        <h6>
                          {" "}
                          <FaRegFileImage />
                          <span>Image</span>
                        </h6>
                      </div>
                      <div
                        className="node-wrapper-field"
                        onClick={() => {
                          setCodeNode(true);
                          if (length < number) {
                            if (codeNode === false) {
                              setNodes((el) => ({
                                ...el,
                                code: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }

                          if (length < number) {
                            if (codeNode === true) {
                              setCodeNode2(true);
                              setNodes((el) => ({
                                ...el,
                                code2: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }

                          if (length < number) {
                            if (codeNode2 === true) {
                              setCodeNode3(true);
                              setNodes((el) => ({
                                ...el,
                                code3: "true"
                              }));
                            }
                          } else {
                            close();
                            alert(
                              "Maximum 4 elements can be selected for one custom Node"
                            );
                            return;
                          }
                          close();
                        }}
                      >
                        <h6>
                          {" "}
                          <FaCode />
                          <span>Code Area</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <button className="add-field-close" onClick={close}>
                    Cancel
                  </button>
                </div>
              )}
            </Popup>
          </div>
          <div className="tab-container">
            <Link to="/" className="tab">
              <FaBuffer />
              <span className="tab-text"> Projects </span>
            </Link>
            <Link to="/new-node" className="tab">
              <FaBuffer />
              <span className="tab-text"> Nodes </span>
            </Link>
          </div>
        </header>
        <div className="create-new-node">
          <div className="project-details">
            <div className="project-details-heading">
              <h1>{nodeName}</h1>
              <Popup
                trigger={
                  <div className="tab active-tab">
                    <FaEdit />
                    <span className="tab-text">Edit</span>
                  </div>
                }
                modal
                nested
              >
                {(close) => (
                  <div className="modal">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div className="header"> Edit Node </div>
                    <div className="content">
                      <label style={{ marginTop: "10px" }}>Name of Node:</label>
                      <input
                        type="text"
                        placeholder="Name of the Node"
                        value={nodeName}
                        onChange={(evt) => setNodeName(evt.target.value)}
                        style={{
                          width: "90%",
                          border: "1px solid black",
                          marginTop: "5px"
                        }}
                      />
                      <div style={{ marginTop: "20px" }}>
                        <label>Description of Node:</label>
                        <input
                          type="text"
                          placeholder="Description of the Node"
                          value={nodeDesc}
                          onChange={(evt) => setNodeDesc(evt.target.value)}
                          style={{
                            width: "90%",
                            border: "1px solid black",
                            marginTop: "5px"
                          }}
                        />
                      </div>
                    </div>
                    <div className="actions">
                      <button
                        className="button popup-success-btn"
                        onClick={() => {
                          saveNode();
                          close();
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="delete popup-cancel-btn"
                        onClick={() => {
                          close();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
            <p className="project-details-description">{nodeDesc}</p>
          </div>
          <div className="create-node-content">
            <div className="create-node-content-list">
              <div className="node-fields">
                {nodes.textField === "true" ? (
                  <div className="div-node">
                    <h3>Text Field</h3>
                    <button
                      onClick={() => {
                        delete nodes.textField;
                        setNodeTextField(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.textField2 === "true" ? (
                  <div className="div-node">
                    <h3>2nd Text Field</h3>
                    <button
                      onClick={() => {
                        delete nodes.textField2;
                        setNodeTextField2(false);
                        settingNodes(nodes.textField2);
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.textField3 === "true" ? (
                  <div className="div-node">
                    <h3>3rd Text Field</h3>
                    <button
                      onClick={() => {
                        delete nodes.textField3;
                        setNodeTextField3(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.textArea === "true" ? (
                  <div className="div-node">
                    <h3>Text Area</h3>
                    <button
                      onClick={() => {
                        delete nodes.textArea;
                        setNodeTextArea(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.textArea2 === "true" ? (
                  <div className="div-node">
                    <h3>2nd Text Area</h3>
                    <button
                      onClick={() => {
                        delete nodes.textArea2;
                        setNodeTextArea2(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.textArea3 === "true" ? (
                  <div className="div-node">
                    <h3>3rd Text Area</h3>
                    <button
                      onClick={() => {
                        delete nodes.textArea3;
                        setNodeTextArea3(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.Image === "true" ? (
                  <div className="div-node">
                    <h3>Image</h3>
                    <button
                      onClick={() => {
                        delete nodes.Image;
                        setNodeImage(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.Image2 === "true" ? (
                  <div className="div-node">
                    <h3>2nd Image</h3>
                    <button
                      onClick={() => {
                        delete nodes.Image2;
                        setNodeImage2(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.Image3 === "true" ? (
                  <div className="div-node">
                    <h3>3rd Image</h3>
                    <button
                      onClick={() => {
                        delete nodes.Image3;
                        setNodeImage3(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.code === "true" ? (
                  <div className="div-node">
                    <h3>Code Area</h3>
                    <button
                      onClick={() => {
                        delete nodes.code;
                        setCodeNode(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.code2 === "true" ? (
                  <div className="div-node">
                    <h3>2nd Code Area</h3>
                    <button
                      onClick={() => {
                        delete nodes.code2;
                        setCodeNode2(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="node-fields">
                {nodes.code3 === "true" ? (
                  <div className="div-node">
                    <h3>3rd Code Area</h3>
                    <button
                      onClick={() => {
                        delete nodes.code3;
                        setCodeNode3(false);
                        settingNodes();
                      }}
                      className="delete-btn"
                    >
                      <span className="tab-text">Delete</span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewNode;
