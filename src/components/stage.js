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
    console.log('Stage->constructor');
    this.state = {
      mounted: false,
      layouts: this._getLayouts(props.items)
    }
  }

  _getLayouts = (items) => {
    console.log('Getting Laoyouts', items);
    return items.map(item => {
      let {i, x, y, w, h} = item;
      i = String(i);
      return {i, x, y, w, h};
    });
  }

  componentWillReceiveProps(nextProps) {

    const layouts = this.state.layouts;
    const newLayouts = this._getLayouts(nextProps.items);

    // decide whether ot not local state should be updated.
    // if item layputs changed then need to re-set layouts prop
    let layoutChangedFlag = false;

    if (newLayouts.length !== layouts.length) {
      layoutChangedFlag = true;
    } else {
      newLayouts.forEach(item => {
        // ei: existing item
        const ei = layouts.find(i => (i.i === item.i));
        if (!ei) { layoutChangedFlag = true; }
        if (ei.x !== item.x || ei.y !== item.y || ei.w !== item.w || ei.h !== item.h) {
          layoutChangedFlag = true;
        }
      });
    }

    console.log('layoutChangedFlag', layoutChangedFlag);

    if (layoutChangedFlag) {
      this.setState({layouts: newLayouts});
    }
  }

  componentDidMount() {
    this.setState({mounted: true});
  }

  onLayoutChange = (layout, layouts) => {
    console.log('Layout has changed');
  };

  // used to indicate selection of an item
  onDragStart = (param1, layoutItem) => {
    this.props.dispatch(itemSelected(parseInt(layoutItem.i, 10)));
  };

  onDragStop = (param1, layoutItem) => {
    console.log('onDragStop');
    console.log('param1', param1);
    console.log('layoutItem', layoutItem);
    // TODO: update layout
  }

  onResizeStop = (param1, layoutItem) => {
    console.log('onResizeStop');
    console.log('param1', param1);
    console.log('layoutItem', layoutItem);
    // TODO: update layout
  }

  onStageClicked = (e) => {
    //this.props.dispatch(itemSelected(0));
  }

  onRemoveItem = itemId => {
    console.log('removing item', itemId);
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
      const datagrid = {w: item.w, h: item.h, x: item.x, y: item.y};
      //const datagrid = {w: 5, h: 4, x: 4, y: 4};
      console.log('datagrid', datagrid);

      return (
        <div style={style}
          key={item.id}

          data-grid={datagrid} >
          <TextItem headerText={item.headerText}
                    //headerStyle={}
                    bodyText={item.text}
                    onRemoveItem={() => {this.onRemoveItem(item.id)}}
                   />
        </div>
      );
    });

    return (
      <div className="Stage" onClick={this.onStageClicked}>
        <ResponsiveReactGridLayout
          className="layout"
          layouts={{lg: this.state.layouts}}
          cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
          isResizable={true}
          measureBeforeMount={false}
          useCSSTransforms={this.state.mounted}
          onLayoutChange={this.onLayoutChange}
          onDragStart={this.onDragStart}
          onDragStop={this.onDragStop}
          onResizeStart={()=>{console.log('onResizeStart');}}
          rowHeight={150}>
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
