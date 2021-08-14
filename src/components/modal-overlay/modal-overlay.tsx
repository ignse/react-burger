import React, {ReactNode} from 'react';
import styles from './modal-overlay.module.css';

interface IModalOverlay {
    children?: ReactNode;
    onClose: any;
}

class ModalOverlay extends React.Component<IModalOverlay> {
    render()
    {
        return (
            <div className={styles.overlay} onClick={this.props.onClose}>
                {this.props.children}
            </div>
        );
    }
}

export default ModalOverlay;