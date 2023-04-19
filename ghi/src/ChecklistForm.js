import React, { useState, useContext } from "react";
// import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function ChecklistForm({ getChecklists, token, user}) {
  // const { token } = useContext(AuthContext);
  const [line_item1, setLineItem1] = useState("");
  const [line_item2, setLineItem2] = useState("");
  const [line_item3, setLineItem3] = useState("");
  const [line_item4, setLineItem4] = useState("");
  const [line_item5, setLineItem5] = useState("");
  const [line_item6, setLineItem6] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.line_item1 = line_item1;
    data.line_item2 = line_item2;
    data.line_item3 = line_item3;
    data.line_item4 = line_item4;
    data.line_item5 = line_item5;
    data.line_item6 = line_item6;
    const url = "http://localhost:8000/api/checklist";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      await response.json();
      setLineItem1("");
      setLineItem2("");
      setLineItem3("");
      setLineItem4("");
      setLineItem5("");
      setLineItem6("");
    } else {
      console.error("Error creating checklist, please check input");
    }
  };
  return (
    <>
      <div className="container-fluid d-flex justify-content-center">
        <div className="shadow p-4 mt-4">
          <h1>Enter Checklist Items</h1>
          <form onSubmit={handleSubmit}>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={line_item1}
                onChange={(event) => setLineItem1(event.target.value)}
                placeholder="Step One"
              />
              <label htmlFor="Step One">Step One</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={line_item2}
                onChange={(event) => setLineItem2(event.target.value)}
                placeholder="Step Two"
              />
              <label htmlFor="Step Two">Step Two</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={line_item3}
                onChange={(event) => setLineItem3(event.target.value)}
                placeholder="Step Three"
              />
              <label htmlFor="Step Three">Step Three</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={line_item4}
                onChange={(event) => setLineItem4(event.target.value)}
                placeholder="Step Four"
              />
              <label htmlFor="Step Four">Step Four</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={line_item5}
                onChange={(event) => setLineItem5(event.target.value)}
                placeholder="Step Five"
              />
              <label htmlFor="Step Five">Step Five</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                value={line_item6}
                onChange={(event) => setLineItem6(event.target.value)}
                placeholder="Step Six"
              />
              <label htmlFor="Step Six">Step Six</label>
            </div>





            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}//end of functions
export default ChecklistForm;
