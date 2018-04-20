import React from "react";

const AppInfo = () => {
  return (
    <div>
      <p>
        This App uses JSON-server API. Please, run json-server on
        localhost:3000.
      </p>
      <ul>
        <li>npm install json-server</li>
        <li>Create a db.json file</li>

        <li>copy content from public/db.json.</li>
        <li>json-server --watch db.json</li>
      </ul>
      <p>
        You can find more info here: https://github.com/typicode/json-server
      </p>
    </div>
  );
};

export default AppInfo;
