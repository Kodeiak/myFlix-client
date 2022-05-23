import React, { useState } from "react";

export function LoginView(props) {
  const [ username, setUsername ] = useState(""); // first value is current state. second value is method (function) to update state. initial state is set to ""
  const [ password, setPassword ] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(username, password);
    /* send a request to the server for authentication
    then call pros.onLoggIn(username) */
    props.onLoggedIn(username);
  }

    return (
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={ e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button type="button" onClick={console.log("this will take you to get registered")}>Register</button>
      </form>
    );
}

LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};