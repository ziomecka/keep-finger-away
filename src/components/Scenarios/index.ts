import { Component } from 'react';
import ScenarioEnum from '../../enumerations/sceanario';
import Guillotine from './Guillotine/';

const scenario = ScenarioEnum.Scenario;

export interface Scenarios {
  // @ts-ignore
  [name: ScenarioEnum.Scenario]: Component;
}

const scenarios: Scenarios = {
  [scenario.Guillotine]: Guillotine
};

const getScenario = (
  scenarioName: ScenarioEnum.Scenario = scenario.Guillotine
): Component => {
  // @ts-ignore
  return scenarios[scenarioName];
};

export default getScenario;