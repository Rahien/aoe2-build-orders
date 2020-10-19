import {ISortableBuildOrderStep} from "./types";
import React, {useState} from "react";
import BuildOrderStep from "./BuildOrderStep";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {stepKinds} from "./BuildOrder";
import BuildOrderIconSelect from "./BuildOrderIconSelect";

interface IBuildOrderStepEditProps {
  step: ISortableBuildOrderStep,
  onEdit: (newStep:ISortableBuildOrderStep) => void
}

interface IEditBuildOrderStepProps {
  step: ISortableBuildOrderStep,
  onEdit: (newStep:ISortableBuildOrderStep) => void
}

const iconProperty: (hide: boolean, property: string, state: [(string | undefined), React.Dispatch<React.SetStateAction<string | undefined>>]) => JSX.Element | null = (hide, property, state) => {
  return hide? null:
    <div className={`property ${property}`}>
      <label>{property}</label>
      <BuildOrderIconSelect icon={state[0]} onIconSelect={(icon) => state[1](icon)}/>
    </div>;
}

const EditBuildOrderStep: React.FC<IEditBuildOrderStepProps> = ({step, onEdit}) => {
  const [kind, setKind] = useState(step.kind);
  const fromState = useState(step.from);
  const targetState = useState(step.target);
  const buildState = useState(step.build);
  const doneEditing = () => {
    onEdit(step);
  };
  const hideFrom = ['age2','age3','loom','create'].indexOf(kind) >= 0;
  const hideTarget = ['age2','age3','loom'].indexOf(kind) >= 0;
  const hideBuild = ['build'].indexOf(kind) < 0;
  const from = iconProperty(hideFrom, "from", fromState);
  const target = iconProperty(hideTarget, "target", targetState);
  const build = iconProperty(hideBuild, "build", buildState);
  return <div className="buildorder-step-edit">
    <select value={kind} onChange={(e) => setKind(e.target.value)}>
      {Object.keys(stepKinds).map((kind) => {
        return <option key={kind} value={kind}>{stepKinds[kind]}</option>;
      })}
    </select>
    {from}
    {target}
    {build}
    <button onClick={doneEditing}><span>Done</span><FontAwesomeIcon icon={faCheck}/></button>
  </div>
};

const BuildOrderStepEdit:React.FC<IBuildOrderStepEditProps> = ({step, onEdit}) => {
  const [editing, setEditing] = useState(false);
  const doneEditing = (newStep:ISortableBuildOrderStep) => {
    setEditing(false);
    onEdit(newStep)
  };
  const showEdit:React.ReactElement = <EditBuildOrderStep step={step} onEdit={doneEditing}/>;
  return <div className="buildorder-step-wrap">
    <div onClick={() => setEditing(!editing)}>
      <BuildOrderStep step={step}/>
    </div>
    {editing?showEdit:null}
  </div>;
};

export default BuildOrderStepEdit;