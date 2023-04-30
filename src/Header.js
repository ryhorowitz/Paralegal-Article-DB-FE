
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import NewspaperIcon from '@mui/icons-material/Newspaper';

function Header() {

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <NewspaperIcon />
        </IconButton>
        <Typography variant='h6' component='div'>
          Paralegal Article Database
        </Typography>
      </Toolbar>
    </AppBar>

  )
}

export default Header