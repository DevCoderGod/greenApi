import React, { useEffect, useRef, useState } from 'react'
import { ICorr, IUser } from '../../types'
import { checkWhatsappRequest, checkWhatsappResponse } from '../../types/Api'

interface IProps{
	user:IUser | null
	onClick:(corr:ICorr)=>void
}

export const Checker = (props:IProps) => {

	const [phone, setPhone] = useState<string>("")

	async function onClick(){
		if(!phoneValidator(phone)){
			setPhone("")
			return
		}
		if(props.user){
			const responce = await props.user.api.request<checkWhatsappRequest,checkWhatsappResponse>
				("checkWhatsapp","POST",{phoneNumber:parseInt(phone)})
			if(!responce)return
			props.onClick({existsWhatsapp: responce.existsWhatsapp})
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