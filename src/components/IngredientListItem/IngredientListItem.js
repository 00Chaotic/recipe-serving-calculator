import { Stack, ListItem, TextField, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";

class IngredientListItem extends React.Component {
    
    render() {
        return <>
            <ListItem disableGutters>
                <Stack direction="row" spacing={2}>
                    <TextField label="Item Name" variant="outlined" fullWidth autoComplete="off" />
                    <TextField label="Quantity" variant="outlined" autoComplete="off" type={"number"} />
                    <Button onClick={this.props.deleteHandler}>
                        <DeleteIcon color="action" fontSize="large"/>
                    </Button>
                </Stack>
            </ListItem>
        </>
    }
}

export default IngredientListItem;