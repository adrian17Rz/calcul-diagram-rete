import './style.css';
/* import Item from './Item'; */
import Context from './context';
import React from 'react';

export default ({ items, position: [x, y], visible, args, onClose, Components }) => {
    if(!visible) return null;

    return (
        <Context.Provider value={{ args, onClose}}>
            <Components.Menu className="context-menu" style={{ left: x+'px', top: y+'px' }}> // Wrapper component
                {items.map(item => (
                    <Item ItemComponent={Components.Item} item={item} />
                ))}
            </Components.Menu>
        </Context.Provider>
    )
}

// Item.js

class Item extends React.Component {
    render() {
        const { item: { title, subitems }, ItemComponent} = this.props;
        const { visibleSubitems } = this.state;

        return (
            <ItemComponent
                className={'item' + (subitems? ' hasSubitems': '')}
                onClick={this.onClick}
                onMouseOver={() =>
                        this.setState({ visibleSubitems: true })}
                        onMouseLeave={() => this.setState({ visibleSubitems: false })}
                    >
                        {title}
                        {subitems && visibleSubitems && <div className="subitems">
                            {subitems.map((subitem) => <Item item={subitem}/>)}
                        </div>}
                    </ItemComponent>
        )
    }

}
