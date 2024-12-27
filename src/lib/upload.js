const upload = async (file) => {
    try {
      // Convert the file to a Base64 string
      const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
  
      // Save the Base64 string to Local Storage
      const uniqueKey = `image_${Date.now()}`; // Generate a unique key
      localStorage.setItem(uniqueKey, base64String);
  
      // Generate a Blob URL for download
      const blob = await (await fetch(base64String)).blob();
      const blobURL = URL.createObjectURL(blob);
  
      // Append the timestamp to the download URL
      const timestampedURL = `${blobURL}?timestamp=${Date.now()}`;
  
      console.log("Image saved to Local Storage and timestamped URL generated:", timestampedURL);
  
      // Return the timestamped download URL
      return timestampedURL;
    } catch (error) {
      console.error("Error saving image to Local Storage:", error);
      throw error;
    }
  };

export default upload;
  