interface Hygiene {
  clear: number
  question: number
  desc: string | null
}

export interface ISaveQuestionsDto {
  staff: number
  machine: number
  hygiene: Hygiene[]
}
