import { Stack, ListItem, TextField, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function IngredientListItem(props) {
    return <ListItem disableGutters>
        <Stack direction="row" spacing={2}>
            <TextField label="Item Name" variant="outlined" fullWidth autoComplete="off" />
            <TextField label="Quantity" variant="outlined" autoComplete="off" type={"number"} />
            <Button onClick={props.deleteHandler}>
                <DeleteIcon color="action" fontSize="large"/>
            </Button>
        </Stack>
    </ListItem>
}

export default IngredientListItem;