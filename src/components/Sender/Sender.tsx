import React, { useEffect, useRef, useState } from 'react'
import S from './Sender.module.scss'
import cn from 'classnames'

interface IProps{}

export const Sender = (props:IProps) => {
	return(
		<div className={cn(S.container)}>
			<textarea
				name="message"
				id="a"
				rows={1}
				// disabled
			/>
			<button>Send</button>
		</div>
	)
}