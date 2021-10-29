import {google} from 'googleapis';
const workflows = google.workflows('v1');

export const initAuth = async (keyFilePath: string) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  
  const authClient = await auth.getClient();
  google.options({auth: authClient});
  const projectId = await auth.getProjectId();
  return projectId
}

export const getWorkflow = async (projectId: string, location: string, workflowName: string) => {
  const res = await workflows.projects.locations.workflows.get({
    name: `projects/${projectId}/locations/${location}/workflows/${workflowName}`,
  });
  return res?.data;
}

export const listWorkflows = async (projectId: string, location: string) => {
  const res = await workflows.projects.locations.workflows.list({
    parent: `projects/${projectId}/locations/${location}`,
  });
  return res?.data?.workflows;
}

export interface CreateWorkflowParams {
  labels?: {[k:string]: string};
  sourceContents: string;
}

export const createWorkflow = async (projectId: string, location: string, workflowName: string, params: CreateWorkflowParams) => {
  const res = await workflows.projects.locations.workflows.create({
    parent: `projects/${projectId}/locations/${location}`,
    workflowId: workflowName,
    requestBody: {
      labels: params.labels,
      sourceContents: params.sourceContents,
    },
  });
  return res?.data;
}

export const deleteWorkflow = async (projectId: string, location: string, workflowName: string) => {
  const res = await workflows.projects.locations.workflows.delete({
    name: `projects/${projectId}/locations/${location}/workflows/${workflowName}`,
  });
  return res?.data;
}
