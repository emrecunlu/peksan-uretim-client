interface Hygiene {
  clear: number
  question: number
  description: string | null
}

export interface ISaveQuestionsDto {
  staff: number
  machine: number
  hygiene: Hygiene[]
}
