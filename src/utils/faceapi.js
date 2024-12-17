import * as faceapi from 'face-api.js';

// Load face-api.js models from the 'public/models' directory
export const loadModels = async () => {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';

  try {
    // Load all required models
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    console.log('Face-api models loaded successfully');
  } catch (error) {
    console.error('Error loading models:', error);
  }
};

// Get face descriptor from a video feed
export const getFaceDescriptor = async (videoElement) => {
  const detection = await faceapi
    .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  return detection?.descriptor || null;
};
