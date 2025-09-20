import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Code, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText,
  Terminal,
  Save,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodingAssessment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(`// Write your solution here
function twoSum(nums, target) {
    // Your code here
    
}`);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds

  // Mock assessment data
  const assessmentData = {
    id: id,
    title: "Frontend Developer Assessment",
    company: "TechCorp",
    totalQuestions: 3,
    currentQuestion: 1,
    timeLimit: "60 minutes",
    difficulty: "Medium"
  };

  const currentProblem = {
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6", 
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]", passed: null },
      { input: "[3,2,4], 6", expected: "[1,2]", passed: null },
      { input: "[3,3], 6", expected: "[0,1]", passed: null }
    ]
  };

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "typescript", label: "TypeScript" }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      const mockResults = currentProblem.testCases.map((testCase, index) => ({
        ...testCase,
        passed: Math.random() > 0.3, // 70% pass rate for demo
        output: index === 0 ? "[0,1]" : testCase.expected,
        runtime: `${Math.floor(Math.random() * 50) + 10}ms`
      }));
      
      setTestResults(mockResults);
      setIsRunning(false);
      
      const passedCount = mockResults.filter(r => r.passed).length;
      toast({
        title: "Code Executed",
        description: `${passedCount}/${mockResults.length} test cases passed`
      });
    }, 2000);
  };

  const handleSubmit = () => {
    const passedCount = testResults.filter(r => r.passed).length;
    const totalCount = testResults.length;
    
    toast({
      title: "Solution Submitted!",
      description: `Your solution passed ${passedCount}/${totalCount} test cases`
    });
    
    // In a real app, this would submit to the backend
    setTimeout(() => {
      navigate(`/${user?.role}/dashboard`);
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Hard": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">{assessmentData.title}</h1>
              <p className="text-sm text-muted-foreground">{assessmentData.company}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline">
              Question {assessmentData.currentQuestion} of {assessmentData.totalQuestions}
            </Badge>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-warning" />
              <span className="font-mono text-warning">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Problem Description */}
          <div className="space-y-4">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span>{currentProblem.title}</span>
                    <Badge className={getDifficultyColor(currentProblem.difficulty)}>
                      {currentProblem.difficulty}
                    </Badge>
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6 overflow-y-auto">
                <div>
                  <h3 className="font-semibold mb-2">Problem Description</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {currentProblem.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Examples</h3>
                  <div className="space-y-4">
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">Example {index + 1}:</p>
                        <p className="text-sm mt-1">
                          <strong>Input:</strong> {example.input}
                        </p>
                        <p className="text-sm">
                          <strong>Output:</strong> {example.output}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Explanation:</strong> {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Constraints</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {currentProblem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Editor and Tests */}
          <div className="space-y-4">
            {/* Language Selection and Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleRunCode}
                      disabled={isRunning}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {isRunning ? "Running..." : "Run"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Editor */}
            <Card className="flex-grow">
              <CardHeader>
                <CardTitle className="text-sm">Code Editor</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-4 font-mono text-sm bg-muted border-0 resize-none focus:outline-none"
                    placeholder="Write your code here..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center">
                  <Terminal className="w-4 h-4 mr-2" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    Run your code to see test results
                  </p>
                ) : (
                  <div className="space-y-2">
                    {testResults.map((result, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border ${
                          result.passed 
                            ? 'bg-success/10 border-success/20' 
                            : 'bg-destructive/10 border-destructive/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">
                            Test Case {index + 1}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">
                              {result.runtime}
                            </span>
                            {result.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-success" />
                            ) : (
                              <XCircle className="w-4 h-4 text-destructive" />
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p><strong>Input:</strong> {result.input}</p>
                          <p><strong>Expected:</strong> {result.expected}</p>
                          <p><strong>Output:</strong> {result.output}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button 
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handleSubmit}
              disabled={testResults.length === 0}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Solution
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingAssessment;