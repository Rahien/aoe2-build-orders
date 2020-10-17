import React from 'react';

export interface IBuildOrderStep {
  kind: string,
  number?: number,
  from?: string|null,
  target?: string,
  buildAmount?: number,
  build?: string,
  targetText?: string,
  endTime?: number,
  techs?: string[],
  duringPrevious?: boolean,
  subSteps?: IBuildOrderStep[],
  femaleVillager?: boolean
}

export interface IBuildOrder {
  steps: IBuildOrderStep[],
  name: string,
  id: string,
  icon: string,
  startingVillagers: number,
  currentStep?: IBuildOrderStep,
  currentStepPercentage?: number,
  currentVillagers?: number,
  currentFood?: number,
  currentWood?: number,
  currentGold?: number,
  currentStone?: number,
  currentMilitaryPop?: number
}

export type StepRenderer = ((step:IBuildOrderStep) => React.ReactNode);

