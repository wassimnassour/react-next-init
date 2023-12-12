#!/usr/bin/env ts-node
import chalk from "chalk"
import inquirer from "inquirer"

import reactScript from "./scripts/generateReact.js"
import nextScript from "./scripts/generateNext.js"

const questions = [
  {
    type: "input",
    name: "appName",
    message:
      "What name do you want to give your app (should be in kebab case format: `your-app-name`)?",
  },
  {
    type: "list",
    name: "appType",
    message: "What framework do you want to use?",
    choices: ["react", "next"],
  },
]

async function run() {
  const answers = await inquirer.prompt(questions)
  const { appName, appType } = answers
  if (!appName || appName.length <= 0) {
    console.log(chalk.red(`Please enter a valid name for your new app.`))
    return process.exit(0)
  }
  const AppModule = {
    react: reactScript,
    next: nextScript,
  }
  const generateTemplateFunction = AppModule[appType]
  const appDirectory = `${process.cwd()}/${appName}`
  const res = await generateTemplateFunction(appName, appDirectory)
  if (!res) {
    console.log(chalk.red("Error while generating your App"))
  }
  return process.exit(0)
}

run()
