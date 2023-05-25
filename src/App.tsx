import React, { useEffect, useRef, useState } from 'react'
import S from './App.module.scss';
import cn from 'classnames';
import { Avatar } from "./components/Avatar";
import { Auth } from './components/Auth/Auth';
import { Chat } from './components/Chat/Chat';
import { Sender } from './components/Sender/Sender';
import { ICorr, IMessage, IUser } from './types';
import { Checker } from './components/Checker/Checker';
import { GreenApiNotification, IDeleteNotificationRequest, IDeleteNotificationResponse } from './types/Api';

function App() {

	const [user, setUser] = useState<IUser | null>(null)
	const [corr, setCorr] = useState<ICorr | null>(null)
	const [messages, setMessages] = useState<IMessage[]>([])

	useEffect(()=>{
		if(!corr)return
		user?.api.request<undefined,GreenApiNotification>("receiveNotification")
		.then((notif)=>{
			if(!notif) return
			const arr:IMessage[] = [...messages,{
				id:notif.body.idMessage,
				type:notif.body.typeWebhook === "incomingMessageReceived" ? "incoming" : "outgoing",
				text:notif.body.messageData.textMessageData.textMessage
			}]
			setMessages(arr)
			console.log("notification..receiptId === ",notif.receiptId)
			user?.api.request<IDeleteNotificationRequest,IDeleteNotificationResponse>(
				"deleteNotification",
				"DELETE",
				{receiptId:notif.receiptId}	
			)
		})
		// setInterval(()=>{
		// },600000)
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