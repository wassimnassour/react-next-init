#!/usr/bin/env ts-node

// @ts-ignore
import shell from "shelljs"
import chalk from "chalk"
import { askAppQuestions } from "./utils/askQuestion.js"
import reactScript from "./scripts/generateReact.js"
import nextScript from "./scripts/generateNext.js"

async function run() {
  // shell.exec("npm run install")
  const answers = await askAppQuestions()

  const { appName, appType } = answers

  if (!appName || appName.length <= 0) {
    console.log(chalk.red(`Please enter a valid name for your new app.`))
    return process.exit(0)
  }
  const AppModule = {
    react: reactScript,
    next: nextScript,
  }

  const generateTemplateFunction = AppModule[appType] as (typeof AppModule)[
    | "react"
    | "next"]

  const appDirectory = `${process.cwd()}/${appName}`

  const res = await generateTemplateFunction(appName, appDirectory)

  if (!res) {
    console.log(chalk.red("Error while generating your App"))
  }
  return process.exit(0)
}
run()
