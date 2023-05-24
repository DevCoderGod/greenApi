import React, { useEffect, useRef, useState } from 'react'
import S from './Auth.module.scss'
import cn from 'classnames'

interface IProps{}

export const Auth = (props:IProps) => {
	return(
		<div className={cn(S.auth)}>
			<div className={cn(S.inputsContainer)}>
				<label>ID:<input type="text" /></label>
				<label>token:<input type="password" /></label>
			</div>
			<button>Login</button>
		</div>
	)
}