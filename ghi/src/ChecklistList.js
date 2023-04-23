import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function ChecklistList({ toggleEditMode, getChecklist, token, user, checklistitems, serviceId}) {
    const deleteChecklistItem = async (checklist_id) => {
        await fetch(`http://localhost:8000/api/checklist/${checklist_id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        await getChecklist(serviceId);
    };

    return (
        <div>
            {token && user?.is_client === true ? (
                <>
                    <h1 className="text-center">Checklist Steps</h1>
                    <table className="table table-striped">
                        <thead className="text-center">
                            <tr className="header">
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {checklistitems
                                .sort((a, b) => a.id - b.id)
                                .map((checklistitems, index) => {
                                    return (
                                        <tr key={`${checklistitems.service_id/checklistitems}-${index}`}>

                                            <td>
                                                <Link to={`/services/${checklistitems.id}`} className="text-reset text-decoration-none">
                                                    {checklistitems.checklist_item}
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleEditMode(checklistitems)}
                                                    className="btn btn-warning"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => deleteChecklistItem(checklistitems.id)}
                                                    className="btn btn-danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </>
            ) : null}
            {token && user?.is_technician ? (
                <div class="alert alert-danger" role="alert">
                    This area is off limits.
                </div>
            ) : null}
        </div>
    );
}
export default ChecklistList;
