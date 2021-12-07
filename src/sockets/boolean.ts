import { Socket } from 'rete';
import anySocket from './any'
const boolSocket = new Socket("Boolean value");
boolSocket.combineWith(anySocket);
export default boolSocket;
