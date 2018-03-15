import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ping, TPing } from '../state/actionCreators';
import { IAppState } from '../state/reducer';

interface IStateProps {
  isPinging: boolean;
}
interface IDispatchProps {
  sendPing: TPing;
}

type PingProps = IStateProps & IDispatchProps;

class Ping extends React.Component<PingProps> {
  public render() {
    const { isPinging, sendPing } = this.props;
    return (
      <div>
      <h1>is pinging: ${isPinging}</h1>
      <button onClick={sendPing} >
        Start PING
      </button>
    </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
    isPinging: state.ping.isPinging,
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>) => ({
    sendPing: () => dispatch(ping()),
 });

 // FIXME: Something is up with mapStateToProps
const PingContainer = connect<IStateProps, IDispatchProps, IAppState>
  (mapStateToProps, mapDispatchToProps)(Ping);

export default PingContainer;
