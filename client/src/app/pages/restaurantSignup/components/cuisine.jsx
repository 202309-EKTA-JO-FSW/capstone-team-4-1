import React, { useState } from 'react';
import { TextField, Chip, InputAdornment, ThemeProvider, createTheme, Stack } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFC245',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFC245',
          },
          backgroundColor: '#FAFAFA',
        },
        input: {
          '&:focus': {
            color: 'black',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#FFC245',
          },
        },
      },
    },
  },
});

function CuisineInput({ cuisines, setCuisines, label }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      setCuisines([...cuisines, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteCuisine = (indexToDelete) => {
    setCuisines(cuisines.filter((_, index) => index !== indexToDelete));
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <label htmlFor="cuisine" className="block text-left mt-4">
          Cuisine<span className="text-red-900"> *</span>:
        </label>
        <Stack direction="column" spacing={1}>
          {cuisines.map((cuisine, index) => (
            <Chip
              key={index}
              label={cuisine}
              onDelete={() => handleDeleteCuisine(index)}
              style={{ margin: '2px' }}
            />
          ))}
          <TextField
            id="cuisine"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="E.g., Italian, Sushi"
            fullWidth
            InputProps={{
              startAdornment: cuisines.length > 0 ? <InputAdornment position="start"></InputAdornment> : null,
            }}
          />
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default CuisineInput;
