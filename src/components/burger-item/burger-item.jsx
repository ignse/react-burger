import React from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

class BurgerItem extends React.Component {
    render()
    {
        const {type, isLocked, data} = this.props;

        const className = (type !== 'top' ? 'pt-4' : '') + (isLocked ? ' ml-7' : '');
        const namePrefix = type ? (type === 'top' ? ' (верх)' : ' (низ)') : '';

        return (
            <span className={className}>
             {!isLocked && (<DragIcon />)}
             <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={data.name + namePrefix}
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
    }).isRequired,
    type: PropTypes.string,
    isLocked: PropTypes.bool
};

export default BurgerItem;