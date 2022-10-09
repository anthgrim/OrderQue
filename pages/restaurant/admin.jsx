import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useS3Upload } from "next-s3-upload";
import { toast } from "react-toastify";

const Admin = () => {
  const [imageURL, setImageURL] = useState("");
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
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

  const handleFileChange = async (file) => {
    let response = await uploadToS3(file);
    setImageURL(response.url);

    const uploadRes = await axiosPrivate.put("/api/restaurant/uploadLogo", {
      url: response.url,
      key: response.key,
    });

    return toast.success(uploadRes.data.message);
  };

  return (
    <>
      <h1>Admin</h1>
      <div>
        <FileInput onChange={handleFileChange} />
        <button onClick={openFileDialog}>Upload File</button>
        {imageURL && (
          <img
            style={{ width: "300px", height: "250px" }}
            src={imageURL}
            alt="upload"
          />
        )}
      </div>
    </>
  );
};

export default Admin;
