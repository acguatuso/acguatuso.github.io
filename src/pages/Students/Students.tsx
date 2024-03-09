import { useEffect, useState } from "react";
import Table from "./Table";

const Students = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("src/pages/Students/data.json") // Assuming the JSON file is in the public folder
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .then(() => console.log(jsonData))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <>
      <div>
        <h2>Estudiantes</h2>
        <Table data={jsonData}></Table>
      </div>
    </>
  );
};

export default Students;
