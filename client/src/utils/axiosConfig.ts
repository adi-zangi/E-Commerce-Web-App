import axios from 'axios';
import env from '../env.json';

let serverPort;
if ('SERVER_PORT' in env) {
   serverPort = env['SERVER_PORT']
} else {
   serverPort = 3001;
}

export default axios.create({
   baseURL: `http://localhost:${serverPort}`,
   headers: {
      'Content-type': 'application/json'
   }
});