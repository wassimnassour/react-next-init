#!/usr/bin/env node
import { askAppQuestions } from "./utils/askQuestion.js"
async function run() {
  const answers = await askAppQuestions()
  console.log("answers", answers)
}

run()
