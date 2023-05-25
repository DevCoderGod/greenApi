export type IStateInstance = "notAuthorized" | "authorized" | "blocked" | "sleepMode" | "starting"

export interface getStateInstanceResponse {
		stateInstance: IStateInstance
}