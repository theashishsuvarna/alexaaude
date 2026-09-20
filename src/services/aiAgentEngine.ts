import { AiMessage } from '../types/family';
import { evaluateFamilyDecision, familyDecisionEngine } from './familyDecisionEngine';
import { familyContext, getFamilyContext } from './familyContext';

export { familyDecisionEngine, familyContext, getFamilyContext };

export async function processFamilyAiQuery(query: string): Promise<AiMessage> {
  // Natural brief simulation
  await new Promise((resolve) => setTimeout(resolve, 300));

  const result = evaluateFamilyDecision(query, familyContext);

  return {
    id: 'msg-' + Date.now(),
    sender: 'assistant',
    timestamp: 'Just now',
    content: result.responseContent,
    actionCards: result.actionCards,
  };
}
