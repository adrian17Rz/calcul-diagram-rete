import { Socket } from 'rete';
import anySocket from './any'
const numSocket = new Socket("Number value");
numSocket.combineWith(anySocket);
export default numSocket;
