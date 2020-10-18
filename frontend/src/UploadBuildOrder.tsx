import React, {useState} from "react";
import {IBuildOrder} from "./types";

interface IUploadBuildOrderProps {
  onUpload: (file:IBuildOrder|null) => void
}

const UploadBuildOrder:React.FC<IUploadBuildOrderProps> = ({onUpload}) => {
  const [files, setFiles] = useState<FileList|null>(null);
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
    <div className="upload-build-order">
      <label>
        Upload file:
        <input type="file" onChange={(e) => setFiles(e.currentTarget.files)}/>
      </label>
      <button onClick={handleUpload}>Submit</button>
      <button onClick={cancelUpload}>Cancel</button>
    </div>
);
}

export default UploadBuildOrder;