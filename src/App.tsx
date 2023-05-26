import React, { useEffect, useRef, useState } from 'react'
import S from './App.module.scss';
import cn from 'classnames';
import { Avatar } from "./components/Avatar";
import { Auth } from './components/Auth/Auth';
import { Chat } from './components/Chat/Chat';
import { Sender } from './components/Sender/Sender';
import { ICorr, IMessage, IUser } from './types';
import { Checker } from './components/Checker/Checker';
import { GreenApiNotification, IDeleteNotificationResponse } from './types/Api';

function App() {

	const [user, setUser] = useState<IUser | null>(null)
	const [corr, setCorr] = useState<ICorr | null>(null)
	const [messages, setMessages] = useState<IMessage[]>([])
	const [newMessage, setNewMessage] = useState<IMessage | null>(null)

	async function deleteNotification(id:number){
		await user?.api.requestDelete<IDeleteNotificationResponse>("deleteNotification",id)
	}

	async function receiveNotification() {
		if(!corr) return
		while (true) {
			const notification = await user?.api.request<undefined,GreenApiNotification>("receiveNotification")
			if(notification){
				if(notification.body.senderData.chatId !== `${corr.phone}@c.us`){
					deleteNotification(notification.receiptId)
					return
				}

				const typeMessage = notification.body.messageData.typeMessage
				if(typeMessage === "textMessage" || typeMessage === "extendedTextMessage"){
					const message:IMessage = {
						id:notification.body.idMessage,
						type:notification.body.typeWebhook === "incomingMessageReceived" ? "incoming" : "outgoing",
						text:typeMessage === "textMessage"
							? notification.body.messageData.textMessageData?.textMessage ?? ""
							: notification.body.messageData.extendedTextMessageData?.text ?? ""
					}
					if(message.text.length>0)setNewMessage(message)
				}
				await deleteNotification(notification.receiptId)
			}
		}
	}

	useEffect(()=>{
		if(!newMessage)return
		setMessages([...messages, newMessage])
	},[newMessage])

	useEffect(()=>{
		setMessages([])
		receiveNotification()
	},[corr])

	return (
		<div className={S.app}>
			<div className={cn(S.leftpanel)}>
				<div className={cn(S.header, S.header_left)}>
					<Avatar auth={!!user}/>
					<Auth onClick={setUser}/>
				</div>
			</div>
			<div className={cn(S.rightpanel)}>
				<div className={cn(S.header, S.header_right)}>
					<Checker
						user={user}
						onClick={setCorr}
					/>
				</div>
				<Chat messages={messages}/>
				<Sender
					user={user}
					corr={corr}
				/>
			</div>
		</div>
	);
}

export default App;