import {Stack, ListItem, TextField, Button, Select, MenuItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import PropTypes from 'prop-types';

class IngredientListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Supported measurement units (specifically in this order)
            units: ['cup', 'tbsp', 'tsp', 'kg', 'g', 'lb', 'oz', 'mL', 'L'],
        };
    }

    render() {
        return <>
            <ListItem disableGutters>
                <Stack direction="row" spacing={2}>
                    <TextField label="Item Name" variant="outlined" inputProps={{autoComplete: 'off'}} fullWidth />
                    <TextField label="Quantity" defaultValue={0} variant="outlined" autoComplete="off" type={'number'}
                        inputProps={{autoComplete: 'off', min: 0}} onChange={(event) => this.props.quantityChangeHandler(this.props.id, (parseFloat(event.target.value)) || 0)} />
                    <Select defaultValue={0} autoWidth onChange={(event) => this.props.unitChangeHandler(this.props.id, 1, (parseInt(event.target.value)) || 0)}>
                        {this.state.units.map((unit, index) => (
                            <MenuItem key={index} value={index}>{unit}</MenuItem>
                        ))}
                    </Select>
                    <TextField label="Calculation" variant="outlined" value={this.props.calculatedQuantity}
                        inputProps={{readOnly: true, disabled: true}} />
                    <Select defaultValue={0} autoWidth onChange={(event) => this.props.unitChangeHandler(this.props.id, 2, (parseInt(event.target.value)) || 0)}>
                        {this.state.units.map((unit, index) => (
                            <MenuItem key={index} value={index}>{unit}</MenuItem>
                        ))}
                    </Select>
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
    deleteHandler: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    unitChangeHandler: PropTypes.func.isRequired,
    quantityChangeHandler: PropTypes.func.isRequired,
};

export default IngredientListItem;
