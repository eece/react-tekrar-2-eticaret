// context/SnackbarContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({
    message: '',
    severity: 'success', // 'success' | 'error' | 'warning' | 'info'
    duration: 4000,
  });

  const hideSnackbar = useCallback((event, reason) => {
    // Kullanıcı dışarıya tıkladığında kapanmasını istemiyorsanız 'clickaway'i engelleyebilirsiniz
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }, []);

  const showSnackbar = useCallback(({ message, severity = 'success', duration = 4000 }) => {
    setSnackbarConfig({ message, severity, duration });
    setOpen(true);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={snackbarConfig.duration}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Bildirimin konumu
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbarConfig.severity}
          variant="filled" // "filled" (tam renkli) veya "standard" (açık arkaplan)
          sx={{ width: '100%' }}
        >
          {snackbarConfig.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar, SnackbarProvider içinde kullanılmalıdır.');
  }
  return context;
};