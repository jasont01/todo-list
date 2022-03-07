import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import LoginForm from '../components/LoginForm'
import Spinner from '../components/Spinner'

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
          backgroundImage:
            'url(https://jasont01.github.io/todo-list/static/media/notebook.71c49dd3.jpg)',
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <LoginForm />
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
}

export default Login
