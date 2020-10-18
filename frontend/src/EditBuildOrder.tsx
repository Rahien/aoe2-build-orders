import React, {useState} from "react";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import UploadBuildOrder from "./UploadBuildOrder";
import {IBuildOrder} from "./types";
import {setBuildOrder} from "./BuildOrderList";

function EditBuildOrder() {
  const {id} = useParams();
  const [loadingFromFile, setLoadingFromFile] = useState(false);
  const loadFromFile = () => {
    setLoadingFromFile(true);
  };
  const onUpload = (build:IBuildOrder|null) => {
    setLoadingFromFile(false);
    if(build){
      setBuildOrder(id, build);
    }
  };

  return (
    <>
      <div className="edit-buildOrder">
        <button onClick={loadFromFile}>
          <FontAwesomeIcon icon={faUpload}/>
          <label>From File</label>
        </button>
      </div>
      {loadingFromFile?<UploadBuildOrder onUpload={onUpload}/>:null}
    </>
  );
}

export default EditBuildOrder;