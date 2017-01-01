import React, { Component, PropTypes }  from 'react';
import { connect }                      from 'react-redux';
import { Responsive, WidthProvider }    from 'react-grid-layout';
import { itemSelected }                 from './../actions';
import ItemTypes                        from './../constants/item-types';
import './stage.css';
import TextItem                         from './items/static-text';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class Stage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      layout: props.items.map(item => {
        const {id : i, x, y, w, h} = item;
        return {i, x, y, w, h};
      })
    }
  }

  componentDidMount() {
    this.mounted = true;;
  }

  onLayoutChange = (layout, layouts) => {
    console.log('Layout has changed');
  };

  // used to indicate selection of an item
  onDragStart = (param1, layoutItem) => {
    this.props.dispatch(itemSelected(parseInt(layoutItem.i, 10)));
  };

  onStageClicked = (e) => {
    e.preventDefault();
    console.log(e.target);
    this.props.dispatch(itemSelected(0));
  }

  render() {
    const { items, selectedItem } = this.props;
    // let layout = [
    //     {i: 'a', x: 0, y: 0, w: 1, h: 2},
    //     {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    //     {i: 'c', x: 4, y: 0, w: 1, h: 2}
    //   ];
    let basicStyle = {
      backgroundColor: '#ffffff'
    };
    const itemsDivs = items.map((item) => {
      let style = basicStyle;
      if (item.id === selectedItem) {
        style = {
          ...basicStyle,
          boxSizing: 'border-box',
          MozBoxSizing: 'border-box',
          WebkitBoxSizing: 'border-box',
          border: '2px solid #f00',
        }
      }

      return (
        <div style={style} key={item.id}>
          <TextItem headerText={item.headerText}
                    //headerStyle={}
                    bodyText={item.text} />
        </div>
      );
    });

    return (
      <div className="Stage" onClick={this.onStageClicked}>
        <ResponsiveReactGridLayout
          className="layout"
          layouts={{lg: this.state.layout}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          onLayoutChange={this.onLayoutChange}
          onDragStart={this.onDragStart}
          onResizeStart={()=>{console.log('onDragStart');}}

          rowHeight={30}>
            {itemsDivs}

        </ResponsiveReactGridLayout>
      </div>
    );
  }
};

Stage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
  console.log('Stage->mapStateToProps');
  console.log(state);
  return {
    items: state.items.filter((item) => (item.type !== ItemTypes.STAGE)),
    selectedItem: state.selectedItem,
  };
};

export default connect(mapStateToProps)(Stage);
