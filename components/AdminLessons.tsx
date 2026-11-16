"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Lesson = {
  id: string;
  module: string;
  title: string;
  level: string | null;
  question_type?: string | null;
  content?: any;
  created_at: string;
};

const MODULES = ["reading", "listening", "writing", "speaking", "general", "cefr", "video"] as const;
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

const READING_TYPES = [
  "Note Completion", "Identifying Information (True/False/Not Given)", "Matching Paragraph Information",
  "Matching Headings", "Summary Completion", "Multiple Choice", "Matching Features", "Table Completion",
  "Diagram Label Completion", "Yes/No/Not Given", "Sentence Completion", "Flow-chart Completion",
  "Short Answer Question",
];
const LISTENING_TYPES = [
  "Form Completion", "Note Completion", "Table Completion", "Multiple Choice", "Map/Plan/Diagram Labeling",
  "Flow-chart Completion", "Matching", "Sentence Completion", "Summary Completion", "Short Answer Question",
];
const WRITING_TYPES = [
  "Task 1 - Line Graph (with years)", "Task 1 - Line Graph (without years)", "Task 1 - Bar Chart",
  "Task 1 - Map", "Task 1 - Process", "Task 2 - Opinion Essay", "Task 2 - Problem and Solution",
  "Task 2 - Advantages and Disadvantages", "Task 2 - Discussion",
];
const SPEAKING_TYPES: Record<string, string> = {
  "1": "Part 1 - Interview", "2": "Part 2 - Long Turn", "3": "Part 3 - Discussion",
};

type Q = { prompt: string; options: string[]; correct: number };
type F = { label: string; answer: string };

function emptyQ(nOpts = 4): Q {
  return { prompt: "", options: Array(nOpts).fill(""), correct: 0 };
}
function emptyF(): F {
  return { label: "", answer: "" };
}

export default function AdminLessons({ initialLessons }: { initialLessons: Lesson[] }) {
  const supabase = createClient();
  const [lessons, setLessons] = useState(initialLessons);

  const [module, setModule] = useState<(typeof MODULES)[number]>("reading");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("B1");
  const [questionType, setQuestionType] = useState("");
  const [customType, setCustomType] = useState(false);

  const [passage, setPassage] = useState("");
  const [includeMcq, setIncludeMcq] = useState(true);
  const [includeFill, setIncludeFill] = useState(false);
  const [cefrHasPassage, setCefrHasPassage] = useState(false);

  const [sectionLabel, setSectionLabel] = useState("");
  const [partNumber, setPartNumber] = useState("2");

  const [intro, setIntro] = useState("");
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [cueCard, setCueCard] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [questions, setQuestions] = useState<Q[]>([emptyQ()]);
  const [fields, setFields] = useState<F[]>([emptyF()]);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isReadingLike = module === "reading" || module === "general" || module === "cefr";
  const usesPassage = module === "reading" || (module === "cefr" && cefrHasPassage);
  const typeOptions = module === "reading" ? READING_TYPES : module === "listening" ? LISTENING_TYPES : [];

  function resetForm() {
    setTitle(""); setQuestionType(""); setCustomType(false); setPassage(""); setIntro(""); setTranscript("");
    setPrompt(""); setCueCard(""); setYoutubeId(""); setDescription("");
    setQuestions([emptyQ()]); setFields([emptyF()]);
    setSectionLabel(""); setPartNumber("2"); setImageUrl("");
    setIncludeMcq(true); setIncludeFill(false);
  }

  async function handleImageUpload(file: File) {
    setUploadingImage(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("writing-images").upload(path, file);
    setUploadingImage(false);
    if (uploadError) { setError(uploadError.message); return; }
    const { data } = supabase.storage.from("writing-images").getPublicUrl(path);
    setImageUrl(data.publicUrl);
  }

  function buildContent(): any {
    if (module === "writing") return { prompt, image_url: imageUrl || undefined };
    if (module === "speaking") return { cue_card: cueCard, part: Number(partNumber) };
    if (module === "video") return { youtube_id: youtubeId, description };

    const base: any = {};
    if (module === "listening") {
      base.intro = intro;
      base.transcript = transcript;
      base.section_label = sectionLabel;
    }
    if (usesPassage) base.passage = passage;
    if (module === "reading") base.section_label = sectionLabel;

    if (includeMcq) {
      base.questions = questions.map((q, i) => ({ id: `q${i + 1}`, prompt: q.prompt, options: q.options, correct: q.correct }));
    }
    if (includeFill || module === "listening") {
      base.fields = fields.map((f, i) => ({ id: `f${i + 1}`, label: f.label, answer: f.answer }));
    }
    return base;
  }

  async function handleAdd() {
    setError("");
    if (!title.trim()) { setError("Sarlavha kiriting."); return; }
    const content = buildContent();
    setSaving(true);
    const { data, error: insertError } = await supabase
      .from("lessons")
      .insert({ module, title, level, question_type: questionType || null, content })
      .select("id, module, title, level, question_type, content, created_at")
      .single();
    setSaving(false);
    if (insertError) { setError(insertError.message); return; }
    setLessons([data, ...lessons]);
    resetForm();
  }

  async function handleGenerateAudio(lessonId: string) {
    const res = await fetch("/api/generate-audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId }),
    });
    const data = await res.json();
    if (!res.ok) { alert(data.error ?? "Xatolik"); return; }
    setLessons(lessons.map((l) => (l.id === lessonId ? { ...l, content: { ...l.content, audio_url: data.audioUrl } } : l)));
  }

  async function handleDelete(id: string) {
    await supabase.from("lessons").delete().eq("id", id);
    setLessons(lessons.filter((l) => l.id !== id));
  }

  function updateQ(i: number, patch: Partial<Q>) {
    setQuestions(questions.map((q, idx) => (idx === i ? { ...q, ...patch } : q)));
  }
  function updateOpt(i: number, oi: number, val: string) {
    const opts = [...questions[i].options];
    opts[oi] = val;
    updateQ(i, { options: opts });
  }
  function addOpt(i: number) {
    updateQ(i, { options: [...questions[i].options, ""] });
  }
  function removeOpt(i: number, oi: number) {
    const opts = questions[i].options.filter((_, idx) => idx !== oi);
    const correct = questions[i].correct >= opts.length ? 0 : questions[i].correct;
    updateQ(i, { options: opts, correct });
  }
  function updateF(i: number, patch: Partial<F>) {
    setFields(fields.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }

  const inputCls = "w-full mt-1 mb-3 bg-bg2 border border-border rounded-lg px-3 py-2 text-[13.5px] outline-none focus:border-blue";
  const labelCls = "text-xs text-muted";

  return (
    <div className="grid grid-cols-2 gap-5 max-[900px]:grid-cols-1">
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="text-[15px] font-bold mb-3">Yangi dars qoshish</div>

        <label className={labelCls}>Modul</label>
        <select value={module} onChange={(e) => { setModule(e.target.value as any); resetForm(); }} className={inputCls}>
          {MODULES.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <label className={labelCls}>Sarlavha</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />

        {(module === "reading" || module === "listening") && (
          <>
            <label className={labelCls}>{module === "reading" ? "Passage nomi (masalan: Passage 5)" : "Section nomi (masalan: Section 5)"}</label>
            <input value={sectionLabel} onChange={(e) => setSectionLabel(e.target.value)} className={inputCls} />
          </>
        )}

        {module === "speaking" && (
          <>
            <label className={labelCls}>Part</label>
            <select
              value={partNumber}
              onChange={(e) => { setPartNumber(e.target.value); setQuestionType(SPEAKING_TYPES[e.target.value]); }}
              className={inputCls}
            >
              <option value="1">Part 1 (~30 soniya)</option>
              <option value="2">Part 2 (~2 daqiqa)</option>
              <option value="3">Part 3 (~50 soniya)</option>
            </select>
          </>
        )}

        {module === "writing" && (
          <>
            <label className={labelCls}>Topshiriq turi</label>
            <select value={questionType} onChange={(e) => setQuestionType(e.target.value)} className={inputCls}>
              <option value="">— tanlang —</option>
              {WRITING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            {questionType.startsWith("Task 1") && (
              <>
                <label className={labelCls}>Grafik/diagramma rasmi (ixtiyoriy)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="w-full mt-1 mb-2 text-[12.5px]"
                />
                {uploadingImage && <p className="text-xs text-muted mb-2">Yuklanmoqda...</p>}
                {imageUrl && <img src={imageUrl} alt="preview" className="max-w-full rounded-lg border border-border mb-2" />}
              </>
            )}
          </>
        )}

        {module !== "video" && module !== "writing" && module !== "speaking" && (
          <>
            <label className={labelCls}>Daraja</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className={inputCls}>
              {LEVELS.map((lv) => <option key={lv} value={lv}>{lv}</option>)}
            </select>
          </>
        )}

        {(module === "reading" || module === "listening") && (
          <>
            <label className={labelCls}>Savol turi (rasmiy IELTS royxati)</label>
            {!customType ? (
              <select
                value={questionType}
                onChange={(e) => { if (e.target.value === "__custom") setCustomType(true); else setQuestionType(e.target.value); }}
                className={inputCls}
              >
                <option value="">— tanlang —</option>
                {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                <option value="__custom">Boshqa (qolda yozish)...</option>
              </select>
            ) : (
              <input value={questionType} onChange={(e) => setQuestionType(e.target.value)} placeholder="Savol turini yozing" className={inputCls} />
            )}
          </>
        )}

        {module === "general" && (
          <>
            <label className={labelCls}>Mavzu nomi (masalan: Modal verbs)</label>
            <input value={questionType} onChange={(e) => setQuestionType(e.target.value)} className={inputCls} />
          </>
        )}

        {module === "cefr" && (
          <>
            <label className={labelCls}>Mavzu nomi</label>
            <input value={questionType} onChange={(e) => setQuestionType(e.target.value)} className={inputCls} />
            <label className="flex items-center gap-2 mb-3 text-[13px] mt-1">
              <input type="checkbox" checked={cefrHasPassage} onChange={(e) => setCefrHasPassage(e.target.checked)} />
              Reading turi (passage bilan)
            </label>
          </>
        )}

        {usesPassage && (
          <>
            <label className={labelCls}>Passage (matn)</label>
            <textarea rows={6} value={passage} onChange={(e) => setPassage(e.target.value)} className={inputCls} />
          </>
        )}

        {module === "listening" && (
          <>
            <label className={labelCls}>Intro (qisqa izoh)</label>
            <textarea rows={2} value={intro} onChange={(e) => setIntro(e.target.value)} className={inputCls} />
            <label className={labelCls}>Transcript (audio yaratish uchun matn)</label>
            <textarea rows={4} value={transcript} onChange={(e) => setTranscript(e.target.value)} className={inputCls} />
          </>
        )}

        {module === "writing" && (
          <>
            <label className={labelCls}>Topshiriq matni (prompt)</label>
            <textarea rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)} className={inputCls} />
          </>
        )}

        {module === "speaking" && (
          <>
            <label className={labelCls}>Cue Card matni</label>
            <textarea rows={4} value={cueCard} onChange={(e) => setCueCard(e.target.value)} className={inputCls} />
          </>
        )}

        {module === "video" && (
          <>
            <label className={labelCls}>YouTube video ID</label>
            <input value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} className={inputCls} />
            <label className={labelCls}>Qisqa izoh</label>
            <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
          </>
        )}

        {isReadingLike && (
          <div className="flex gap-4 mb-3">
            <label className="flex items-center gap-2 text-[13px]">
              <input type="checkbox" checked={includeMcq} onChange={(e) => setIncludeMcq(e.target.checked)} />
              Kop variantli savollar
            </label>
            <label className="flex items-center gap-2 text-[13px]">
              <input type="checkbox" checked={includeFill} onChange={(e) => setIncludeFill(e.target.checked)} />
              Toldirish savollari
            </label>
          </div>
        )}

        {(includeFill || module === "listening") && (
          <div className="mb-3">
            <label className={labelCls}>Boshliqlar (label + togri javob)</label>
            {fields.map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input placeholder="Label (masalan: Name:)" value={f.label} onChange={(e) => updateF(i, { label: e.target.value })}
                  className="flex-1 bg-bg2 border border-border rounded-lg px-2 py-1.5 text-[12.5px]" />
                <input placeholder="Togri javob" value={f.answer} onChange={(e) => updateF(i, { answer: e.target.value })}
                  className="flex-1 bg-bg2 border border-border rounded-lg px-2 py-1.5 text-[12.5px]" />
                <button onClick={() => setFields(fields.filter((_, idx) => idx !== i))} className="text-xs text-[#e05a5a]">✕</button>
              </div>
            ))}
            <button onClick={() => setFields([...fields, emptyF()])} className="text-xs text-blue">+ boshliq qoshish</button>
          </div>
        )}

        {isReadingLike && includeMcq && (
          <div className="mb-3">
            <label className={labelCls}>
              Kop variantli savollar (True/False/NG va Yes/No uchun 3 ta variantgacha olib tashlang)
            </label>
            {questions.map((q, i) => (
              <div key={i} className="border border-border rounded-lg p-3 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] text-muted">Savol {i + 1}</span>
                  <button onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))} className="text-xs text-[#e05a5a]">✕ olib tashlash</button>
                </div>
                <input placeholder="Savol matni" value={q.prompt} onChange={(e) => updateQ(i, { prompt: e.target.value })}
                  className="w-full mb-2 bg-bg2 border border-border rounded-lg px-2 py-1.5 text-[12.5px]" />
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2 mb-1.5">
                    <input type="radio" checked={q.correct === oi} onChange={() => updateQ(i, { correct: oi })} />
                    <input
                      placeholder={`Variant ${oi + 1}`}
                      value={opt}
                      onChange={(e) => updateOpt(i, oi, e.target.value)}
                      className="flex-1 bg-bg2 border border-border rounded-lg px-2 py-1.5 text-[12.5px]"
                    />
                    {q.options.length > 2 && (
                      <button onClick={() => removeOpt(i, oi)} className="text-xs text-[#e05a5a]">✕</button>
                    )}
                  </div>
                ))}
                <button onClick={() => addOpt(i)} className="text-xs text-blue mt-1">+ variant qoshish</button>
                <div className="flex gap-1.5 mt-2">
                  <button onClick={() => updateQ(i, { options: ["TRUE", "FALSE", "NOT GIVEN"], correct: 0 })} className="text-[10px] border border-border rounded px-1.5 py-0.5 text-muted">T/F/NG</button>
                  <button onClick={() => updateQ(i, { options: ["YES", "NO", "NOT GIVEN"], correct: 0 })} className="text-[10px] border border-border rounded px-1.5 py-0.5 text-muted">Y/N/NG</button>
                </div>
              </div>
            ))}
            <button onClick={() => setQuestions([...questions, emptyQ()])} className="text-xs text-blue">+ savol qoshish</button>
          </div>
        )}

        {error && <p className="text-sm text-[#e05a5a] mb-2">{error}</p>}
        <button onClick={handleAdd} disabled={saving || !title} className="bg-grad text-white text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-40">
          {saving ? "Saqlanmoqda..." : "Qoshish"}
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="text-[15px] font-bold mb-3">Mavjud darslar ({lessons.length})</div>
        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
          {lessons.map((l) => (
            <div key={l.id} className="flex justify-between items-center border-b border-border py-2.5 last:border-none">
              <div>
                <div className="text-[13px] font-semibold">{l.title}</div>
                <div className="text-[11px] text-muted mt-0.5">
                  {l.module}
                  {(l.module === "reading" || l.module === "listening") && l.content?.section_label
                    ? ` · ${l.content.section_label}`
                    : l.module === "speaking" && l.content?.part
                    ? ` · Part ${l.content.part}`
                    : ` · ${l.level ?? "—"}`}
                  {" · "}{l.question_type ?? "—"}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {l.module === "listening" && (
                  l.content?.audio_url ? (
                    <span className="text-xs text-good">🔊 tayyor</span>
                  ) : (
                    <button onClick={() => handleGenerateAudio(l.id)} className="text-xs text-blue hover:underline">
                      🔊 audio yaratish
                    </button>
                  )
                )}
                <button onClick={() => handleDelete(l.id)} className="text-xs text-[#e05a5a] hover:underline">
                  ochirish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
