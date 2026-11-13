import AiTutorChat from "@/components/AiTutorChat";

export default function AiPage() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="font-sora text-xl font-bold">🤝 AI English Tutor</h1>
        <p className="text-muted text-sm mt-1">Grammatika, tarjima va mashqlar bo'yicha yordamchi</p>
      </div>
      <AiTutorChat />
    </div>
  );
}
