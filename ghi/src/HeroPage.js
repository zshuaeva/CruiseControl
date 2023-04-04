import TechnicianForm from "./Technician/TechnicianForm.js";
import ClientSignUp from "./"

function HeroPage() {

return(
<>
<a className="btn btn-primary" href="ClientSignUp" role="button">Client Signup</a>
<a class="btn btn-primary" href="/technician/new" role="button">Create Technician</a>
</>
)}
export default HeroPage;
