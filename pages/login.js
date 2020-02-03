import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import * as action from '../redux/actionIndex'

import {useFormik } from 'formik'
import * as Yup from 'yup';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" className="copyright">
      {'Copyright © '}
      <Link color="inherit" href="https://www.bintarojayahighrise.com">
        bintarojayahighrise
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

function SignIn({authenticate}) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
          email:'',
          password:'',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Sorry, that is not a valid email address')
                .required('Cannot be left blank'),
            password: Yup.string()
                .required('Cannot be left blank')
        }),
        onSubmit: (values,{setFieldError,resetForm}) => {
            const data = {
                email: values.email,
                password: values.password,
            }
            setLoading(true)
            authenticate(values.email,values.password).then((res)=>{
              setLoading(false)
            })


        },
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className='avatar'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={formik.errors.email && formik.touched.email ? true : null}
            helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
            onChange={formik.handleChange} value={formik.values.email || ''}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={formik.errors.password && formik.touched.password ? true : null}
            helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
            onChange={formik.handleChange} value={formik.values.password || ''}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className="button_login"
          >
            {loading ? <CircularProgress size={24} className="buttonProgress" /> : ' Sign In'}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
      authenticate: (email,password) => dispatch(action.authenticate(email,password))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)