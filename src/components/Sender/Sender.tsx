import React, { useEffect, useRef, useState } from 'react'
import S from './Sender.module.scss'
import cn from 'classnames'

interface IProps{
	disabled: boolean
}

export const Sender = (props:IProps) => {
	return(
		<div className={cn(S.container)}>
			<textarea
				name="message"
				id="a"
				rows={1}
				disabled={props.disabled}
			/>
			<button disabled={props.disabled}>Send</button>
		</div>
	)
}