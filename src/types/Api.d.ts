export type IStateInstance = "notAuthorized" | "authorized" | "blocked" | "sleepMode" | "starting"

export interface IGetStateInstanceResponse {
	stateInstance: IStateInstance
}


export interface ICheckWhatsappRequest {
	phoneNumber: number
}

export interface ICheckWhatsappResponse {
	existsWhatsapp: boolean
}

export interface ISendMessageRequest {
	chatId: string
	message: string
}

export interface ISendMessageResponse {
	idMessage: string
}
export interface IDeleteNotificationRequest {
	receiptId:number
}

export interface IDeleteNotificationResponse {
	result: boolean
}


export type TApiMethod =
"checkWhatsapp" |
"sendMessage" |
"receiveNotification" |
"deleteNotification"

export interface IApi {
	id:string
	token: string
	// static async checkAccount: (id:string, token:string) => Promise<getStateInstanceResponse>
	request: (method:ApiMethod) => Promise<any>
}

export interface GreenApiNotification{
	receiptId: number
	body:{
		typeWebhook:"incomingMessageReceived" | "outgoingMessageReceived" | "outgoingAPIMessageReceived"
		idMessage:string
		messageData:{
			typeMessage: "textMessage"
			textMessageData: {
				textMessage:string
			}
		}
	}
}