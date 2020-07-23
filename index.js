const core = require('@actions/core');
const github = require('@actions/github');
const execSync = require('child_process').execSync;

try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);

    const filename = 'added_from_action';
    const touchOutput = execSync(`touch ${filename}`);
    console.log(`touchOutput: ${touchOutput}`);

    const addOutput = execSync(`git add ${filename}`);
    console.log(`addOutput: ${addOutput}`);

    const commitOutput = execSync('git commit -m "Adding file from within Action"');
    console.log(`commitOutput: ${commitOutput}`);

    const pushOutput = execSync('git push');
    console.log(`pushOutput: ${pushOutput}`);

    const time = (new Date()).toTimeString();
    core.setOutput("time: ", time);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
