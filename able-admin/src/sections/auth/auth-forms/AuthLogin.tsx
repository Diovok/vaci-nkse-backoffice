import { useState, SyntheticEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { preload } from 'swr';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { fetcher } from 'utils/axios';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

export default function AuthLogin({ forgot }: { forgot?: string }) {
  const [checked, setChecked] = useState(false);

  const { login } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((v) => !v);

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        email: '',          // template demo helyett üres
        password: '',
        submit: null as null | string
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Érvényes e-mail kell').max(255).required('E-mail kötelező'),
        password: Yup.string()
          .required('Jelszó kötelező')
          .test(
            'no-leading-trailing-whitespace',
            'A jelszó nem kezdődhet/végződhet szóközzel',
            (value) => (value ?? '') === (value ?? '').trim()
          )
          .max(255, 'Túl hosszú jelszó')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const trimmedEmail = values.email.trim();

          // Nálad a login() boolean-t ad vissza
          const ok = await login(trimmedEmail, values.password);

          if (!scriptedRef.current) return;

          if (!ok) {
            setStatus({ success: false });
            setErrors({ submit: 'Hibás email vagy jelszó.' });
            setSubmitting(false);
            return;
          }

          setStatus({ success: true });
          setSubmitting(false);

          // (opcionális) template preload - ha nálad létezik ez az endpoint
          try {
            preload('api/menu/dashboard', fetcher);
          } catch {
            // ha ez nincs bekötve nálad, nem baj
          }

          // SIKERES LOGIN UTÁN: dashboardra
          navigate('/dashboard', { replace: true });
        } catch (err: any) {
          console.error(err);

          if (!scriptedRef.current) return;

          setStatus({ success: false });

          // ha van backend error message, próbáljuk megmutatni
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            'Ismeretlen hiba történt';

          setErrors({ submit: msg });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="email-login">Email</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
              </Stack>

              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>

            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="password-login">Jelszó</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-login"               // ✅ fix: ne "-password-login" legyen
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Jelszó"
                />
              </Stack>

              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </Grid>

            <Grid sx={{ mt: -1 }} size={12}>
              <Stack direction="row" sx={{ gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => setChecked(event.target.checked)}
                      name="checked"
                      color="primary"
                      size="small"
                    />
                  }
                  label={<Typography variant="h6">Maradjak belépve</Typography>}
                />

                <Link
                  variant="h6"
                  component={RouterLink}
                  to={forgot ?? '/forgot-password'}   // ✅ egyszerű
                  color="text.primary"
                >
                  Elfelejtett jelszó?
                </Link>
              </Stack>
            </Grid>

            {errors.submit && (
              <Grid size={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}

            <Grid size={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Belépés
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
