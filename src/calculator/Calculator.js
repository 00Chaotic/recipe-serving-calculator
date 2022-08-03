import {Box, Button, Fab, List, Stack, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import IngredientListItem from '../components/IngredientListItem/IngredientListItem';
import './Calculator.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentServings: 0,
            desiredServings: 0,
            listItemKeyCounter: 1,
            listItems: [
                <IngredientListItem
                    calculatedQuantity={0}
                    currentQuantity={0}
                    deleteHandler={this.removeListItemHandler}
                    fromUnit={0}
                    id={0}
                    key={0}
                    toUnit={0}
                    unitChangeHandler={this.handleUnitChange}
                    quantityChangeHandler={this.handleQuantityChange}
                />,
            ],
            // Conversion matrix for measurement units
            conversionRatios: [
                [1, 0.0625, 0.02083, 4.22675, 0.00422, 2.26, 0.125, 0.00423, 4.22675],
                [16, 1, 0.33333, 128, 0.06761, 30.68, 2, 0.06763, 67.628],
                [48, 3, 1, 240, 0.24, 92.0267, 6, 0.20289, 202.884],
                [0.23659, 0.14787, 0.00492, 1, 0.001, 0.45359, 0.02835, 0.001, 1],
                [128, 17.07, 4.92892, 1000, 1, 453.592, 28.3495, 1, 1000],
                [0.44, 0.03125, 0.01087, 2.20462, 0.0022, 1, 0.0625, 0.00221, 2.2],
                [4.5, 0.5, 0.16667, 35.274, 0.03527, 16, 1, 0.03381, 33.814],
                [236.588, 50, 4.92892, 1000, 1, 453.592, 29.5735, 1, 1000],
                [0.236588, 0.01479, 0.00493, 1, 0.001, 0.45359, 0.02957, 0.001, 1],
            ],
        };
    }

    addListitemHandler = () => {
        this.setState((prevState, props) => ({
            listItems: [
                ...prevState.listItems,
                <IngredientListItem
                    calculatedQuantity={0}
                    currentQuantity={0}
                    deleteHandler={this.removeListItemHandler}
                    id={prevState.listItemKeyCounter + 1}
                    key={prevState.listItemKeyCounter + 1}
                    unitChangeHandler={this.handleUnitChange}
                    quantityChangeHandler={this.handleQuantityChange}
                />,
            ],
            listItemKeyCounter: prevState.listItemKeyCounter + 1,
        }));
    };

    removeListItemHandler = (id) => {
        this.setState((prevState, props) => ({
            listItems: prevState.listItems.filter((item) => item.props.id !== id),
        }));
    };

    handleQuantityChange = (listItemIndex, value) => {
        this.setState((prevState) => ({
            listItems: prevState.listItems.map((element) => element.props.id == listItemIndex ? {...element, props: {...element.props, currentQuantity: value}} : element),
        }));
    };

    handleUnitChange = (listItemIndex, unitPosition, unitValue) => {
        this.setState((prevState) => ({
            listItems: prevState.listItems.map((element) => {
                switch (unitPosition) {
                case 1:
                    return element.props.id == listItemIndex ? {...element, props: {...element.props, fromUnit: unitValue}} : element;
                case 2:
                    return element.props.id == listItemIndex ? {...element, props: {...element.props, toUnit: unitValue}} : element;
                }
            }),
        }));
    };

    calculateQuantities = () => {
        const newList = [];
        this.state.listItems.forEach((element, index) => {
            const ratio = this.state.conversionRatios[element.props.toUnit][element.props.fromUnit];
            const calculatedQuantity = (element.props.currentQuantity * ratio) * (this.state.desiredServings / this.state.currentServings);
            newList[index] = {
                ...element,
                props: {...element.props, calculatedQuantity: calculatedQuantity}};
        });
        this.setState({listItems: newList});
    };

    render() {
        return (
            <Box>
                <TextField label="Recipe Name" variant="standard" inputProps={{autoComplete: 'off'}} />
                <List>
                    {this.state.listItems}
                </List>
                <Stack direction="row" spacing={2}>
                    <TextField label="Current Servings" variant="outlined" defaultValue={0} type={'number'} inputProps={{autoComplete: 'off'}}
                        onChange={(event) => this.setState({currentServings: parseFloat(event.target.value) || 0})} />
                    <TextField label="Desired Servings" variant="outlined" defaultValue={0} type={'number'} inputProps={{autoComplete: 'off'}}
                        onChange={(event) => this.setState({desiredServings: parseFloat(event.target.value) || 0})}/>
                </Stack>
                <Stack className='button-stack' direction="row" spacing={2}>
                    <Fab color="secondary" size="medium" onClick={this.addListitemHandler}>
                        <AddIcon/>
                    </Fab>
                    <Button className='calculate-button' variant='contained' onClick={this.calculateQuantities}>Calculate</Button>
                </Stack>
            </Box>
        );
    }
}

export default Calculator;
