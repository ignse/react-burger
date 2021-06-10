import React from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '../ingredients-list/ingredients-list';
import Ingredient from '../ingredients-list/ingredient';
import PropTypes from 'prop-types';

class BurgerIngredients extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active_tab: 'bun',
            types : [
                {name: 'bun', title: 'Булки'},
                {name: 'main', title: 'Начинки'},
                {name: 'sauce', title: 'Соусы'}
            ]
        }
    }

    setCurrent = tab_name => () => {
        this.setState({...this.state, active_tab: tab_name})

        const url = window.location.href;
        window.location.href = '#' + tab_name;
        window.history.replaceState(null, null, url);
    }

    render() {
        return (
            <section className={`${styles.block} mt-10 ml-5`}>
                <section>
                    <p className='text text_type_main-large'>
                        Соберите бургер
                    </p>
                    <div style={{ display: 'flex' }}>
                        {this.state.types.map((item) => (
                            <Tab key={item.name} value={item.name} active={this.state.active_tab === item.name} onClick={this.setCurrent(item.name)}>
                                {item.title}
                            </Tab>
                        ))}
                    </div>
                </section>
                <section className={styles.scrollable}>
                    {this.state.types.map((item) => (
                        <IngredientsList key={item.name} title={item.title} name={item.name}>
                            {this.props.data.map((ingridient, index) => ingridient.type === item.name && ingridient && <Ingredient key={index} data={ingridient} />)}
                        </IngredientsList>
                    ))}
                </section>
            </section>
        );
    }
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(Object)
};

 export default BurgerIngredients;