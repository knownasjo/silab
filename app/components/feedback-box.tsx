export type Feedback = {
  ok: boolean;
  message: string;
  warnings?: string[];
} | null;

export default function FeedbackBox({ feedback }: { feedback: Feedback }) {
  if (!feedback) return null;

  if (feedback.ok && feedback.warnings?.length)
    return (
      <div
        role="status"
        className="space-y-2 rounded-xl bg-[#FFF8DD] p-3 text-sm font-semibold text-[#B58100]"
      >
        <p>{feedback.message}</p>
        <ul className="list-disc space-y-1 pl-5">
          {feedback.warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      </div>
    );

  return (
    <p
      role={feedback.ok ? "status" : "alert"}
      className={`rounded-xl p-3 text-sm font-semibold ${feedback.ok ? "bg-[#E8FFF3] text-[#50CD89]" : "bg-[#FFF5F8] text-[#F1416C]"}`}
    >
      {feedback.message}
    </p>
  );
}
