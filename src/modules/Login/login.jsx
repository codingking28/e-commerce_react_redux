import React, { useEffect } from "react";

export default function LogIn() {
  console.log("***1");

  useEffect(() => {
    console.log("***1");
  }, []);
  return (
    <div style={{ backgroundColor: "red" }}>
      <h1>Login</h1>
    </div>
  );
}
