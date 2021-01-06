import axios from "axios";

const UsePutData = (url, dataObject, callback) => {
  const options = {
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
      callback(result);
    })
    .catch((error) => console.error(error));
};

export default UsePutData;
