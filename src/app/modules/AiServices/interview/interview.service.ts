import { GoogleGenAI } from "@google/genai";
import { prisma } from "../../../lib/prisma";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

interface InterviewQuestion {
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  expectedAnswer?: string;
  evaluationPoints?: string[];
  followUpQuestions?: string[];
}

interface GeneratedInterviewQuestions {
  technical: InterviewQuestion[];
  behavioral: InterviewQuestion[];
  systemDesign: InterviewQuestion[];
  project: InterviewQuestion[];
  followUp: InterviewQuestion[];
  scenarioBased: InterviewQuestion[];
  problemSolving: InterviewQuestion[];
  hrAndCulture: InterviewQuestion[];
  roleSpecific: InterviewQuestion[];
}

const generateInterviewQuestions = async (
  jobId: string,
  experienceLevel: string,
  interviewType: string
) => {
  // =========================================================
  // 1. GET JOB INFORMATION
  // =========================================================

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      company: true,
      requiredSkills: true,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  // =========================================================
  // 2. EXTRACT REQUIRED SKILLS
  // =========================================================

  const skills = job.requiredSkills
    .map((skill) => skill.name)
    .join(", ");

  // =========================================================
  // 3. CREATE AI PROMPT
  // =========================================================

  const prompt = `
You are an expert technical interviewer, senior hiring manager,
and recruitment specialist.

Your task is to generate a comprehensive interview question set
for the following job.

========================================
JOB INFORMATION
========================================

Job Title:
${job.title}

Job Description:
${job.description}

Required Skills:
${skills}

Candidate Experience Level:
${experienceLevel}

Interview Type:
${interviewType}

Company:
${job.company.name}

========================================
QUESTION GENERATION RULES
========================================

Generate realistic questions that a professional interviewer
could actually ask during an interview.

Questions must be strongly related to:

1. Job title
2. Job description
3. Required skills
4. Candidate experience level
5. Interview type

Do NOT generate generic questions repeatedly.

Questions should gradually increase in difficulty.

Use:

Easy
Medium
Hard

appropriately according to the candidate's experience.

For junior/fresher candidates:
- Focus more on fundamentals
- Practical implementation
- Basic problem solving
- Projects
- Learning ability

For mid-level candidates:
- Focus on architecture
- Production experience
- Debugging
- Performance
- Security
- Scalability

For senior candidates:
- Focus on architecture
- System design
- Trade-offs
- Scalability
- Reliability
- Leadership
- Production incidents
- Technical decision making

========================================
GENERATE EXACTLY 10 CATEGORIES
========================================

1. TECHNICAL
Generate exactly 10 questions.

Focus on:
- Required technologies
- Programming concepts
- Frameworks
- Databases
- APIs
- Authentication
- Security
- Performance
- Testing
- Debugging

Example:

Question:
How would you implement JWT authentication in an Express.js API?

Difficulty:
Medium

Category:
Authentication

Expected Answer:
The candidate should explain access tokens, refresh tokens,
secure storage, expiration and middleware-based authorization.

Evaluation Points:
- Understands JWT
- Understands access/refresh tokens
- Understands token expiration
- Understands security concerns


2. BEHAVIORAL
Generate exactly 5 questions.

Focus on:
- Communication
- Teamwork
- Conflict
- Leadership
- Failure
- Learning
- Adaptability

Example:

Question:
Tell me about a time when you disagreed with a technical
decision made by your team.

Difficulty:
Medium

Category:
Teamwork


3. SYSTEM DESIGN
Generate exactly 5 questions.

Focus on:
- Scalability
- Architecture
- Database design
- Caching
- Load balancing
- Queues
- Microservices
- Reliability
- Security

Example:

Question:
How would you design a scalable job application system
that supports 1 million candidates?

Difficulty:
Hard

Category:
Scalability


4. PROJECT
Generate exactly 5 questions.

These questions must investigate the candidate's actual
projects and technical decisions.

Focus on:
- Architecture
- Database
- APIs
- Authentication
- Deployment
- Performance
- Challenges
- Trade-offs

Example:

Question:
Explain the architecture of your most complex project
and why you selected that architecture.

Difficulty:
Medium

Category:
Project Architecture


5. FOLLOW-UP
Generate exactly 5 questions.

These should be natural follow-up questions that an interviewer
could ask after a candidate answers a technical question.

Example:

Question:
You mentioned Redis caching. What would happen if Redis
became unavailable?

Difficulty:
Hard

Category:
Caching


6. SCENARIO BASED
Generate exactly 5 questions.

Give realistic production scenarios.

Focus on:
- Server crashes
- Database failures
- Security attacks
- Slow APIs
- High traffic
- Deployment problems
- Data inconsistency

Example:

Question:
Your API normally responds in 200ms but suddenly takes
5 seconds. How would you investigate the problem?

Difficulty:
Hard

Category:
Production Debugging


7. PROBLEM SOLVING
Generate exactly 5 questions.

Focus on:
- Debugging
- Algorithms
- Logical thinking
- Optimization
- Code quality
- Edge cases

Example:

Question:
An API endpoint becomes slow when the database contains
millions of records. How would you identify and solve the problem?

Difficulty:
Hard

Category:
Performance Optimization


8. HR AND CULTURE
Generate exactly 5 questions.

Focus on:
- Motivation
- Career goals
- Teamwork
- Company culture
- Strengths
- Weaknesses
- Salary expectations

Example:

Question:
Why do you want to join our company?

Difficulty:
Easy

Category:
Motivation


9. ROLE SPECIFIC
Generate exactly 5 questions.

These must be highly specific to the job role.

For example:

If the job is Backend Developer:
- API design
- Database optimization
- Authentication
- Distributed systems

If Frontend Developer:
- React
- Next.js
- Performance
- State management
- Accessibility

If Full Stack Developer:
- Frontend + backend
- API integration
- Database
- Authentication
- Deployment

If DevOps:
- Docker
- Kubernetes
- CI/CD
- Cloud
- Monitoring

If ML Engineer:
- ML algorithms
- Model evaluation
- Feature engineering
- Deployment

Example:

Question:
How would you design an authentication system using
Next.js and Express?

Difficulty:
Hard

Category:
Full Stack Authentication


10. ADVANCED CHALLENGE
Generate exactly 5 difficult questions.

These should distinguish strong candidates from average candidates.

Focus on:
- Architecture trade-offs
- Performance
- Security
- Scalability
- Production engineering
- Complex debugging

Example:

Question:
Your application has 10 million users and PostgreSQL is
becoming the main performance bottleneck. How would you
redesign the data layer?

Difficulty:
Hard

Category:
Database Scalability

========================================
IMPORTANT OUTPUT RULES
========================================

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT use:

\`\`\`json

Do NOT add explanations before or after JSON.

The response must exactly follow this structure:

{
  "technical": [
    {
      "question": "...",
      "difficulty": "Easy",
      "category": "...",
      "expectedAnswer": "...",
      "evaluationPoints": [
        "...",
        "...",
        "..."
      ],
      "followUpQuestions": [
        "...",
        "..."
      ]
    }
  ],

  "behavioral": [],

  "systemDesign": [],

  "project": [],

  "followUp": [],

  "scenarioBased": [],

  "problemSolving": [],

  "hrAndCulture": [],

  "roleSpecific": [],

  "advancedChallenge": []
}

========================================
FINAL REQUIREMENTS
========================================

technical = exactly 10
behavioral = exactly 5
systemDesign = exactly 5
project = exactly 5
followUp = exactly 5
scenarioBased = exactly 5
problemSolving = exactly 5
hrAndCulture = exactly 5
roleSpecific = exactly 5
advancedChallenge = exactly 5

TOTAL = 55 QUESTIONS.

Every question must contain:

question
difficulty
category
expectedAnswer
evaluationPoints
followUpQuestions
`;

  // =========================================================
  // 4. CALL GEMINI
  // =========================================================

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: prompt,

    config: {
      responseMimeType: "application/json",
    },
  });

  // =========================================================
  // 5. GET AI RESPONSE
  // =========================================================

  const text = response.text;

  if (!text) {
    throw new Error("AI did not return a response");
  }

  // =========================================================
  // 6. PARSE JSON
  // =========================================================

  let questions: GeneratedInterviewQuestions;

  try {
    questions = JSON.parse(text);
  } catch (error) {
    console.error("Gemini JSON:", text);

    throw new Error("AI returned invalid JSON");
  }

  // =========================================================
  // 7. VALIDATE QUESTION COUNTS
  // =========================================================

  const expectedCounts = {
    technical: 10,
    behavioral: 5,
    systemDesign: 5,
    project: 5,
    followUp: 5,
    scenarioBased: 5,
    problemSolving: 5,
    hrAndCulture: 5,
    roleSpecific: 5,
    advancedChallenge: 5,
  };

  for (const [category, expectedCount] of Object.entries(
    expectedCounts
  )) {
    const actualCount =
      questions[category as keyof GeneratedInterviewQuestions]?.length ?? 0;

    if (actualCount !== expectedCount) {
      throw new Error(
        `AI generated ${actualCount} ${category} questions. Expected ${expectedCount}.`
      );
    }
  }

  // =========================================================
  // 8. RETURN RESULT
  // =========================================================

  return {
    job: {
      id: job.id,
      title: job.title,
      company: job.company.name,
    },

    candidate: {
      experienceLevel,
    },

    interview: {
      type: interviewType,
    },

    totalQuestions: 55,

    questions,
  };
};

export const InterviewQuestionService = {
  generateInterviewQuestions,
};