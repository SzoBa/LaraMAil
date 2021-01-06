import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const DraftPage = (props) => {
  const handleSubmit = (event) => {};

  return (
    <div>
      <h1>This is the e-mail sending page</h1>
      <form method="put" onSubmit={handleSubmit}>
        <div>
          <label>
            Send to user:
            <input type="text" name="address" />
          </label>
        </div>
        <div>
          <label>
            Text:
            <textarea type="text" name="emailText"></textarea>
          </label>
        </div>
        <button type="submit">Send email</button>
      </form>
    </div>
  );
};

export default DraftPage;
