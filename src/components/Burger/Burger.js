import React from 'react';
import styles from './Burger.module.css'
import {withRouter} from 'react-router-dom';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
const burger = (props) => {
    console.log('router match:', props.history);

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {  //[[ , ], [ , , ]]
                return <BurgerIngredients key={igKey + i} type={igKey}/>
            })
        })
        .reduce((arr, ele) => {
            return arr.concat(ele);
        }, []);


    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please start adding ingredients!</p>
    }


    return (
        <div className={styles.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    )

};

export default withRouter(burger);