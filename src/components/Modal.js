import React from "react";
import '../modal.scss'

class Modal extends React.Component {

  onClose = e => {
    this.props.onClose && this.props.onClose(e)
  }

  render() {
    if (this.props.show){
      return(
        <div>
        <div className="overlay" />
          <div className="modal" id="modal">
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
};

export default Modal;