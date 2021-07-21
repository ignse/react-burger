import React from 'react';
import styles from './app-header.module.css';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

class HeaderBtn extends React.Component {
    render() {
        return (
           <NavLink to={{ pathname: this.props.path}} exact={this.props.exact} activeClassName={styles.active} className={`${styles.btn} p-5`}>
               {this.props.icon}
               <span className='ml-2 text text_type_main-default'>{this.props.text}</span>
           </NavLink>
        );
    }
}

HeaderBtn.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string
};

export default HeaderBtn;