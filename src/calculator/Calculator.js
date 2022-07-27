import {Box, Button, Fab, List, Stack, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import IngredientListItem from '../components/IngredientListItem/IngredientListItem';
import './Calculator.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {listItems: [
            <IngredientListItem
                deleteHandler={this.removeListItemHandler}
                id={0}
                key={0}
            />,
        ], listItemKeyCounter: 1};
    }

    addListitemHandler = () => {
        return this.setState((state, props) => ({
            listItems: [
                ...state.listItems,
                <IngredientListItem
                    deleteHandler={this.removeListItemHandler}
                    id={state.listItemKeyCounter + 1}
                    key={state.listItemKeyCounter + 1}
                />,
            ],
            listItemKeyCounter: state.listItemKeyCounter + 1,
        }));
    };

    removeListItemHandler = (id) => {
        return this.setState((state, props) => ({
            listItems: state.listItems.filter((item) => item.props.id !== id),
        }));
    };

    render() {
        return (
            <Box>
                <TextField label="Recipe Name" variant="standard"
                    autoComplete="off" />
                <List>
                    {this.state.listItems}
                </List>
                <Stack direction="row" spacing={2}>
                    <TextField label="Current Servings" variant="outlined" autoComplete="off"
                        type={'number'} />
                    <TextField label="Desired Servings" variant="outlined" autoComplete="off"
                        type={'number'} />
                </Stack>
                <Stack className='button-stack' direction="row" spacing={2}>
                    <Fab color="secondary" size="medium" onClick={this.addListitemHandler}>
                        <AddIcon/>
                    </Fab>
                    <Button className='calculate-button' variant='contained'>Calculate</Button>
                </Stack>
            </Box>
        );
    }
}
export default Calculator;
