import React, { useEffect, useRef, useState } from 'react'
import S from './Chat.module.scss'
import cn from 'classnames'
import { IMessage } from '../../types'

interface IProps{
	messages:IMessage[]
}

export const Chat = (props:IProps) => {
	return(
		<div className={cn(S.container)}>
			{props.messages.map(m=>{
				return(
					<div
						key={m.id}
						className={cn(S.message, S[m.type === "incoming" ? "message_incoming" : "message_outgoing"])}
					>
						<span>{m.text}</span>
					</div> 
				)
			})}
		</div>
	)
}