import { useState, useEffect } from "react";
import axios from "axios";

const useGetData = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios(url);
      setFetchedData(response.data);
      setIsLoading(false);
    };
    getData().catch((error) => console.error(error));
  }, [url]);

  return [isLoading, fetchedData];
};

export default useGetData;
