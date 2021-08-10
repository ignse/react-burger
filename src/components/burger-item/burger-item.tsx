import React, {FC, SyntheticEvent, useRef} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag, useDrop} from 'react-dnd';
import {TIngredient} from "../../services/types/data";

export type TBurgerItem = {
    data: TIngredient;
    type?:  'top' | 'bottom';
    isLocked?: boolean;
    index: number;
    id?: string;
    handleDelete?: Function;
    handleMove: Function;
};

const BurgerItem: FC<TBurgerItem> = (props) => {

    const {type, isLocked, data, index, id, handleDelete, handleMove} = props;

    const className = (type !== 'top' ? 'pt-4' : '') + (isLocked ? ' ml-7' : '');
    const namePrefix = type ? (type === 'top' ? ' (верх)' : ' (низ)') : '';

    const ref = useRef<HTMLElement>(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'ingredient-item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: {index: number, id: string}, monitor: any) {
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
         {!isLocked && (<DragIcon type='primary' />)}
         <ConstructorElement
            type={type}
            isLocked={isLocked}
            text={data.name + namePrefix}
            price={data.price}
            thumbnail={data.image}
            handleClose={isLocked ? () => {} : () => handleDelete}
         />
        </span>
    );
};

export default BurgerItem;