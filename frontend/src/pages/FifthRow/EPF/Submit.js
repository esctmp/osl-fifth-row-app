import React from "react";
import { Input, createStyles } from '@material-ui/core';
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
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  MenuItem,
} from "@material-ui/core";

const FormHeader = () =>
  <>
    <Box
      sx={{
        padding: "15px 30px",
      }}
      display="flex"
      alignItems="center"
    >
      <Box flexGrow={1}>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          EPF
        </Typography>
      </Box>
    </Box>
    <Divider />
  </>;

const SectionA = () =>
  <>
    <Typography variant="h4" sx={{ textDecoration: 'underline', textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
      A. Project Director's Particulars
    </Typography>
    <Typography sx={{ fontWeight: 'bold', mb: 3 }}>
      The project director will be the main point of contact for SG Events and Office of Student Life.
    </Typography>
    <Grid container spacing={2} sx={{ mb: 5 }}>
      <Grid item lg={6} md={6}>
        <TextField
          id="A-name"
          label="Name"
          fullWidth
        />
      </Grid>
      <Grid item lg={6} md={6}>
        <TextField
          id="A-student-id"
          label="Student ID"
          fullWidth
        />
      </Grid>
      <Grid item lg={6} md={6}>
        <TextField
          id="A-organisation"
          label="Organisation"
          fullWidth
        />
      </Grid>
      <Grid item lg={6} md={6}>
        <TextField
          id="A-contact-no"
          label="Contact No."
          fullWidth
        />
      </Grid>
      <Grid item lg={12} md={12}>
        <TextField
          id="A-email"
          label="Email"
          fullWidth
        />
      </Grid>
    </Grid>
  </>;


const SectionB = () =>
  <>
    <Typography variant="h4" sx={{ textDecoration: 'underline', textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
      B. Event Details
    </Typography>
    <Grid container spacing={2} sx={{ mb: 5 }}>
      <Grid item lg={6} md={6}>
        <TextField
          id="B-event-name"
          label="Event Name"
          fullWidth
        />
      </Grid>
      <Grid item lg={6} md={6}>
        <TextField
          id="B-target-audience"
          label="Target Audience"
          fullWidth
        />
      </Grid>
      <Grid item lg={6} md={6}>
        <TextField
          id="B-event-schedule"
          label="Event Schedule"
          fullWidth
        />
      </Grid>
      <Grid item lg={6} md={6}>
        <TextField
          id="B-expected-turnout"
          label="Expected Turnout"
          fullWidth
        />
      </Grid>
      <Grid item lg={12} md={12}>
        <TextField
          id="B-event-objective"
          label="Event Objective"
          fullWidth
          multiline
          minRows={3}
        />
      </Grid>
    </Grid>
  </>;

const TableColHeaders = ({ colNames, colConfig }) =>
  <>
    {colNames.map((colName, j) =>
      <Grid item display="flex" lg={colConfig[j]} md={colConfig[j]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
      <Box display="flex" width="100%" alignItems="center" justifyContent="center" sx={{ backgroundColor: 'black', padding: "8px"}}>
        <Typography align="center" sx={{fontWeight: 'bold', color: 'white'}}>
          {colName}
        </Typography>
      </Box>
    </Grid>
    )}
  </>

const SectionC = () => {
  let colNames = ['', 'Date', 'Time', 'Activity and Description', 'Venue'];
  let colConfig = [2, 2, 2, 4, 2];
  let rowNames = ['Pre-event', 'Event', 'Post-event'];
  return (
    <>
      <Typography variant="h4" sx={{ textDecoration: 'underline', textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
        C. Programme Schedule
      </Typography>
      <Typography sx={{ fontWeight: 'bold', mb: 3 }}>
        Please include all the necessary details about each activity and other necessary details such as wet weather plan. The project director is incharge of ensuring the plan is followed.
      </Typography>
      <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5,  border: '1px solid', borderColor: '#B9B9B9' }} >
        <TableColHeaders colNames={colNames} colConfig={colConfig} />
        {rowNames.map((rowName, i) => 
          <>
          {colNames.map((_, j) =>
            <>
            {j == 0 
            ? 
            <Grid item display="flex" lg={colConfig[j]} md={colConfig[j]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
              <Box display="flex" width="100%" alignItems="center" justifyContent="center" sx={{ padding: "8px"}}>
                <Typography align="center" sx={{fontWeight: 'bold'}}> 
                  {rowName}
                </Typography>
              </Box>
            </Grid>
            : 
            <Grid item alg={colConfig[j]} md={colConfig[j]} sx={{  border: '1px solid', borderColor: '#B9B9B9' }}>
                <Input
                  id="B-event-objective"
                  label="Event Objective"
                  fullWidth
                  multiline
                  minRows={3}
                  disableUnderline='true'
                  sx={{padding: "8px"}}
                />
            </Grid>
            }
            </>
          )}
          </>
        )}

      </Grid>
    </>
  );
};

const FormComments = () =>
  <>
  </>;

const EPFSubmit = () => {

  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        <div>
          <Card
            variant="outlined"
            sx={{
              p: 0,
            }}
          >
            <FormHeader />
            <Grid container spacing={0}>
              <Grid item lg={9} md={9}>
                <CardContent
                  sx={{
                    padding: "30px",
                  }}
                >
                  <form>
                    <SectionA />
                    <SectionB />
                    <SectionC />
                  </form>
                </CardContent>
              </Grid>
              <Grid item lg={3} md={3}>
                <FormComments />
              </Grid>
            </Grid>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default EPFSubmit;