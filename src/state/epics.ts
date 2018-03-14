const PING = 'PING';
const PONG = 'PONG';

const ping = () => ({ type: PING });

export const pingEpic = (action$: any) =>
  action$.ofType(PING)
    .delay(1000) // Asynchronously wait 1000ms then continue
    .mapTo({ type: 'PONG' });

export const pingReducer = (state = { isPinging: false }, action: any) => {
  switch (action.type) {
    case 'PING':
      return { isPinging: true };

    case 'PONG':
      return { isPinging: false };

    default:
      return state;
  }
};
