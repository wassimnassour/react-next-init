import fs from "fs-extra"
import * as path from "node:path"

/**
 *this function is used to update the default  package name : like name , author ....
 * @param  {string}  appName   - this is app name , used to initialize the project
 */

export async function updatePackageJson(appName) {
  const packageJsonPath = path.join(process.cwd(), `${appName}/package.json`)

  const packageJson = await fs.readJsonSync(packageJsonPath)

  // update package name
  packageJson.name = appName

  fs.writeJSONSync(packageJsonPath, packageJson, { spaces: 2 })
}
