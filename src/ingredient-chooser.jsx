import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Fragment, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AddNewIngredients, GetIngredients, GetDishes } from './query.graphql';


export default function IngredientChooser(props) {
    const [addNewIngredients] = useMutation(AddNewIngredients, {
        refetchQueries: [
            GetIngredients,
            GetDishes
        ]
    });
    const value = props.options.find(element => element.name === props.ingredientName) || "";
    const categories = Array.from(props.options.reduce((set, ingredient) => set.add(ingredient.category), new Set()));
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogValue, setDialogValue] = useState({
        name: '',
        category: '',
    });

    const updateValue = (newValue) => props.onChange(props.index, newValue);
    const handleDialogSubmit = async () => {
        await addNewIngredients({
            variables: {
                ingredients: [
                    {
                        name: dialogValue.name,
                        category: dialogValue.category,
                    }
                ]
            }
        });
        updateValue(dialogValue);
        setOpenDialog(false);
    };

    return (
        <Fragment>
            <Autocomplete
                value={value}
                sx={{ display: 'inline-block', width: '60%' }}
                onChange={(_event, newValue) => {
                    if (!newValue) {
                        updateValue({
                            name: "",
                            category: ""
                        });
                        return;
                    }
                    if (typeof newValue === 'string') {
                        let matched = props.options.find(element => element.name === newValue);
                        if (matched) {
                            updateValue(matched);
                        } else {
                            setDialogValue({
                                name: newValue,
                                category: '',
                            });
                            setOpenDialog(true);
                        }
                    } else {
                        updateValue(newValue);
                    }
                }}
                getOptionLabel={(option) => option.name ?? option}
                options={props.options}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
                renderInput={(params) => <TextField {...params} label="??????" margin="dense" />}
            />
            <Dialog open={openDialog} onClose={handleDialogSubmit} fullWidth >
                <DialogTitle>????????????</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ?????????????????????
                    </DialogContentText>
                    <TextField
                        sx={{ width: '60%' }}
                        margin="dense"
                        value={dialogValue.name}
                        onChange={(_event, newValue) =>
                            setDialogValue({
                                ...dialogValue,
                                name: newValue,
                            })
                        }
                        label="??????"
                    />
                    <Autocomplete
                        sx={{ display: 'inline-block', width: '40%' }}
                        options={categories}
                        onChange={(_event, newValue) => {
                            setDialogValue({
                                ...dialogValue,
                                category: newValue,
                            })
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        renderInput={(params) => <TextField {...params} label="??????" margin="dense" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>??????</Button>
                    <Button onClick={handleDialogSubmit}>??????</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}