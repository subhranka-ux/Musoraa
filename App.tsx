import { useEffect, useMemo, useState } from 'react'
import LearningAcademy from './LearningAcademy'
import MusicLab from './MusicLab'
import PracticalStudio from './PracticalStudio'
import CertificateCenter from './CertificateCenter'
import {
  ArrowDownRight, ArrowRight, AudioLines, BookOpen, Check, ChevronDown, CircleHelp,
  Menu, Moon, Music2, Piano, Play, Search, Sparkles, Sun, X, Mic2,
  SlidersHorizontal, Bookmark, Clock3, Globe2, AudioWaveform, Heart, MoveUpRight,
} from 'lucide-react'

type Course = { id: number; title: string; category: 'Foundations' | 'Western' | 'Indian' | 'Production'; level: string; lessons: number; duration: string; description: string; icon: typeof Music2; color: string; tag?: string }

const courses: Course[] = [
  { id: 1, title: 'Your first steps in music', category: 'Foundations', level: 'Beginner', lessons: 3, duration: '35 min', description: 'Discover sound, pitch, notes, octaves and how music is organised.', icon: Music2, color: 'lilac', tag: 'Start here' },
  { id: 2, title: 'Rhythm, beat & timing', category: 'Foundations', level: 'Beginner', lessons: 3, duration: '32 min', description: 'Understand pulse, tempo, note values, rests and time signatures.', icon: AudioWaveform, color: 'peach' },
  { id: 3, title: 'Scales, keys & intervals', category: 'Western', level: 'Beginner', lessons: 3, duration: '35 min', description: 'Build a strong foundation with major, minor and interval patterns.', icon: Piano, color: 'blue', tag: 'Popular' },
  { id: 4, title: 'Chords & harmony', category: 'Western', level: 'Beginner', lessons: 3, duration: '34 min', description: 'Explore triads, seventh chords, inversions and progressions.', icon: BookOpen, color: 'mint' },
  { id: 5, title: 'An introduction to Hindustani music', category: 'Indian', level: 'Beginner', lessons: 3, duration: '35 min', description: 'Learn swaras, saptak, thaat, raga structure and tala vocabulary.', icon: AudioLines, color: 'peach' },
  { id: 6, title: 'Carnatic music foundations', category: 'Indian', level: 'Beginner', lessons: 3, duration: '36 min', description: 'Meet the sapta swaras, melakarta framework, gamakas and tala.', icon: Globe2, color: 'lilac' },
  { id: 7, title: 'Melody & songwriting', category: 'Production', level: 'Intermediate', lessons: 0, duration: 'Coming soon', description: 'Turn musical ideas into memorable melodies and complete songs.', icon: Mic2, color: 'blue' },
  { id: 8, title: 'Music production essentials', category: 'Production', level: 'Beginner', lessons: 0, duration: 'Coming soon', description: 'Understand MIDI, DAWs, recording, arrangement and audio basics.', icon: SlidersHorizontal, color: 'mint' },
]

const categories = ['All courses', 'Foundations', 'Western', 'Indian', 'Production'] as const

type Category = typeof categories[number]

function Brand() {
  return <a className="brand" href="#home" aria-label="Musora home"><span className="brand-mark"><AudioLines size={22} strokeWidth={2.5}/></span><span>musora<span className="brand-period">.</span></span></a>
}

function App() {
  const [dark, setDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('All courses')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState<number[]>([])
  const [showAll, setShowAll] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        document.querySelector<HTMLInputElement>('.search-box input')?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const filteredCourses = useMemo(() => courses.filter(course => {
    const matchesCategory = activeCategory === 'All courses' || course.category === activeCategory
    const matchesSearch = `${course.title} ${course.description} ${course.category}`.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  }), [activeCategory, search])

  const toggleSaved = (id: number) => setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])

  return <div className={dark ? 'app dark' : 'app light'}>
    <header className="topbar">
      <div className="topbar-inner">
        <Brand />
        <nav className={mobileOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#courses" onClick={() => setMobileOpen(false)}>Explore courses</a>
          <a href="#paths" onClick={() => setMobileOpen(false)}>Learning paths</a>
          <a href="#tools" onClick={() => setMobileOpen(false)}>Music tools</a>
          <a href="#practical-studio" onClick={() => setMobileOpen(false)}>Practical skills</a>
          <a href="#certificates" onClick={() => setMobileOpen(false)}>Certificates</a>
          <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
          <a className="mobile-start" href="#courses" onClick={() => setMobileOpen(false)}>Start learning <ArrowRight size={16}/></a>
        </nav>
        <div className="top-actions">
          <button className="icon-button theme-button" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <a className="button button-small button-primary desktop-start" href="#courses">Start learning <ArrowRight size={16}/></a>
          <button className="icon-button menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X size={21}/> : <Menu size={21}/>}</button>
        </div>
      </div>
    </header>

    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> A free music learning academy <span className="eyebrow-line"/></div>
          <h1>Music is a language.<br/><span>Learn to speak it.</span></h1>
          <p className="hero-description">From your very first note to creating your own music. Learn theory, explore traditions and build real skills — one lesson at a time.</p>
          <div className="hero-actions"><a href="#courses" className="button button-primary">Explore the courses <ArrowRight size={17}/></a><a href="#paths" className="text-link">See how it works <ArrowDownRight size={17}/></a></div>
          <div className="hero-proof"><div className="avatar-stack"><span>♪</span><span>♫</span><span>♬</span><span>+</span></div><div><strong>Made for every kind of learner</strong><small>Curious beginners · Growing musicians · Creators</small></div></div>
        </div>
        <div className="hero-art" aria-label="Abstract music learning illustration">
          <div className="art-glow"/><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
          <div className="floating-note note-one">♪</div><div className="floating-note note-two">♫</div><div className="floating-note note-three">♩</div>
          <div className="music-card main-music-card">
            <div className="card-topline"><span className="live-dot"/> YOUR LEARNING SPACE <span className="card-menu">•••</span></div>
            <div className="sound-visual"><div className="sound-label">A little music, every day.</div><div className="wave-bars">{Array.from({length: 42}, (_, i) => <i key={i} style={{height: `${16 + Math.abs(Math.sin(i * .63)) * (i % 5 === 0 ? 65 : 43)}%`}}/>)}</div></div>
            <div className="mini-piano"><div className="white-keys">{Array.from({length: 14}, (_, i) => <span key={i}/>)}</div><div className="black-keys">{[0,1,3,4,5,7,8,10,11,12].map((n, i) => <i key={i} style={{left: `${n * 7.14 + 4.5}%`}}/>)}</div></div>
            <div className="card-bottom"><span><Piano size={14}/> Theory made visual</span><span className="play-circle"><Play size={13} fill="currentColor"/></span></div>
          </div>
          <div className="floating-pill pill-scale"><span className="pill-icon violet"><Music2 size={15}/></span><span><b>Learn the notes</b><small>Start with the basics</small></span><Check size={16} className="pill-check"/></div>
          <div className="floating-pill pill-world"><span className="pill-icon orange"><Globe2 size={15}/></span><span><b>Two musical worlds</b><small>Explore more traditions</small></span></div>
          <div className="art-caption">LISTEN <span>·</span> LEARN <span>·</span> CREATE</div>
        </div>
        <div className="hero-bottom"><span>NO EXPERIENCE NEEDED</span><span className="hero-bottom-line"/><span>NO PAYWALLS. JUST MUSIC.</span></div>
      </section>

      <section className="ticker" aria-label="Learning topics"><div className="ticker-track">{['MUSIC THEORY','RHYTHM & TIMING','INDIAN CLASSICAL','WESTERN MUSIC','COMPOSITION','SOUND & PRODUCTION','MUSIC THEORY','RHYTHM & TIMING','INDIAN CLASSICAL','WESTERN MUSIC'].map((item, i) => <span key={i}>{item}<i>✳</i></span>)}</div></section>

      <section className="intro-section section-wrap" id="paths">
        <div className="section-heading"><div><div className="eyebrow">A GOOD PLACE TO BEGIN</div><h2>However you hear music,<br/><span>there's a path for you.</span></h2></div><p>Music can feel complicated when you don't know where to start. We make the fundamentals clear, then help you connect the dots.</p></div>
        <div className="path-grid">
          <article className="path-card path-western"><div className="path-top"><span className="path-number">01 / WESTERN</span><span className="path-arrow"><MoveUpRight size={18}/></span></div><div className="path-illustration western-illustration"><div className="staff-lines"><i/><i/><i/><i/><i/></div><span className="staff-note">𝄞</span><span className="staff-floating">♪</span><span className="staff-small">♬</span></div><div className="path-info"><h3>Western music</h3><p>Notes, scales, harmony, rhythm and the theory behind the music you love.</p><a href="#courses" onClick={() => setActiveCategory('Western')}>Explore Western theory <ArrowRight size={16}/></a></div></article>
          <article className="path-card path-indian"><div className="path-top"><span className="path-number">02 / INDIAN</span><span className="path-arrow"><MoveUpRight size={18}/></span></div><div className="path-illustration indian-illustration"><div className="raga-sun"/><div className="raga-rings"/><span className="swara swara-one">सा</span><span className="swara swara-two">रे</span><span className="swara swara-three">ग</span><span className="swara swara-four">म</span><span className="swara swara-five">प</span></div><div className="path-info"><h3>Indian music</h3><p>Explore swaras, ragas, talas and the rich Hindustani and Carnatic traditions.</p><a href="#courses" onClick={() => setActiveCategory('Indian')}>Explore Indian theory <ArrowRight size={16}/></a></div></article>
          <article className="path-card path-creative"><div className="path-top"><span className="path-number">03 / PRACTICAL</span><span className="path-arrow"><MoveUpRight size={18}/></span></div><div className="path-illustration creative-illustration"><div className="studio-screen"><div className="screen-top"><i/><i/><i/></div><div className="track-row track-a">{Array.from({length: 9}, (_,i)=><i key={i}/>)}</div><div className="track-row track-b">{Array.from({length: 9}, (_,i)=><i key={i}/>)}</div><div className="track-row track-c">{Array.from({length: 9}, (_,i)=><i key={i}/>)}</div></div><span className="creative-spark">✳</span></div><div className="path-info"><h3>Make your music</h3><p>Learn instruments, develop melodies, write songs and understand production.</p><a href="#courses" onClick={() => setActiveCategory('Production')}>Explore practical skills <ArrowRight size={16}/></a></div></article>
        </div>
      </section>

      <section className="courses-section" id="courses"><div className="section-wrap">
        <div className="section-heading courses-heading"><div><div className="eyebrow">THE LEARNING LIBRARY</div><h2>Build your knowledge.<br/><span>At your own pace.</span></h2></div><p>Clear, structured courses that take you from the first question to confident understanding.</p></div>
        <div className="course-controls"><div className="filter-tabs" role="tablist" aria-label="Filter courses">{categories.map(category => <button key={category} className={activeCategory === category ? 'filter-tab active' : 'filter-tab'} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>)}</div><label className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find a course..." aria-label="Search courses"/><kbd>⌘ K</kbd></label></div>
        <div className="course-grid">{filteredCourses.slice(0, showAll ? undefined : 6).map(course => { const Icon = course.icon; return <article className="course-card" key={course.id}><div className={`course-art ${course.color}`}><div className="course-art-orbit"/><Icon size={43} strokeWidth={1.35}/><span className="course-category">{course.category}</span><button className={saved.includes(course.id) ? 'save-course saved' : 'save-course'} aria-label={saved.includes(course.id) ? 'Remove saved course' : 'Save course'} onClick={() => toggleSaved(course.id)}><Bookmark size={16} fill={saved.includes(course.id) ? 'currentColor' : 'none'}/></button>{course.tag && <span className="course-tag">{course.tag}</span>}</div><div className="course-body"><div className="course-meta"><span>{course.level}</span><span><Clock3 size={13}/>{course.duration}</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="course-footer"><span><BookOpen size={14}/>{course.lessons ? `${course.lessons} lessons` : 'Coming soon'}</span>{course.lessons ? <button onClick={() => document.getElementById('academy')?.scrollIntoView({behavior:'smooth'})}>View lessons <ArrowRight size={15}/></button> : <span className="course-coming">In a later phase</span>}</div></div></article> })}</div>
        {filteredCourses.length === 0 && <div className="empty-state"><Search size={24}/><h3>No courses found</h3><p>Try another search or choose a different category.</p><button className="text-link" onClick={() => {setSearch('');setActiveCategory('All courses')}}>Clear filters</button></div>}
        {filteredCourses.length > 6 && <div className="view-all-row"><button className="button button-outline" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer courses' : 'View all courses'} <ChevronDown size={16}/></button></div>}
      </div></section>

      <LearningAcademy />

      <MusicLab />

      <PracticalStudio />

      <CertificateCenter />

      <section className="promise-section"><div className="section-wrap promise-inner"><div><div className="eyebrow">OPEN TO EVERYONE</div><h2>Good music education<br/>shouldn't have a price tag.</h2><p>Musora is being built around a simple belief: the opportunity to understand and create music should be available to everyone, wherever they are starting from.</p><a href="#about" className="button button-light">Our approach <ArrowRight size={16}/></a></div><div className="promise-stats"><div><strong>100<span>%</span></strong><small>Free to learn</small></div><div><strong>02</strong><small>Musical traditions</small></div><div><strong>∞</strong><small>Room to grow</small></div></div><div className="promise-decoration">♫</div></div></section>

      <section className="about-section section-wrap" id="about"><div className="about-mark"><div className="about-note">♪</div><div className="about-ring ring-a"/><div className="about-ring ring-b"/><span>THE IDEA<br/>BEHIND MUSORA</span></div><div className="about-copy"><div className="eyebrow">WHY MUSORA EXISTS</div><h2>For the love of<br/><span>understanding music.</span></h2><p>Musora is an independent music education project created to make learning music more approachable. It brings foundational theory, musical traditions and practical skills into one welcoming place.</p><div className="founder-line"><div className="founder-avatar">SC</div><div><strong>Subhranka Chandra Pradhan</strong><small>Founder & Creator, Musora</small></div></div><div className="about-footnote"><Heart size={15}/> Built with the belief that music belongs to everyone.</div></div></section>

      <section className="closing-cta section-wrap"><div className="closing-inner"><div className="closing-icon"><Sparkles size={24}/></div><div><div className="eyebrow">YOUR FIRST NOTE IS WAITING</div><h2>Start where you are.</h2><p>No experience. No pressure. Just a place to begin.</p></div><a className="button button-primary" href="#courses">Find your first lesson <ArrowRight size={17}/></a><div className="closing-note">♪</div></div></section>
    </main>

    <footer className="footer"><div className="section-wrap"><div className="footer-main"><div className="footer-brand"><Brand/><p>A free space to learn, explore<br/>and understand music.</p></div><div className="footer-column"><strong>LEARN</strong><a href="#courses">Explore courses</a><a href="#paths">Learning paths</a><a href="#tools">Music tools</a></div><div className="footer-column"><strong>MUSORA</strong><a href="#certificates">Certificates</a><a href="#about">Our story</a><a href="#about">Founder</a><a href="mailto:hello@musora.example">Contact</a></div><div className="footer-note"><span className="free-stamp"><Heart size={16}/> FREE, ALWAYS</span><p>Music education for everyone.<br/>Made to be explored.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Musora. An independent music education project.</span><span>Made for curious minds <span className="footer-star">✳</span></span></div></div></footer>
    {notice && <div className="toast" role="status"><CircleHelp size={17}/>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={15}/></button></div>}
  </div>
}

export default App
