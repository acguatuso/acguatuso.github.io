import { useEffect, useState } from "react";
import Table from "./Table";

const Students = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("src/pages/Students/data.json") // Assuming the JSON file is in the public folder
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <div className="position-fixed" style={{top:"18%", left:"10%", right:"10%", bottom:"10%"}}>
      <Table></Table>
    </div>
  );
};

export default Students;
