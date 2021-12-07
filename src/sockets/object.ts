import { Socket } from 'rete';
import anySocket from './any'
const objSocket = new Socket("Object value");
objSocket.combineWith(anySocket);
export default objSocket;
