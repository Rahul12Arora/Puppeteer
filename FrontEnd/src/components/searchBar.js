import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import DataGridDemo from './dataGrid';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { useState } from 'react';
import HttpService from '../services/httpService';
import DataGridDemo from './datagrid';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root:{
    width: '600px',
    padding: '50px'
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 10,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});

export default function MyButton() {
  const classes = useStyles();

  const [url, setUrl] = useState('');
  const [tableData, setTableData] = useState([]);

  const updateUrl = (e)=>{
    setUrl(e.target.value?.trim())
  }
  const addUrlInfo = async ()=>{
    try{
      const response = await HttpService.addNew(url);
      console.log('tableData is ',response.data)
      setTableData(response.data);
    }
    catch(error){
      console.log(error)
    }
  }
    return (
      <>
          <Grid container spacing={3} className={classes.root}>
            <Grid size="auto">
              <TextField id="outlined-basic" label="Enter website URL" variant="outlined" className={classes.root} onChange={updateUrl}/>
            </Grid>
            <Grid size="auto">
              <Button variant="contained" className={classes.button} onClick={addUrlInfo}>Search and add info</Button>
            </Grid>
          </Grid>
          {/* <Button>
            <Link to="/details">Grocery</Link>
          </Button> */}
        
        <DataGridDemo tableData={tableData}></DataGridDemo>
      </>
    );
  }