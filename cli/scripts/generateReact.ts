import inquirer from "inquirer"
import ora from "ora"
// @ts-ignore
import shell from "shelljs"
import { config } from "../config/index.js"
import chalk from "chalk"
import { dependenciesQuestion } from "../types/dependencieQuestion.js"

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

async function createReactApp(appName: string) {
  const spinner = ora("Creating your React App...").start()
  return new Promise<void>((resolve, reject) => {
    shell.exec(
      `yarn create vite ${appName} --template react-ts `,
      { silent: true },
      (code, _, stderr) => {
        // If command exit with error log the error
        if (code != 0) {
          console.log(chalk.bgRed("Program stderr:", stderr, code))
        }

        const cdToProject = shell.cd(`${appName}`)

        if (cdToProject.code != 0) {
          console.log(cdToProject.code, chalk.red(cdToProject?.stderr))
          spinner.fail()
        }

        spinner.succeed()
        resolve()
      }
    )
  })
}

function installPackages(configList: dependenciesQuestion[]) {
  let dependencies = []
  let devDependencies = []

  configList.forEach((config) => {
    dependencies = [...dependencies, config.dependencies]
    devDependencies = [...devDependencies, config.devDependencies]
  })
}

export default async function create(appName: string, appDirectory: string) {
  const selectedConfig = await askQuestions()

  await createReactApp(appName)

  await installPackages(selectedConfig)

  return true
}
