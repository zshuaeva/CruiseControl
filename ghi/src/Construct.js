import React, { useState } from "react";

function NewDummyForm() {
    const [requiredLimitedText, setRequiredLimitedText] = useState("");
    const [requiredUnlimitedText, setRequiredUnlimitedText] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.required_limited_text = requiredLimitedText;
        data.required_unlimited_text = requiredUnlimitedText;
        console.log(data)

        const URL = "http://localhost:8000/test";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(URL, fetchConfig);
        if (response.ok) {
            await response.json();
            setRequiredLimitedText("");
            setRequiredUnlimitedText("");
        } else {
            console.error("Error Manu Post Failed");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Dummy </h1>
                    <form onSubmit={handleSubmit} id="manufacturer-form">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={requiredLimitedText}
                                onChange={(event) => setRequiredLimitedText(event.target.value)}
                                required
                                placeholder="requiredLimitedText"
                            />
                            <label htmlFor="requiredLimitedText">requiredLimitedText</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={requiredUnlimitedText}
                                onChange={(event) => setRequiredUnlimitedText(event.target.value)}
                                required
                                placeholder="requiredUnlimitedText"
                            />
                            <label htmlFor="requiredUnlimitedText">requiredUnlimitedText</label>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default NewDummyForm;