import React from 'react';
import ReactModal from 'react-modal';
import InsertNewItem from './insertnewitem';

class AddNewItem extends React.Component {
  constructor() {
      super();
      this.showModal = false;

      this._handleClick = this._handleClick.bind(this);
      this._handleCloseModal = this._handleCloseModal.bind(this);

      this.state = {showModal: false};
  }

  _handleClick(e){
    e.preventDefault();
    console.log('Add new Item clicked');
    this.setState({showModal: true});
  }

  _handleCloseModal(e) {
    e.preventDefault();
    this.setState({showModal: false});
  }

  render() {
    return (
      <div>
        <button onClick={this._handleClick}>Add New Item</button>
        <ReactModal
             isOpen={this.state.showModal}
             contentLabel="onRequestClose Example"
             onRequestClose={this._handleCloseModal}
             shouldCloseOnOverlayClick={false}
          >
          <button onClick={this._handleCloseModal}>Close Modal</button>
          <InsertNewItem onClose={this._handleCloseModal} />
          </ReactModal>
      </div>
    );
  }

};

export default AddNewItem;
