import { useState, useContext, useEffect } from "react";
import useToken, { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const user = useUser(token);
  console.log(token);
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      e.target.reset();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    if (user && user.is_client) {
      navigate("/clientlanding");
    } else if (user && user.is_technician) {
      navigate("/technician/landing");
    }
  }, [user, navigate]);

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="shadow p-4 mt-4">
        <h1>Log Into Cruise Control</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-floating mb-3">
            <input
              name="username"
              type="text"
              className="form-control"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
