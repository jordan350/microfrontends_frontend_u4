export const OPERATION_SELECTED_EVENT = 'finops:operation-selected:v1';

export interface OperationSelectedDetail {
  contractVersion: '1.0.0';
  operationId: string;
  source: 'mf-operaciones';
}
