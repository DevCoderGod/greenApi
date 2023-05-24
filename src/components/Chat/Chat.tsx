import React, { useEffect, useRef, useState } from 'react'
import S from './Chat.module.scss'
import cn from 'classnames'

interface IProps{}

export const Chat = (props:IProps) => {
	return(
		<div className={cn(S.container)}>
			<div className={cn(S.message, S.message_incoming)}>
				<span>message_incoming</span>
			</div>
			<div className={cn(S.message, S.message_outgoing)}>
				<span>message_outgoing</span>
			</div>
		</div>
	)
}