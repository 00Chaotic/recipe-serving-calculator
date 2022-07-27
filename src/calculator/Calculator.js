import { Fab, List, Stack, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import IngredientListItem from "../components/IngredientListItem/IngredientListItem";

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = { listItems: [], listItemKeyCounter: 0 };
    }

    addListitemHandler = () => {
        return this.setState((state, props) => ({
            listItems: [...state.listItems, <IngredientListItem deleteHandler={this.removeListItemHandler} key={state.listItemKeyCounter + 1}/>],
            listItemKeyCounter: state.listItemKeyCounter + 1
        }));
    }
    
    removeListItemHandler = () => {
        return this.setState((state, props) => ({
            listItems: state.listItems.pop()
        }));
    }

    render() {
        return (
            <>
                <TextField label="Recipe Name" variant="standard" autoComplete="off" />
                <List>
                    {this.state.listItems}
                </List>
                <Stack direction="row" spacing={2}>
                    <TextField label="Current Servings" variant="outlined" autoComplete="off" type={"number"} />
                    <TextField label="Desired Servings" variant="outlined" autoComplete="off" type={"number"} />
                </Stack>
                <Fab color="secondary" size="medium" onClick={this.addListitemHandler}>
                    <AddIcon/>
                </Fab>
            </>
        );
    } 
}
export default Calculator;