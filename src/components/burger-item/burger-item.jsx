import React from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

class BurgerItem extends React.Component {
    render()
    {
        const className = (this.props.type !== 'top' ? 'pt-4' : '') + (this.props.isLocked ? ' ml-7' : '');

        return (
            <span className={className}>
             {!this.props.isLocked && (<DragIcon />)}
             <ConstructorElement
                type={this.props.type}
                isLocked={this.props.isLocked}
                key={this.props.data._id}
                text={this.props.data.name}
                price={this.props.data.price}
                thumbnail={this.props.data.image}
             />
            </span>
        );
    }
}

BurgerItem.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    isLocked: PropTypes.bool
};

export default BurgerItem;