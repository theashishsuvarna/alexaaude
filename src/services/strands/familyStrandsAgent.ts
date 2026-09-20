import { Agent } from '@strands-agents/sdk';
import { evaluateFamilyDecision } from '../familyDecisionEngine';
import { familyContext } from '../familyContext';

export const familyStrandsAgent = new Agent({
  name: 'AlexaAude Family Intelligence',
  description:
    'Local family-context orchestration agent for AlexaAude.',
  systemPrompt:
    'You are the AlexaAude family intelligence orchestration layer. ' +
    'Reason over family context and route decisions to the deterministic family decision engine.',
  printer: false,
  tools: [],
});

/**
 * Local Strands orchestration boundary.
 *
 * The actual demo decision remains deterministic so AlexaAude works
 * without AWS credentials or an external model.
 */
export function runStrandsFamilyDecision(query: string) {
  const result = evaluateFamilyDecision(query, familyContext);

  return {
    ...result,
    orchestration: {
      framework: 'Strands Agents SDK',
      mode: 'local',
      modelInvocation: false,
    },
  };
}
