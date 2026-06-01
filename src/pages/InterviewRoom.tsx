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
  RefreshCw,
  Send,
  Brain
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
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [responseInput, setResponseInput] = useState("");
  const [transcript, setTranscript] = useState<{ sender: string; text: string; timestamp: string }[]>([
    { sender: "System", text: "AI Agent Interviewer connected. Choose your avatar in the panel and click 'Start Interview' to begin.", timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);

  const [interviewerGender, setInterviewerGender] = useState<'female' | 'male'>('female');
  const interviewerName = interviewerGender === 'female' ? "Sarah Wilson (AI)" : "David Miller (AI)";

  // Video refs for camera streams
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // Mock interview data
  const interviewData = {
    id: id,
    candidate: "Alex Johnson",
    position: "Senior Frontend Developer", 
    company: "TechCorp",
    interviewer: interviewerName,
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
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsAgentSpeaking(true);
      utterance.onend = () => setIsAgentSpeaking(false);
      utterance.onerror = () => setIsAgentSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsAgentSpeaking(true);
      setTimeout(() => setIsAgentSpeaking(false), 3000);
    }
  };

  const handleSendResponse = () => {
    if (!responseInput.trim()) return;
    
    const userMsg = responseInput.trim();
    setTranscript(prev => [
      ...prev,
      { sender: "You", text: userMsg, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
    ]);
    setResponseInput("");
    
    setTimeout(() => {
      let nextQ = "";
      let nextIndex = currentQuestionIndex + 1;
      
      if (currentQuestionIndex === 1) {
        nextQ = "Thank you for sharing that. Next question: How would you optimize a slow-loading React application?";
      } else if (currentQuestionIndex === 2) {
        nextQ = "That makes sense. Can you explain the main differences between server-side rendering and client-side rendering?";
      } else if (currentQuestionIndex === 3) {
        nextQ = "Understood. Finally, walk me through how you would design a scalable component library.";
      } else if (currentQuestionIndex === 4) {
        nextQ = "Thank you! That completes our first-round interview today. I will compile your responses and forward them to the hiring team. Have a great day!";
        nextIndex = 5;
      }
      
      if (nextQ) {
        setTranscript(prev => [
          ...prev,
          { sender: "AI Interviewer", text: nextQ, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
        ]);
        speakQuestion(nextQ);
        setCurrentQuestionIndex(nextIndex);
      }
    }, 1500);
  };

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

      // Wait a short moment to start speaking the first question
      setTimeout(() => {
        const firstQ = "Welcome to your first-round interview for the Senior Frontend Developer position at TechCorp. I am your AI interviewer. Let's start with the first question: Tell me about your experience with React and TypeScript.";
        setTranscript(prev => [
          ...prev,
          { sender: "AI Interviewer", text: firstQ, timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
        ]);
        speakQuestion(firstQ);
        setCurrentQuestionIndex(1);
      }, 1500);

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
    <div className="min-h-screen bg-cyber-grid bg-background relative overflow-hidden flex flex-col">
      {/* Background neon orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[130px] pointer-events-none" />

      {/* Header */}
      <header className="glass-panel sticky top-0 z-40 backdrop-blur-md border-b border-border/40 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow">
              <Video className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">{interviewData.position}</h1>
              <p className="text-xs text-muted-foreground font-medium flex items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span>
                {interviewData.company}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${isRecording ? "bg-red-500 animate-ping" : "bg-muted"} mr-1`} />
              <Badge variant={isRecording ? "destructive" : "secondary"} className={`font-semibold ${isRecording ? "bg-red-500/25 border-red-500 text-red-500" : ""}`}>
                {isRecording ? "Recording Live" : "Standby"}
              </Badge>
            </div>
            <div className="text-sm font-medium text-muted-foreground flex items-center glass-panel px-3 py-1.5 rounded-lg border-white/5">
              <Clock className="w-4 h-4 mr-2 text-secondary" />
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full items-start">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Permission Status Alert */}
            {permissionInstructions && !interviewStarted && (
              <Alert className={`glass-card border-l-4 ${permissionInstructions.title === 'Permission Denied' ? 'border-destructive' : 'border-primary'}`}>
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="ml-2">
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground">{permissionInstructions.title}</p>
                    <p className="text-muted-foreground text-sm">{permissionInstructions.message}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                      {permissionInstructions.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                    {permissionInstructions.title === 'Permission Denied' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={checkPermissions}
                        className="mt-2 glass-card hover:bg-muted"
                      >
                        <RefreshCw className="w-3.5 h-3.5 mr-2" />
                        Check Again
                      </Button>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Video Container Grid */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[380px] lg:h-[480px]">
                {/* Local Video */}
                <div className="glass-card relative rounded-2xl overflow-hidden shadow-lg border border-primary/20 flex items-center justify-center group transition-all duration-500 hover:border-primary/40 hover:shadow-glow/10">
                  {isVideoOn ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-card to-muted/10 flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 shadow-inner">
                        <VideoOff className="w-8 h-8 text-primary/60" />
                      </div>
                      <p className="text-muted-foreground font-semibold text-sm">Your Camera is Off</p>
                    </div>
                  )}
                  {/* Status Overlay */}
                  <div className="absolute top-4 left-4 glass-panel backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 border-white/10">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>Local Stream</span>
                  </div>
                  <div className="absolute bottom-4 left-4 glass-panel backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2 border-white/10">
                    <span>You</span>
                    {!isAudioOn && <MicOff className="w-3.5 h-3.5 text-destructive" />}
                  </div>
                </div>

                {/* Remote Video (AI Agent) */}
                <div className={`glass-card relative rounded-2xl overflow-hidden shadow-lg flex items-center justify-center transition-all duration-500 min-h-[220px] ${
                  isAgentSpeaking 
                    ? "border-2 border-secondary shadow-glow animate-pulse" 
                    : "border border-secondary/20 hover:border-secondary/40 hover:shadow-glow/10"
                }`}>
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ display: 'none' }} // Hidden because it's a dummy AI Agent
                  />
                  
                  {/* Face Avatar Image */}
                  <img
                    src={interviewerGender === 'female' ? "/ai_interviewer.png" : "/ai_interviewer_male.png"}
                    alt={interviewerName}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      isAgentSpeaking ? "scale-105 brightness-110" : "scale-100 brightness-95"
                    }`}
                  />
                  
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Equalizer Waveform Overlay (When speaking) */}
                  {isAgentSpeaking && (
                    <div className="absolute inset-x-0 bottom-16 flex justify-center items-end space-x-1.5 h-8 bg-black/30 py-1 backdrop-blur-[2px] z-10">
                      <span className="w-1 bg-secondary rounded-full animate-bounce h-5" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1 bg-secondary rounded-full animate-bounce h-7" style={{ animationDelay: '0.3s' }} />
                      <span className="w-1 bg-secondary rounded-full animate-bounce h-6" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1 bg-secondary rounded-full animate-bounce h-7" style={{ animationDelay: '0.4s' }} />
                      <span className="w-1 bg-secondary rounded-full animate-bounce h-4" style={{ animationDelay: '0.5s' }} />
                    </div>
                  )}

                  {/* Details Overlay at the bottom */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-10">
                    <div>
                      <p className="text-white font-bold text-sm drop-shadow-md">
                        {interviewerName}
                      </p>
                      <p className="text-xs text-white/70 drop-shadow-sm font-medium flex items-center mt-0.5">
                        {interviewStarted ? (
                          isAgentSpeaking ? (
                            <span className="text-secondary-light font-semibold animate-pulse flex items-center">
                              <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-ping" />
                              Speaking...
                            </span>
                          ) : (
                            <span className="flex items-center text-secondary-light/95">
                              <span className="w-2 h-2 rounded-full bg-secondary mr-2 animate-pulse" />
                              Listening...
                            </span>
                          )
                        ) : (
                          <span className="flex items-center text-white/50">
                            <span className="w-2 h-2 rounded-full bg-white/40 mr-2" />
                            Ready
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Avatar selection toggler (Only visible before interview starts) */}
                    {!interviewStarted && (
                      <div className="flex space-x-1 glass-panel p-1 rounded-lg border-white/10 backdrop-blur-md">
                        <button
                          onClick={() => setInterviewerGender('female')}
                          className={`px-2 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                            interviewerGender === 'female' 
                              ? 'bg-secondary text-white shadow-sm' 
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Female
                        </button>
                        <button
                          onClick={() => setInterviewerGender('male')}
                          className={`px-2 py-1 text-[10px] font-bold uppercase rounded transition-all ${
                            interviewerGender === 'male' 
                              ? 'bg-secondary text-white shadow-sm' 
                              : 'text-white/60 hover:text-white'
                          }`}
                        >
                          Male
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Status Overlay */}
                  <div className="absolute top-4 left-4 glass-panel backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 border-white/10 z-10">
                    <span className={`w-2 h-2 rounded-full ${interviewStarted ? "bg-secondary animate-pulse" : "bg-white/40"}`} />
                    <span className="text-white">AI Interviewer</span>
                  </div>
                </div>
              </div>

              {/* Screen Share Overlay */}
              {isScreenSharing && (
                <div className="mt-6 glass-card rounded-xl overflow-hidden border border-secondary/20 transition-all duration-300">
                  <div className="px-4 py-2 border-b border-border/40 flex items-center justify-between bg-muted/20">
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-semibold">Your Shared Screen</span>
                    </div>
                    <Badge variant="secondary" className="bg-secondary/15 text-secondary border-secondary/20 text-[10px] uppercase tracking-wider">Active</Badge>
                  </div>
                  <div className="h-44 bg-muted/30 flex items-center justify-center">
                    <div className="text-center">
                      <Monitor className="w-10 h-10 text-muted-foreground mx-auto mb-2 animate-pulse" />
                      <p className="text-xs text-muted-foreground">Screen sharing is live to other participants</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Controls Bar */}
            <div className="glass-panel border border-white/10 dark:border-white/5 rounded-2xl p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Button
                  variant={isAudioOn ? "secondary" : "destructive"}
                  size="icon"
                  onClick={toggleAudio}
                  className={`w-10 h-10 rounded-xl transition-all duration-300 ${isAudioOn ? "glass-card hover:bg-primary/20 border-white/10 hover:border-primary/40" : "bg-destructive hover:bg-destructive/90 shadow-glow"}`}
                >
                  {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant={isVideoOn ? "secondary" : "destructive"}
                  size="icon"
                  onClick={toggleVideo}
                  className={`w-10 h-10 rounded-xl transition-all duration-300 ${isVideoOn ? "glass-card hover:bg-primary/20 border-white/10 hover:border-primary/40" : "bg-destructive hover:bg-destructive/90 shadow-glow"}`}
                >
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant={isScreenSharing ? "secondary" : "outline"}
                  size="icon"
                  onClick={toggleScreenShare}
                  className={`w-10 h-10 rounded-xl transition-all duration-300 ${isScreenSharing ? "bg-secondary text-white shadow-glow" : "glass-card hover:bg-secondary/20 border-white/10 hover:border-secondary/40"}`}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                
                <Button
                  variant={showChat ? "secondary" : "outline"}
                  size="icon"
                  onClick={() => setShowChat(!showChat)}
                  className={`w-10 h-10 rounded-xl transition-all duration-300 ${showChat ? "bg-primary text-white shadow-glow" : "glass-card hover:bg-primary/20 border-white/10 hover:border-primary/40"}`}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-3">
                {!interviewStarted ? (
                  <Button 
                    onClick={handleStartInterview} 
                    disabled={isRequestingPermissions || !permissionState.isSupported}
                    className="bg-gradient-to-r from-success to-emerald-500 text-white font-semibold px-6 py-5 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-glow"
                  >
                    {isRequestingPermissions ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Requesting...
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4 mr-2 animate-bounce" />
                        Start Interview
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    variant="destructive" 
                    onClick={handleEndInterview}
                    className="bg-destructive hover:bg-destructive/90 font-semibold px-6 py-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <PhoneOff className="w-4 h-4 mr-2" />
                    End Interview
                  </Button>
                )}
              </div>
            </div>

            {/* Live Transcript Panel */}
            <div className="glass-card rounded-2xl p-6 border border-primary/20 shadow-md">
              <h2 className="text-sm font-bold tracking-wide uppercase text-secondary mb-4 flex items-center justify-between">
                <span className="flex items-center">
                  <span className="w-1.5 h-3 bg-secondary rounded-full mr-2"></span>
                  First-Round Interview Transcript
                </span>
                {interviewStarted && (
                  <Badge variant="outline" className="bg-secondary/15 border-secondary/30 text-secondary-light font-semibold text-[10px] uppercase animate-pulse">
                    Active Session
                  </Badge>
                )}
              </h2>
              
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1 mb-4 custom-scrollbar flex flex-col">
                {transcript.map((entry, index) => {
                  const isAI = entry.sender === "AI Interviewer";
                  const isSystem = entry.sender === "System";
                  
                  if (isSystem) {
                    return (
                      <div key={index} className="text-center py-2 px-4 bg-muted/20 border border-border/20 rounded-xl max-w-lg mx-auto text-xs text-muted-foreground">
                        {entry.text}
                      </div>
                    );
                  }
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex flex-col max-w-[80%] rounded-2xl p-4 text-sm ${
                        isAI 
                          ? "bg-secondary/10 border border-secondary/20 self-start text-foreground rounded-tl-none" 
                          : "bg-primary/10 border border-primary/20 self-end text-foreground rounded-tr-none"
                      }`}
                    >
                      <div className="flex items-center justify-between space-x-4 mb-1">
                        <span className={`font-bold text-xs ${isAI ? "text-secondary" : "text-primary-light"}`}>
                          {entry.sender}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-medium">{entry.timestamp}</span>
                      </div>
                      <p className="leading-relaxed font-semibold">{entry.text}</p>
                    </div>
                  );
                })}
              </div>

              {interviewStarted && currentQuestionIndex < 5 && (
                <div className="flex space-x-2 pt-4 border-t border-border/20">
                  <input
                    type="text"
                    placeholder={isAgentSpeaking ? "AI Agent is speaking, please listen..." : "Type your answer here..."}
                    value={responseInput}
                    onChange={(e) => setResponseInput(e.target.value)}
                    className="flex-1 px-4 py-3 bg-background/50 border border-border/40 focus:outline-none focus:ring-1 focus:ring-secondary rounded-xl text-sm disabled:opacity-50"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendResponse()}
                    disabled={isAgentSpeaking}
                  />
                  <Button 
                    onClick={handleSendResponse}
                    disabled={isAgentSpeaking || !responseInput.trim()}
                    className="bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-xl px-5 transition-all disabled:opacity-50"
                  >
                    Send Answer
                  </Button>
                </div>
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interview Details */}
            <div className="glass-card rounded-2xl p-5 border border-primary/10 shadow-md">
              <h2 className="text-sm font-bold tracking-wide uppercase text-secondary mb-4 flex items-center">
                <span className="w-1.5 h-3 bg-secondary rounded-full mr-2"></span>
                Interview Details
              </h2>
              <div className="space-y-4 text-sm">
                <div className="glass-panel p-3 rounded-xl border-white/5">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Position</p>
                  <p className="font-semibold text-foreground">{interviewData.position}</p>
                </div>
                <div className="glass-panel p-3 rounded-xl border-white/5">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Type</p>
                  <p className="font-semibold text-foreground">{interviewData.type}</p>
                </div>
                <div className="glass-panel p-3 rounded-xl border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">Duration</p>
                    <p className="font-semibold text-foreground">{interviewData.duration}</p>
                  </div>
                  <Clock className="w-5 h-5 text-primary-light" />
                </div>
                <div className="glass-panel p-3 rounded-xl border-white/5">
                  <p className="text-xs text-muted-foreground font-medium mb-0.5">Time</p>
                  <p className="font-semibold text-foreground">{interviewData.scheduledTime}</p>
                </div>
              </div>
            </div>

            {/* Notes (for interviewers) */}
            {user?.role === 'interviewer' && (
              <div className="glass-card rounded-2xl p-5 border border-primary/10 shadow-md">
                <h2 className="text-sm font-bold tracking-wide uppercase text-primary-light mb-4 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-primary" />
                  Interview Notes
                </h2>
                <Textarea
                  placeholder="Take notes during the interview..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[140px] bg-background/50 border-border/40 focus:ring-1 focus:ring-primary rounded-xl p-3 text-sm resize-none"
                />
              </div>
            )}

            {/* Chat */}
            {showChat && (
              <div className="glass-card rounded-2xl p-5 border border-primary/15 shadow-lg flex flex-col max-h-[350px]">
                <h2 className="text-sm font-bold tracking-wide uppercase text-primary-light mb-3 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                  Live Chat
                </h2>
                <div className="flex-1 space-y-3 overflow-y-auto pr-1 mb-3 custom-scrollbar min-h-[120px]">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-xs bg-muted/40 p-2.5 rounded-xl border border-border/20">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-foreground">{msg.sender}</span>
                        <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-background/50 border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary rounded-xl"
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  />
                  <Button 
                    size="sm" 
                    onClick={sendChatMessage}
                    className="bg-primary hover:bg-primary/90 text-white rounded-xl px-3"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;