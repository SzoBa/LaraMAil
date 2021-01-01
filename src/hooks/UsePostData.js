import axios from "axios";

const UsePostData = (url, dataObject, callback) => {
  const options = {
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
      callback(result.data);
    })
    .catch((error) => console.error(error));
};

export default UsePostData;
