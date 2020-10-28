import React from 'react';

export interface IBuildOrderStep {
  kind: string,
  number?: number,
  from?: string,
  target?: string,
  buildAmount?: number,
  build?: string,
  targetText?: string,
  endTime?: number,
  techs?: string[],
  duringPrevious?: boolean,
  subSteps?: IBuildOrderStep[],
  femaleVillager?: boolean,
  resourceChanges?:IResourceChange[]
}

export interface IResourceChange {
  target: number,
  direction: "up"|"down",
  resource: string
}

export interface ISortableBuildOrderStep extends IBuildOrderStep {
  id: string
}

export interface IBuildOrder {
  steps: IBuildOrderStep[],
  name: string,
  id: string,
  icon?: string,
  startingVillagers?: number,
  currentStep?: IBuildOrderStep,
  currentStepPercentage?: number,
  currentVillagers?: number,
  currentFood?: number,
  currentWood?: number,
  currentGold?: number,
  currentStone?: number,
  currentMilitaryPop?: number
}

export interface ISortableBuildOrder extends IBuildOrder {
  steps: ISortableBuildOrderStep[]
}

export type StepRenderer = ((step:IBuildOrderStep) => React.ReactNode);

