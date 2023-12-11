export type dependenciesQuestion = {
  name: string
  question: string
  dependencies: any[]
  devDependencies: string[]
  packageEntries: (
    | {
        key: string
        value: string[]
      }
    | {
        key: string
        value: string
      }
  )[]
  templates: any[]
}
