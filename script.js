document.getElementById('start').addEventListener('click', async () => {
    const output = document.getElementById('output');
    output.textContent = 'Waiting for NFC tag...';
  
    try {
      // Check if NFC API is available
      if ('NDEFReader' in window) {
        const ndef = new NDEFReader();
  
        // Start scanning for NFC tags
        await ndef.scan();
        output.textContent = 'NFC reader ready. Bring a tag close to the device.';
  
        ndef.onreading = (event) => {
          const tag = event.message.records[0];
          if (tag.recordType === 'text') {
            const textDecoder = new TextDecoder();
            output.textContent = `NFC Tag Content: ${textDecoder.decode(tag.data)}`;
          } else {
            output.textContent = `Unsupported NFC Tag Type: ${tag.recordType}`;
          }
        };
  
        ndef.onreadingerror = () => {
          output.textContent = 'Failed to read NFC tag. Please try again.';
        };
      } else {
        output.textContent = 'Web NFC API is not supported in your browser.';
      }
    } catch (error) {
      console.error('Error during NFC operation:', error);
      output.textContent = `Error: ${error.message}`;
    }
  });
  