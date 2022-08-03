import React, {Component, ReactComponentElement} from 'react';
import {Animate, AnimateGroup} from 'react-simple-animate';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (ComposedComponent: React.FunctionComponent) {
  class NetworkDetector extends Component {
    state = {
      play: false,
      shouldSlideDown: false,
      isOffline: false,
    };

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener('online', this.handleConnectionChange);
      window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener('online', this.handleConnectionChange);
      window.removeEventListener('offline', this.handleConnectionChange);
    }

    handleConnectionChange = () => {
      const {isOffline} = this.state;
      const condition = navigator.onLine ? 'online' : 'offline';
      if (condition === 'online' && isOffline) {
        const webPing = setInterval(() => {
          fetch('//google.com', {
            mode: 'no-cors',
          })
            .then(() => {
              this.setState({shouldSlideDown: false}, () =>
                this.setState({play: true}, () => {
                  setTimeout(
                    () => this.setState({play: false, isOffline: false}),
                    2000,
                  );
                  return clearInterval(webPing);
                }),
              );
            })
            .catch(error => console.log(error));
        }, 2000);
        return;
      } else if (condition === 'offline') {
        this.setState(
          {isOffline: true, shouldSlideDown: true, play: true},
          // () => setTimeout(() => this.setState({play: false}), 2000),
        );
      }

      return;
    };

    render() {
      const {play, shouldSlideDown, isOffline} = this.state;
      var start = {transform: 'translate(0px, 0px)'};
      if (isOffline && !shouldSlideDown) {
        start = {transform: 'translate(0px, 40px)'};
      }

      var end = {transform: 'translate(0px, 40px)'};
      if (isOffline && !shouldSlideDown) {
        end = {transform: 'translate(0px, 0px)'};
      }
      return (
        <Animate
          play={play} // set play true to start the animation
          duration={1} // how long is the animation duration
          delay={0} // how many delay seconds will apply before the animation start
          start={start}
          end={end}
          // complete={{ display: 'none' }}
          easeType="cubic-bezier(0.445, 0.05, 0.55, 0.95)"
          // onComplete={onCompleteCallBack} // call back function when animation is completed
        >
          <div style={{marginTop: '-40px'}}>
            <div className="p-2 bg-primary">
              <p className="px-3 m-0 text-white">Internet connection lost</p>
            </div>

            <ComposedComponent {...this.props} />
          </div>
        </Animate>
      );
    }
  }

  return NetworkDetector;
}
