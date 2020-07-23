const core = require('@actions/core');
const github = require('@actions/github');
const execSync = require('child_process').execSync;

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);

  const output = execSync('git status');
  console.log(`output of: "${output}"`);

  const time = (new Date()).toTimeString();
  core.setOutput("time: ", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
