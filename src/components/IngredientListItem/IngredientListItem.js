import {Stack, ListItem, TextField, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import PropTypes from 'prop-types';

class IngredientListItem extends React.Component {
    render() {
        return <>
            <ListItem disableGutters>
                <Stack direction="row" spacing={2}>
                    <TextField label="Item Name" variant="outlined" inputProps={{autoComplete: 'off'}} fullWidth />
                    <TextField label="Quantity" defaultValue={0} variant="outlined" autoComplete="off" type={'number'}
                        inputProps={{autoComplete: 'off', min: 0}} onChange={(event) => this.props.changeHandler(this.props.id, (parseFloat(event.target.value)) || 0)} />
                    <TextField label="Calculation" variant="outlined" value={this.props.calculatedQuantity}
                        inputProps={{readOnly: true, disabled: true}} />
                    <Button onClick={() => this.props.deleteHandler(this.props.id)}>
                        <DeleteIcon color="action" fontSize="large"/>
                    </Button>
                </Stack>
            </ListItem>
        </>;
    }
}

IngredientListItem.propTypes = {
    calculatedQuantity: PropTypes.number.isRequired,
    changeHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
};

export default IngredientListItem;
