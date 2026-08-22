import { GoogleGenAI } from "@google/genai";
import { envVars } from "../../../config/env";
import { prisma } from "../../../lib/prisma";


const ai = new GoogleGenAI({
  apiKey: envVars.GEMINI_API_KEY!,
});

const startInterview = async (
  candidateProfileId: string,
  jobId: string,
  experienceLevel: string,
  interviewType: string
) => {

  // Get job
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      requiredSkills: true,
    },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  // Create interview session
  const session = await prisma.interviewSession.create({
    data: {
      candidateProfileId,
      jobId,
      experienceLevel,
      interviewType,
    },
  });

  // Generate first question
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",

    contents: `
You are an interviewer.

Job:
${job.title}

Description:
${job.description}

Required skills:
${job.requiredSkills
  .map((skill) => skill.name)
  .join(", ")}

Experience:
${experienceLevel}

Interview type:
${interviewType}

Generate ONE interview question.

Return JSON:

{
  "question": "...",
  "difficulty": "Easy | Medium | Hard",
  "category": "..."
}
`,
  });

  const text = response.text;

  if (!text) {
    throw new Error("AI did not return question");
  }

  const question = JSON.parse(
    text.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );

  return {
    sessionId: session.id,
    questionNumber: 1,
    question,
  };
};


const evaluateAnswer = async (
  sessionId: string,
  answer: string
) => {

  const session =
    await prisma.interviewSession.findUnique({
      where: {
        id: sessionId,
      },
      include: {
        job: {
          include: {
            requiredSkills: true,
          },
        },
        answers: true,
      },
    });

  if (!session) {
    throw new Error("Interview session not found");
  }

  const previousAnswers = session.answers
    .map(
      (item) =>
        `Question: ${item.question}
Answer: ${item.candidateAnswer}`
    )
    .join("\n");

  const currentQuestion =
    session.answers.length === 0
      ? "First interview question"
      : session.answers[
          session.answers.length - 1
        ].question;

  const prompt = `
You are an expert technical interviewer.

Job:
${(session.job as { title: string }).title}

Required skills:
${(session.job as { requiredSkills: Array<{ name: string }> }).requiredSkills
  .map((skill) => skill.name)
  .join(", ")}

Candidate experience:
${session.experienceLevel}

Current question:
${currentQuestion}

Candidate answer:
${answer}

Evaluate the candidate.

Give scores from 0 to 100:

Technical Accuracy
Communication
Confidence
Completeness

Calculate Overall Score.

Give short useful feedback.

Then generate the next interview question.

Return ONLY JSON:

{
  "evaluation": {
    "technicalAccuracy": 82,
    "communication": 76,
    "confidence": 80,
    "completeness": 71,
    "overall": 77,
    "feedback": "..."
  },
  "nextQuestion": {
    "question": "...",
    "difficulty": "Medium",
    "category": "Backend"
  }
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("AI evaluation failed");
  }

  const result = JSON.parse(
    text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );

  // Save answer
  await prisma.interviewAnswer.create({
    data: {
      sessionId,

      question: currentQuestion,

      candidateAnswer: answer,

      technicalAccuracy:
        result.evaluation.technicalAccuracy,

      communication:
        result.evaluation.communication,

      confidence:
        result.evaluation.confidence,

      completeness:
        result.evaluation.completeness,

      overallScore:
        result.evaluation.overall,

      feedback:
        result.evaluation.feedback,
    },
  });

  return result;
};

export const InterviewQuestionService = {
  startInterview,
  evaluateAnswer,
};