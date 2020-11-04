import {ISortableBuildOrderStep} from "./types";
import React, {useState} from "react";
import BuildOrderStep from "./BuildOrderStep";
import {faCheck, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {stepKinds} from "./BuildOrder";
import BuildOrderIconSelect from "./BuildOrderIconSelect";
import {faTimes} from "@fortawesome/free-solid-svg-icons/faTimes";
import Select, {Option} from "rc-select";
import Switch from "react-switch";

interface IBuildOrderStepEditProps {
  step: ISortableBuildOrderStep,
  onRemove: () => void,
  onEdit: (newStep:ISortableBuildOrderStep) => void
}

interface IEditBuildOrderStepProps {
  step: ISortableBuildOrderStep,
  onRemove: () => void,
  onEdit: (newStep:ISortableBuildOrderStep) => void
}

const iconProperty: (hide: boolean, property: string, state: [(string | undefined), React.Dispatch<React.SetStateAction<string | undefined>>]) => JSX.Element | null = (hide, property, state) => {
  return hide? null:
    <div className={`property ${property}`}>
      <label>{property}</label>
      <BuildOrderIconSelect icon={state[0]} onIconSelect={(icon) => state[1](icon)}/>
    </div>;
}
const numberProperty: (hide:boolean, property: string, state: [(number | undefined), React.Dispatch<React.SetStateAction<number | undefined>>]) => JSX.Element | null = (hide, property, state) => {
  return hide? null:
    <div className={`property number ${property}`}>
      <label>{property}</label>
      <input type="number" min={0} step={1} value={state[0] || 0} onChange={(e) => state[1](parseInt(e.target.value))}/>
    </div>;
}
const stringProperty: (hide:boolean, property: string, state: [(string | undefined), React.Dispatch<React.SetStateAction<string | undefined>>]) => JSX.Element | null = (hide, property, state) => {
  return hide? null:
    <div className={`property text ${property}`}>
      <label>{property}</label>
      <input value={state[0] || ""}
             onChange={(e) => state[1](e.target.value)}/>
    </div>;
}

const booleanProperty: (hide:boolean, property: string, state: [(boolean | undefined), React.Dispatch<React.SetStateAction<boolean | undefined>>]) => JSX.Element | null = (hide, property, state) => {
  return hide? null:
    <div className={`property boolean ${property}`}>
      <label>{property}</label>
      <Switch onChange={() => state[1](!state[0])} checked={!!state[0]} />
    </div>;
}

interface IResearchListProps {
  techs:(string[] | undefined),
  setTechs: React.Dispatch<React.SetStateAction<string[] | undefined>>
}

const ResearchList: React.FC<IResearchListProps> = ({techs, setTechs}) => {
  const techNodes = (techs || []).map((tech, index) => {
    return <div className="tech" key={index}>
      <BuildOrderIconSelect icon={tech} onIconSelect={(newIcon) => {
        const newTechs = (techs || []).map((currentTech, currentIndex) => {
          if(index === currentIndex){
            return newIcon || "doublebitaxe";
          }else{
            return currentTech;
          }
        });
        setTechs(newTechs);
      }}/>
      <FontAwesomeIcon icon={faTimes} onClick={(e) => {
        const newTechs = (techs || []).filter((currentTech) => {
          return tech !== currentTech;
        });
        setTechs(newTechs);
      }}/>
    </div>
  });
  return <div className="research-list">
    {techNodes}
    <button onClick={() => setTechs((techs||[]).concat(["doublebitaxe"]))}>Add Tech</button>
  </div>;
}

const EditBuildOrderStep: React.FC<IEditBuildOrderStepProps> = ({step, onEdit, onRemove}) => {
  const [kind, setKind] = useState(step.kind);
  const fromState = useState(step.from);
  const fromNumberState = useState(step.number);
  const targetState = useState(step.target);
  const targetTextState = useState(step.targetText);
  const duringPreviousState = useState(step.duringPrevious);
  const buildState = useState(step.build);
  const buildAmountState = useState(step.buildAmount);
  const noteState = useState(step.note);
  const [techs, setTechs] = useState(step.techs);
  const doneEditing = () => {
    const newStep = Object.assign(
      JSON.parse(JSON.stringify(step)),
      {
        id: step.id,
        kind: kind,
        from: fromState[0],
        number: fromNumberState[0],
        target: targetState[0],
        targetText: targetTextState[0],
        duringPrevious: duringPreviousState[0],
        build: buildState[0],
        buildAmount: buildAmountState[0],
        note: noteState[0],
        techs: techs
      }
    );
    onEdit(newStep);
  };
  if(kind === "note"){
    return <div className="buildorder-step-edit">
      {stringProperty(false, "note", noteState)}
      <button className="remove" onClick={onRemove}><span>Remove</span><FontAwesomeIcon icon={faTrash}/></button>
      <button onClick={doneEditing}><span>Done</span><FontAwesomeIcon icon={faCheck}/></button>
    </div>
  }

  const hideFrom = ['age2','age3','loom','create','research'].indexOf(kind) >= 0;
  const hideNumber = ['age2','age3','loom','research'].indexOf(kind) >= 0;
  const hideTarget = ['age2','age3','loom','research'].indexOf(kind) >= 0;
  const hideBuild = ['build'].indexOf(kind) < 0;
  const from = iconProperty(hideFrom, "from", fromState);
  const fromNumber = numberProperty(hideNumber, 'number', fromNumberState);
  const target = iconProperty(hideTarget, "target", targetState);
  const targetText = stringProperty(hideTarget, "targetText", targetTextState);
  const build = iconProperty(hideBuild, "build", buildState);
  const buildNumber = numberProperty(hideBuild, 'buildAmount', buildAmountState);
  const techsList = kind === "research"? <ResearchList techs={techs} setTechs={setTechs}/>:null;
  return <div className="buildorder-step-edit">
    <Select

      value={kind} onChange={setKind}
      autoFocus
      optionFilterProp="text"
    >
      {Object.keys(stepKinds).map((kind) => {
        return <Option key={kind} value={kind}>{stepKinds[kind]}</Option>;
      })}
    </Select>
    {booleanProperty(false, "duringPrevious", duringPreviousState)}
    {from}
    {fromNumber}
    {target}
    {targetText}
    {build}
    {buildNumber}
    {techsList}
    <button className="remove" onClick={onRemove}><span>Remove</span><FontAwesomeIcon icon={faTrash}/></button>
    <button onClick={doneEditing}><span>Done</span><FontAwesomeIcon icon={faCheck}/></button>
  </div>
};

const BuildOrderStepEdit:React.FC<IBuildOrderStepEditProps> = ({step, onEdit, onRemove}) => {
  const [editing, setEditing] = useState(false);
  const doneEditing = (newStep:ISortableBuildOrderStep) => {
    setEditing(false);
    onEdit(newStep)
  };
  const showEdit:React.ReactElement = <EditBuildOrderStep step={step} onEdit={doneEditing} onRemove={onRemove}/>;
  const className = `buildorder-step-wrap${step.duringPrevious?" substep":""}`;
  return <div className={className}>
    <div onClick={() => setEditing(!editing)}>
      <BuildOrderStep step={step}/>
    </div>
    {editing?showEdit:null}
  </div>;
};

export default BuildOrderStepEdit;