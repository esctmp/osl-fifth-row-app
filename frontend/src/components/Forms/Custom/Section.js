import React from "react";
import { useState } from 'react';
import {
    Typography,
} from "@material-ui/core";

export const SectionHeader = ({ text, sx = {} }) =>
    <>
        <Typography variant="h4" sx={{ textDecoration: 'underline', textTransform: 'uppercase', fontWeight: 'bold', mb: 1, ...sx }}>
            {text}
        </Typography>
    </>

export const SectionBody = ({ text, sx = {} }) =>
    <>
        <Typography sx={{ fontWeight: 'bold', mb: 3, ...sx }}>
            {text}
        </Typography>
    </>

export const SectionCommentHeader = ({ text }) =>
    <>
        <Typography sx={{ mb: 1, fontStyle: 'italic' }}>
            {text}
        </Typography>
    </>


export const SectionTableHeader = ({ text, sx = {} }) =>
    <>
        <Typography sx={{ fontWeight: 'bold', mb: 0, ...SVGTextPositioningElement }}>
            {text}
        </Typography>
    </>


export const SectionTableDescription = ({ text, sx = {} }) =>
    <>
        <Typography sx={{ fontStyle: 'italic', mb: 0, ...SVGTextPositioningElement }}>
            {text}
        </Typography>
    </>