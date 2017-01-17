import React from 'react';
import { connect } from 'react-redux';
import { changeItemSettings } from './../actions';
import './../styles/bootstrap.css';
import TextAlign from './../components/settings/text-align';
import Align from './../constants/settings';

class TextAlignContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: Align.LEFT
    };
  }

  handleClick = (value) => {
    if (value === this.state.selected) {
      return;
    }

    this.setState({selected: value});
    this.props.changeAlign({'textAlign': value}, this.props.item.id);
  }

  render() {
    return (
      <div className="row">
        <br />
        <div className="col-md-4">
          <label>Text Align</label>
        </div>
        <div className="col-md-8">
          <TextAlign
            leftText="Left"
            middleText="Center"
            rightText="Right"
            selected={this.state.selected}
            onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAlign: (props, id) => (dispatch(changeItemSettings(props, id)))
  }
}

const mapStateToProps = state => {
  const item = state.items.find(item => (item.id === state.selectedItem));
  return { item };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextAlignContainer);
