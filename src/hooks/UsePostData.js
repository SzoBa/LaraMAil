import { useState, useEffect } from "react";
import axios from "axios";

export const usePostData = (url, dataArray) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);

  const options = {
    url: url,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: { content: dataArray },
  };

  const postData = async () => {
    const response = await axios(options);
    setFetchedData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    postData().catch((error) => console.error(error));
  }, [options]);

  return [isLoading, fetchedData];
};
