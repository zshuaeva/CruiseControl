// import React, { useState, useContext, useEffect, useCallback } from "react";
// import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
// import { useParams } from "react-router-dom";
// import ChecklistCreation from "./ChecklistCreation";
// import ChecklistList from "./ChecklistList";
// import useUser from "./useUser";
// import ChecklistEdit from "./ChecklistEdit";

// function ServiceChecklist() {
//   const { token } = useContext(AuthContext);
//   const user = useUser(token);
//   const { serviceId } = useParams();
//   const [checklistItems, setChecklistItems] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingChecklistItem, setEditingChecklistItem] = useState(null);
//   const toggleEditMode = (checklist_item) => {
//     setIsEditing(!isEditing);
//     setEditingChecklistItem(checklist_item);
//   };

//   const fetchServiceChecklistEntry = useCallback(
//     async (serviceId) => {
//       const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/services/${serviceId}/checklist`;
//       const fetchConfig = {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       };
//       const response = await fetch(url, fetchConfig);
//       const data = await response.json();
//       setChecklistItems(data);
//     },
//     [token]
//   );

//   useEffect(() => {
//     if (token) {
//       fetchServiceChecklistEntry(serviceId);
//     }
//   }, [token, serviceId, fetchServiceChecklistEntry]);

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-12 col-md-4">
//           {isEditing ? (
//             <ChecklistEdit
//               checklistItem={editingChecklistItem}
//               token={token}
//               checklistitems={checklistItems}
//               toggleEditMode={toggleEditMode}
//               getChecklist={fetchServiceChecklistEntry}
//               user={user}
//               serviceId={serviceId}
//               setIsEditing={setIsEditing}
//             />
//           ) : (
//             <ChecklistCreation
//               token={token}
//               getChecklist={fetchServiceChecklistEntry}
//               user={user}
//               serviceId={serviceId}
//             />
//           )}
//         </div>

//         <div className="col-12 col-md-8">
//           <div className="card-body">
//             <ChecklistList
//               toggleEditMode={toggleEditMode}
//               checklistitems={checklistItems}
//               getChecklist={fetchServiceChecklistEntry}
//               token={token}
//               user={user}
//               serviceId={serviceId}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ServiceChecklist;
