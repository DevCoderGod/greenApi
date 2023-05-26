import React, { useEffect, useRef, useState } from 'react'
import S from './Auth.module.scss'
import cn from 'classnames'
import { IUser } from '../../types'
import { Api } from '../../Api'

interface IProps{
	onClick:(user:IUser | null)=>void
}

export const Auth = (props:IProps) => {

	const [id, setId] = useState<string>("")
	const [token, setToken] = useState<string>("")

	async function onClick(){
		const status = await Api.checkAccount(id,token)
		if(status.stateInstance === "authorized"){
			const user ={
				id,
				token,
				stateInstance: status.stateInstance,
				api: new Api(id, token)
			}
			props.onClick(user)
		}
		else props.onClick(null)
	}

	return(
		<div className={cn(S.auth)}>
			<div className={cn(S.inputsContainer)}>
				<label>ID:
					<input
						type="text"
						value={id}
						onChange={(e)=>setId(e.target.value)}
					/>
				</label>
				<label>token:
					<input
						type="password"
						value={token}
						onChange={(e)=>setToken(e.target.value)}
					/>
				</label>
			</div>
			<button onClick={onClick}>
				Login
			</button>
		</div>
	)
}