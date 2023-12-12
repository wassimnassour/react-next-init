#!/usr/bin/env node

import { initialProject } from "../utils/cloneTemplates.js"
import { cleanUpFolder } from "../utils/cleanUpFolders.js"

export default async function create(appName, appDirectory) {
  //   const selectedConfig = await askQuestions()
  await createReactApp(appName)
  // await installPackages(selectedConfig)
  return true
}

async function createReactApp(appName) {
  await initialProject(appName)
  await cleanUpFolder(appName, "react")
}

// async function askQuestions() {
//   const questions = config.map((question) => ({
//     type: "list",
//     name: question.name,
//     message: question.question,
//     choices: ["Yes", "No"],
//   }))
//   const answers = await inquirer.prompt(questions)
//   const selectedAnswers = config.filter((qu) => answers[qu.name] === "Yes")
//   return selectedAnswers
// }
