import { Socket } from 'rete';
import anySocket from './any'
const strSocket = new Socket("String value");
strSocket.combineWith(anySocket);
export default strSocket;
