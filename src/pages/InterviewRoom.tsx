import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMediaPermissions } from "@/hooks/use-media-permissions";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MessageSquare,
  Users,
  Settings,
  Phone,
  PhoneOff,
  Clock,
  Star,
  FileText,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InterviewRoom = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { permissionState, requestMediaStream, getPermissionInstructions, checkPermissions } = useMediaPermissions();
  
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [notes, setNotes] = useState("");
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false);
  
  // Video refs for camera streams
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Mock interview data
  const interviewData = {
    id: id,
    candidate: "Alex Johnson",
    position: "Senior Frontend Developer", 
    company: "TechCorp",
    interviewer: user?.role === 'candidate' ? "Sarah Wilson" : "Alex Johnson",
    type: "Technical Interview",
    duration: "60 minutes",
    scheduledTime: "10:00 AM - 11:00 AM",
    questions: [
      "Tell me about your experience with React and TypeScript",
      "How would you optimize a slow-loading React application?",
      "Explain the differences between server-side and client-side rendering",
      "Walk me through how you would design a scalable component library"
    ]
  };

  const chatMessages = [
    { id: 1, sender: "Sarah Wilson", message: "Hello! I'll be your interviewer today.", timestamp: "10:00 AM" },
    { id: 2, sender: "Alex Johnson", message: "Hi Sarah! Nice to meet you.", timestamp: "10:01 AM" },
    { id: 3, sender: "Sarah Wilson", message: "Can you hear me clearly?", timestamp: "10:01 AM" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Cleanup media streams on unmount
  useEffect(() => {
    const localVideo = localVideoRef.current;
    const remoteVideo = remoteVideoRef.current;
    return () => {
      if (localVideo?.srcObject) {
        const stream = localVideo.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (remoteVideo?.srcObject) {
        const stream = remoteVideo.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleStartInterview = async () => {
    setIsRequestingPermissions(true);
    
    try {
      const result = await requestMediaStream({ video: true, audio: true });
      
      if (result.error) {
        toast({
          title: "Camera/Microphone Error",
          description: result.error,
          variant: "destructive"
        });
        return;
      }

      if (result.stream && localVideoRef.current) {
        localVideoRef.current.srcObject = result.stream;
        localVideoRef.current.play();
      }

      setInterviewStarted(true);
      setIsRecording(true);
      toast({
        title: "Interview Started",
        description: "Camera and microphone are now active. Recording has begun!"
      });
    } catch (error) {
      console.error('Media access error:', error);
      toast({
        title: "Camera/Microphone Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRequestingPermissions(false);
    }
  };

  const handleEndInterview = () => {
    toast({
      title: "Interview Ended",
      description: "Thank you for your time. The recording has been saved."
    });
    navigate(`/${user?.role}/dashboard`);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => {
        track.enabled = isVideoOn; // Enable when current state is off
      });
    }
    toast({
      title: isVideoOn ? "Camera Off" : "Camera On",
      description: `Video is now ${isVideoOn ? 'disabled' : 'enabled'}`
    });
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (localVideoRef.current?.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => {
        track.enabled = isAudioOn; // Enable when current state is off
      });
    }
    toast({
      title: isAudioOn ? "Microphone Off" : "Microphone On", 
      description: `Audio is now ${isAudioOn ? 'muted' : 'unmuted'}`
    });
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        // You could replace the local video with screen share
        // or display it in a separate area
        setIsScreenSharing(true);
        toast({
          title: "Screen Share Started",
          description: "Your screen is now being shared"
        });
        
        // Handle screen share end
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          toast({
            title: "Screen Share Stopped",
            description: "Screen sharing has ended"
          });
        };
      } else {
        // Stop screen sharing
        setIsScreenSharing(false);
        toast({
          title: "Screen Share Stopped",
          description: "Screen sharing has been disabled"
        });
      }
    } catch (error) {
      console.error('Screen share error:', error);
      toast({
        title: "Screen Share Error",
        description: "Failed to start screen sharing",
        variant: "destructive"
      });
    }
  };

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send the message via WebSocket
      toast({
        title: "Message Sent",
        description: "Your message has been sent to the chat"
      });
      setChatMessage("");
    }
  };

  // Get permission instructions
  const permissionInstructions = getPermissionInstructions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{interviewData.position}</h1>
              <p className="text-sm text-muted-foreground">{interviewData.company}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant={isRecording ? "destructive" : "secondary"}>
              {isRecording ? "Recording" : "Not Recording"}
            </Badge>
            <div className="text-sm text-muted-foreground">
              <Clock className="inline w-4 h-4 mr-1" />
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      {/* Permission Status Alert */}
      {permissionInstructions && !interviewStarted && (
        <div className="px-6 py-4">
          <Alert className={permissionInstructions.title === 'Permission Denied' ? 'border-destructive' : 'border-primary'}>
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
        </div>
      )}

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
              {/* Local Video */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  {isVideoOn ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <VideoOff className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">Camera Off</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    You {!isAudioOn && <MicOff className="inline w-3 h-3 ml-1" />}
                  </div>
                </CardContent>
              </Card>

              {/* Remote Video */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/20">
                <CardContent className="p-0 h-full flex items-center justify-center">
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover bg-gradient-to-br from-secondary/10 to-primary/10"
                    style={{ display: 'none' }} // Hidden until remote stream is available
                  />
                  <div className="w-full h-full bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-2" />
                      <p>{interviewData.interviewer}</p>
                      <p className="text-xs mt-1">Waiting for interviewer...</p>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {interviewData.interviewer}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Screen Share Area */}
            {isScreenSharing && (
              <Card className="h-64">
                <CardHeader>
                  <CardTitle className="text-sm">Screen Share</CardTitle>
                </CardHeader>
                <CardContent className="h-full flex items-center justify-center bg-muted">
                  <div className="text-center text-muted-foreground">
                    <Monitor className="w-12 h-12 mx-auto mb-2" />
                    <p>Screen sharing active</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={isAudioOn ? "secondary" : "destructive"}
                      size="sm"
                      onClick={toggleAudio}
                    >
                      {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      variant={isVideoOn ? "secondary" : "destructive"}
                      size="sm"
                      onClick={toggleVideo}
                    >
                      {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      variant={isScreenSharing ? "secondary" : "outline"}
                      size="sm"
                      onClick={toggleScreenShare}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowChat(!showChat)}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!interviewStarted ? (
                      <Button 
                        onClick={handleStartInterview} 
                        disabled={isRequestingPermissions || !permissionState.isSupported}
                        className="bg-success hover:bg-success/90"
                      >
                        {isRequestingPermissions ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Requesting Access...
                          </>
                        ) : (
                          <>
                            <Phone className="w-4 h-4 mr-2" />
                            Start Interview
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button variant="destructive" onClick={handleEndInterview}>
                        <PhoneOff className="w-4 h-4 mr-2" />
                        End Interview
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Interview Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <p className="font-medium">Position</p>
                  <p className="text-muted-foreground">{interviewData.position}</p>
                </div>
                <div>
                  <p className="font-medium">Type</p>
                  <p className="text-muted-foreground">{interviewData.type}</p>
                </div>
                <div>
                  <p className="font-medium">Duration</p>
                  <p className="text-muted-foreground">{interviewData.duration}</p>
                </div>
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-muted-foreground">{interviewData.scheduledTime}</p>
                </div>
              </CardContent>
            </Card>

            {/* Notes (for interviewers) */}
            {user?.role === 'interviewer' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Interview Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Take notes during the interview..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-32"
                  />
                </CardContent>
              </Card>
            )}

            {/* Questions (for interviewers) */}
            {user?.role === 'interviewer' && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Interview Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {interviewData.questions.map((question, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-sm">
                      <p className="font-medium">Q{index + 1}:</p>
                      <p className="text-muted-foreground">{question}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Chat */}
            {showChat && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Chat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="text-xs">
                        <p className="font-medium">{msg.sender}</p>
                        <p className="text-muted-foreground">{msg.message}</p>
                        <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border rounded"
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button size="sm" onClick={sendChatMessage}>
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;