import shell from "shelljs"

export const runShellCommand = (cmd) => {
  return new Promise((resolve, reject) => {
    shell.exec(cmd, { silent: true }, (code, stdout, stderr) => {
      try {
        if (code == 0) {
          resolve(stdout)
        }
      } catch (error) {
        reject(stderr)
      }
    })
  })
}
