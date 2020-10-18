import React, {useEffect, useState} from "react";
import {faCheck, faPlus, faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useParams, useHistory } from "react-router-dom";
import UploadBuildOrder from "./UploadBuildOrder";
import {IBuildOrder, IBuildOrderStep} from "./types";
import {getBuildOrder, setBuildOrder} from "./BuildOrderList";
import BuildOrderIconSelect from "./BuildOrderIconSelect";
import BuildOrderStep from "./BuildOrderStep";
import {addResourcesUpToCurrentStep, computeEndTimes, mergeSubsteps, shuffleVillagerGenders} from "./BuildOrder";

function EditBuildOrder() {
  const {id} = useParams();
  const history = useHistory();
  const [build, setBuild] = useState<IBuildOrder|null>(null);
  useEffect(() => {
    setBuild(getBuildOrder(id))
  }, [id]);
  const [loadingFromFile, setLoadingFromFile] = useState(false);
  if(!build){
    return <div>Loading...</div>
  }
  const updateBuild = (build:IBuildOrder, shuffle:boolean = false) => {
    addResourcesUpToCurrentStep(build, 0);
    mergeSubsteps(build.steps);
    computeEndTimes(build.steps);
    if(shuffle){
      console.log(shuffle);
      shuffleVillagerGenders(build.steps);
    }
    setBuild(build);
  }
  const loadFromFile = () => {
    setLoadingFromFile(true);
  };
  const onUpload = (build:IBuildOrder|null) => {
    setLoadingFromFile(false);
    if(build){
      setBuildOrder(id, build);
    }
  };

  const addStep = () => {
    const newBuild = Object.assign({}, build);
    newBuild.steps = ([] as IBuildOrderStep[]).concat(...newBuild.steps);
    newBuild.steps.push({
      kind: "create",
      target: "sheep"
    });
    updateBuild(newBuild, true);
  };

  const steps = build.steps.map((step, index) => {
    return <div className="buildorder-step-wrap" key={index}>
      <BuildOrderStep step={step}/>
    </div>
  });

  return (
    <>
      <div className="edit-buildOrder">
        <div className="edit-header">
          <BuildOrderIconSelect icon={build.icon} onIconSelect={(icon) => {
            const newBuild = Object.assign({}, build);
            newBuild.icon = icon;
            updateBuild(newBuild);
          }}/>
          <input value={build.name}
                 onChange={(e) => {
                   const newBuild = Object.assign({}, build);
                   newBuild.name = e.target.value
                   updateBuild(newBuild);
                 }}/>
          <FontAwesomeIcon icon={faCheck} onClick={() => {
            setBuildOrder(build.id, build);
            history.push('/');
          }}/>
        </div>
        <div className="steps">
          {steps}
        </div>
        <button className="upload-build" onClick={loadFromFile}>
          <FontAwesomeIcon icon={faUpload}/>
          <label>From File</label>
        </button>
        <button className="add-step" onClick={addStep}>
          <FontAwesomeIcon icon={faPlus}/>
          <label>Add Step</label>
        </button>
      </div>
      {loadingFromFile?<UploadBuildOrder onUpload={onUpload}/>:null}
    </>
  );
}

export default EditBuildOrder;