import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import LoginForm from '../components/LoginForm'
import Spinner from '../components/Spinner'
import Logo from '../components/Logo'

const Login = () => {
  const { isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={{
          backgroundImage: 'url(notebook.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        <Container component='main' maxWidth='sm'>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar variant='square' sx={{ m: 1 }}>
              <Logo size={100} />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <LoginForm />
          </Box>
          <Box m={4}>
            <Typography variant='h5'>Demo Login:</Typography>
            <Box ml={2}>
              <Typography>email: demo@email.com</Typography>
              <Typography>pass: demo</Typography>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
}

export default Login
