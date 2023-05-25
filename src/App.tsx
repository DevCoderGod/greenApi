import React, { useEffect, useRef, useState } from 'react'
import S from './App.module.scss';
import cn from 'classnames';
import { Avatar } from "./components/Avatar";
import { Auth } from './components/Auth/Auth';
import { Chat } from './components/Chat/Chat';
import { Sender } from './components/Sender/Sender';
import { IUser } from './types';

function App() {

	const [user, setUser] = useState<IUser | null>(null)

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
					<label>Phone: +
						<input
							type="text"
							disabled={!user}
						/>
					</label>
					<button disabled={!user}>New chat</button>
				</div>
				<Chat/>
				<Sender disabled={!user}/>
			</div>
		</div>
	);
}

export default App;