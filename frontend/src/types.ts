import React from 'react';

export interface IBuildOrderStep {
  kind: string,
  number?: number,
  from?: string,
  target?: string,
  buildAmount?: number,
  build?: string,
  newVillager?:boolean,
  targetText?: string,
  endTime?: number
}

export interface IBuildOrder {
  steps: IBuildOrderStep[],
  name: string,
  startingVillagers: number,
  currentStep?: IBuildOrderStep,
  currentVillagers?: number,
  currentFood?: number,
  currentWood?: number,
  currentGold?: number,
  currentStone?: number,
  currentMilitaryPop?: number
}

export type StepRenderer = ((step:IBuildOrderStep) => React.ReactNode);

