import axios from "axios";

const UsePostData = (url, token, dataObject, callback) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer " + token,
    },
    url: url,
    method: "post",
    data: dataObject,
  };

  const postData = async () => {
    const response = await axios(options);
    return response;
  };

  postData()
    .then((result) => {
      callback(result);
    })
    .catch((error) => {
      if (error.response) {
        callback(error.response.data);
      }
    });
};

export default UsePostData;
