import { useState, useEffect, useCallback } from 'react';

export interface MediaPermissionState {
  camera: PermissionState | null;
  microphone: PermissionState | null;
  isSupported: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface MediaStreamResult {
  stream: MediaStream | null;
  error: string | null;
  isLoading: boolean;
}

export function useMediaPermissions() {
  const [permissionState, setPermissionState] = useState<MediaPermissionState>({
    camera: null,
    microphone: null,
    isSupported: false,
    isLoading: true,
    error: null
  });

  const checkPermissions = useCallback(async () => {
    if (!navigator.permissions || !navigator.mediaDevices) {
      setPermissionState(prev => ({
        ...prev,
        isSupported: false,
        isLoading: false,
        error: 'Media devices not supported in this browser'
      }));
      return;
    }

    try {
      setPermissionState(prev => ({ ...prev, isLoading: true, error: null }));

      const [cameraPermission, microphonePermission] = await Promise.all([
        navigator.permissions.query({ name: 'camera' as PermissionName }),
        navigator.permissions.query({ name: 'microphone' as PermissionName })
      ]);

      setPermissionState({
        camera: cameraPermission.state,
        microphone: microphonePermission.state,
        isSupported: true,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('Error checking permissions:', error);
      setPermissionState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to check permissions'
      }));
    }
  }, []);

  const requestMediaStream = useCallback(async (constraints: MediaStreamConstraints = { video: true, audio: true }): Promise<MediaStreamResult> => {
    if (!navigator.mediaDevices) {
      return {
        stream: null,
        error: 'Media devices not supported in this browser',
        isLoading: false
      };
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      return {
        stream,
        error: null,
        isLoading: false
      };
    } catch (err) {
      const error = err as Error;
      let errorMessage = 'Failed to access camera and microphone';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'Camera and microphone access denied. Please allow access and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No camera or microphone found. Please check your devices.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Camera or microphone is already in use by another application.';
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = 'Camera or microphone constraints cannot be satisfied.';
      } else if (error.name === 'SecurityError') {
        errorMessage = 'Camera and microphone access blocked due to security restrictions.';
      }

      return {
        stream: null,
        error: errorMessage,
        isLoading: false
      };
    }
  }, []);

  const getPermissionInstructions = useCallback(() => {
    const { camera, microphone } = permissionState;
    
    if (camera === 'denied' || microphone === 'denied') {
      return {
        title: 'Permission Denied',
        message: 'Camera and microphone access has been denied. To enable:',
        steps: [
          'Click the camera/microphone icon in your browser\'s address bar',
          'Select "Allow" for camera and microphone access',
          'Refresh the page and try again'
        ]
      };
    }
    
    if (camera === 'prompt' || microphone === 'prompt') {
      return {
        title: 'Permission Required',
        message: 'This application needs access to your camera and microphone for the interview.',
        steps: [
          'Click "Start Interview" below',
          'When prompted, click "Allow" for camera and microphone access',
          'If you miss the prompt, look for the camera icon in your browser\'s address bar'
        ]
      };
    }
    
    return null;
  }, [permissionState]);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  return {
    permissionState,
    checkPermissions,
    requestMediaStream,
    getPermissionInstructions
  };
}
