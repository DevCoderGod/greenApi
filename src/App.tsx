import React, { useEffect, useRef, useState } from 'react'
import S from './App.module.scss';
import cn from 'classnames';
import { Avatar } from "./components/Avatar";
import { Auth } from './components/Auth/Auth';
import { Chat } from './components/Chat/Chat';
import { Sender } from './components/Sender/Sender';
import { ICorr, IUser } from './types';
import { Checker } from './components/Checker/Checker';

function App() {

	const [user, setUser] = useState<IUser | null>(null)
	const [corr, setCorr] = useState<ICorr | null>(null)

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
				<Chat/>
				<Sender disabled={!user || !corr}/>
			</div>
		</div>
	);
}

export default App;