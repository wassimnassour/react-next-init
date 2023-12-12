import ora from "ora"
import chalk from "chalk"

import { runShellCommand } from "./runShellCommand.js"

export async function initialProject(appName) {
  const spinner = ora("Creating your React App...").start()

  const cloneStarter = `git clone --depth=1  https://github.com/wassimnassour/ReactNextScalfold.git  ${appName}`

  try {
    await runShellCommand(cloneStarter)
    spinner.succeed()
  } catch (error) {
    console.log("error", error)
    spinner.fail(chalk.red(`Failed to generate the app`), error)
    process.exit(1)
  }
}
