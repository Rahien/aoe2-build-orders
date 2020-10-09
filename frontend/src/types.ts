import React from 'react';

export interface IBuildOrderStep {
  kind: string,
  number?: number,
  from?: string,
  target?: string,
  buildAmount?: number,
  build?: string,
  newVillager?:boolean
}

export type StepRenderer = ((step:IBuildOrderStep) => React.ReactNode);

