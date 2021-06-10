import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients_list.module.css';

class IngredientsList extends React.Component {

    render() {
        return (
            <>
                <section className={`${styles.section_name} mt-10`}>
                    <a className='text text_type_main-medium' name={this.props.name}>
                        {this.props.title}
                    </a>
                </section>
                <section className={styles.section_title}>
                        <section className={styles.section}>
                            {this.props.children}
                        </section>
                </section>
            </>
        );
    }
}

IngredientsList.propTypes = {
    title: PropTypes.string,
    children: PropTypes.array
};

export default IngredientsList;