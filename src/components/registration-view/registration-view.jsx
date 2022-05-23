import React from "react";

export function RegistrationView(props) {
  const [ email, setEmail ] = useState("");
  const [ birthday, setBirthday ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email, birthday, username, password);
    /* send a request to the server for authentication
    then call pros.onLoggIn(username) */
    props.onLoggedIn(username);
  }

  return (
    <form>
      <label>
        Email:
        <input type="text" value={email} onChange={ e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={ e => setBirthday(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={ e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );  
} 

RegistrationView.propTypes = {
  email: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date).isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};