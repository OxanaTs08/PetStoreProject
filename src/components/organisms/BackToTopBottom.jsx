import { IconButton, Box } from '@mui/material';
import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect } from 'react';

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1 }}>
      {showButton && (
        <IconButton
          sx={{
            color: 'white',
            backgroundColor: 'blue',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default BackToTopButton;
