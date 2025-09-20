import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Briefcase
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
}

const LiveInterview = () => {
  const { toast } = useToast();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [interviewStarted, setInterviewStarted] = useState(false);
  
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
  
  // Speech recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      };
    }
  }, []);

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

    try {
      // Start video
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: isVideoOn, 
          audio: isAudioOn 
        });
        videoRef.current.srcObject = stream;
      }

      setInterviewStarted(true);
      setIsRecording(true);
      generateQuestions();
      
      toast({
        title: "Interview Started",
        description: "Good luck with your interview!"
      });
    } catch (error) {
      toast({
        title: "Camera/Microphone Error",
        description: "Please allow camera and microphone access.",
        variant: "destructive"
      });
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
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
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOn;
      });
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioOn;
      });
    }
  };

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI-Powered Live Interview
              </CardTitle>
              <CardDescription className="text-lg">
                Upload your resume, provide job details, and start your AI-assisted interview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="candidate-name">Your Name</Label>
                    <Input
                      id="candidate-name"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="resume-upload">Upload Resume (Optional)</Label>
                    <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                      <input
                        id="resume-upload"
                        type="file"
                        accept=".txt,.pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {resumeFile ? resumeFile.name : "Click to upload your resume"}
                        </p>
                      </label>
                    </div>
                    {resumeFile && (
                      <Badge variant="secondary" className="mt-2">
                        <FileText className="w-3 h-3 mr-1" />
                        Resume uploaded
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here. The AI will generate relevant questions based on this..."
                    className="min-h-48"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  onClick={startInterview}
                  size="lg"
                  className="bg-gradient-primary text-white px-8 py-3 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start AI Interview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">AI Live Interview</h1>
              <p className="text-sm text-muted-foreground">{candidateName || "Anonymous Candidate"}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant={isRecording ? "destructive" : "secondary"}>
              {isRecording ? "Recording" : "Not Recording"}
            </Badge>
            <Badge variant={isListening ? "default" : "secondary"}>
              {isListening ? "Listening" : "Not Listening"}
            </Badge>
            <div className="text-sm text-muted-foreground">
              <Clock className="inline w-4 h-4 mr-1" />
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Video Area */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="h-80">
              <CardContent className="p-0 h-full relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover rounded-lg"
                />
                {!isVideoOn && (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <VideoOff className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Camera Off</p>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {candidateName || "You"} {!isAudioOn && <MicOff className="inline w-3 h-3 ml-1" />}
                </div>
              </CardContent>
            </Card>

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
                      variant={isListening ? "default" : "outline"}
                      size="sm"
                      onClick={toggleListening}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={askNextQuestion}
                      disabled={currentQuestionIndex >= questions.length}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Next Question
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Question */}
            {questions.length > 0 && currentQuestionIndex > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Current Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">{questions[currentQuestionIndex - 1]?.text}</p>
                  <Badge variant="outline" className="mt-2">
                    {questions[currentQuestionIndex - 1]?.category}
                  </Badge>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Questions List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Interview Questions ({questions.filter(q => q.asked).length}/{questions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-48 overflow-y-auto">
                {questions.map((question, index) => (
                  <div 
                    key={question.id} 
                    className={`p-2 rounded text-sm ${
                      question.asked ? 'bg-success/10 border-success/20' : 'bg-muted'
                    } border`}
                  >
                    <p className="font-medium">Q{index + 1}:</p>
                    <p className="text-muted-foreground text-xs">{question.text}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {question.category}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Live Transcript */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Live Transcript</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {transcript.map((entry) => (
                  <div key={entry.id} className="p-2 bg-muted rounded text-sm">
                    <div className="flex items-center justify-between mb-1">
                    <Badge variant={entry.speaker === 'interviewer' ? 'default' : 'secondary'}>
                      {entry.speaker === 'interviewer' ? 'AI' : 'You'}
                    </Badge>
                      <span className="text-xs text-muted-foreground">
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{entry.text}</p>
                  </div>
                ))}
                {currentTranscript && (
                  <div className="p-2 bg-primary/10 rounded text-sm border border-primary/20">
                    <Badge variant="secondary" className="mb-1">You (speaking...)</Badge>
                    <p className="text-muted-foreground italic">{currentTranscript}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveInterview;