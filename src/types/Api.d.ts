export type IStateInstance = "notAuthorized" | "authorized" | "blocked" | "sleepMode" | "starting"

export interface getStateInstanceResponse {
	stateInstance: IStateInstance
}

export interface checkWhatsappRequest {
	phoneNumber: number
}

export interface checkWhatsappResponse {
	existsWhatsapp: boolean
}

export type ApiMethod = "checkWhatsapp"

export interface IApi {
	id:string
	token: string
	// static async checkAccount: (id:string, token:string) => Promise<getStateInstanceResponse>
	request: (method:ApiMethod) => Promise<any>
}