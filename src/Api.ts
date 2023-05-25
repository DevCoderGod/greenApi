import { IApi, TApiMethod, IGetStateInstanceResponse } from "./types/Api"

export class Api implements IApi{
	id:string
	token: string

	constructor(id:string, token:string){
		this.id=id
		this.token=token
	}

	static async checkAccount(id:string, token:string):Promise<IGetStateInstanceResponse>{
		try {
			const response = await fetch(`https://api.green-api.com/waInstance${id}/getStateInstance/${token}`)
			if(response.status === 200) return await response.json()
			else console.log(`error: response.status = ${response.status}`)
		} catch (error) {
			console.log("error === ",error)
		}
		return ({stateInstance:"notAuthorized"})
	}

	async request<REQ,RES>(apiMethod:TApiMethod, httpMethod?:"POST" | "DELETE", body?:REQ):Promise<RES | undefined>{
		try {
			const url = `https://api.green-api.com/waInstance${this.id}/${apiMethod}/${this.token}`
			const response = await fetch(
				url,{
					method:httpMethod ?? "GET",
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
					},
					body: body ? JSON.stringify(body) : null
				},
			)
			if(response.status === 200) return await response.json()
			else console.log(`error: response.status = ${response.status}`)
		} catch (error) {
			console.log("error === ",error)
		}
	}
}