import React from "react";
import { useState } from 'react';
import {
    Card,
    CardContent,
    Container,
    Divider,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Input,
    Button,
    Grid,
    RadioGroup,
    Radio,
    FormControl,
    Stack,
    MenuItem,
} from "@material-ui/core";

export const FormInputField = ({ section, name }) => {
    const nameProcessed = name.toLowerCase().replace(' ', '_');
    return (
            <TextField
                id={section + '_' + nameProcessed}
                label={name}
                fullWidth
            />
    );
}