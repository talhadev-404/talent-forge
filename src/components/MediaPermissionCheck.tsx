import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useMediaPermissions } from "@/hooks/use-media-permissions";
import { AlertCircle, CheckCircle, RefreshCw, Video, Mic } from "lucide-react";

interface MediaPermissionCheckProps {
  onPermissionGranted?: () => void;
  showSuccess?: boolean;
  className?: string;
}

export function MediaPermissionCheck({ 
  onPermissionGranted, 
  showSuccess = true,
  className = "" 
}: MediaPermissionCheckProps) {
  const { permissionState, getPermissionInstructions, checkPermissions } = useMediaPermissions();
  
  const permissionInstructions = getPermissionInstructions();
  
  // If permissions are granted and callback is provided, call it
  if (permissionState.camera === 'granted' && permissionState.microphone === 'granted' && onPermissionGranted) {
    onPermissionGranted();
  }

  if (permissionState.isLoading) {
    return (
      <Alert className={`border-blue-200 bg-blue-50 ${className}`}>
        <RefreshCw className="h-4 w-4 animate-spin" />
        <AlertDescription>
          Checking camera and microphone permissions...
        </AlertDescription>
      </Alert>
    );
  }

  if (!permissionState.isSupported) {
    return (
      <Alert className={`border-destructive ${className}`}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-medium">Browser Not Supported</p>
            <p>Your browser doesn't support camera and microphone access. Please use a modern browser like Chrome, Firefox, or Edge.</p>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (permissionInstructions) {
    return (
      <Alert className={`${permissionInstructions.title === 'Permission Denied' ? 'border-destructive' : 'border-primary'} ${className}`}>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-medium">{permissionInstructions.title}</p>
            <p>{permissionInstructions.message}</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {permissionInstructions.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
            {permissionInstructions.title === 'Permission Denied' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={checkPermissions}
                className="mt-2"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Check Again
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (showSuccess && permissionState.camera === 'granted' && permissionState.microphone === 'granted') {
    return (
      <Alert className={`border-green-200 bg-green-50 ${className}`}>
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription>
          <div className="flex items-center space-x-2">
            <Video className="w-4 h-4 text-green-600" />
            <Mic className="w-4 h-4 text-green-600" />
            <span className="text-green-800 font-medium">
              Camera and microphone access granted. You're ready to start the interview!
            </span>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
