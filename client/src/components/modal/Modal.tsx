import React from 'react';
import './Modal.css';
import { connect } from 'react-redux';
import { toggleModal } from '../../redux/actions/ui.action'

interface UiProps {
  toggleModal: (isOpenModal: boolean) => void;
  theme: string;
  modalInfo: any;
}

interface ModalState { title: string, text: string, leftBtn: string, rightBtn: string }

class Modal extends React.Component<UiProps, ModalState>  {

  invokeFunction = () => {
    this.props.modalInfo.function(this.props.modalInfo.data)
    this.props.toggleModal(false)
  }

  closeModal = () => this.props.toggleModal(false)
  
  render() {
    return (
      <div className="modal_background">
        <div className="modal">
          <div className="modal_header">
            <div className="title">
              {this.props.modalInfo.title}
            </div>
            <div className="x_btn" onClick={this.closeModal}>X</div>
          </div>
          <div className="modal_content">
            <div className="content_text">
              {this.props.modalInfo.text}
            </div>
            <div className="modal_controls">
              <div className={"left_btn " + this.props.theme+"-text"} onClick={this.invokeFunction}>
                {this.props.modalInfo.leftBtn}
              </div>
              <div className={"control " + this.props.theme}>
                <div className="control_text" onClick={() => this.props.toggleModal(false)}>
                  {this.props.modalInfo.rightBtn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {

  return {
    modalInfo: state.ui.modalInfo,
    theme: state.ui.theme
  }
}

const mainActions = (dispatch: any) => {

  return {
    toggleModal: (payload: any) => toggleModal(dispatch, payload),
  }
}

export default connect(
  mapStateToProps,
  mainActions,
)(Modal);

