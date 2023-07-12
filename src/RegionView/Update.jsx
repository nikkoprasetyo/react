import React, { useState } from "react";
import RegionApi from "../api/RegionApi";

export default function Update(props) {
  let regionId = props.regionId;
  let regionName = props.regionName;

  const [regionNameUpdated, setRegionNameUpdated] = useState("");

  const onSubmit = async () => {
    const payload = {
      name: regionNameUpdated,
    };
    await RegionApi.update(regionId, payload).then(() => {
      props.setRefresh(true);
      window.alert("Data has been updated");
    });
  };
  const handleChange = (name) => {
    setRegionNameUpdated(name);
  };

  return (
    <div>
      <h2>Update Regions</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Region Name :</label>
          <input
            type="text"
            placeholder={regionName}
            onChange={(e) => handleChange(e.target.value)}
          ></input>
        </div>
        <div>
          <button type="submit">Simpan</button>
          <button onClick={() => props.setDisplay("List")}>cancel</button>
        </div>
      </form>
    </div>
  );
}
