import { getStateInstanceResponse } from "./types/Api"

export class Api {
	id:string
	token: string

	constructor(id:string, token:string){
		this.id=id
		this.token=token
	}

	static async checkAccount(id:string, token:string):Promise<getStateInstanceResponse>{
		try {
			const response = await fetch(`https://api.green-api.com/waInstance${id}/getStateInstance/${token}`)
			if(response.status === 200) return await response.json()
			else console.log(`error: response.status = ${response.status}`)
		} catch (error) {
			console.log("error === ",error)
		}
		return ({stateInstance:"notAuthorized"})
	}

	// url(method:string){
	// 	return `https://api.green-api.com/waInstance${this.id}/${method}/${this.token}`
	// }
	
}