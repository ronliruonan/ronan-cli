// eslint-disable-next-line
// @ts-nocheck
import Enums from '../../cli-enums/index';

const ws = new WebSocket(`ws://localhost:${Enums.Ports.wsPort}${Enums.Path.wsPath}`);

export default ws;
