import { useState, useContext } from "react";
import { request } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function InviteUser({ projectId }) {
  const { token } = useContext(AuthContext);
  const [email, setEmail] = useState("");

  const invite = async () => {
    try {
      await request(
        `/projects/${projectId}/invite`,
        "POST",
        { email },
        token
      );

      alert("User invited");
      setEmail("");
    } catch (err) {
      alert("Invite failed");
    }
  };

  return (
    <div>
      <input
        placeholder="User email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={invite}>Invite</button>
    </div>
  );
}