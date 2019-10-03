import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: .7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        },
        totalPrice: 4,
        purchasing: false
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '='
                + encodeURIComponent(this.state.ingredients[i]))
        }

        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: queryString
        });

    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = oldCount + 1;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) return;
        const oldPrice = this.state.totalPrice;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = oldCount - 1;
        const newPrice = oldPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        //updatePurchaseState(); // pass updatedIngredients
    };

    updatePurchaseState = () => {

        //const sum = Object.values(this.state.ingredients).reduce((sum, ele) => sum + ele, 0)
       // problem is: this.state.ingredients may not be the correct data. so
    };
    render () {
        let purchasable = false;
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
            if (!disabledInfo[key]) {purchasable = true; }
        }
        // {salad: true, meat: false...}
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                       removeModal={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                                  price={this.state.totalPrice.toFixed(2)}
                                  cancel={this.purchaseCancelHandler}
                                  continue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                               purchasable={purchasable}
                               disabled={disabledInfo}
                               ordered={this.purchaseHandler}
                               price={this.state.totalPrice}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;