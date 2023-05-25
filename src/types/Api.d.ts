export type IStateInstance = "notAuthorized" | "authorized" | "blocked" | "sleepMode" | "starting"

export interface getStateInstanceResponse {
		stateInstance: IStateInstance
}

export interface IApi {
	id:string
	token: string
	// static async checkAccount: (id:string, token:string) => Promise<getStateInstanceResponse>
	async request<RES>(method:string):Promise<RES | undefined>
}