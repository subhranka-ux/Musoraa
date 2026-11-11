import { useEffect, useMemo, useRef, useState } from 'react'
import { AudioLines, CircleDot, Guitar, Headphones, Music2, Piano, Play, RotateCcw, Square, Timer, Volume2, VolumeX } from 'lucide-react'

type Tab = 'piano' | 'chords' | 'scales' | 'circle' | 'metronome' | 'ear' | 'guitar'
const NOTE_NAMES = ['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B']
const MAJOR = [0,2,4,5,7,9,11]
const MINOR = [0,2,3,5,7,8,10]
const CHORDS: Record<string, number[]> = { Major:[0,4,7], Minor:[0,3,7], Diminished:[0,3,6], Augmented:[0,4,8], 'Sus2':[0,2,7], 'Sus4':[0,5,7], 'Major 7':[0,4,7,11], 'Minor 7':[0,3,7,10], 'Dominant 7':[0,4,7,10] }
const CIRCLE = ['C','G','D','A','E','B','F♯','C♯','G♯','D♯','A♯','F']
const mod = (n:number) => ((n % 12) + 12) % 12
const noteIndex = (note:string) => NOTE_NAMES.indexOf(note)
const midiFrequency = (midi:number) => 440 * Math.pow(2, (midi - 69) / 12)

let sharedAudioContext: AudioContext | null = null
function playTone(midi:number, duration=0.8, waveform: OscillatorType='sine') {
  if (typeof window === 'undefined') return
  const AudioContextClass = window.AudioContext || (window as typeof window & {webkitAudioContext?: typeof AudioContext}).webkitAudioContext
  if (!AudioContextClass) return
  if (!sharedAudioContext) sharedAudioContext = new AudioContextClass()
  const context = sharedAudioContext
  if (context.state === 'suspended') void context.resume()
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = waveform
  oscillator.frequency.value = midiFrequency(midi)
  gain.gain.setValueAtTime(0.0001, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.025)
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration)
  oscillator.connect(gain); gain.connect(context.destination)
  oscillator.start(); oscillator.stop(context.currentTime + duration + 0.03)
}

function playChord(root:number, intervals:number[]) { if (!intervals.length) return; playTone(48 + root + intervals[0], 1.15, 'triangle'); intervals.slice(1).forEach((interval, i) => window.setTimeout(() => playTone(48 + root + interval, 1.15, 'triangle'), (i + 1) * 8)) }

export default function MusicLab() {
  const [tab,setTab] = useState<Tab>('piano')
  const [root,setRoot] = useState('C')
  const [quality,setQuality] = useState('Major')
  const [scaleType,setScaleType] = useState('Major')
  const [bpm,setBpm] = useState(90)
  const [running,setRunning] = useState(false)
  const [beat,setBeat] = useState(0)
  const timerRef = useRef<number | null>(null)
  const [earInterval,setEarInterval] = useState(4)
  const [earAnswer,setEarAnswer] = useState<number | null>(null)
  const [earFeedback,setEarFeedback] = useState('')
  const [earRound,setEarRound] = useState(0)
  const [showFretNotes,setShowFretNotes] = useState(true)

  const rootNum = noteIndex(root)
  const chordNotes = useMemo(() => (CHORDS[quality] || CHORDS.Major).map(n => NOTE_NAMES[mod(rootNum+n)]), [quality,rootNum])
  const scaleNotes = useMemo(() => (scaleType === 'Minor' ? MINOR : MAJOR).map(n => NOTE_NAMES[mod(rootNum+n)]), [scaleType,rootNum])

  useEffect(() => {
    if (!running) { if (timerRef.current !== null) window.clearInterval(timerRef.current); timerRef.current = null; return }
    const tick = () => { setBeat(current => { const next = (current + 1) % 4; playTone(next === 0 ? 84 : 78, 0.07, 'square'); return next }) }
    tick()
    timerRef.current = window.setInterval(tick, 60000 / bpm)
    return () => { if (timerRef.current !== null) window.clearInterval(timerRef.current); timerRef.current = null }
  }, [running,bpm])
  useEffect(() => () => { if (timerRef.current !== null) window.clearInterval(timerRef.current) }, [])

  const playScale = () => { const notes = scaleType === 'Minor' ? MINOR : MAJOR; playTone(60+rootNum+notes[0],0.42); notes.slice(1).forEach((n,i) => window.setTimeout(() => playTone(60+rootNum+n,0.42),(i+1)*440)) }
  const newEarQuestion = () => { const choices=[1,2,3,4,5,7,12]; setEarInterval(choices[Math.floor(Math.random()*choices.length)]); setEarAnswer(null); setEarFeedback(''); setEarRound(v=>v+1) }
  const playEar = () => { playTone(60,0.75); window.setTimeout(()=>playTone(60+earInterval,0.9),850) }
  const submitEar = (n:number) => { setEarAnswer(n); setEarFeedback(n===earInterval ? 'Correct — you identified the interval.' : `Not quite. The interval was ${earInterval} semitones. Listen again and try another.`) }

  const tabs: {id:Tab;label:string;icon:typeof Piano}[] = [
    {id:'piano',label:'Virtual piano',icon:Piano},{id:'chords',label:'Chord builder',icon:Music2},{id:'scales',label:'Scale explorer',icon:AudioLines},{id:'circle',label:'Circle of Fifths',icon:CircleDot},{id:'metronome',label:'Metronome',icon:Timer},{id:'ear',label:'Ear training',icon:Headphones},{id:'guitar',label:'Guitar fretboard',icon:Guitar},
  ]

  return <section className="music-lab-section" id="tools">
    <div className="music-lab-wrap">
      <div className="lab-heading"><div><div className="eyebrow">PHASE 3 · LEARN BY DOING</div><h2>Welcome to the<br/><span>interactive music lab.</span></h2></div><p>Experiment with notes, build chords, explore scales and train your ear. These tools run in your browser — no account or installation needed.</p></div>
      <div className="lab-shell">
        <div className="lab-tabs" role="tablist" aria-label="Music tools">{tabs.map(item=>{const Icon=item.icon;return <button key={item.id} className={tab===item.id?'active':''} onClick={()=>setTab(item.id)} role="tab" aria-selected={tab===item.id}><Icon size={15}/><span>{item.label}</span></button>})}</div>
        <div className="lab-content">
          {tab==='piano' && <div className="lab-tool"><div className="lab-tool-title"><div><span className="lab-kicker">PLAYABLE INSTRUMENT</span><h3>Virtual piano</h3><p>Tap or click a key to hear its pitch. The keyboard spans two octaves.</p></div><span className="lab-status"><i/> AUDIO READY</span></div><div className="piano-readout"><div><small>LAST NOTE</small><strong id="last-note">C4</strong></div><span>Equal-tempered tuning · A4 = 440 Hz</span></div><PianoKeys onPlay={midi=>{const el=document.getElementById('last-note');if(el)el.textContent=`${NOTE_NAMES[mod(midi-60)]}${Math.floor(midi/12)-1}`;playTone(midi,0.7,'triangle')}}/></div>}
          {tab==='chords' && <div className="lab-tool"><div className="lab-tool-title"><div><span className="lab-kicker">HARMONY EXPLORER</span><h3>Build a chord</h3><p>Choose a root note and chord quality to see its notes and hear how it sounds.</p></div></div><div className="lab-select-row"><label>Root note<select value={root} onChange={e=>setRoot(e.target.value)}>{NOTE_NAMES.map(n=><option key={n}>{n}</option>)}</select></label><label>Chord quality<select value={quality} onChange={e=>setQuality(e.target.value)}>{Object.keys(CHORDS).map(n=><option key={n}>{n}</option>)}</select></label></div><div className="chord-result"><div><small>CHORD</small><strong>{root} {quality}</strong></div><div className="chord-note-list">{chordNotes.map((n,i)=><span key={i}>{n}</span>)}</div><button className="lab-primary-button" onClick={()=>playChord(rootNum,CHORDS[quality])}><Volume2 size={16}/> Play chord</button></div><div className="formula-note"><b>Formula:</b> {CHORDS[quality].join(' – ')} semitone steps from the root. Chord spellings are shown here in a simplified sharp-based display; correct enharmonic spelling depends on key and harmonic context.</div></div>}
          {tab==='scales' && <div className="lab-tool"><div className="lab-tool-title"><div><span className="lab-kicker">MELODY EXPLORER</span><h3>Explore a scale</h3><p>Compare major and natural minor patterns and listen to the notes in sequence.</p></div></div><div className="lab-select-row"><label>Key<select value={root} onChange={e=>setRoot(e.target.value)}>{NOTE_NAMES.map(n=><option key={n}>{n}</option>)}</select></label><label>Scale<select value={scaleType} onChange={e=>setScaleType(e.target.value)}><option>Major</option><option>Minor</option></select></label></div><div className="scale-formula"><div><small>{scaleType.toUpperCase()} SCALE · {root}</small><strong>{scaleType==='Major'?'W – W – H – W – W – W – H':'W – H – W – W – H – W – W'}</strong></div><button className="lab-primary-button" onClick={playScale}><Play size={15} fill="currentColor"/> Play scale</button></div><div className="scale-note-row">{scaleNotes.map((n,i)=><div key={i}><strong>{n}</strong><small>{i+1}</small></div>)}</div><p className="lab-footnote">W = whole tone (two semitones) · H = semitone. This tool demonstrates the major and natural minor scales.</p></div>}
          {tab==='circle' && <div className="lab-tool"><div className="lab-tool-title"><div><span className="lab-kicker">KEY RELATIONSHIPS</span><h3>Circle of Fifths</h3><p>Select a major key to see its relative minor and the neighbouring fifth relationships.</p></div></div><div className="circle-layout"><div className="circle-wheel" aria-label="Circle of fifths key selector">{CIRCLE.map((n,i)=>{const angle=(i*30-90)*Math.PI/180;return <button key={n} className={root===n?'selected':''} style={{left:`${50+39*Math.cos(angle)}%`,top:`${50+39*Math.sin(angle)}%`}} onClick={()=>setRoot(n)}>{n}</button>})}<div className="circle-center"><small>SELECTED KEY</small><strong>{root}</strong><span>Major</span></div></div><div className="circle-info"><small>RELATIVE MINOR</small><strong>{NOTE_NAMES[mod(rootNum+9)]} minor</strong><p>A relative minor shares the same key signature as its relative major. It begins on scale degree six of the major scale.</p><small>NEIGHBOURING KEYS</small><div className="neighbour-keys"><span>{CIRCLE[mod(CIRCLE.indexOf(root)-1)]}</span><span>{root}</span><span>{CIRCLE[mod(CIRCLE.indexOf(root)+1)]}</span></div></div></div><p className="lab-footnote">The wheel uses common enharmonic spellings for readability. Some theoretical keys are more naturally written with sharps or flats depending on context.</p></div>}
          {tab==='metronome' && <div className="lab-tool"><div className="lab-tool-title"><div><span className="lab-kicker">RHYTHM PRACTICE</span><h3>Metronome</h3><p>Set a tempo and practise keeping a steady pulse in four-beat time.</p></div><span className={running?'lab-status live':'lab-status'}><i/>{running?'RUNNING':'STOPPED'}</span></div><div className="metronome-display"><div className="beat-lights">{[0,1,2,3].map(i=><span key={i} className={running&&beat===i?'lit':''}>{i+1}</span>)}</div><strong>{bpm}<small> BPM</small></strong><div className="tempo-word">{bpm<60?'Largo':bpm<76?'Adagio':bpm<108?'Andante':bpm<132?'Moderato':bpm<168?'Allegro':'Presto'} · Quarter-note pulse</div></div><div className="tempo-control"><input type="range" min="40" max="220" step="1" value={bpm} onChange={e=>setBpm(Number(e.target.value))} aria-label="Tempo in beats per minute"/><div><button onClick={()=>setBpm(v=>Math.max(40,v-1))}>−</button><span>{bpm} BPM</span><button onClick={()=>setBpm(v=>Math.min(220,v+1))}>+</button></div></div><div className="metronome-actions"><button className="lab-primary-button" onClick={()=>{if(running){setRunning(false)}else{playTone(84,0.07,'square');setRunning(true)}}}>{running?<Square size={15}/>:<Play size={15} fill="currentColor"/>}{running?'Stop metronome':'Start metronome'}</button><button className="lab-secondary-button" onClick={()=>{setRunning(false);setBeat(0);setBpm(90)}}><RotateCcw size={15}/> Reset</button></div><p className="lab-footnote">Keep this tab open while practising. Your browser may suspend audio when the device sleeps or the tab is backgrounded.</p></div>}
          {tab==='ear' && <div className="lab-tool"><div className="lab-tool-title"><div><span className="lab-kicker">LISTENING PRACTICE</span><h3>Interval ear training</h3><p>Listen to two notes and identify the distance between them in semitones.</p></div><span className="lab-status">ROUND {earRound+1}</span></div><div className="ear-play-card"><div className="ear-wave"><AudioLines size={38}/></div><div><strong>Listen carefully</strong><small>Two notes will play one after the other.</small></div><button className="lab-primary-button" onClick={playEar}><Play size={15} fill="currentColor"/> Play interval</button></div><div className="ear-choices">{[{n:1,l:'Minor 2nd'},{n:2,l:'Major 2nd'},{n:3,l:'Minor 3rd'},{n:4,l:'Major 3rd'},{n:5,l:'Perfect 4th'},{n:7,l:'Perfect 5th'},{n:12,l:'Octave'}].map(item=><button key={item.n} className={earAnswer===item.n?(earAnswer===earInterval?'right':'wrong'):''} onClick={()=>submitEar(item.n)}>{item.l}<small>{item.n} semitones</small></button>)}</div>{earFeedback&&<div className={earAnswer===earInterval?'ear-feedback good':'ear-feedback'}>{earFeedback}</div>}<button className="lab-secondary-button" onClick={newEarQuestion}>New interval <RotateCcw size={14}/></button><p className="lab-footnote">This introductory exercise uses equal-tempered semitone distances. Musical interval names also depend on written spelling, not only the number of semitones.</p></div>}
          {tab==='guitar' && <div className="lab-tool"><div className="lab-tool-title"><div><span className="lab-kicker">STRING INSTRUMENT EXPLORER</span><h3>Guitar fretboard</h3><p>Explore standard tuning from open strings through the twelfth fret.</p></div><label className="toggle-label"><input type="checkbox" checked={showFretNotes} onChange={e=>setShowFretNotes(e.target.checked)}/> Show note names</label></div><GuitarBoard showNotes={showFretNotes}/><p className="lab-footnote">Standard guitar tuning, low to high: E2 – A2 – D3 – G3 – B3 – E4. Notes repeat at the twelfth fret one octave above the open string.</p></div>}
        </div>
      </div>
      <div className="lab-disclaimer"><VolumeX size={15}/> Sound requires a user interaction and an audio-enabled browser. Use headphones at a comfortable volume.</div>
    </div>
  </section>
}

function PianoKeys({onPlay}:{onPlay:(midi:number)=>void}) {
  const startMidi=60
  const whiteNotes=[0,2,4,5,7,9,11,12,14,16,17,19,21,23]
  const blackNotes=[1,3,6,8,10,13,15,18,20,22]
  return <div className="piano-keyboard" aria-label="Two octave piano keyboard"><div className="piano-white-row">{whiteNotes.map(n=><button key={n} aria-label={`${NOTE_NAMES[n%12]}${Math.floor((startMidi+n)/12)-1}`} onClick={()=>onPlay(startMidi+n)}><span>{NOTE_NAMES[n%12]}</span></button>)}</div><div className="piano-black-row">{blackNotes.map(n=>{const before=whiteNotes.filter(w=>w<n).length;return <button key={n} aria-label={`${NOTE_NAMES[n%12]}${Math.floor((startMidi+n)/12)-1}`} style={{left:`calc(${before/14*100}% - 11px)`}} onClick={()=>onPlay(startMidi+n)}><span>{NOTE_NAMES[n%12]}</span></button>})}</div></div>
}

function GuitarBoard({showNotes}:{showNotes:boolean}) {
  const strings=[{name:'E',midi:40},{name:'A',midi:45},{name:'D',midi:50},{name:'G',midi:55},{name:'B',midi:59},{name:'e',midi:64}]
  return <div className="fretboard-wrap"><div className="fretboard"><div className="fret-numbers"><span>String</span>{Array.from({length:13},(_,i)=><span key={i}>{i===0?'Open':i}</span>)}</div>{strings.map(s=><div className="fret-string-row" key={s.name}><strong>{s.name}</strong>{Array.from({length:13},(_,f)=>{const note=NOTE_NAMES[mod(s.midi+f)];return <button key={f} onClick={()=>playTone(s.midi+f,0.55,'triangle')} aria-label={`${note}, ${s.name} string, fret ${f}`} title={`${note} · fret ${f}`}>{showNotes?<span>{note}</span>:f===0?'○':''}</button>})}</div>)}</div><div className="fretboard-caption"><span>Tap any position to hear the note</span><span>12th fret = octave</span></div></div>
}
