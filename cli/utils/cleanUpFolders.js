import ora from "ora"
import chalk from "chalk"
import fs from "fs-extra"

import * as path from "path"
const FILES_TO_REMOVE = [".git", "README.md", "cli"]

export const cleanUpFolder = async (projectName, appTemplate) => {
  const spinner = ora(`Clean and Setup project folder`).start()
  try {
    // Remove unused Files
    FILES_TO_REMOVE.concat([
      `templates/${appTemplate === "react" ? "next" : "react"}`,
    ]).forEach((file) => {
      fs.removeSync(path.join(process.cwd(), `${projectName}/${file}`))
    })

    // Move each file/directory from template to the parent directory
    const sourceFolder = path.join(
      process.cwd(),
      `${projectName}/templates/${appTemplate}`
    )

    const files = fs.readdirSync(sourceFolder)

    for (var i = files.length - 1; i >= 0; i--) {
      var file = files[i]
      await fs.rename(
        `${sourceFolder}/` + file,
        `${process.cwd()}/${projectName}/` + file,
        function (err) {
          if (err) throw err
          return true
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
