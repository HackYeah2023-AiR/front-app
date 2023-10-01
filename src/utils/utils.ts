export async function convertImageToBlob(imageUri) {
  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Error converting image to blob: ', error);
    throw error;
  }
}
