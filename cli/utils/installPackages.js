import inquirer from "inquirer"
import { runShellCommand } from "./runShellCommand.js"
import ora from "ora"

export async function installPackages(appName) {
  const spinner = ora()
  const { packageManager } = await askAboutPackageManager()
  spinner.start("installing packages")

  await runShellCommand(`cd ${appName} && ${packageManager} install `)
  spinner.succeed("Installing packages succeed")
}

async function askAboutPackageManager() {
  return inquirer.prompt([
    {
      name: "packageManager",
      message: "please choose your package manager",
      type: "list",
      choices: ["yarn", "npm", "pnpm"],
    },
  ])
}
