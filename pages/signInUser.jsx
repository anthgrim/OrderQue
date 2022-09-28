import { useState } from "react";
import axios from "axios";

const signInUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/signIn", {
        email: formData.email,
        password: formData.password,
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            onChange={(e) => handleChange(e)}
            value={formData.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            required
            name="password"
            onChange={(e) => handleChange(e)}
            value={formData.password}
          />
        </div>
        <div>
          <button onClick={(e) => handleSubmit(e)}>Login</button>
        </div>
      </form>
    </>
  );
};

export default signInUser;
