import axios from "axios";

const UseDeleteData = (url, dataObject, callback) => {
  const options = {
    url: url,
    method: "put",
    data: dataObject,
  };

  const deleteData = async () => {
    const response = await axios(options);
    return response;
  };

  deleteData()
    .then((result) => {
      return callback(result);
    })
    .catch((error) => {
      return callback(error.response.data);
    });
};

export default UseDeleteData;
