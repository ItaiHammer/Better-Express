#!/usr/bin/env node
import 'colors';
import { execSync } from 'child_process';

function runCommand(command) {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to execute command`.red, `${err}`.white);
    return false;
  }
  return true;
}

const repoName = process.argv[2];
const repoLink = 'https://github.com/ItaiHammer/Better-Express.git';
const gitCheckoutCommand = `git clone --depth 1 ${repoLink} ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name `.cyan + `${repoName}`.green);
const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) process.exit(1);

console.log(`Installing dependecies for `.cyan`${repoName}`.green);
const installedDeps = runCommand(installDepsCommand);

if (!installedDeps) process.exit(1);

console.log(
  `Congradulations! You are ready. Follow the following commands to start.`.cyan
);
console.log(`cd ${repoName} && npm start`.cyan);
