const CLOUD_NAME = 'dn9a686um';

export const getParticipantImageUrl = (imageId: string | undefined) => {
  if (!imageId) return undefined;
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_thumb,g_faces,z_0.9,w_200,h_150,f_auto,q_auto/${imageId}`;
};