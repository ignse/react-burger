import React from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsList from '../ingredients-list/ingredients-list';
import Ingredient from '../ingredients-list/ingredient';
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';

class BurgerIngredients extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'bun',
            detailsId: '',
            types : [
                {name: 'bun', title: 'Булки', ref: React.createRef()},
                {name: 'main', title: 'Начинки', ref: React.createRef()},
                {name: 'sauce', title: 'Соусы', ref: React.createRef()}
            ]
        }
    }

    showDetails = e => {
        this.setState({...this.state, detailsId: e.currentTarget.id})

        e.stopPropagation();
    }

    hideDetails = e => {
        this.setState({...this.state, detailsId: ''});

        e.stopPropagation();
    }

    setCurrent = tabName => () => {
        if (this.props.data.length)
        {
            this.setState({...this.state, activeTab: tabName});

            this.state.types.filter(item => item.name === tabName)[0].ref.current.scrollIntoView();
        }
    }

    render() {

        let selectedIngredient = null;

        return (
            <>
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
                        {this.props.data.length ? this.state.types.map((item) => (
                            <IngredientsList key={item.name} sectionRef={item.ref} title={item.title} name={item.name}>
                                {this.props.data.map((ingridient, index) => {
                                    if (ingridient._id === this.state.detailsId)
                                    {
                                        selectedIngredient = ingridient
                                    }

                                    return ingridient.type === item.name && ingridient && <Ingredient key={index} data={ingridient} onShowDetails={this.showDetails} />
                                })}
                            </IngredientsList>
                        )) : (this.props.loading && !this.props.hasError ? 'Загрузка...' : 'Произошла ошибка, попробуйте перезагрузить страницу.')}
                    </section>
                </section>
                {selectedIngredient && (
                    <Modal header={'Детали ингредиента'} onClose={this.hideDetails}>
                        <IngredientDetails ingredient={selectedIngredient}/>
                    </Modal>
                )}
            </>
        );
    }
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number
    })),
    loading: PropTypes.bool,
    hasError: PropTypes.bool
}

 export default BurgerIngredients;