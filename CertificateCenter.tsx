import { useMemo, useState } from 'react'
import { Award, CheckCircle2, Download, Search, ShieldCheck } from 'lucide-react'

type Course = { id: string; title: string; questions: { q: string; options: string[]; answer: number }[] }
const exams: Course[] = [
  { id:'music-foundations', title:'Music Foundations', questions:[
    {q:'What unit measures frequency?',options:['Decibels','Hertz','BPM','Metres'],answer:1},
    {q:'In common Western notation, how many semitones are in an octave?',options:['6','8','12','24'],answer:2},
    {q:'What does tempo describe?',options:['Loudness','Speed of the beat','Instrument tone','Pitch height'],answer:1},
    {q:'Which clef is commonly used for higher-pitched parts?',options:['Bass clef','Treble clef','Percussion clef only','No clef'],answer:1},
    {q:'What is a musical phrase?',options:['A musical idea or unit','A tuning peg','A type of microphone','A frequency unit'],answer:0}
  ]},
  { id:'western-theory', title:'Western Music Theory', questions:[
    {q:'What is the major-scale step pattern?',options:['W-H-W-W-H-W-W','W-W-H-W-W-W-H','H-W-W-H-W-W-W','W-W-W-H-W-W-H'],answer:1},
    {q:'How many semitones are in a perfect octave in 12-TET?',options:['7','10','12','14'],answer:2},
    {q:'Which triad contains root, major third and perfect fifth?',options:['Major','Minor','Diminished','Augmented'],answer:0},
    {q:'Which is the relative minor of C major?',options:['E minor','A minor','D minor','G minor'],answer:1},
    {q:'How many notes are in a basic triad?',options:['2','3','4','5'],answer:1}
  ]},
  { id:'hindustani-basics', title:'Hindustani Music Foundations', questions:[
    {q:'What does Aroha broadly describe?',options:['Descending movement','Ascending movement','A rhythmic cycle','A lyric form'],answer:1},
    {q:'What is a tala?',options:['A melodic scale','A rhythmic cycle framework','A tuning frequency','A type of instrument'],answer:1},
    {q:'What does saptak refer to?',options:['A group/register of seven swaras','A drum stroke','A composition lyric','A tempo marking'],answer:0},
    {q:'What is a raga?',options:['Only a scale','A melodic framework with characteristic rules and identity','A fixed chord progression','A time signature'],answer:1},
    {q:'What does Sam commonly indicate in tala?',options:['The first/landing point of the cycle','The highest note','A rest symbol','A tuning note'],answer:0}
  ]},
  { id:'carnatic-basics', title:'Carnatic Music Foundations', questions:[
    {q:'How many parent melakarta ragas are in the standard scheme?',options:['12','32','72','108'],answer:2},
    {q:'What are Arohanam and Avarohanam?',options:['Ascending and descending note movement','Two percussion instruments','Two tempo markings','Two lyric forms'],answer:0},
    {q:'What are gamakas?',options:['Ornamentations/inflections of notes','Only fixed pitches','Time signatures','Western chords'],answer:0},
    {q:'What is tala?',options:['A rhythmic cycle framework','A scale degree','A note name','A melodic ornament'],answer:0},
    {q:'What is a janya raga?',options:['A derived raga within the melakarta framework','A drum pattern','A western mode','A fixed chord'],answer:0}
  ]}
]
const STORAGE='musora.certificates.v1'
type RecordItem={id:string,name:string,course:string,date:string,score:number}
function readRecords():RecordItem[]{try{return JSON.parse(localStorage.getItem(STORAGE)||'[]')}catch{return []}}
export default function CertificateCenter(){
  const [courseId,setCourseId]=useState(exams[0].id)
  const [name,setName]=useState('')
  const [confirmName,setConfirmName]=useState('')
  const [completed,setCompleted]=useState(false)
  const [answers,setAnswers]=useState<number[]>([])
  const [submitted,setSubmitted]=useState(false)
  const [score,setScore]=useState(0)
  const [records,setRecords]=useState<RecordItem[]>(readRecords)
  const [lookup,setLookup]=useState('')
  const [lookupDone,setLookupDone]=useState(false)
  const [generated,setGenerated]=useState<RecordItem|null>(null)
  const course=useMemo(()=>exams.find(x=>x.id===courseId)!,[courseId])
  const passed=submitted&&score>=80
  const canIssue=passed&&completed&&name.trim().length>1&&name.trim()===confirmName.trim()
  function submitExam(){if(answers.length!==course.questions.length)return;const pct=Math.round(course.questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0)/course.questions.length*100);setScore(pct);setSubmitted(true)}
  function issue(){if(!canIssue)return;const record:RecordItem={id:'MUS-'+new Date().getFullYear()+'-'+Math.random().toString(36).slice(2,8).toUpperCase(),name:name.trim(),course:course.title,date:new Date().toISOString().slice(0,10),score};const next=[record,...records];setRecords(next);localStorage.setItem(STORAGE,JSON.stringify(next));setGenerated(record)}
  function download(){if(!generated)return;const w=window.open('','_blank');if(!w){alert('Allow pop-ups to print your certificate.');return}w.document.write(`<!doctype html><html><head><title>Musora Certificate</title><style>@page{size:A4 landscape;margin:10mm}*{box-sizing:border-box}body{margin:0;font-family:Georgia,serif;color:#292333}.frame{height:185mm;border:7px double #a88b55;padding:16mm;text-align:center;position:relative}.kicker{letter-spacing:4px;font:11px Arial;color:#80683e}.symbol{font-size:42px;color:#9b7c45;margin:10px}.title{font-size:34px;margin:8px}.muted{color:#766f7b}.student{font-size:34px;border-bottom:1px solid #b69a65;display:inline-block;min-width:55%;padding:8px 30px}.course{font-size:23px}.copy{max-width:650px;margin:12px auto}.bottom{display:flex;justify-content:space-between;align-items:end;text-align:center;margin-top:25px;font-size:12px}.signature{font-style:italic;font-size:21px}.seal{border:3px double #a88b55;border-radius:50%;width:90px;height:90px;display:grid;place-content:center;font:bold 12px Arial}.disclaimer{position:absolute;bottom:8mm;left:12mm;right:12mm;font:9px Arial;color:#756f79}</style></head><body><div class="frame"><div class="kicker">MUSORA · MUSIC EDUCATION FOR EVERYONE</div><div class="symbol">♫</div><div class="title">Certificate of Completion</div><p class="muted">This certificate is presented to</p><div class="student">${escapeHtml(generated.name)}</div><p class="muted">for completing the learning assessment in</p><div class="course">${escapeHtml(generated.course)}</div><p class="copy">having confirmed completion of the required learning material and achieved a passing score of ${generated.score}%.</p><div class="bottom"><div><div class="signature">Subhranka Chandra Pradhan</div><hr><b>Subhranka Chandra Pradhan</b><br>Founder &amp; Creator, Musora</div><div class="seal">MUSORA<br>✦</div><div><b>${new Date(generated.date+'T00:00:00').toLocaleDateString()}</b><br>Date of issue<br><br><b>${generated.id}</b><br>Certificate ID</div></div><div class="disclaimer">Issued by Musora, an independent learning project. This is a certificate of course completion, not an accredited academic qualification.</div></div><script>window.onload=()=>window.print()<\/script></body></html>`);w.document.close()}
  function escapeHtml(s:string){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))}
  return <section className="certificate-section" id="certificates"><div className="section-wrap">
    <div className="section-heading"><div><div className="eyebrow">LEARN · PRACTISE · ACHIEVE</div><h2>Your progress deserves<br/><span>to be celebrated.</span></h2></div><p>Complete the learning material, pass a short assessment and create a personalised Musora certificate.</p></div>
    <div className="certificate-layout"><div className="certificate-panel">
      <div className="certificate-panel-heading"><Award/><div><strong>Certificate assessment</strong><small>Pass mark: 80% · Five questions</small></div></div>
      <label className="certificate-label">Choose a course</label><select value={courseId} onChange={e=>{setCourseId(e.target.value);setAnswers([]);setSubmitted(false);setScore(0);setGenerated(null)}}>{exams.map(e=><option key={e.id} value={e.id}>{e.title}</option>)}</select>
      <div className="certificate-questions">{course.questions.map((q,i)=><fieldset key={q.q} className="certificate-question"><legend>{i+1}. {q.q}</legend>{q.options.map((o,j)=><label key={o}><input type="radio" name={`exam-${course.id}-${i}`} checked={answers[i]===j} disabled={submitted} onChange={()=>setAnswers(old=>{const a=[...old];a[i]=j;return a})}/>{o}</label>)}</fieldset>)}</div>
      {!submitted?<button className="button button-primary" disabled={answers.length!==course.questions.length} onClick={submitExam}>Submit final assessment</button>:<div className={passed?'certificate-result pass':'certificate-result fail'}><strong>{score}% — {passed?'Assessment passed':'Not passed yet'}</strong><p>{passed?'You reached the required score. Confirm that you completed the course material below.':'Review the lessons and try again. You need at least 80%.'}</p><button className="button button-outline" onClick={()=>{setAnswers([]);setSubmitted(false);setScore(0)}}>Retake assessment</button></div>}
      {passed&&<div className="certificate-eligibility"><label><input type="checkbox" checked={completed} onChange={e=>setCompleted(e.target.checked)}/> I confirm that I have completed the required lessons and practice for this course.</label><label className="certificate-label">Your full name</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your full name" autoComplete="name"/><label className="certificate-label">Confirm your full name</label><input value={confirmName} onChange={e=>setConfirmName(e.target.value)} placeholder="Type your name again"/><small>{confirmName&&name.trim()!==confirmName.trim()?'Names do not match.':''}</small><button className="button button-primary" disabled={!canIssue} onClick={issue}>Generate my certificate</button></div>}
      {generated&&<div className="certificate-result pass"><CheckCircle2/><strong>Certificate created: {generated.id}</strong><button className="button button-primary" onClick={download}><Download size={16}/> Download / Save as PDF</button><p>In the print dialog, choose “Save as PDF”.</p></div>}
    </div><aside className="certificate-side"><div className="certificate-side-icon"><ShieldCheck size={30}/></div><h3>Issued in your name</h3><p>Each certificate includes the learner's name, course, issue date, assessment score, unique ID and founder credit.</p><div className="certificate-founder"><div className="signature-script">Subhranka Chandra Pradhan</div><strong>Subhranka Chandra Pradhan</strong><small>Founder &amp; Creator</small></div><div className="certificate-note">The signature is a decorative typeset rendering of the founder's name, not a handwritten or legally authorised signature.</div></aside></div>
    <div className="certificate-verify"><div><h3>Check a certificate on this device</h3><p>Look up a certificate ID saved in this browser.</p></div><div className="certificate-lookup"><input value={lookup} onChange={e=>{setLookup(e.target.value);setLookupDone(false)}} placeholder="MUS-2026-ABC123"/><button className="button button-outline" onClick={()=>setLookupDone(true)}><Search size={15}/> Verify</button></div>{lookupDone&&<p className="certificate-verification">{records.find(r=>r.id.toLowerCase()===lookup.trim().toLowerCase())?`Certificate found: ${records.find(r=>r.id.toLowerCase()===lookup.trim().toLowerCase())!.name} — ${records.find(r=>r.id.toLowerCase()===lookup.trim().toLowerCase())!.course}.`:'No matching certificate was found in this browser’s local records.'}</p>}</div>
  </div></section>
}
