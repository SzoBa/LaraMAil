import { useState, useEffect } from "react";
import axios from "axios";

const useGetData = (url, token, setErrorMessage) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: "Bearer " + token,
      },
      url: url,
    };
    const getData = async () => {
      const response = await axios(options);
      setFetchedData(response.data);
      setIsLoading(false);
    };
    getData().catch((error) => {
      setErrorMessage(error.response.data);
    });
  }, [url, token, setErrorMessage]);

  return [isLoading, fetchedData];
};

export default useGetData;
