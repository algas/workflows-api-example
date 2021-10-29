import {initAuth, getWorkflow, listWorkflows, createWorkflow, deleteWorkflow, CreateWorkflowParams} from './workflows';
import {promises} from 'fs';
const fs = promises;

const main = async (keyFilePath: string, sourceFilePath: string) => {
  const location = 'asia-southeast1';
  const workflowName = 'your-workflow-example1';
  const projectId = await initAuth(keyFilePath);
  const source = await fs.readFile(sourceFilePath, 'utf8');
  const params: CreateWorkflowParams = {
    labels: {foo: 'bar'},
    sourceContents: source,
  };
  const created = await createWorkflow(projectId, location, workflowName, params);
  console.log(created);
  const workflows = await listWorkflows(projectId, location);
  if(workflows){
    console.log(workflows.map(w => w.name));
  }
  const wf = await getWorkflow(projectId, location, workflowName);
  console.log(wf);
  const deleted = await deleteWorkflow(projectId, location, workflowName);
  console.log(deleted);
}

if (require.main === module) {
  main(process.argv[2], process.argv[3]);
}
