import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot: any = document.getElementById("react-modals");

interface IModal {
    children?: ReactNode;
    header?: string;
    onClose: any
};

class Modal extends React.Component<IModal> {

    escFunction = (event: KeyboardEvent) => {
        if(event.keyCode === 27) {
            this.props.onClose(event);
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    render() {
        const { children, header, onClose } = this.props;

        return ReactDOM.createPortal(
            (
                <ModalOverlay onClose={onClose}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={`${styles.header} mt-10`}>
                            <span className={`${styles.title} ml-10 text text_type_main-large`}>
                                {header}
                            </span>
                            <span className={`${styles.close} mr-10`}>
                                <CloseIcon type="primary" onClick={onClose} />
                            </span>
                        </div>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </div>
                </ModalOverlay>
            ),
            modalRoot
        );
    }
}

export default Modal;
