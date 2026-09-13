import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Conversations
   * const conversations = await prisma.conversation.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Conversations
 * const conversations = await prisma.conversation.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Conversations
  * const conversations = await prisma.conversation.findMany()
  * ```
  */
    get conversation(): Prisma.ConversationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.message`: Exposes CRUD operations for the **Message** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Messages
      * const messages = await prisma.message.findMany()
      * ```
      */
    get message(): Prisma.MessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.conversationParticipant`: Exposes CRUD operations for the **ConversationParticipant** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ConversationParticipants
      * const conversationParticipants = await prisma.conversationParticipant.findMany()
      * ```
      */
    get conversationParticipant(): Prisma.ConversationParticipantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notifications
      * const notifications = await prisma.notification.findMany()
      * ```
      */
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.reviewComplaint`: Exposes CRUD operations for the **ReviewComplaint** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ReviewComplaints
      * const reviewComplaints = await prisma.reviewComplaint.findMany()
      * ```
      */
    get reviewComplaint(): Prisma.ReviewComplaintDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.penalty`: Exposes CRUD operations for the **Penalty** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Penalties
      * const penalties = await prisma.penalty.findMany()
      * ```
      */
    get penalty(): Prisma.PenaltyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.complaintEvidence`: Exposes CRUD operations for the **ComplaintEvidence** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ComplaintEvidences
      * const complaintEvidences = await prisma.complaintEvidence.findMany()
      * ```
      */
    get complaintEvidence(): Prisma.ComplaintEvidenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.user`: Exposes CRUD operations for the **User** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Users
      * const users = await prisma.user.findMany()
      * ```
      */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.session`: Exposes CRUD operations for the **Session** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sessions
      * const sessions = await prisma.session.findMany()
      * ```
      */
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.account`: Exposes CRUD operations for the **Account** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Accounts
      * const accounts = await prisma.account.findMany()
      * ```
      */
    get account(): Prisma.AccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Verifications
      * const verifications = await prisma.verification.findMany()
      * ```
      */
    get verification(): Prisma.VerificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.candidateProfile`: Exposes CRUD operations for the **CandidateProfile** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CandidateProfiles
      * const candidateProfiles = await prisma.candidateProfile.findMany()
      * ```
      */
    get candidateProfile(): Prisma.CandidateProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.candidateEmbedding`: Exposes CRUD operations for the **CandidateEmbedding** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CandidateEmbeddings
      * const candidateEmbeddings = await prisma.candidateEmbedding.findMany()
      * ```
      */
    get candidateEmbedding(): Prisma.CandidateEmbeddingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.candidateSkill`: Exposes CRUD operations for the **CandidateSkill** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CandidateSkills
      * const candidateSkills = await prisma.candidateSkill.findMany()
      * ```
      */
    get candidateSkill(): Prisma.CandidateSkillDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.candidateEducation`: Exposes CRUD operations for the **CandidateEducation** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CandidateEducations
      * const candidateEducations = await prisma.candidateEducation.findMany()
      * ```
      */
    get candidateEducation(): Prisma.CandidateEducationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.candidateProject`: Exposes CRUD operations for the **CandidateProject** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CandidateProjects
      * const candidateProjects = await prisma.candidateProject.findMany()
      * ```
      */
    get candidateProject(): Prisma.CandidateProjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.candidateCertification`: Exposes CRUD operations for the **CandidateCertification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CandidateCertifications
      * const candidateCertifications = await prisma.candidateCertification.findMany()
      * ```
      */
    get candidateCertification(): Prisma.CandidateCertificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.company`: Exposes CRUD operations for the **Company** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Companies
      * const companies = await prisma.company.findMany()
      * ```
      */
    get company(): Prisma.CompanyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.job`: Exposes CRUD operations for the **Job** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Jobs
      * const jobs = await prisma.job.findMany()
      * ```
      */
    get job(): Prisma.JobDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.jobSkill`: Exposes CRUD operations for the **JobSkill** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more JobSkills
      * const jobSkills = await prisma.jobSkill.findMany()
      * ```
      */
    get jobSkill(): Prisma.JobSkillDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.jobMatch`: Exposes CRUD operations for the **JobMatch** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more JobMatches
      * const jobMatches = await prisma.jobMatch.findMany()
      * ```
      */
    get jobMatch(): Prisma.JobMatchDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.skillGapAnalysis`: Exposes CRUD operations for the **SkillGapAnalysis** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SkillGapAnalyses
      * const skillGapAnalyses = await prisma.skillGapAnalysis.findMany()
      * ```
      */
    get skillGapAnalysis(): Prisma.SkillGapAnalysisDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.jobApplication`: Exposes CRUD operations for the **JobApplication** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more JobApplications
      * const jobApplications = await prisma.jobApplication.findMany()
      * ```
      */
    get jobApplication(): Prisma.JobApplicationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.applicationStatusHistory`: Exposes CRUD operations for the **ApplicationStatusHistory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ApplicationStatusHistories
      * const applicationStatusHistories = await prisma.applicationStatusHistory.findMany()
      * ```
      */
    get applicationStatusHistory(): Prisma.ApplicationStatusHistoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.interviewSession`: Exposes CRUD operations for the **InterviewSession** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InterviewSessions
      * const interviewSessions = await prisma.interviewSession.findMany()
      * ```
      */
    get interviewSession(): Prisma.InterviewSessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.interviewAnswer`: Exposes CRUD operations for the **InterviewAnswer** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InterviewAnswers
      * const interviewAnswers = await prisma.interviewAnswer.findMany()
      * ```
      */
    get interviewAnswer(): Prisma.InterviewAnswerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.interview`: Exposes CRUD operations for the **Interview** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Interviews
      * const interviews = await prisma.interview.findMany()
      * ```
      */
    get interview(): Prisma.InterviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.applicationAssistant`: Exposes CRUD operations for the **ApplicationAssistant** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ApplicationAssistants
      * const applicationAssistants = await prisma.applicationAssistant.findMany()
      * ```
      */
    get applicationAssistant(): Prisma.ApplicationAssistantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Resumes
      * const resumes = await prisma.resume.findMany()
      * ```
      */
    get resume(): Prisma.ResumeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.resumeAnalysis`: Exposes CRUD operations for the **ResumeAnalysis** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ResumeAnalyses
      * const resumeAnalyses = await prisma.resumeAnalysis.findMany()
      * ```
      */
    get resumeAnalysis(): Prisma.ResumeAnalysisDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.resumeChunk`: Exposes CRUD operations for the **ResumeChunk** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ResumeChunks
      * const resumeChunks = await prisma.resumeChunk.findMany()
      * ```
      */
    get resumeChunk(): Prisma.ResumeChunkDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.resumeSummary`: Exposes CRUD operations for the **ResumeSummary** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ResumeSummaries
      * const resumeSummaries = await prisma.resumeSummary.findMany()
      * ```
      */
    get resumeSummary(): Prisma.ResumeSummaryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map