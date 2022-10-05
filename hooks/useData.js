import { useContext } from "react";
import DataContext from "../context/DataProvider";

const useData = () => {
  return useContext(DataContext);
};

export default useData;
