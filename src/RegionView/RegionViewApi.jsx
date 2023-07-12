import React, { useEffect, useState } from "react";
import RegionApi from "../api/RegionApi";
import RegionCreate from "./RegionCreate";
import Update from "./Update";

export default function RegionViewApi() {
  const [region, setRegion] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [display, setDisplay] = useState("List");
  const [regionIDUpdate, setregionIDUpdate] = useState(0);
  const [regionNameUpdate, setRegionNameUpdate] = useState("");

  useEffect(() => {
    RegionApi.list().then((data) => {
      setRegion(data);
    });
    setRefresh(false);
  }, [refresh]);
  const onDelete = async (id) => {
    RegionApi.deleted(id).then(() => {
      window.alert("Data successfully deleted");
      setRefresh(true);
    });
  };

  const onUpdate = async (id, regionName) => {
    setregionIDUpdate(id);
    setRegionNameUpdate(regionName);
    setDisplay("Update");
  };

  if (display === "List") {
    return (
      <>
        <h2>List Regions</h2>
        <button onClick={() => setDisplay("Add")}>Add Regions</button>
        <table>
          <th>Region ID</th>
          <th>Region Name</th>
          <th>Action</th>
          <tbody>
            {region &&
              region.map((reg) => (
                <tr key={reg.regionId}>
                  <td>{reg.regionId}</td>
                  <td>{reg.regionName}</td>
                  <td>
                    <button onClick={() => onDelete(reg.regionId)}>
                      Delete
                    </button>
                    <button
                      onClick={() => onUpdate(reg.regionId, reg.regionName)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    );
  } else if (display === "Add") {
    return <RegionCreate setRefresh={setRefresh} setDisplay={setDisplay} />;
  } else if (display === "Update") {
    return (
      <Update
        setRefresh={setRefresh}
        setDisplay={setDisplay}
        regionId={regionIDUpdate}
        regionName={regionNameUpdate}
      ></Update>
    );
  }
}
