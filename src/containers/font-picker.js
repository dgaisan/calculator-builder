import React from 'react';
import { connect } from 'react-redux';
import { changeItemSettings } from './../actions';
import DropdownComponent from './../components/settings/dropdown';
import {FontList as fontList} from './../constants/settings';

class FontPickerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontname: props.item.fontname || fontList[ 0].name
    };
  }

  handleSelect = (fontName) => {
    console.log('+++New Font Selected+++', fontName);
    this.setState({fontname: fontName})
    this.props.changeFont({fontname: fontName}, this.props.item.id);
  }

  render() {
    return (
      <div className="row">
        <br />
        <div className="col-md-4">
          <label>Font Name</label>
        </div>
        <div className="col-md-8">
          <DropdownComponent
            title={this.state.fontname}
            id="static-text-font"
            options={fontList}
            onSelect={this.handleSelect} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeFont: (props, id) => (dispatch(changeItemSettings(props, id)))
  }
}

const mapStateToProps = state => {
  const item = state.items.find(item => (item.id === state.selectedItem));
  return { item };
}

export default connect(mapStateToProps, mapDispatchToProps)(FontPickerContainer);
