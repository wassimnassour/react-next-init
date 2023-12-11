import inquirer from "inquirer"
import ora from "ora"
// @ts-ignore
import shell from "shelljs"
import { config } from "../config/index.js"
import * as fs from "fs"
import * as path from "path"

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
async function createReactApp(appName) {
  const spinner = ora("Creating your React App...").start()
  return new Promise((resolve, reject) => {
    const cloneStarter = `git clone --depth=1  https://github.com/wassimnassour/ReactNextScalfold.git  ${appName}`
    cleanFolders(appName)
    shell.exec(cloneStarter, { silent: true }, (code, _, stderr) => {
      // If command exit with error log the error
      // if (code != 0) {
      //   console.log(chalk.bgRed("Program stderr:", stderr, code))
      // }
      // const cdToProject = shell.cd(`${appName}`)
      // if (cdToProject.code != 0) {
      //   console.log(cdToProject.code, chalk.red(cdToProject?.stderr))
      //   spinner.fail()
      // }
      spinner.succeed()
      resolve()
    })
  })
}
function cleanFolders(appName) {
  const pathDirectory = process.cwd()
  const filesToKeep = [`templates/${appName}`]
  console.log("appName", appName)
  fs.readdir(pathDirectory, (err, files) => {
    if (err) {
      console.log(err)
    }
    files.forEach((file) => {
      if (!filesToKeep.includes(file)) {
        const filePathToRemove = path.join(pathDirectory, file)
        console.log("filePathToRemove", file, filePathToRemove)
        fs.unlink(filePathToRemove, () => {})
        fs.rmdir(filePathToRemove, () => {})
      }
    })
  })
}
// function installPackages(configList: dependenciesQuestion[]) {
//   let dependencies = []
//   let devDependencies = []
//   configList.forEach((config) => {
//     dependencies = [...dependencies, config.dependencies]
//     devDependencies = [...devDependencies, config.devDependencies]
//   })
// }
export default async function create(appName, appDirectory) {
  const selectedConfig = await askQuestions()
  await createReactApp(appName)
  // await installPackages(selectedConfig)
  return true
}
