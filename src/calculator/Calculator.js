import { Fab, List, Stack, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import IngredientListItem from "../components/IngredientListItem/IngredientListItem";

function Calculator() {
    const [listItems, setListItems] = useState([]);

    return (
        <>
            <TextField label="Recipe Name" variant="standard" autoComplete="off" />
            <List>
                {listItems}
            </List>
            <Stack direction="row" spacing={2}>
                <TextField label="Current Servings" variant="outlined" autoComplete="off" type={"number"} />
                <TextField label="Desired Servings" variant="outlined" autoComplete="off" type={"number"} />
            </Stack>
            <Fab color="secondary" size="medium" onClick={() => addListitemHandler(setListItems)}>
                <AddIcon/>
            </Fab>
        </>
    );
}

const addListitemHandler = (setListItems) => {
    return setListItems(current => [...current, <IngredientListItem id={current.length + 1} deleteHandler={() => removeListItemHandler(setListItems)} key={current.length + 1}/>]);
}

const removeListItemHandler = (setListItems) => {
    return setListItems(current => current.filter((_, index) => index !== current.length));
}

export default Calculator;