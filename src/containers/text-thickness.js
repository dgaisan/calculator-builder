import React from 'react';
import { connect } from 'react-redux';
import { changeItemSettings } from './../actions';
import TextThickness from './../components/settings/text-thickness';
import {Thickness} from './../constants/settings';

class TextThicknessContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBold: props.item.textBold || false,
      isItalic: props.item.textItalic || false,
      isUnderscore: props.item.textUnderscore || false,
    };
  }

  handleClick = (value) => {
    let settingsToChange = {}, newStateVal = {};

    switch (value) {
      case Thickness.BOLD:
        settingsToChange.textBold = !this.state.isBold;
        newStateVal.isBold = !this.state.isBold;
        break;

      case Thickness.ITALIC:
        settingsToChange.textItalic = !this.state.isItalic;
        newStateVal.isItalic = !this.state.isItalic;
        break;

      case Thickness.UNDERSCORE:
        settingsToChange.textUnderscore = !this.state.isUnderscore;
        newStateVal.isUnderscore = !this.state.isUnderscore;
        break;
      default:
    }

    this.setState(newStateVal);
    this.props.changeThickness(settingsToChange, this.props.item.id);
  }

  render() {
    return (
      <div className="row">
        <br />
        <div className="col-md-4">
          <label>Text Thickness</label>
        </div>
        <div className="col-md-8">
          <TextThickness
            isBold={this.state.isBold}
            isItalic={this.state.isItalic}
            isUnderscore={this.state.isUnderscore}
            onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeThickness: (props, id) => (dispatch(changeItemSettings(props, id)))
  }
}

const mapStateToProps = state => {
  const item = state.items.find(item => (item.id === state.selectedItem));
  return { item };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextThicknessContainer);
