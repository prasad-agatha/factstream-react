// @flow

import React, {Component} from 'react';

import MouseMonitor from './MouseMonitor';

type Props = {
  onMouseOver: (content: any) => void;
  popupContent: any;
  onMouseOut: () => void;
  children: any;
};

type State = {
  mouseIn: boolean;
};

class Popup extends Component<Props, State> {
  state: State = {
    mouseIn: false,
  };

  render() {
    const {onMouseOver, popupContent, onMouseOut} = this.props;

    return (
      <div
        onMouseOver={() => {
          this.setState({mouseIn: true});

          onMouseOver(
            <MouseMonitor
              onMoveAway={() => {
                if (this.state.mouseIn) {
                  return;
                }

                onMouseOut();
              }}
              paddingX={60}
              paddingY={30}
              // eslint-disable-next-line react/no-children-prop
              children={popupContent}
            />
          );
        }}
        onMouseOut={() => {
          this.setState({mouseIn: false});
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Popup;
