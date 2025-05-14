  export const validateCorporationNumber = async (number: string): Promise<string | null> => {
    if (!/^\d{9}$/.test(number)) {
      return 'Corporation number must be exactly 9 digits';
    }
  
    try {
      const response = await fetch(
        `https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${number}`
      );
  
      if (!response.ok) {
        return 'Error validating Corporation Number';
      }
  
      const data = await response.json();
      if (!data.valid) {
        return data.message || 'Invalid Corporation Number';
      }
  
      return null;
    } catch (err) {
      return 'Failed to validate Corporation Number';
    }
  };