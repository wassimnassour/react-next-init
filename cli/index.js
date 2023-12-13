#!/usr/bin/env ts-node
import chalk from "chalk"
import inquirer from "inquirer"
import { updatePackageJson } from "./utils/updatePackageJson.js"
import { initialProject } from "./utils/cloneTemplates.js"
import { cleanUpFolder } from "./utils/cleanUpFolders.js"

const questions = [
  {
    type: "input",
    name: "appName",
    message:
      "What name do you want to give your app (should be in kebab case format: `your-app-name`)?",
    required: true,
    validate: function (input) {
      return input !== "" ? true : "Name is required"
    },
  },
  {
    type: "list",
    name: "appType",
    message: "What framework do you want to use?",
    choices: ["react", "next"],
  },
]

run()

async function run() {
  const answers = await inquirer.prompt(questions)
  const { appName, appType } = answers

  if (!appName || appName.length <= 0) {
    console.log(chalk.red(`Please enter a valid name for your new app.`))
    return process.exit(0)
  }

  try {
    await initialProject(appName)
    await cleanUpFolder(appName, appType)
    await updatePackageJson(appName)
  } catch (error) {
    console.log(chalk.red("Error while generating your App", error))
  }

  return process.exit(0)
}
