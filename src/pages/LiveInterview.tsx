import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMediaPermissions } from "@/hooks/use-media-permissions";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Upload,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Brain,
  MessageSquare,
  Clock,
  User,
  Briefcase,
  Square,
  Volume2,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  text: string;
  category: 'general' | 'technical' | 'behavioral' | 'resume-based';
  asked: boolean;
}

interface TranscriptEntry {
  id: number;
  speaker: 'interviewer' | 'candidate';
  text: string;
  timestamp: Date;
  audioBlob?: Blob;
  audioUrl?: string;
}

interface AudioRecording {
  questionId: number;
  audioBlob: Blob;
  audioUrl: string;
  duration: number;
  timestamp: Date;
}

const LiveInterview = () => {
  const { toast } = useToast();
  const { permissionState, requestMediaStream, getPermissionInstructions, checkPermissions } = useMediaPermissions();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(false);
  
  // Interview setup
  const [jobDescription, setJobDescription] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeContent, setResumeContent] = useState("");
  
  // Questions and transcript
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  
  // Speech recognition and audio recording
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Audio recording state
  const [audioRecordings, setAudioRecordings] = useState<AudioRecording[]>([]);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [currentQuestionRecording, setCurrentQuestionRecording] = useState<number | null>(null);
  const [isVideoStreamReady, setIsVideoStreamReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Cleanup media streams on unmount
  useEffect(() => {
    const videoNode = videoRef.current;
    return () => {
      if (videoNode?.srcObject) {
        const stream = videoNode.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      
      // Cleanup audio recordings URLs
      audioRecordings.forEach(recording => {
        URL.revokeObjectURL(recording.audioUrl);
      });
      
      // Stop any active recording
      if (mediaRecorderRef.current && isRecordingAudio) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [audioRecordings, isRecordingAudio]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setCurrentTranscript(interimTranscript);

        if (finalTranscript) {
          const newEntry: TranscriptEntry = {
            id: Date.now(),
            speaker: 'candidate',
            text: finalTranscript,
            timestamp: new Date()
          };
          setTranscript(prev => [...prev, newEntry]);
          setCurrentTranscript('');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive"
        });
      };

      recognitionRef.current.addEventListener('start', () => {
        console.log('Speech recognition started');
      });

      recognitionRef.current.addEventListener('end', () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      });
    }
  }, [toast]);

  // Start audio recording for a question
  const startAudioRecording = async (questionId: number) => {
    try {
      if (!videoRef.current?.srcObject) {
        toast({
          title: "No Media Stream",
          description: "Please start the interview first to access camera and microphone.",
          variant: "destructive"
        });
        return;
      }

      const stream = videoRef.current.srcObject as MediaStream;
      const audioStream = new MediaStream(stream.getAudioTracks());
      
      const mediaRecorder = new MediaRecorder(audioStream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      const startTime = Date.now();
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        const recording: AudioRecording = {
          questionId,
          audioBlob,
          audioUrl,
          duration: Date.now() - startTime,
          timestamp: new Date()
        };
        
        setAudioRecordings(prev => [...prev, recording]);
        setCurrentQuestionRecording(null);
        setIsRecordingAudio(false);
        
        toast({
          title: "Audio Recorded",
          description: `Response recorded for question ${questionId}`
        });
      };
      
      mediaRecorder.start();
      setIsRecordingAudio(true);
      setCurrentQuestionRecording(questionId);
      
      toast({
        title: "Recording Started",
        description: "Audio recording has begun for your response"
      });
      
    } catch (error) {
      console.error('Audio recording error:', error);
      toast({
        title: "Recording Error",
        description: "Failed to start audio recording",
        variant: "destructive"
      });
    }
  };

  // Stop audio recording
  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecordingAudio) {
      mediaRecorderRef.current.stop();
    }
  };

  // Play recorded audio
  const playAudioRecording = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error('Audio play error:', error);
      toast({
        title: "Playback Error",
        description: "Failed to play audio recording",
        variant: "destructive"
      });
    });
  };

  // Generate questions based on job description and resume
  const generateQuestions = () => {
    const baseQuestions: Question[] = [
      { id: 1, text: "Tell me about yourself and your background.", category: 'general', asked: false },
      { id: 2, text: "Why are you interested in this position?", category: 'general', asked: false },
      { id: 3, text: "What are your greatest strengths?", category: 'behavioral', asked: false },
    ];

    // Job description based questions
    if (jobDescription.toLowerCase().includes('react')) {
      baseQuestions.push({
        id: baseQuestions.length + 1,
        text: "How would you optimize a React application's performance?",
        category: 'technical',
        asked: false
      });
    }

    if (jobDescription.toLowerCase().includes('javascript')) {
      baseQuestions.push({
        id: baseQuestions.length + 1,
        text: "Explain the difference between let, const, and var in JavaScript.",
        category: 'technical',
        asked: false
      });
    }

    if (jobDescription.toLowerCase().includes('team') || jobDescription.toLowerCase().includes('collaboration')) {
      baseQuestions.push({
        id: baseQuestions.length + 1,
        text: "Describe a time when you had to work with a difficult team member.",
        category: 'behavioral',
        asked: false
      });
    }

    // Resume-based questions
    if (resumeContent.toLowerCase().includes('project')) {
      baseQuestions.push({
        id: baseQuestions.length + 1,
        text: "Walk me through one of your most challenging projects.",
        category: 'resume-based',
        asked: false
      });
    }

    if (resumeContent.toLowerCase().includes('leadership') || resumeContent.toLowerCase().includes('lead')) {
      baseQuestions.push({
        id: baseQuestions.length + 1,
        text: "Describe your leadership style and give an example.",
        category: 'resume-based',
        asked: false
      });
    }

    setQuestions(baseQuestions);
    toast({
      title: "Questions Generated",
      description: `Generated ${baseQuestions.length} questions based on job description and resume.`
    });
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      // Simulate resume parsing
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setResumeContent(content);
        toast({
          title: "Resume Uploaded",
          description: `Parsed ${file.name} successfully.`
        });
      };
      reader.readAsText(file);
    }
  };


  const startInterview = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a job description.",
        variant: "destructive"
      });
      return;
    }

    // Reset video stream state
    setIsVideoStreamReady(false);
    setIsRequestingPermissions(true);
    
    // Show loading state
    toast({
      title: "Starting Interview...",
      description: "Activating camera and microphone...",
    });

    try {
      // Request camera and microphone permissions using the enhanced hook
      const result = await requestMediaStream({ video: true, audio: true });
      
      if (result.error) {
        toast({
          title: "Camera/Microphone Error",
          description: result.error,
          variant: "destructive"
        });
        return;
      }

      if (result.stream && videoRef.current) {
        videoRef.current.srcObject = result.stream;
        
        // Add event listeners for video events
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded - camera is ready');
          console.log('Video dimensions:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight);
          setIsVideoStreamReady(true);
        };
        
        videoRef.current.oncanplay = () => {
          console.log('Video can start playing - camera feed is active');
          setIsVideoStreamReady(true);
        };
        
        videoRef.current.onplay = () => {
          console.log('Video is now playing - camera feed is live');
          setIsVideoStreamReady(true);
        };
        
        videoRef.current.onerror = (error) => {
          console.error('Video error:', error);
          toast({
            title: "Video Error",
            description: "There was an error loading the video stream",
            variant: "destructive"
          });
        };
        
        // Ensure video plays
        videoRef.current.play().catch(error => {
          console.error('Video play error:', error);
        });
      }

      setInterviewStarted(true);
      setIsRecording(true);
      generateQuestions();
      
      toast({
        title: "Interview Started Successfully!",
        description: "Camera and microphone are now active. Your live video feed is displayed above."
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

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please use Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast({
        title: "Voice Recording Stopped",
        description: "Speech recognition has been disabled"
      });
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        toast({
          title: "Voice Recording Started",
          description: "Speech recognition is now active"
        });
      } catch (error) {
        console.error('Speech recognition start error:', error);
        toast({
          title: "Voice Recording Error",
          description: "Failed to start speech recognition",
          variant: "destructive"
        });
      }
    }
  };

  const askNextQuestion = () => {
    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      const questionEntry: TranscriptEntry = {
        id: Date.now(),
        speaker: 'interviewer',
        text: question.text,
        timestamp: new Date()
      };
      
      setTranscript(prev => [...prev, questionEntry]);
      setQuestions(prev => prev.map(q => 
        q.id === question.id ? { ...q, asked: true } : q
      ));
      setCurrentQuestionIndex(prev => prev + 1);

      // Text-to-speech for question
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(question.text);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }

      // Automatically start audio recording for the candidate's response
      setTimeout(() => {
        startAudioRecording(question.id);
      }, 1000); // Start recording 1 second after question is asked
    }
  };

  const toggleVideo = () => {
    const newVideoState = !isVideoOn;
    setIsVideoOn(newVideoState);
    
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => {
        track.enabled = newVideoState;
      });
    }
    
    // Force video element visibility
    if (videoRef.current) {
      videoRef.current.style.display = newVideoState ? 'block' : 'none';
    }
    
    toast({
      title: newVideoState ? "Camera On" : "Camera Off",
      description: `Video is now ${newVideoState ? 'enabled' : 'disabled'}`
    });
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => {
        track.enabled = isAudioOn; // Enable when current state is off
      });
    }
    toast({
      title: isAudioOn ? "Microphone Off" : "Microphone On",
      description: `Audio is now ${isAudioOn ? 'muted' : 'unmuted'}`
    });
  };

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-cyber-grid bg-background relative overflow-hidden flex items-center justify-center p-6">
        {/* Background neon orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-secondary/10 blur-[130px] pointer-events-none" />

        <div className="max-w-4xl w-full mx-auto z-10">
          <div className="glass-card border border-primary/20 shadow-lg rounded-3xl p-8 backdrop-blur-md">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent tracking-tight">
                AI-Powered Live Interview
              </h2>
              <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
                Upload your resume, provide job details, and start your AI-assisted interview experience.
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="candidate-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name</Label>
                    <Input
                      id="candidate-name"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-background/40 border-border/40 focus:border-secondary/50 rounded-xl"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resume-upload" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Upload Resume (Optional)</Label>
                    <div className="border-2 border-dashed border-primary/20 hover:border-secondary/50 hover:bg-secondary/5 rounded-2xl p-6 text-center transition-all duration-300 group cursor-pointer relative">
                      <input
                        id="resume-upload"
                        type="file"
                        accept=".txt,.pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-8 h-8 mx-auto mb-2 text-primary/60 group-hover:text-secondary group-hover:scale-110 transition-all duration-300" />
                      <p className="text-xs text-muted-foreground font-semibold">
                        {resumeFile ? resumeFile.name : "Drag & drop or click to upload resume"}
                      </p>
                    </div>
                    {resumeFile && (
                      <Badge variant="secondary" className="mt-2 bg-secondary/15 text-secondary border-secondary/20 font-medium">
                        <FileText className="w-3.5 h-3.5 mr-1.5" />
                        Resume loaded
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job-description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Job Description</Label>
                  <Textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here. The AI will generate relevant questions based on this..."
                    className="min-h-[220px] bg-background/40 border-border/40 focus:border-secondary/50 rounded-xl resize-none text-sm leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={startInterview}
                  disabled={isRequestingPermissions || !permissionState.isSupported}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-6 rounded-xl text-md shadow-glow hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  {isRequestingPermissions ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Requesting Access...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2 animate-pulse" />
                      Start AI Interview
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              <Brain className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-primary-light to-secondary-light bg-clip-text text-transparent">AI Live Interview</h1>
              <p className="text-xs text-muted-foreground font-medium flex items-center">
                <User className="w-3.5 h-3.5 mr-1 text-secondary" />
                {candidateName || "Anonymous Candidate"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className={`inline-block w-2 h-2 rounded-full ${isRecording ? "bg-red-500 animate-ping" : "bg-muted"}`} />
              <Badge variant={isRecording ? "destructive" : "secondary"} className={`font-semibold ${isRecording ? "bg-red-500/25 border-red-500 text-red-500" : ""}`}>
                {isRecording ? "Recording Live" : "Standby"}
              </Badge>
            </div>
            {isListening && (
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <Badge variant="default" className="bg-primary/25 border-primary text-primary-light font-semibold">
                  Listening
                </Badge>
              </div>
            )}
            {isRecordingAudio && (
              <Badge variant="destructive" className="animate-pulse bg-red-600/30 border-red-500 text-red-500 font-semibold">
                Recording Audio
              </Badge>
            )}
            <div className="text-sm font-medium text-muted-foreground flex items-center glass-panel px-3 py-1.5 rounded-lg border-white/5">
              <Clock className="w-4 h-4 mr-2 text-secondary" />
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full items-start">
          {/* Video Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card relative rounded-2xl overflow-hidden shadow-lg border border-primary/20 h-[380px] lg:h-[420px] flex items-center justify-center group transition-all duration-500 hover:border-primary/40 hover:shadow-glow/10">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ display: isVideoOn ? 'block' : 'none' }}
              />
              {!isVideoOn && (
                <div className="w-full h-full bg-gradient-to-br from-card to-muted/10 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 shadow-inner">
                    <VideoOff className="w-8 h-8 text-primary/60" />
                  </div>
                  <p className="text-muted-foreground font-semibold text-sm">Your Camera is Off</p>
                  <p className="text-xs text-muted-foreground mt-1">Enable camera using the control bar below</p>
                </div>
              )}
              <div className="absolute bottom-4 left-4 glass-panel backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-2 border-white/10">
                <span>{candidateName || "You"}</span>
                {!isAudioOn && <MicOff className="w-3.5 h-3.5 text-destructive" />}
              </div>
              {isVideoOn && isVideoStreamReady && (
                <div className="absolute top-4 right-4 bg-green-500/20 border border-green-500 text-green-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1.5 shadow-glow">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>LIVE FEED</span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="glass-panel border border-white/10 dark:border-white/5 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
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
                  variant={isListening ? "default" : "outline"}
                  size="icon"
                  onClick={toggleListening}
                  className={`w-10 h-10 rounded-xl transition-all duration-300 ${isListening ? "bg-primary text-white shadow-glow" : "glass-card hover:bg-primary/20 border-white/10 hover:border-primary/40"}`}
                  title="Toggle Speech Recognition"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                
                {!isRecordingAudio ? (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      if (questions.length > 0 && currentQuestionIndex > 0) {
                        const currentQuestion = questions[currentQuestionIndex - 1];
                        startAudioRecording(currentQuestion.id);
                      } else {
                        toast({
                          title: "No Active Question",
                          description: "Please ask a question first before recording",
                          variant: "destructive"
                        });
                      }
                    }}
                    disabled={currentQuestionIndex === 0}
                    className="w-10 h-10 rounded-xl glass-card hover:bg-primary/20 border-white/10 hover:border-primary/40 disabled:opacity-50"
                    title="Record Answer"
                  >
                    <Mic className="w-4 h-4 text-secondary-light" />
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={stopAudioRecording}
                    className="w-10 h-10 rounded-xl bg-destructive hover:bg-destructive/90 shadow-glow animate-pulse"
                    title="Stop Recording"
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {isRecordingAudio && currentQuestionRecording && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={stopAudioRecording}
                    className="rounded-xl px-4 py-2 border-red-500 text-red-500 font-semibold"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop Rec
                  </Button>
                )}
                
                <Button 
                  onClick={askNextQuestion}
                  disabled={currentQuestionIndex >= questions.length}
                  className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-5 rounded-xl hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02] shadow-glow disabled:opacity-50"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Next Question
                </Button>
                
                <Button 
                  onClick={() => {
                    console.log('Video element:', videoRef.current);
                    console.log('Video srcObject:', videoRef.current?.srcObject);
                    console.log('Video readyState:', videoRef.current?.readyState);
                    console.log('Video paused:', videoRef.current?.paused);
                    console.log('IsVideoOn:', isVideoOn);
                    console.log('IsVideoStreamReady:', isVideoStreamReady);
                    toast({
                      title: "Debug Info",
                      description: "Check console for video debug information"
                    });
                  }}
                  variant="outline"
                  size="sm"
                  className="glass-card hover:bg-muted text-xs rounded-xl px-3"
                >
                  Debug
                </Button>
              </div>
            </div>

            {/* Current Question Block */}
            {questions.length > 0 && currentQuestionIndex > 0 && (
              <div className="glass-card rounded-2xl p-6 border-l-4 border-l-secondary border-t border-r border-b border-secondary/15 shadow-md transition-all duration-300">
                <h3 className="text-xs font-bold tracking-wide uppercase text-secondary mb-2 flex items-center">
                  <span>Current Question</span>
                  <span className="ml-2 w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
                </h3>
                <p className="text-lg font-semibold leading-relaxed text-foreground">{questions[currentQuestionIndex - 1]?.text}</p>
                <Badge variant="outline" className="mt-3 bg-secondary/10 border-secondary/20 text-secondary-light font-medium uppercase tracking-wider text-[9px]">
                  {questions[currentQuestionIndex - 1]?.category}
                </Badge>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Questions List */}
            <div className="glass-card rounded-2xl p-5 border border-primary/10 shadow-md flex flex-col max-h-[300px]">
              <h2 className="text-sm font-bold tracking-wide uppercase text-secondary mb-3 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-secondary" />
                Questions Progress ({questions.filter(q => q.asked).length}/{questions.length})
              </h2>
              <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar min-h-[140px]">
                {questions.map((question, index) => (
                  <div 
                    key={question.id} 
                    className={`p-3 rounded-xl text-xs transition-colors border ${
                      question.asked 
                        ? 'bg-success/15 border-success/35 text-foreground' 
                        : 'bg-muted/30 border-border/30 text-muted-foreground'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold">Q{index + 1}</span>
                      {question.asked && (
                        <span className="text-[10px] text-success-foreground font-semibold uppercase bg-success/20 px-2 py-0.5 rounded-full border border-success/30">Asked</span>
                      )}
                    </div>
                    <p className="leading-relaxed font-medium">{question.text}</p>
                    <Badge variant="outline" className="mt-2 text-[9px] uppercase tracking-wider">
                      {question.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Transcript */}
            <div className="glass-card rounded-2xl p-5 border border-primary/10 shadow-md flex flex-col max-h-[380px]">
              <h2 className="text-sm font-bold tracking-wide uppercase text-primary-light mb-3 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                Live Transcript
              </h2>
              <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar min-h-[160px]">
                {transcript.map((entry) => (
                  <div key={entry.id} className="p-3 bg-muted/30 border border-border/20 rounded-xl text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Badge variant={entry.speaker === 'interviewer' ? 'default' : 'secondary'} className={entry.speaker === 'interviewer' ? 'bg-primary/20 border-primary text-primary-light' : 'bg-secondary/20 border-secondary text-secondary-light'}>
                        {entry.speaker === 'interviewer' ? 'AI Assistant' : 'You'}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-medium">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-foreground leading-relaxed font-medium">{entry.text}</p>
                  </div>
                ))}
                {currentTranscript && (
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-xs animate-pulse">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="secondary" className="bg-primary/30 border-primary text-primary-light">You (Speaking...)</Badge>
                    </div>
                    <p className="text-foreground italic font-medium">{currentTranscript}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Audio Recordings */}
            {audioRecordings.length > 0 && (
              <div className="glass-card rounded-2xl p-5 border border-primary/10 shadow-md flex flex-col max-h-[280px]">
                <h2 className="text-sm font-bold tracking-wide uppercase text-primary-light mb-3 flex items-center">
                  <Volume2 className="w-4 h-4 mr-2 text-primary" />
                  Your Recordings ({audioRecordings.length})
                </h2>
                <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar min-h-[100px]">
                  {audioRecordings.map((recording, index) => (
                    <div key={index} className="p-3 bg-muted/40 border border-border/25 rounded-xl text-xs flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground">Response to Q{recording.questionId}</p>
                        <p className="text-[10px] text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {recording.timestamp.toLocaleTimeString()} • {Math.round(recording.duration / 1000)}s
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => playAudioRecording(recording.audioUrl)}
                        className="glass-card hover:bg-primary/20 border-white/10 hover:border-primary/40 px-3 py-1.5 h-8 text-xs font-semibold rounded-lg"
                      >
                        <Play className="w-3 h-3 mr-1.5 fill-current" />
                        Play
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveInterview;