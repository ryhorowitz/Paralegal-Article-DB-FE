
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material'
import NewspaperIcon from '@mui/icons-material/Newspaper';

function Header() {

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <NewspaperIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
          Paralegal Article Database
        </Typography>
        <Stack direction='row' spacing={2}>
          <Button color='inherit'>Home</Button>
          <Button color='inherit'>Articles</Button>
          <Button color='inherit'>Add Article</Button>
        </Stack>
      </Toolbar>
    </AppBar>

  )
}

export default Header