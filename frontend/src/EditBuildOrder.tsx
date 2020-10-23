import React, {useEffect, useState} from "react";
import {faCheck, faPlus, faUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useParams, useHistory } from "react-router-dom";
import UploadBuildOrder from "./UploadBuildOrder";
import {IBuildOrder, IBuildOrderStep, ISortableBuildOrder, ISortableBuildOrderStep} from "./types";
import {getBuildOrder, setBuildOrder} from "./BuildOrderList";
import BuildOrderIconSelect from "./BuildOrderIconSelect";
import {addResourcesUpToCurrentStep, computeEndTimes, shuffleVillagerGenders} from "./BuildOrder";
import { v4 as uuidv4 } from 'uuid';
import { ReactSortable } from "react-sortablejs";
import BuildOrderStepEdit from "./BuildOrderStepEdit";

const makeStepsSortable:(steps:IBuildOrderStep[]) => ISortableBuildOrderStep[] = (steps) => {
  return steps.map((step) => {
    return Object.assign({id: uuidv4()}, step);
  });
}

function EditBuildOrder() {
  const {id} = useParams();
  const history = useHistory();
  const [build, setBuild] = useState<ISortableBuildOrder|null>(null);
  useEffect(() => {
    const buildOrder = getBuildOrder(id);
    const sortableBuildOrder = Object.assign({}, buildOrder);
    sortableBuildOrder.steps = makeStepsSortable(sortableBuildOrder.steps);
    setBuild(sortableBuildOrder as unknown as ISortableBuildOrder);
  }, [id]);
  const [loadingFromFile, setLoadingFromFile] = useState(false);
  if(!build){
    return <div>Loading...</div>
  }
  const updateBuild = (build:ISortableBuildOrder, shuffle:boolean = false) => {
    addResourcesUpToCurrentStep(build, 0);
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
    newBuild.steps = ([] as ISortableBuildOrderStep[]).concat(...newBuild.steps);
    newBuild.steps.push({
      kind: "create",
      target: "sheep",
      id: uuidv4()
    });
    updateBuild(newBuild, true);
  };

  const getStepUpdateHandler = (index:number) => {
      return (newStep:ISortableBuildOrderStep) => {
        const newBuild = Object.assign({}, build);
        newBuild.steps = ([] as ISortableBuildOrderStep[]).concat(...newBuild.steps);
        newBuild.steps.splice(index, 1, newStep);
        updateBuild(newBuild, true);
      };
  }

  const removeStep = (index:number) => {
    const newBuild = Object.assign({}, build);
    newBuild.steps = ([] as ISortableBuildOrderStep[]).concat(...newBuild.steps);
    newBuild.steps.splice(index, 1);
    updateBuild(newBuild, true);
  }

  const reorderSteps = (steps:ISortableBuildOrderStep[]) => {
    const newBuild = Object.assign({}, build);
    newBuild.steps = steps;
    updateBuild(newBuild);
  };

  const steps = <ReactSortable delay={350} list={build.steps} setList={reorderSteps}>
    {build.steps.map((step, index) => {
      return <BuildOrderStepEdit key={step.id} step={step}
                                 onEdit={getStepUpdateHandler(index)}
                                 onRemove={() => removeStep(index)}/>
    })}
  </ReactSortable>


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