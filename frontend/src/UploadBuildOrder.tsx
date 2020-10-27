import React, {useState} from "react";
import {IBuildOrder} from "./types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileUpload} from "@fortawesome/free-solid-svg-icons";
import {useClickOutside} from "./hooks";

interface IUploadBuildOrderProps {
  onUpload: (file:IBuildOrder|null) => void
}

const UploadBuildOrder:React.FC<IUploadBuildOrderProps> = ({onUpload}) => {
  const [files, setFiles] = useState<FileList|null>(null);
  let fileLabel = files?.item(0)?.name || "No file chosen...";
  const modalRef = useClickOutside(() => {
    onUpload(null);
  })
  function handleUpload() {
    if(!files){
      return onUpload(null);
    }
    const reader = new FileReader();

    reader.onload = function(e) {
      try{
        const result = JSON.parse(e.target?.result?.toString() || "{}");
        onUpload(result as unknown as IBuildOrder)
      }catch (e){
        console.log(e);
        // TODO warn about invalid file
        onUpload(null);
      }
    }
    const file = files?.item(0);
    if(!file){
      return onUpload(null);
    }
    reader.readAsText(file);
  }

  function cancelUpload() {
    onUpload(null);
  }


  return (
  <div className="upload-build-order-wrap">
    <div className="upload-build-order" ref={modalRef}>
      <h2>Upload Build Order</h2>
      <label className="file-name">{fileLabel}</label>
      <input id="build-order-file" className="file-upload" type="file" onChange={(e) => setFiles(e.currentTarget.files)}/>
      <label htmlFor="build-order-file" className="file-upload-label">
        <FontAwesomeIcon icon={faFileUpload}/>
        <span>Choose a file</span>
      </label>
      <div className="controls">
        <button onClick={handleUpload}>Submit</button>
        <button onClick={cancelUpload}>Cancel</button>
      </div>
    </div>
  </div>

);
}

export default UploadBuildOrder;