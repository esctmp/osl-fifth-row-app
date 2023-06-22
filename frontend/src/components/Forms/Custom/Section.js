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

export const SectionHeader = ({ section, text }) =>
    <>
        <Typography variant="h4" sx={{ textDecoration: 'underline', textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
            {section + '. ' + text}
        </Typography>
    </>

export const SectionBody = ({ text }) =>
    <>
        <Typography sx={{ fontWeight: 'bold', mb: 3 }}>
            {text}
        </Typography>
    </>
