export interface IMessage{
	id:string
	type: "incoming" | "outgoing"
	text:string
}