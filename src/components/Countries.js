import { useEffect, useState } from "react";
import Table from './Table'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function Countries({ countries, onDeleteArticle, onUpdateArticle }) {
  const [articles, setArticles] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    if (selectedCountry !== '') {
      const country = countries.find(country => country.name === selectedCountry)
      setArticles(country.articles)
    }
  }, [countries, selectedCountry])

  function handleCountrySelection(e) {
    // console.log('e is', e)
    const country = countries.find(country => country.name === e.target.value)
    setSelectedCountry(country.name)
    setArticles(country.articles)
  }

  const countryListItems = countries.map(country => {
    return (
      <MenuItem
        // onClick={() => handleCountrySelection(country.name)}
        key={country.id}
        value={country.name}>
        {country.name}
      </MenuItem>
    )
  })

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ minWidth: 120, maxWidth: 200 }}>
        <InputLabel id="select-label">Select Country</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={selectedCountry}
          label="Select Country"
          onChange={handleCountrySelection}
        >

          {countryListItems}
        </Select>
      </FormControl>
      <Table
        articles={articles}
        onDeleteArticle={onDeleteArticle}
        onUpdateArticle={onUpdateArticle}
        countries={countries} />
    </>
  )
}

export default Countries