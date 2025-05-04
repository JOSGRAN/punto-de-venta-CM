import { useState } from 'react';
import { Box, RadioGroup, Radio, FormControlLabel, Typography } from '@mui/material';
import PersonaNaturalForm from './PersonaNaturalForm';
import EmpresaForm from './EmpresaForm';

const ClienteForm = () => {
  const [tipoCliente, setTipoCliente] = useState('persona');

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Tipo de Cliente
      </Typography>
      
      <RadioGroup 
        value={tipoCliente} 
        onChange={(e) => setTipoCliente(e.target.value)}
        row
      >
        <FormControlLabel 
          value="persona" 
          control={<Radio />} 
          label="Persona Natural" 
        />
        <FormControlLabel 
          value="empresa" 
          control={<Radio />} 
          label="Empresa (Razón Social)" 
        />
      </RadioGroup>

      {tipoCliente === 'persona' ? <PersonaNaturalForm /> : <EmpresaForm />}
    </Box>
  );
};

export default ClienteForm;