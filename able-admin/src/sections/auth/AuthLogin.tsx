import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// saját hookunk
import useAuth from 'hooks/useAuth';

interface AuthLoginProps {
  forgot?: string;
}

export default function AuthLogin({ forgot }: AuthLoginProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@vacinkse.test'); // fejlesztéshez kényelmi default
  const [password, setPassword] = useState('Jelszo123');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const ok = await login(email, password);

    if (!ok) {
      setError('Hibás email vagy jelszó!');
      setSubmitting(false);
      return;
    }

    // sikeres belépés → irány a fő admin (pl. dashboard)
    navigate('/', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <TextField
          label="Email cím"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          autoComplete="email"
        />

        <TextField
          label="Jelszó"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          autoComplete="current-password"
        />

        {/* Ha akarod, használhatod a forgot prop-ot egy „Elfelejtett jelszó?” linkhez */}
        {/* pl. */}
        {/* {forgot && (
          <Button component={Link} to={forgot} variant="text" size="small">
            Elfelejtett jelszó?
          </Button>
        )} */}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={submitting}
        >
          {submitting ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </Button>
      </Stack>
    </form>
  );
}
