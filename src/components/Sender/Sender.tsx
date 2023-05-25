import React, { useEffect, useRef, useState } from 'react'
import S from './Sender.module.scss'
import cn from 'classnames'
import { ICorr, IUser } from '../../types'
import { ISendMessageRequest, ISendMessageResponse } from '../../types/Api'

interface IProps{
	user:IUser | null
	corr:ICorr | null
}

export const Sender = (props:IProps) => {

	const [message, setMessage] = useState<string>("")

	function sendMessage(){
		if(message.length<0)return
		props.user?.api.request<ISendMessageRequest,ISendMessageResponse>("sendMessage","POST",{
			chatId: `${props.corr?.phone}@c.us`,
			message
		})
		setMessage("")
	}

	return(
		<div className={cn(S.container)}>
			<textarea
				name="message"
				id="a"
				rows={1}
				disabled={!props.user || !props.corr}
				value={message}
				onChange={(e)=>setMessage(e.target.value)}
			/>
			<button
				disabled={!props.user || !props.corr}
				onClick={sendMessage}
			>
				Send
			</button>
		</div>
	)
}