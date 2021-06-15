import React from 'react';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';

class HeaderBtn extends React.Component {
    render() {
        return (
           <a href='#' className={`${styles.btn} p-5`}>
               {this.props.icon}
               <span className='ml-2 text text_type_main-default'>{this.props.text}</span>
           </a>
        );
    }
}

HeaderBtn.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string
};

export default HeaderBtn;