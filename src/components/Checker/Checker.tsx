import React, { useEffect, useRef, useState } from 'react'
import { ICorr, IUser } from '../../types'
import { ICheckWhatsappRequest, ICheckWhatsappResponse } from '../../types/Api'

interface IProps{
	user:IUser | null
	onClick:(corr:ICorr | null)=>void
}

export const Checker = (props:IProps) => {

	const [phone, setPhone] = useState<string>("")

	async function onClick(){
		if(!phoneValidator(phone)){
			setPhone("")
			return
		}
		if(props.user){
			const responce = await props.user.api.request<ICheckWhatsappRequest,ICheckWhatsappResponse>
				("checkWhatsapp","POST",{phoneNumber:parseInt(phone)})
			if(responce && responce.existsWhatsapp){
				props.onClick({
					phone: phone,
					existsWhatsapp: responce.existsWhatsapp
				})
				return
			}
			props.onClick(null)
		}
	}

	return(
		<>
			<label>Phone: +
				<input
					type="text"
					disabled={!props.user}
					value={phone}
					onChange={(e)=>setPhone(e.target.value)}
				/>
			</label>
			<button
				disabled={!props.user}
				onClick={onClick}
			>
				New chat
			</button>
		</>
	)
}

function phoneValidator(phone:string):boolean {
	// TODO
	return true
}