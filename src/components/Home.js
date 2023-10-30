import { Box, Container, Typography } from "@mui/material"
function Home() {
  return (<Container m={5}>
    <Typography mb={2} align="center" variant="h2">
      Welcome
    </Typography>
    <Container m={5}>
      <Typography mx={3} align="left" variant="p">

        <p>This is the Paralegal article Database for G.T. Law's most used articles for court submissions.</p>
        <p>Articles are organized by country. Please click the countries tab above to search by country</p>
        <p>Click the Add Article tab to add an article to this database.</p>
      </Typography>
    </Container>
  </Container>

  )
}

export default Home