export type Feedback = { ok: boolean; message: string } | null;

export default function FeedbackBox({ feedback }: { feedback: Feedback }) {
  if (!feedback) return null;

  return (
    <p
      role={feedback.ok ? "status" : "alert"}
      className={`rounded-xl p-3 text-sm font-semibold ${feedback.ok ? "bg-[#E8FFF3] text-[#50CD89]" : "bg-[#FFF5F8] text-[#F1416C]"}`}
    >
      {feedback.message}
    </p>
  );
}
