import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const Admin = () => {
  const [imageFile, setImageFile] = useState("");
  const [dishes, setDishes] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getDishes = async () => {
      const response = await axiosPrivate.get("/api/dish/restaurantDishes");
      setDishes(response.data.dishes);
    };

    try {
      getDishes();
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    }
  }, []);

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const uploadLogo = async () => {
    if (imageFile === "") return;

    const formData = new FormData();
    formData.append("logo", imageFile, `${imageFile.name}`);

    try {
      const response = await axiosPrivate.post(
        "/api/restaurant/importLogo",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const path = response.data.path;

      const uploadResponse = await axiosPrivate.post(
        "/api/restaurant/uploadLogo",
        { path }
      );

      console.log(uploadResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Admin</h1>
      <div>
        <input
          type="file"
          name="logo"
          id="logo"
          onChange={(e) => handleFileChange(e)}
        />
        <button onClick={() => uploadLogo()}>Upload</button>
      </div>
    </>
  );
};

export default Admin;
