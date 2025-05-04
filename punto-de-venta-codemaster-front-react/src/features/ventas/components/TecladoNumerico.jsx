import { Grid, Button, TextField, Paper, Typography, Box } from '@mui/material';
import { AttachMoney, Backspace, CheckCircle } from '@mui/icons-material';
import { useState } from 'react';
export const TecladoNumerico = ({ onAddToCurrent, onFinalizarVenta, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'delete') {
      setInputValue(prev => prev.slice(0, -1));
    } else if (value === 'clear') {
      setInputValue('');
    } else {
      setInputValue(prev => prev + value);
    }
  };

  return (
    <Box>
      <TextField
        label="Cantidad/Valor"
        variant="outlined"
        fullWidth
        value={inputValue}
        InputProps={{
          startAdornment: <AttachMoney color="action" />,
        }}
        sx={{ mb: 2 }}
      />

      <Grid container spacing={1}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '00'].map((num) => (
          <Grid item xs={4} key={num}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => handleButtonClick(num.toString())}
            >
              {num}
            </Button>
          </Grid>
        ))}

        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<Backspace />}
            onClick={() => handleButtonClick('delete')}
          >
            Borrar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            color="warning"
            onClick={() => handleButtonClick('clear')}
          >
            Limpiar
          </Button>
        </Grid>

        <Grid item xs={12} sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            size="large"
            startIcon={<CheckCircle />}
            onClick={() => {
              onAddToCurrent(inputValue);
              setInputValue('');
            }}
            disabled={disabled}
          >
            Finalizar Venta
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};