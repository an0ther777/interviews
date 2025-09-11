export interface IInterview {
  id: string,
  company: string,
  vacancyLink: string,
  hrName: string,
  contactTelegram?: string,
  contactWhatsApp?: string,
  contactPhone?: string,
  createAr: Date,
  salaryFrom?: number,
  salaryTo?: number,
  stages?: IStage[],
  result?: "Refusal" | "Offer"
}
export interface IStage {
  name: string,
  date: null | string,
  description: string,

}
