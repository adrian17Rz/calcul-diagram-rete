import { Socket } from 'rete';
import anySocket from './any'
const arraySocket = new Socket("Array value");
arraySocket.combineWith(anySocket);
export default arraySocket;
