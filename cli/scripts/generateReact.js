#!/usr/bin/env node

import inquirer from "inquirer"
import ora from "ora"
// @ts-ignore
import { config } from "../config/index.js"
import fs from "fs-extra"
import nodeFs from "fs"
import * as path from "path"
import chalk from "chalk"
import { runShellCommand } from "../utils/runShellCommand.js"

export default async function create(appName, appDirectory) {
  //   const selectedConfig = await askQuestions()
  await createReactApp(appName)
  // await installPackages(selectedConfig)
  return true
}

async function createReactApp(appName) {
  await initialProject(appName)
  await cleanUpFolder(appName)
}

async function initialProject(appName) {
  const spinner = ora("Creating your React App...").start()

  const cloneStarter = `git clone --depth=1  https://github.com/wassimnassour/ReactNextScalfold.git  ${appName}`

  try {
    await runShellCommand(cloneStarter)
    spinner.succeed()
  } catch (error) {
    spinner.fail(chalk.red(`Failed to execute ${command}`), error)
    process.exit(1)
  }
}

const cleanUpFolder = async (projectName) => {
  const spinner = ora(`Clean and Setup project folder`).start()
  const FILES_TO_REMOVE = [".git", "README.md", "cli", "templates/next"]
  try {
    // Remove unused Files
    FILES_TO_REMOVE.forEach((file) => {
      fs.removeSync(path.join(process.cwd(), `${projectName}/${file}`))
    })

    // Move each file/directory from template to the parent directory
    const sourceFolder = path.join(
      process.cwd(),
      `${projectName}/templates/react`
    )

    const files = fs.readdirSync(sourceFolder)

    for (var i = files.length - 1; i >= 0; i--) {
      var file = files[i]
      await fs.rename(
        `${sourceFolder}/` + file,
        `${process.cwd()}/${projectName}/` + file,
        function (err) {
          if (err) throw err
          console.log("Move complete.")
        }
      )
    }

    spinner.succeed("Clean and Setup  project folder")
  } catch (error) {
    spinner.fail(error)
    console.log(chalk.red(`Failed to clean up project folder`), error)
    process.exit(1)
  }
}

async function askQuestions() {
  const questions = config.map((question) => ({
    type: "list",
    name: question.name,
    message: question.question,
    choices: ["Yes", "No"],
  }))
  const answers = await inquirer.prompt(questions)
  const selectedAnswers = config.filter((qu) => answers[qu.name] === "Yes")
  return selectedAnswers
}
