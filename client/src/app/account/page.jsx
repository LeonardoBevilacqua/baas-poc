import Signin from "./signin";
import Signup from "./signup";

export default function page() {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Signin />
      <Signup />
    </div>
  );
}
