import {Box, Button, Fab, List, Stack, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import IngredientListItem from '../components/IngredientListItem/IngredientListItem';
import './Calculator.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [
                <IngredientListItem
                    calculatedQuantity={0}
                    changeHandler={this.handleQuantityChange}
                    currentQuantity={0}
                    deleteHandler={this.removeListItemHandler}
                    id={0}
                    key={0}
                />,
            ],
            listItemKeyCounter: 1,
            currentServings: 0,
            desiredServings: 0,
        };
    }

    addListitemHandler = () => {
        this.setState((prevState, props) => ({
            listItems: [
                ...prevState.listItems,
                <IngredientListItem
                    calculatedQuantity={0}
                    changeHandler={this.handleQuantityChange}
                    currentQuantity={0}
                    deleteHandler={this.removeListItemHandler}
                    id={prevState.listItemKeyCounter + 1}
                    key={prevState.listItemKeyCounter + 1}
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

    calculateQuantities = () => {
        const newList = [];
        this.state.listItems.forEach((element, index) => {
            const calculatedQuantity = element.props.currentQuantity * (this.state.desiredServings / this.state.currentServings);
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
