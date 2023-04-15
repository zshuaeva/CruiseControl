import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
  };

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
