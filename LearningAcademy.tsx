import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3, GraduationCap, Search, Sparkles } from 'lucide-react'

type Lesson = { id: string; title: string; duration: string; summary: string; sections: { heading: string; body: string; example?: string; note?: string }[]; question: string; answers: string[]; correct: number; explanation: string }
type Module = { id: string; tradition: 'Foundations' | 'Western' | 'Hindustani' | 'Carnatic'; level: string; title: string; description: string; lessons: Lesson[] }

const modules: Module[] = [
  { id:'foundations', tradition:'Foundations', level:'Beginner', title:'The language of music', description:'Start with sound, pitch, notes, octaves and the musical alphabet.', lessons:[
    { id:'sound', title:'What is sound and music?', duration:'8 min', summary:'Understand vibration, frequency, pitch and how organised sound becomes music.', sections:[
      {heading:'Sound begins with vibration',body:'Sound is a mechanical wave produced when an object vibrates. The vibration disturbs the surrounding medium, such as air, and the disturbance travels as a sound wave. A listener hears it when those waves cause the eardrum to vibrate.',example:'A guitar string vibrates after it is plucked. The vibrating string makes the air around it vibrate, and the guitar body helps transfer that energy into the room.'},
      {heading:'Frequency and pitch',body:'Frequency describes how many complete cycles of a repeating wave occur each second. It is measured in hertz (Hz). For many musical sounds, a higher fundamental frequency is heard as a higher pitch, and a lower fundamental frequency as a lower pitch.',example:'The standard tuning reference A4 is commonly set to 440 Hz. This is a tuning convention, not a universal law of nature.',note:'Real musical tones often contain several frequencies at once: a fundamental and overtones. Timbre helps us distinguish instruments even when they play the same pitch.'},
      {heading:'Music organises sound',body:'Music uses elements such as pitch, rhythm, duration, dynamics and timbre. Different musical cultures organise these elements in different ways. This academy studies both shared fundamentals and tradition-specific systems.'}
    ], question:'What unit is used to measure frequency?', answers:['Decibels (dB)','Hertz (Hz)','Beats per minute (BPM)','Metres'], correct:1, explanation:'Frequency is measured in hertz (Hz), meaning cycles per second. Decibels describe level, while BPM describes tempo.'},
    { id:'alphabet', title:'The musical alphabet', duration:'9 min', summary:'Learn the seven letter names used in standard Western note naming.', sections:[
      {heading:'Seven letter names',body:'The standard Western note alphabet uses seven letters: A, B, C, D, E, F and G. After G, the sequence begins again at A in the next octave.',example:'… A – B – C – D – E – F – G – A – B …'},
      {heading:'Natural notes and the keyboard',body:'On a piano, the white keys are labelled with the natural note names A through G. The pattern repeats across the keyboard. Black keys are named using sharps or flats, depending on musical context.',note:'A note name alone does not specify its octave. C4 and C5 are both C, but they refer to different registers.'},
      {heading:'Enharmonic note names',body:'Some pitches can have more than one written name. For example, on a standard equal-tempered keyboard, C-sharp and D-flat sound at the same key. Their spelling depends on the key and musical function.'}
    ], question:'Which note name follows G in the repeating musical alphabet?', answers:['H','A','B-flat','C'], correct:1, explanation:'The seven-letter sequence repeats after G, so the next letter is A.'},
    { id:'octaves', title:'Notes, octaves and the piano', duration:'10 min', summary:'See how note names repeat in higher and lower registers.', sections:[
      {heading:'What is an octave?',body:'An octave is the interval between two pitches where the higher pitch has twice the frequency of the lower pitch. The notes share the same letter name in standard Western note naming.',example:'A4 is 440 Hz; A5 is 880 Hz. A5 is one octave above A4.'},
      {heading:'Finding the repeating pattern',body:'Look at the piano keyboard: groups of two and three black keys repeat. The white key immediately to the left of a group of two black keys is C. This repeating layout helps you navigate the instrument.',note:'Middle C is commonly called C4 in scientific pitch notation, although octave-number conventions can vary between software and regions.'}
    ], question:'If a note has a frequency of 220 Hz, what is the frequency one octave above?', answers:['110 Hz','330 Hz','440 Hz','880 Hz'], correct:2, explanation:'An octave above doubles the frequency: 220 × 2 = 440 Hz.'}
  ]},
  { id:'western-rhythm', tradition:'Western', level:'Beginner', title:'Rhythm, beat and meter', description:'Learn pulse, tempo, note durations, rests and time signatures.', lessons:[
    { id:'pulse-tempo', title:'Pulse, beat and tempo', duration:'9 min', summary:'Understand the steady pulse and how tempo describes its speed.', sections:[
      {heading:'The beat is a musical pulse',body:'A beat is a regular pulse that listeners can often tap along with. Not every musical style makes the beat equally obvious, and performers may stretch or compress timing expressively.',example:'Try tapping evenly while counting 1, 2, 3, 4. Each tap can represent one beat.'},
      {heading:'Tempo',body:'Tempo describes the speed of the beat. It is often expressed in beats per minute (BPM). A tempo of 60 BPM means one beat per second; 120 BPM means two beats per second.',note:'Tempo words such as Allegro and Adagio are broad performance indications. Exact BPM ranges vary by context and convention.'}
    ], question:'At 120 BPM, how many beats occur in one minute?', answers:['60','90','120','240'], correct:2, explanation:'BPM means beats per minute, so 120 BPM means 120 beats in one minute.'},
    { id:'note-values', title:'Note values and rests', duration:'12 min', summary:'Compare common written durations in a simple meter.', sections:[
      {heading:'Relative durations',body:'In a common introductory system, a whole note lasts as long as two half notes, four quarter notes or eight eighth notes. These are relative relationships; the actual time in seconds depends on the tempo and meter.',example:'In 4/4 time at a quarter-note beat, a quarter note lasts one beat and an eighth note lasts half a beat.'},
      {heading:'Rests',body:'A rest indicates silence for a specified notated duration. Note values and rest values correspond: a quarter rest has the same notated duration as a quarter note.',note:'Dots add half of a note or rest’s original value. A dotted quarter note therefore equals a quarter note plus an eighth note.'}
    ], question:'How many eighth notes have the same notated duration as one quarter note?', answers:['One','Two','Four','Eight'], correct:1, explanation:'A quarter note divides into two equal eighth notes.'},
    { id:'time-signatures', title:'Understanding time signatures', duration:'11 min', summary:'Read the top and bottom numbers in a time signature.', sections:[
      {heading:'What the numbers mean',body:'A time signature appears at the beginning of a notated passage. In a simple time signature such as 4/4, the top number indicates four beats in each bar, while the bottom number indicates that the quarter note is the beat unit.',example:'In 3/4, there are three quarter-note beats per bar. In 6/8, six eighth-note units are grouped in each bar, commonly felt as two larger dotted-quarter pulses.'},
      {heading:'Simple and compound meter',body:'In simple meter, each beat normally divides into two equal parts. In compound meter, each beat normally divides into three. 2/4, 3/4 and 4/4 are common simple meters; 6/8, 9/8 and 12/8 are common compound meters.'}
    ], question:'In a 3/4 time signature, how many quarter-note beats are in each bar?', answers:['Two','Three','Four','Six'], correct:1, explanation:'The top number is 3 and the bottom number indicates quarter-note units, so there are three quarter-note beats per bar.'}
  ]},
  { id:'western-scales', tradition:'Western', level:'Beginner', title:'Notes, intervals and major scales', description:'Explore semitones, whole tones, intervals and the major-scale formula.', lessons:[
    { id:'semitones', title:'Semitones and whole tones', duration:'10 min', summary:'Measure the distance between neighbouring pitches on a keyboard.', sections:[
      {heading:'The semitone',body:'In twelve-tone equal temperament, a semitone is the smallest standard step between adjacent notes on a piano keyboard. It can be from a white key to a neighbouring black key, or between two white keys where no black key lies between them.',example:'E to F is one semitone; B to C is also one semitone.'},
      {heading:'The whole tone',body:'A whole tone (whole step) is equal to two semitones in twelve-tone equal temperament.',example:'C to D is one whole tone: C to C-sharp is one semitone, then C-sharp to D is another.'}
    ], question:'How many semitones make one whole tone in 12-tone equal temperament?', answers:['One','Two','Three','Four'], correct:1, explanation:'A whole tone is made of two semitones.'},
    { id:'major-scale', title:'The major scale formula', duration:'12 min', summary:'Build a major scale using a sequence of whole tones and semitones.', sections:[
      {heading:'The pattern',body:'The major scale follows this interval pattern: whole, whole, half, whole, whole, whole, half. In shorthand: W–W–H–W–W–W–H. Here W means a whole tone and H means a semitone.',example:'C major: C – D – E – F – G – A – B – C. The E–F and B–C steps are semitones.'},
      {heading:'Why the formula matters',body:'The formula can be used to construct a major scale starting on any note. Correct note spelling matters: a scale generally uses each letter name once in sequence, with sharps or flats as required.',note:'This formula describes the major scale in the standard twelve-tone equal-tempered framework. Other musical systems may organise pitch differently.'}
    ], question:'Which pair forms the semitone steps in the C major scale?', answers:['C–D and F–G','E–F and B–C','D–E and G–A','C–E and G–B'], correct:1, explanation:'C major contains no sharps or flats. Its semitone steps are E–F and B–C.'},
    { id:'minor-scale', title:'Natural minor and relative major', duration:'13 min', summary:'Learn the natural minor pattern and how relative keys share notes.', sections:[
      {heading:'Natural minor formula',body:'The natural minor scale follows: whole, half, whole, whole, half, whole, whole (W–H–W–W–H–W–W). For A natural minor, the notes are A, B, C, D, E, F and G.',example:'A natural minor uses the same pitch collection as C major, but A is its tonal centre.'},
      {heading:'Relative major and minor',body:'A major key and its relative minor share the same key signature and diatonic notes, but have different tonal centres. The relative minor begins a minor third below its relative major.',example:'C major and A natural minor are relative keys.'},
      {heading:'Natural, harmonic and melodic minor',body:'Natural minor is one form of the minor scale. Harmonic minor raises the seventh degree compared with natural minor. In the commonly taught classical ascending melodic minor form, both the sixth and seventh degrees are raised; descending practice often returns to natural minor.'}
    ], question:'Which major key is the relative major of A natural minor?', answers:['G major','C major','D major','E-flat major'], correct:1, explanation:'A natural minor and C major share the same notes and key signature; their tonal centres differ.'}
  ]},
  { id:'chords-harmony', tradition:'Western', level:'Beginner', title:'Chords and basic harmony', description:'Build triads, compare major and minor quality, and understand diatonic chords.', lessons:[
    { id:'triads', title:'What is a triad?', duration:'10 min', summary:'Understand three-note chords built by stacking thirds.', sections:[
      {heading:'Three notes make a triad',body:'A triad is a chord made from three different note names arranged as a root, a third and a fifth. In tertian harmony, these chord tones are commonly understood as notes stacked in intervals of thirds.',example:'A C major triad contains C (root), E (third) and G (fifth).'},
      {heading:'Root position and inversions',body:'When the root is the lowest sounding chord tone, the triad is in root position. When the third or fifth is the lowest chord tone, the triad is in first or second inversion respectively.'}
    ], question:'Which notes form a C major triad?', answers:['C–D–E','C–E–G','C–F–A','C–G–B'], correct:1, explanation:'A C major triad contains its root C, major third E and perfect fifth G.'},
    { id:'major-minor-chords', title:'Major and minor triads', duration:'11 min', summary:'Compare the interval formulas that give major and minor triads their sound.', sections:[
      {heading:'Major triad formula',body:'A major triad consists of a root, a major third and a perfect fifth. Measured from the root in semitones, the intervals are 0, 4 and 7.',example:'C major: C – E – G.'},
      {heading:'Minor triad formula',body:'A minor triad consists of a root, a minor third and a perfect fifth. Measured from the root in semitones, the intervals are 0, 3 and 7.',example:'C minor: C – E-flat – G.',note:'Major and minor labels describe chord quality. They do not automatically tell you whether a piece of music is happy or sad; musical context matters.'}
    ], question:'What is the semitone formula for a minor triad?', answers:['0–4–7','0–3–7','0–3–6','0–4–8'], correct:1, explanation:'A minor triad uses a minor third (3 semitones) and perfect fifth (7 semitones): 0–3–7.'},
    { id:'diatonic-chords', title:'Diatonic chords in a major key', duration:'13 min', summary:'Build the seven triads that use only notes from a major scale.', sections:[
      {heading:'Stacking scale notes',body:'Diatonic triads are built by taking every other note of a scale. In C major, the notes are C, D, E, F, G, A and B. Building a triad on each scale degree produces a repeating pattern of chord qualities.',example:'In C major: I C major, ii D minor, iii E minor, IV F major, V G major, vi A minor, vii° B diminished.'},
      {heading:'Roman numerals',body:'Uppercase Roman numerals commonly indicate major triads; lowercase numerals indicate minor triads; a small degree symbol indicates diminished quality. The numerals describe a chord’s scale-degree root and quality within the key.',note:'This is the basic diatonic triad pattern in a major key. Seventh chords and minor-key harmony add further patterns.'}
    ], question:'What is the quality of the chord built on scale degree 2 in a major key?', answers:['Major','Minor','Augmented','Diminished'], correct:1, explanation:'The second diatonic triad in a major key is minor (ii).'}
  ]},
  { id:'hindustani', tradition:'Hindustani', level:'Beginner', title:'Hindustani music foundations', description:'Meet swaras, saptak, raga vocabulary and the tala framework.', lessons:[
    { id:'swaras', title:'The seven swaras', duration:'12 min', summary:'Learn Sa, Re, Ga, Ma, Pa, Dha and Ni as the basic swara names.', sections:[
      {heading:'Sapta swara',body:'The seven commonly named swaras are Shadja (Sa), Rishabh (Re), Gandhar (Ga), Madhyam (Ma), Pancham (Pa), Dhaivat (Dha) and Nishad (Ni). Sa and Pa are traditionally treated as achal (fixed in their basic positions), while Re, Ga, Ma, Dha and Ni have variant forms in the Hindustani system.',example:'Sa – Re – Ga – Ma – Pa – Dha – Ni – Sa'},
      {heading:'Swaras and pitch reference',body:'Sa is a movable tonic: a performer chooses a comfortable tonic pitch, and the other swaras are understood in relation to it. This differs from the fixed letter names used in standard Western notation.',note:'The exact intonation and use of swaras depend on raga, performance practice and musical context; they should not be reduced to a single fixed piano-key mapping.'}
    ], question:'Which swara is commonly used as the tonic reference in Hindustani music?', answers:['Pa','Sa','Ma','Ni'], correct:1, explanation:'Sa (Shadja) serves as the tonic reference. Its absolute pitch can be chosen by the performer.'},
    { id:'saptak', title:'Understanding the saptak', duration:'9 min', summary:'Explore the lower, middle and upper registers.', sections:[
      {heading:'Three registers',body:'A saptak is an octave span of seven principal swara positions. Hindustani pedagogy commonly describes Mandra (lower), Madhya (middle) and Tara (upper) saptaks.',example:'A vocalist may practise a swara pattern first in Madhya saptak, then repeat it in Mandra or Tara saptak.'},
      {heading:'Register is not a raga',body:'Saptak describes register, not a melodic scale or raga. A raga has its own characteristic note choices, movements, phrases and performance grammar.'}
    ], question:'Which term names the middle register?', answers:['Mandra','Madhya','Tara','Tivra'], correct:1, explanation:'Madhya saptak is the middle register.'},
    { id:'raga-intro', title:'What is a raga?', duration:'14 min', summary:'Understand raga as a melodic framework with characteristic movement and identity.', sections:[
      {heading:'More than a scale',body:'A raga is a melodic framework and tradition of melodic practice. Its identity is shaped by features such as selected swaras, characteristic phrases, ascending and descending movement, important notes, ornamentation and conventions of development.',example:'Aroha describes an ascending movement and avaroha a descending movement. They do not, by themselves, capture every feature that makes a raga distinctive.'},
      {heading:'Raga grammar and expression',body:'Ragas are learned through listening, imitation and guided practice as well as verbal explanation. A raga may use different note sets or movements when ascending and descending, and characteristic phrases can be more revealing than a scale alone.',note:'Raga rules and terminology can vary across gharanas, pedagogical lineages and performance contexts. Treat short descriptions as introductions, not complete performance instructions.'}
    ], question:'Why is a raga more than simply a scale?', answers:['It is always played on a sitar','It includes characteristic phrases, movement and performance conventions','It has no fixed notes','It is another word for tempo'], correct:1, explanation:'A raga includes melodic grammar and characteristic practice beyond a list of pitches.'}
  ]},
  { id:'carnatic', tradition:'Carnatic', level:'Beginner', title:'Carnatic music foundations', description:'Explore sapta swaras, melakarta, janya ragas and tala basics.', lessons:[
    { id:'carnatic-swaras', title:'Sapta swaras in Carnatic music', duration:'12 min', summary:'Learn the seven swara names and the idea of swara sthanas.', sections:[
      {heading:'The seven names',body:'The seven basic swara names are Sa, Ri, Ga, Ma, Pa, Dha and Ni. Carnatic theory describes distinct swara sthanas (positions), including multiple variants for several swaras. The exact spelling and classification of variants are traditionally specific.',example:'Sa – Ri – Ga – Ma – Pa – Dha – Ni – Sa'},
      {heading:'Swara positions',body:'Sa and Pa are treated as invariant reference swaras in the basic system. Ri, Ga, Ma, Dha and Ni have varieties. Some pitch positions are shared by more than one swara name in the theoretical classification, so a swara is understood in its musical and raga context.',note:'Carnatic swara names should not be mechanically equated with Western note letters without first choosing a tonic and considering the intended tuning and raga.'}
    ], question:'What is the Carnatic term for the different positions of swaras?', answers:['Tala','Swara sthana','Arohanam','Gamaka'], correct:1, explanation:'Swara sthana refers to a swara position.'},
    { id:'melakarta', title:'The 72 melakarta framework', duration:'13 min', summary:'Discover the parent-scale classification used in Carnatic music.', sections:[
      {heading:'What is a melakarta raga?',body:'The melakarta system is a systematic classification of 72 sampurna parent ragas. In the standard scheme, each melakarta uses all seven swaras in ascending and descending order, with the prescribed ordering of Ri, Ga, Ma, Dha and Ni variants.',example:'The 72 are organised into 12 chakras, each containing six melakarta ragas.'},
      {heading:'Parent and derived ragas',body:'Janya ragas are derived from melakarta parent scales, but may omit notes, use different ascending and descending patterns, or have other characteristic melodic features. A janya raga is not simply a numbered melakarta.',note:'A scale chart is a useful map, but raga identity also depends on prayogas, gamakas and musical practice.'}
    ], question:'How many melakarta ragas are in the standard system?', answers:['12','36','72','108'], correct:2, explanation:'The standard Carnatic melakarta scheme contains 72 parent ragas.'},
    { id:'carnatic-tala', title:'Tala and rhythmic structure', duration:'11 min', summary:'Learn the role of tala and the basic idea of anga.', sections:[
      {heading:'What is tala?',body:'Tala is a framework for organising rhythmic cycles in Indian classical music. In Carnatic music, a tala cycle is built from angas, commonly including laghu, dhrutam and anudhrutam, according to the tala structure.',example:'Adi tala is commonly taught as an eight-akshara cycle: a chatusra-jati laghu followed by two dhrutams.'},
      {heading:'Akshara and subdivisions',body:'Akshara refers to a unit in the tala cycle. Each unit can be subdivided in different ways (nadai or gati), creating different rhythmic groupings within the cycle.',note:'Tala counting practices and performance details can be nuanced. The example here is a common pedagogical description of Adi tala.'}
    ], question:'Which term refers to the rhythmic cycle framework?', answers:['Raga','Tala','Saptak','Thaat'], correct:1, explanation:'Tala is the rhythmic cycle framework.'}
  ]}
]

const allLessons = modules.flatMap(m => m.lessons.map(l => ({...l, moduleId:m.id, moduleTitle:m.title, tradition:m.tradition})))

const lessonVisuals: Record<string, { label: string; items: string[]; caption: string }> = {
  sound: { label: 'A sound wave, simplified', items: ['Vibration', 'Frequency', 'Pitch'], caption: 'A sound wave is a vibration travelling through a medium. Frequency is measured in hertz.' },
  alphabet: { label: 'The repeating note alphabet', items: ['A','B','C','D','E','F','G','A'], caption: 'After G, the letter sequence begins again at A in the next octave.' },
  octaves: { label: 'An octave relationship', items: ['A4 · 440 Hz','→','A5 · 880 Hz'], caption: 'The higher pitch is twice the frequency of the lower pitch.' },
  'pulse-tempo': { label: 'Tempo example', items: ['60 BPM','1 beat / second','120 BPM','2 beats / second'], caption: 'BPM means beats per minute.' },
  'note-values': { label: 'Relative note durations', items: ['1 whole','2 halves','4 quarters','8 eighths'], caption: 'Each row represents the same total notated duration.' },
  'time-signatures': { label: 'Compare common meters', items: ['3/4 · 3 quarter beats','4/4 · 4 quarter beats','6/8 · 6 eighth units'], caption: 'The lower number identifies the notated unit; grouping and feel matter too.' },
  semitones: { label: 'Distance on a keyboard', items: ['C','C♯ / D♭','D'], caption: 'One semitone per adjacent key; C to D is two semitones.' },
  'major-scale': { label: 'Major scale pattern', items: ['W','W','H','W','W','W','H'], caption: 'W = whole tone (2 semitones); H = semitone.' },
  'minor-scale': { label: 'Natural minor pattern', items: ['W','H','W','W','H','W','W'], caption: 'A natural minor: A – B – C – D – E – F – G – A.' },
  triads: { label: 'C major triad', items: ['C · Root','E · Third','G · Fifth'], caption: 'A basic triad stacks a root, a third and a fifth.' },
  'major-minor-chords': { label: 'Triad formulas', items: ['Major · 0–4–7','Minor · 0–3–7'], caption: 'Numbers show semitones above the root in twelve-tone equal temperament.' },
  'diatonic-chords': { label: 'Triads in C major', items: ['I · C','ii · Dm','iii · Em','IV · F','V · G','vi · Am','vii° · Bdim'], caption: 'The familiar major-key triad pattern is major, minor, minor, major, major, minor, diminished.' },
  swaras: { label: 'Sapta swara names', items: ['Sa','Re','Ga','Ma','Pa','Dha','Ni'], caption: 'Sa is the movable tonic reference in Hindustani practice.' },
  saptak: { label: 'Three commonly named registers', items: ['Mandra','Madhya','Tara'], caption: 'Lower, middle and upper registers respectively.' },
  'raga-intro': { label: 'Elements that shape a raga', items: ['Swaras','Aroha / Avaroha','Pakad / characteristic phrases','Ornamentation'], caption: 'A raga is a melodic framework, not merely a scale.' },
  'carnatic-swaras': { label: 'Sapta swaras', items: ['Sa','Ri','Ga','Ma','Pa','Dha','Ni'], caption: 'Carnatic theory further classifies swara sthanas and their variants.' },
  melakarta: { label: 'Melakarta framework', items: ['72 parent ragas','12 chakras','6 ragas per chakra'], caption: 'A systematic parent-raga classification in Carnatic music.' },
  'carnatic-tala': { label: 'Common Adi tala teaching pattern', items: ['Laghu · 4','Dhrutam · 2','Dhrutam · 2'], caption: 'A common chatusra-jati Adi tala count totals eight aksharas.' }
}

function LessonVisual({ id }: { id: string }) {
  const visual = lessonVisuals[id]
  if (!visual) return null
  return <div className="lesson-visual"><div className="lesson-visual-label">VISUAL GUIDE · {visual.label}</div><div className={`lesson-visual-items count-${visual.items.length}`}>{visual.items.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div><p>{visual.caption}</p></div>
}

const storageKey = 'musora-phase2-completed'

export default function LearningAcademy() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<string | null>(null)
  const [completed, setCompleted] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem(storageKey) || '[]') as string[] } catch { return [] } })
  const [answer, setAnswer] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const lesson = allLessons.find(l => l.id === active)
  const visibleModules = useMemo(() => modules.filter(m => (filter === 'All' || m.tradition === filter) && `${m.title} ${m.description} ${m.tradition}`.toLowerCase().includes(query.toLowerCase())), [filter, query])
  const markComplete = (id: string) => { const next = completed.includes(id) ? completed : [...completed, id]; setCompleted(next); localStorage.setItem(storageKey, JSON.stringify(next)) }
  const openLesson = (id: string) => { setActive(id); setAnswer(null); setChecked(false); document.getElementById('academy')?.scrollIntoView({behavior:'smooth'}) }
  const closeLesson = () => { setActive(null); setAnswer(null); setChecked(false) }
  const total = allLessons.length
  const progress = Math.round(completed.length / total * 100)

  return <section className="academy-section" id="academy">
    <div className="academy-wrap">
      <div className="academy-heading"><div><div className="eyebrow">PHASE 2 · THE MUSIC ACADEMY</div><h2>Learn the language.<br/><span>One idea at a time.</span></h2></div><p>Choose a learning path, open a lesson and work through clear explanations, musical examples and short knowledge checks.</p></div>
      <div className="academy-progress"><div className="academy-progress-copy"><span><GraduationCap size={17}/> Your learning progress</span><strong>{completed.length} of {total} lessons completed · {progress}%</strong></div><div className="academy-progress-track"><i style={{width:`${progress}%`}}/></div></div>
      {lesson ? <article className="lesson-panel">
        <button className="academy-back" onClick={closeLesson}><ArrowLeft size={16}/> Back to courses</button>
        <div className="lesson-kicker">{lesson.tradition} · {lesson.moduleTitle} · {lesson.duration}</div>
        <h3>{lesson.title}</h3><p className="lesson-summary">{lesson.summary}</p><LessonVisual id={lesson.id}/>
        {lesson.sections.map((section, index) => <section className="lesson-content-section" key={section.heading}><div className="lesson-section-number">{String(index+1).padStart(2,'0')}</div><div><h4>{section.heading}</h4><p>{section.body}</p>{section.example && <div className="lesson-example"><span>EXAMPLE</span>{section.example}</div>}{section.note && <div className="lesson-note"><Sparkles size={15}/><span>{section.note}</span></div>}</div></section>)}
        <div className="lesson-quiz"><div className="eyebrow">QUICK KNOWLEDGE CHECK</div><h4>{lesson.question}</h4><div className="lesson-answers">{lesson.answers.map((item, i) => <button key={item} className={`lesson-answer ${answer===i?'selected':''} ${checked && i===lesson.correct?'correct':''} ${checked && answer===i && i!==lesson.correct?'incorrect':''}`} onClick={()=>{setAnswer(i);setChecked(false)}}>{String.fromCharCode(65+i)}. {item}</button>)}</div>{checked && <div className={`quiz-feedback ${answer===lesson.correct?'is-correct':'is-incorrect'}`}><strong>{answer===lesson.correct?'Correct!':'Not quite.'}</strong> {lesson.explanation}</div>}<div className="lesson-actions"><button className="button button-primary" disabled={answer===null} onClick={()=>setChecked(true)}>Check answer <ArrowRight size={16}/></button>{completed.includes(lesson.id) ? <span className="lesson-done"><CheckCircle2 size={16}/> Lesson completed</span> : <button className="button button-outline" onClick={()=>markComplete(lesson.id)}>Mark lesson complete</button>}</div></div>
        <div className="lesson-next-row"><span>Keep building your musical foundation.</span><button onClick={()=>{const idx=allLessons.findIndex(l=>l.id===lesson.id);const next=allLessons[idx+1];if(next)openLesson(next.id)}} disabled={allLessons.findIndex(l=>l.id===lesson.id)===allLessons.length-1}>Next lesson <ArrowRight size={15}/></button></div>
      </article> : <>
        <div className="academy-controls"><div className="academy-filters">{['All','Foundations','Western','Hindustani','Carnatic'].map(item=><button key={item} className={filter===item?'active':''} onClick={()=>setFilter(item)}>{item}</button>)}</div><label className="academy-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search lessons and courses"/></label></div>
        <div className="academy-module-grid">{visibleModules.map(module=>{const done=module.lessons.filter(l=>completed.includes(l.id)).length;return <article className="academy-module" key={module.id}><div className={`academy-module-top ${module.tradition.toLowerCase()}`}><span>{module.tradition}</span><span>{module.level}</span></div><div className="academy-module-body"><div className="academy-module-meta"><span><BookOpen size={14}/>{module.lessons.length} lessons</span><span><Clock3 size={14}/>{done}/{module.lessons.length} done</span></div><h3>{module.title}</h3><p>{module.description}</p><div className="module-progress"><i style={{width:`${done/module.lessons.length*100}%`}}/></div><div className="module-lessons">{module.lessons.map((item,i)=><button key={item.id} onClick={()=>openLesson(item.id)}><span className="module-lesson-number">{completed.includes(item.id)?<CheckCircle2 size={15}/>:String(i+1).padStart(2,'0')}</span><span>{item.title}<small>{item.duration}</small></span><ArrowRight size={15}/></button>)}</div></div></article>})}</div>
        {visibleModules.length===0 && <div className="academy-empty">No matching lessons. Try another search or learning path.</div>}
      </>}
      <div className="academy-footnote"><CheckCircle2 size={16}/> Your completed lessons are saved on this device. No account is required in this release.</div>
    </div>
  </section>
}
