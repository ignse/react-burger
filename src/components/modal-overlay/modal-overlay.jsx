import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

class ModalOverlay extends React.Component {
    render()
    {
        return (
            <div className={styles.overlay} onClick={this.props.onClose}>
                {this.props.children}
            </div>
        );
    }
}

ModalOverlay.propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;