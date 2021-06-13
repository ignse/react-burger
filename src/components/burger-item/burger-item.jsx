import React from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

class BurgerItem extends React.Component {
    render()
    {
        const {type, isLocked, data} = this.props;

        const className = (type !== 'top' ? 'pt-4' : '') + (isLocked ? ' ml-7' : '');

        return (
            <span className={className}>
             {!isLocked && (<DragIcon />)}
             <ConstructorElement
                type={type}
                isLocked={isLocked}
                key={data._id}
                text={data.name}
                price={data.price}
                thumbnail={data.image}
             />
            </span>
        );
    }
}

BurgerItem.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    }),
    type: PropTypes.string,
    isLocked: PropTypes.bool
};

export default BurgerItem;