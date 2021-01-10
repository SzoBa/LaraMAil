import { useState, useEffect } from "react";
import axios from "axios";

const useGetMultipleData = (
  url1,
  url2,
  linkerParam,
  token,
  setErrorMessage
) => {
  const [firstFetchedData, setFirstFetchedData] = useState([]);
  const [secondFetchedData, setSecondFetchedData] = useState([]);

  useEffect(() => {
    const options1 = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: "Bearer " + token,
      },
      url: url1,
    };
    const options2 = {
      headers: options1.headers,
      url: url2,
    };

    const getData = async () => {
      await axios(options1).then((resp) => {
        setFirstFetchedData(resp.data);
        options2.url = url2 + resp.data[linkerParam];
      });
      await axios(options2).then((resp) => setSecondFetchedData(resp.data));
    };
    getData().catch((error) => {
      setErrorMessage(error.response.data);
    });
  }, [url1, url2, linkerParam, token, setErrorMessage]);

  return [firstFetchedData, secondFetchedData];
};

export default useGetMultipleData;
