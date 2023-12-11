#!/usr/bin/env node

import inquirer from "inquirer"

export const askAppQuestions = () => {
  const questions = [
    {
      type: "input",
      name: "appName",
      message:
        "What name do you want to give your app (should be in kebab case format: `your-app-name`)?",
    },
    {
      type: "list",
      name: "appType",
      message: "What framework do you want to use?",
      choices: ["react", "next"],
    },
  ]
  return inquirer.prompt(questions)
}
