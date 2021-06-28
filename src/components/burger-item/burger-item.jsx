import React, {useRef} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {useDrag, useDrop} from 'react-dnd';

function BurgerItem(props) {

    const {type, isLocked, data, index, id, handleDelete, handleMove} = props;

    const className = (type !== 'top' ? 'pt-4' : '') + (isLocked ? ' ml-7' : '');
    const namePrefix = type ? (type === 'top' ? ' (верх)' : ' (низ)') : '';

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'ingredient-item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            handleMove(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'ingredient-item',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <span className={className} ref={isLocked ? null : ref} style={{opacity: opacity}} data-handler-id={handlerId} >
         {!isLocked && (<DragIcon />)}
         <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={data.name + namePrefix}
            price={data.price}
            thumbnail={data.image}
            handleClose={isLocked ? () => {} : handleDelete}
         />
        </span>
    );
};

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