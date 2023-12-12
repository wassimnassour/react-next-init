import { initialProject } from "../utils/cloneTemplates.js"
import { cleanUpFolder } from "../utils/cleanUpFolders.js"

export default async function create(appName, appDirectory) {
  //   const selectedConfig = await askQuestions()
  await createNextApp(appName)
  // await installPackages(selectedConfig)
  return true
}

async function createNextApp(appName) {
  await initialProject(appName)
  await cleanUpFolder(appName, "next")
}
