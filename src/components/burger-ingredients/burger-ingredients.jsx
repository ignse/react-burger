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
            activeTab: 'bun',
            types : [
                {name: 'bun', title: 'Булки', ref: React.createRef()},
                {name: 'main', title: 'Начинки', ref: React.createRef()},
                {name: 'sauce', title: 'Соусы', ref: React.createRef()}
            ]
        }
    }

    setCurrent = tabName => () => {
        this.setState({...this.state, activeTab: tabName})

        this.state.types.filter(item => item.name === tabName)[0].ref.current.scrollIntoView();
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
                            <Tab key={item.name} value={item.name} active={this.state.activeTab === item.name} onClick={this.setCurrent(item.name)}>
                                {item.title}
                            </Tab>
                        ))}
                    </div>
                </section>
                <section className={styles.scrollable}>
                    {this.state.types.map((item) => (
                        <IngredientsList key={item.name} sectionRef={item.ref} title={item.title} name={item.name}>
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