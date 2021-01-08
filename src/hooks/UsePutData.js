import axios from "axios";

const UsePutData = (url, token, dataObject, callback) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      Authorization: "Bearer " + token,
    },
    url: url,
    method: "put",
    data: dataObject,
  };

  const putData = async () => {
    const response = await axios(options);
    return response;
  };

  putData()
    .then((result) => {
      return callback(result);
    })
    .catch((error) => {
      if (error.response) {
        callback(error.response.data);
      }
    });
};

export default UsePutData;
