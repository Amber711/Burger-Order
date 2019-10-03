import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render () {
        const ingredientsSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><span style={{textTransform: 'caplitalize'}}>{igKey}</span></li>
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continue}>Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary;