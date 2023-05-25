import { Api } from "../Api";
import { IStateInstance } from "./Api";

export interface IUser{
	id:string
	token:string
	stateInstance: IStateInstance
	api:Api
}