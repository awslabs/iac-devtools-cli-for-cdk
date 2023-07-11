import chalk from "chalk";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import replace from "replacestream";
import fs from "graceful-fs";
import { execa } from "execa";
import Listr from "listr";
import { projectInstall } from "pkg-install";
import { Observable } from "rxjs";
import {
  checkFileExists,
  checkFilesMoved,
  monitorFileExists,
  monitorFilesMoved,
  renameDirectory,
  renameFile,
  copyTemplateFiles,
  initGit,
  addDevops,
  progressSpinner,
} from "./helpers.js";

const copy = promisify(ncp);
const access = promisify(fs.access);

/**
 * Adds a construct, stack, or tool to an existing project
 * @param {*} options list of options for the new project
 * @returns DONE to the console if the project is copied successfully
 */
export async function addToProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  await copyTemplateFiles(options);

  console.log("%s Component ready!", chalk.green.bold("DONE"));
  return;
}

/**
 * Creates a new project from a series of options
 * Creates config files
 * @param {*} options list of options for the new project
 * @returns DONE to the console if the project is copied successfully
 */
export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const templateDir = path.resolve(
    new URL(import.meta.url).pathname,
    "../../templates",
    options.template
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  async function runTasks(options) {
    console.log("%s 🛠️  Preparing your templates...", chalk.green.bold("GO!"));
    await progressSpinner(
      "Starting copy!",
      "Files copied!",
      copyTemplateFiles(options)
    );
    //await copyTemplateFiles(options);
    if (options.template === "cdk-app-typescript") {
      await progressSpinner(
        "Rename files...",
        "Files renamed!",
        renameFile("not_npmignore", ".npmignore", options.targetDirectory)
      );
    }
    if (options.devops) {
      await progressSpinner(
        "Adding devops tools",
        "DevOps tools added!",
        addDevops(options)
      );
      //await addDevops(options);
    }
    if (options.git) {
      await progressSpinner(
        "Initializing git",
        "Git initialized!",
        initGit(options)
      );
      //await initGit(options);
    }
    if (options.runInstall) {
      await projectInstall({
        cwd: options.targetDirectory,
      });
    }
    console.log("%s 🚀  Project ready", chalk.green.bold("DONE"));
  }

  await runTasks(options);
  return true;
}
