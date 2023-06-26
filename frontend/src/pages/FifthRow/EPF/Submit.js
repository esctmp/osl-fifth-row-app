import React, { useState, useEffect } from 'react';
import { FormHeader, SectionHeader, SectionBody, SectionCommentHeader, TableHeader, TableDescription, TableColHeaders, TableRowName, TableAddRow, TableDeleteRow, convertFieldsToJSON, convertJSONToFields, loadFormData } from "../../../components/Forms/Custom";
import { Card, CardContent, Container, Divider, Box, Typography, TextField, FormControlLabel, Checkbox, Input, Button, Grid, RadioGroup, Radio, FormControl, Stack, MenuItem, FormGroup, } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

// TODO modularize components
// TODO add grid lg mb ..
// TODO add plus minus field to table D11 and D2
// TODO redo plus minius field UI
// TODO add form field ids

// const SectionD = () => {
//   return (
//     <>
//       <Typography variant="h4" sx={{ textDecoration: 'underline', textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
//         D. Project Finances
//       </Typography>
//       <Typography sx={{ fontWeight: 'bold' }}>
//         D.1 Budget: Please indicate the sources of funding for your event.
//       </Typography>
//       <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
//         <TableColHeaders colNames={['Source', 'Amount ($)']} colConfig={[6, 6]} />
//         <TableColHeaders colNames={["A: Existing Funds"]} colConfig={[12]} />
//         <TableRow sectionName="D1" rowIdx={1} rowName="Club Income Fund" colConfig={[6, 6]} />
//         <TableRow sectionName="D1" rowIdx={2} rowName="OSL Seed Fund" colConfig={[6, 6]} />
//         <TableRow sectionName="D1" rowIdx={3} rowName="Donation" colConfig={[6, 6]} />
//         <TableColHeaders colNames={["B: Estimated Funds Raised From This Event"]} colConfig={[12]} />
//         <TableRow sectionName="D1" rowIdx={4} rowName="Revenue from Sales of Goods and Services (Please complete table D.1.1)" colConfig={[6, 6]} />
//         <TableRow sectionName="D1" rowIdx={5} rowName="Donation or Scholarship" colConfig={[6, 6]} />
//         <TableRow sectionName="D1" rowIdx={6} rowName="Total Source of Funds" colConfig={[6, 6]} />
//       </Grid>
//       <Typography sx={{ fontWeight: 'bold' }}>
//         Table D.1.1
//       </Typography>
//       <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
//         <TableColHeaders colNames={['Item/Goods/Services', 'Price ($)', 'Quantity', 'Amount ($)']} colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="D1.1" rowIdx={1} rowName="" colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="D1.1" rowIdx={2} rowName="" colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="D1.1" rowIdx={3} rowName="Total Revenue" colConfig={[6, 6]} rowMinHeight={1} />
//       </Grid>
//       <Typography sx={{ fontWeight: 'bold' }}>
//         D.2. Expenditure
//       </Typography>
//       <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
//         <TableColHeaders colNames={['Item', 'Reason for Purchase', 'Venue']} colConfig={[4, 4, 4]} />
//         <TableRow sectionName="D2" rowIdx={1} rowName="" colConfig={[4, 4, 4]} />
//         <TableRow sectionName="D2" rowIdx={2} rowName="" colConfig={[4, 4, 4]} />
//         <TableRow sectionName="D2" rowIdx={3} rowName="Total Expenditure" colConfig={[6, 6]} rowMinHeight={1} />
//       </Grid>
//     </>
//   );
// };


// const SectionE = () => {
//   return (
//     <>
//       <Typography variant="h4" sx={{ textDecoration: 'underline', textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
//         E. Personal data protection declaration*
//       </Typography>
//       <Typography sx={{ fontWeight: 'bold', mb: 3 }}>
//         Personal data refers to data, whether true or not, about an individual who can be identified from that data; or from that data and other information to which SUTD has or is likely to have access. These include:
//         <br></br>1. Unique identifiers: NRIC Numbers, passport numbers, student IDs.
//         <br></br>2. Any set of data (e.g. name, age, address, telephone number, occupation, etc), which when taken together would be able to identify the individual.
//         <br></br>3. Image of an identifiable individual (whether in photographs or videos).
//       </Typography>
//       <Typography sx={{ fontWeight: 'bold', color: 'red' }}>
//         Are you collecting personal data? Please tick accordingly.
//       </Typography>

//       <FormControl component="fieldset" sx={{ mb: 3 }}>
//         <RadioGroup
//           name="personal-data-collection"
//         >
//           <FormControlLabel
//             value="radio1"
//             control={<Radio />}
//             sx={{ mb: -1 }}
//             label="Yes. Please complete the Microsoft Form: https://forms.office.com/r/RzNvq976m9."
//           />
//           <FormControlLabel
//             value="radio2"
//             control={<Radio />}
//             label="No"
//           />
//         </RadioGroup>
//       </FormControl>
//       <Typography sx={{ fontWeight: 'bold', mb: 3 }}>
//         By submitting this form, the project director agrees to abide by the personal data protection clauses as stated below.
//         <br></br>1. All the personal data processed** for the event are for the purposes of communications and facilitating participation in the event. The information shall not be released to any other 3rd party or person (i.e sponsors/donors) other than the organizing committee and relevant persons facilitating the event, without prior approval from OSL. The information collated cannot be used for any other purpose other than for the event itself and will be disposed appropriately upon the completion of event.
//         <br></br>2. The personal information collected will be deleted one month after the event, or at the date as per declaration to OSL.
//         <br></br>3. The above obligations will be communicated to the participants in the consent clause, prior to or at the point of data collection (i.e. the prescribed clause as reflected on the Microsoft Form).
//         <br></br>4. Data platforms used for the collection of the data would be kept secure, private and accessible to only authorized persons.
//         <br></br>5. The event team will not collect any excessive personal data from the participants other than ones necessary for the event.
//         <br></br>6. Under no circumstances, the collected personal data is to be transferred overseas to any external parties abroad unless clearance is first sought from OSL.
//       </Typography>
//       <Typography sx={{ fontWeight: 'bold', mb: 3 }}>
//         **The Personal Data Protection Act (PDPA) defines ‘processing’ as ‘the carrying out of any operation or set of operations in relation to the personal data, and it includes recording, holding and transmission’ (non-exhaustive list of operations which forms part of collection, use or disclosure).
//       </Typography>
//     </>
//   );
// };



// const SectionF = () => {
//   const [numRows, setNumRows] = useState(1);
//   return (
//     <>
//       <Typography variant="h4" sx={{ textDecoration: 'underline', textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
//         F. Organising Committee Members
//       </Typography>
//       <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
//         <TableColHeaders colNames={['Name', 'Student ID', 'Position']} colConfig={[4, 4, 4]} />
//         {[...Array(numRows)].map(idx =>
//           <TableRow sectionName="F" rowIdx={idx + 1} rowName="" colConfig={[4, 4, 4]} rowMinHeight={2} />
//         )}
//         <TableDeleteRow onClickFunction={(e) => { setNumRows(numRows - 1); }} />
//         <TableAddRow onClickFunction={(e) => { setNumRows(numRows + 1); }} />
//       </Grid>
//     </>
//   );
// };

// const SectionG = () => {
//   return (
//     <>
//       <Typography variant="h4" sx={{ textDecoration: 'underline', textTransform: 'uppercase', fontWeight: 'bold', mb: 1 }}>
//         G. Risk Assessment
//       </Typography>
//       <Typography sx={{ fontWeight: 'bold', mb: 3 }}>
//         (i) Please complete Annex A Integrated Form for Risk Assessment on Work Activities for physical/physiological risks e.g. sports/trauma injuries, trip/fall hazards, poor lighting, dangerous/faulty equipment, stampede/crushing risks, hearing damage, fatigue, food poisoning, infectious diseases etc. and submit together with this Event Proposal Form.
//         <br></br>(ii) Please also complete the following table for all other types of risks. Where no risk has been identified for any category listed below, indicate a “NIL” in the column under Potential Hazard for that risk category.
//       </Typography>
//       <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
//         <TableColHeaders colNames={[
//           'Areas for Safety Consideration',
//           <>Potential Hazard<br></br><div style={{ fontWeight: 'normal' }}><i>What could go wrong?<br></br>List in point form</i></div></>,
//           <>Measures to Address Hazard<br></br><div style={{ fontWeight: 'normal' }}><i>What is your plan to prevent it from happening, or to reduce the potential damage? List in point form</i></div></>,
//           <>Person-in-charge<br></br><div style={{ fontWeight: 'normal' }}><i>Who will implement the plan?<br></br>List in point form</i></div></>
//         ]} colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="G" rowNameAlign='left' rowIdx={1} rowName={<>Social/Emotional<br></br><div style={{ fontWeight: 'normal' }}>e.g. hazing, bullying, emotional or physical harassment, sexual harassment, insensitive jokes, disrespecting other cultures, races or religions</div></>} colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="G" rowNameAlign='left' rowIdx={2} rowName={<>Political Agenda<br></br><div style={{ fontWeight: 'normal' }}>e.g. the event will evoke or promote a political agenda that is sensitive to different groups in the community and society at large, and/or endanger harmonious relations between different groups in the community</div></>} colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="G" rowNameAlign='left' rowIdx={3} rowName={<>Environment<br></br><div style={{ fontWeight: 'normal' }}>e.g. fire, damage to facilities/venues, electricity trip, water/food wastage, excessive use of non-renewable resources, poor air quality etc.</div></>} colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="G" rowNameAlign='left' rowIdx={4} rowName={<>Reputational<br></br><div style={{ fontWeight: 'normal' }}>e.g. being viewed as public nuisance, disturbance of public peace , misrepresentation of SUTD, misleading marketing content, poor management of social media campaigns etc.</div></>} colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="G" rowNameAlign='left' rowIdx={5} rowName={<>Financial<br></br><div style={{ fontWeight: 'normal' }}>e.g. losses for events, incurring of legal/compensation fees, failure to collect payment owed to SUTD, unexpected travel/medical expenses etc.</div></>} colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="G" rowNameAlign='left' rowIdx={6} rowName={<>Legal<br></br><div style={{ fontWeight: 'normal' }}>e.g. being sued for personal data leaks, infringement of copyrights, any illegal or unlawful actions, negligence resulting in injuries/damages/losses etc.</div></>} colConfig={[3, 3, 3, 3]} />
//         <TableRow sectionName="G" rowNameAlign='left' rowIdx={7} rowName={<>List all Other Risks not listed in this table and not already identified in Annex A.<br></br><div style={{ fontWeight: 'normal' }}>This may include potential infringements of any University policies, core values and applicable regulations governing the organization and execution of an event. </div></>} colConfig={[3, 3, 3, 3]} />
//       </Grid>
//     </>
//   );
// };

const draftButtonStyle = {
  "&.MuiButton-contained": {
    backgroundColor: "#B9B9B9"
  },
  "&:active": {
    backgroundColor: '#818181'
  },
  "&:hover": {
    backgroundColor: '#818181'
  }
};


// MODES = ["NEW", "DRAFT", "REVIEW", "COMMENT"];
// LOAD EXISTING FORM DATA IF MODE ISN'T "NEW"
// DISABLE INPUT FIELDS IF MODE IS REVIEW
// ENABLE COMMENTS IF MODE IS COMMENT

const MODES = {
  "NEW": { enableInputs: true, loadForm: false, showComments: false, enableComments: false },
  "DRAFT": { enableInputs: true, loadForm: true, showComments: false, enableComments: false },
  "REVIEW": { enableInputs: true, loadForm: true, showComments: true, enableComments: false },
  "COMMENT": { enableInputs: false, loadForm: true, showComments: true, enableComments: true },
}

const makeNameFancy = (name) => name.split('_').slice(1,).map((word) =>
  word[0].toUpperCase() + word.substring(1)
).join(" ");

const MODE = "REVIEW";
const settings = MODES[MODE];
var values = (settings.loadForm) ? loadFormData() : {};

const EPFSubmit = () => {
  const getNumRows = (names) => settings.loadForm ? Object.keys(values).filter(name => name.includes(names[0])).length : 1;
  const { getValues, handleSubmit, reset, control, unregister } = useForm({defaultValues: values});

  // DEFINE COMPONENTS 
  const onSubmit = (data) => {
    data = convertFieldsToJSON(data);
    console.log("SUBMIT: ", data);
  }

  const unregisterRow = (names, idx) => {
    names.map(name => unregister(`${name}_elem_${idx}`));
    values = getValues();
  }

  const FormTextField = ({ name, multiline = false }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id={name}
            label={makeNameFancy(name)}
            onChange={onChange}
            value={value}
            multiline={multiline}
            disabled={!settings.enableInputs}
            fullWidth
          />
        )}
      />
    );
  };

  const FormDateTimeField = ({ name, multiline = false }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id={name}
            label={makeNameFancy(name)}
            onChange={onChange}
            type="datetime-local"
            value={value}
            multiline={multiline}
            disabled={!settings.enableInputs}
            fullWidth
          />
        )}
      />
    );
  };

  const FormCommentField = ({ name }) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <SectionCommentHeader text={"Comments for section " + name.split('_')[0]} />
            <TextField
              sx={{ backgroundColor: "#ffffe1" }}
              id={name}
              onChange={onChange}
              value={value}
              disabled={!settings.enableComments}
              multiline
              minRows={3}
              fullWidth
            />
          </>
        )}
      />
    );
  };

  const TableTextField = ({ name, idx, minRows=3 }) => {
    const tmpName = `${name}_elem_${idx}`;
    return (
      <Controller
        name={tmpName}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            id={`${tmpName}`}
            fullWidth
            multiline
            minRows={minRows}
            disableUnderline='true'
            onChange={onChange}
            value={value}
            disabled={!settings.enableInputs}
            sx={{ padding: "8px" }}
          />
        )}
      />
    );
  };

  const TableRow = ({ rowName, idx, names, colConfig, rowMinHeight, rowNameAlign }) =>
    <>
      <Grid item display="flex" xs={colConfig[0]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
        <TableRowName rowName={rowName} />
      </Grid>
      {names.map((name, j) =>
        <Grid item xs={colConfig[j + 1]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
          <TableTextField name={name} idx={idx} />
        </Grid>
      )}
    </>

  const TableRowNoName = ({ idx, names, colConfig, rowMinHeight, rowNameAlign }) =>
    <>
      {names.map((name, j) =>
        <>
          <Grid item xs={colConfig[j]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
            <TableTextField name={name} idx={idx} />
          </Grid>
        </>
      )}
    </>

  // DEFINE SECTIONS
  const SectionA = () => {
    return (
      <>
        <SectionHeader text="A. Project Director's Particulars" />
        <Grid container spacing={6} >
          <Grid item xs={9}>
            <SectionBody text="The project director will be the main point of contact for SG Events and Office of Student Life." />
            <Grid container spacing={2} sx={{ mb: 5 }}>
              <Grid item xs={6}><FormTextField name="A_name" /></Grid>
              <Grid item xs={6}><FormTextField name="A_student_id" /></Grid>
              <Grid item xs={6}><FormTextField name="A_organisation" /></Grid>
              <Grid item xs={6}><FormTextField name="A_contact_number" /></Grid>
              <Grid item xs={12}><FormTextField name="A_email" /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} >
            {settings.showComments
              ? <FormCommentField name="A_comments" />
              : <></>
            }
          </Grid>
        </Grid>
      </>
    );
  };

  const SectionB = () => {
    return (
      <>
        <SectionHeader text="B. Event Details" sx={{ mb: 3 }} />
        <Grid container spacing={6} >
          <Grid item xs={9}>
            <Grid container spacing={2} sx={{ mb: 5 }}>
              <Grid item xs={6}><FormTextField name="B_event_name" /></Grid>
              <Grid item xs={6}><FormTextField name="B_target_audience" /></Grid>
              <Grid item xs={6}><FormDateTimeField name="B_event_schedule" /></Grid>
              <Grid item xs={6}><FormTextField name="B_expected_turnout" /></Grid>
              <Grid item xs={12}><FormTextField name="B_event_objective" multiline={true} /></Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} >
            {settings.showComments
              ? <FormCommentField name="B_comments" />
              : <></>
            }
          </Grid>
        </Grid>
      </>
    );
  };


  const SectionC = () => {
    const tableSettings1 = {
      names: ['C1_date', 'C1_time', 'C1_activity_and_description', 'C1_venue'],
      colConfig: [3, 2, 4, 3],
      colNames: ['Date', 'Time', 'Activity and Description', 'Venue']
    }
    const [numRows1, setNumRows1] = useState(getNumRows(tableSettings1.names));
    const [numRows2, setNumRows2] = useState(1);
    const [numRows3_1, setNumRows3_1] = useState(1);
    const [numRows3_2, setNumRows3_2] = useState(1);
    return (
      <>
        <SectionHeader text="C. Programme Schedule" />
        <SectionBody text="Please include all the necessary details about each activity and other necessary details such as wet weather plan. The project director is incharge of ensuring the plan is followed." />

        <TableHeader text="C.1 Pre-Event" />
        <TableDescription text="Include details regarding your pre-event set up." />
        <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
          <TableColHeaders {...tableSettings1}/>
          {[...Array(numRows1).keys()].map(idx =>
            <TableRowNoName idx={idx} {...tableSettings1} />
          )}
          <TableDeleteRow onClickFunction={(e) => { unregisterRow(tableSettings1.names, numRows1 - 1); setNumRows1(numRows1 - 1); console.log(numRows1)}} />
          <TableAddRow onClickFunction={(e) => { setNumRows1(numRows1 + 1); }} />
        </Grid>
        {/* 
        <Typography sx={{ fontWeight: 'bold' }}>
          C.2 Event
          <br></br><div style={{ fontWeight: 'normal' }}><i>Include details regarding your event and description of each activity.</i></div>
        </Typography>
        <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
          <TableColHeaders colNames={['Date', 'Time', 'Activity and Description', 'Venue']} colConfig={[3, 2, 4, 3]} />
          {[...Array(numRows2)].map(idx =>
            <TableRow sectionName="C2" rowIdx={idx + 1} rowName="" colConfig={[3, 2, 4, 3]} />
          )}
          <TableDeleteRow onClickFunction={(e) => { setNumRows2(numRows2 - 1); }} />
          <TableAddRow onClickFunction={(e) => { setNumRows2(numRows2 + 1); }} />
        </Grid>
        <Typography sx={{ fontWeight: 'bold' }}>
          C.3 Post-Event
          <br></br><div style={{ fontWeight: 'normal' }}><i>Include details regarding your post event clean up, management of resources and waste and excess food. </i></div>
        </Typography>
        <Grid container alignItems="stretch" spacing={0} sx={{ mb: 5, border: '1px solid', borderColor: '#B9B9B9' }} >
          <TableColHeaders colNames={['Date', 'Time', 'Activity and Description', 'Venue']} colConfig={[3, 2, 4, 3]} />
          {[...Array(numRows3_1)].map(idx =>
            <TableRow sectionName="C3" rowIdx={idx + 1} rowName="" colConfig={[3, 2, 4, 3]} />
          )}
          <TableDeleteRow onClickFunction={(e) => { setNumRows3_1(numRows3_1 - 1); }} />
          <TableAddRow onClickFunction={(e) => { setNumRows3_1(numRows3_1 + 1); }} />
          <TableColHeaders colNames={['Clean up']} colConfig={[12]} />
          {[...Array(numRows3_2)].map(idx =>
            <TableRow sectionName="C3" rowIdx={idx + 1} rowName="" colConfig={[3, 2, 4, 3]} />
          )}
          <TableDeleteRow onClickFunction={(e) => { setNumRows3_2(numRows3_2 - 1); }} />
          <TableAddRow onClickFunction={(e) => { setNumRows3_2(numRows3_2 + 1); }} /> 
      </Grid >*/}
      </>
    );
  };

  // RENDERING
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
            <FormHeader text="Event Proposal Form" />
            <Grid container spacing={0}>
              <Grid item lg={12} md={12}>
                <CardContent
                  sx={{
                    padding: "30px",
                  }}
                >
                  <form>
                    <FormGroup>
                      <SectionA />
                      <SectionB />
                      <SectionC />
                      {/* <SectionD />
                      <SectionE />
                      <SectionF />
                      <SectionG /> */}
                      <Stack spacing={2} direction="row" justifyContent="center">
                        <Button style={{ width: 120, height: 40 }} variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                        <Button style={{ width: 120, height: 40 }} sx={draftButtonStyle} variant="contained">Save draft</Button>
                      </Stack>
                    </FormGroup>
                  </form>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </div>
      </Grid>
    </Grid>
  );
};

export default EPFSubmit;