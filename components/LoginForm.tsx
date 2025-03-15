'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Card, CardContent, Typography, Snackbar, Alert } from '@mui/material';
import { login, setError } from '@/lib/store/authSlice';
import { RootState } from '@/lib/store/store';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSubmit = (values: { username: string; password: string }) => {
    // Simulate authentication - Replace with actual API call
    if (values.username === 'admin' && values.password === 'password') {
      dispatch(login({ username: values.username }));
    } else {
      dispatch(setError('Invalid username or password'));
    }
  };

  return (
    <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Login
        </Typography>
        
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="username"
                as={TextField}
                label="Username"
                fullWidth
                margin="normal"
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              
              <Field
                name="password"
                as={TextField}
                type="password"
                label="Password"
                fullWidth
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => dispatch(setError(''))}
      >
        <Alert severity="error" onClose={() => dispatch(setError(''))}>
          {error}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default LoginForm;