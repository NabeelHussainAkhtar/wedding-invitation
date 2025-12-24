import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Heart, ChevronRight, ChevronLeft, Eye, Maximize } from 'lucide-react';

/**
 * ANIMATED PORTRAIT VIDEO INVITATION
 * Theme: Elegant | Islamic | Gold & Floral
 * Aspect Ratio: 9:16 (Optimized for Mobile, Centered on Desktop)
 * Features: "Insta-Story" Tapping, Vocal Nasheed
 */

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(-1); // -1 is Start Screen
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const containerRef = useRef(null); // Ref for the main container

  // Scene Configuration based on Script
  const scenes = [
    { id: 1, duration: 5000, name: 'Opening' },
    { id: 2, duration: 7000, name: 'Blessings' },
    { id: 3, duration: 5000, name: 'Host' },
    { id: 4, duration: 6000, name: 'Title' },
    { id: 5, duration: 10000, name: 'Couple' },
    { id: 6, duration: 9000, name: 'Walima' },
    { id: 7, duration: 10000, name: 'Nikah' },
    { id: 8, duration: 8000, name: 'Closing' },
  ];

  // --- LOGIC ---

  // Handle Automatic Scene Transitions
  useEffect(() => {
    if (isPlaying && currentScene >= 0 && currentScene < scenes.length) {
      const sceneDuration = scenes[currentScene].duration;
      
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (currentScene < scenes.length - 1) {
          setCurrentScene(prev => prev + 1);
        } else {
          setIsPlaying(false); // End of video
        }
      }, sceneDuration);
    }

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentScene]);

  // Helper to trigger fullscreen
  const requestFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  };

  // Audio & Playback Control
  const togglePlay = (e) => {
    e?.stopPropagation();
    
    // Request fullscreen on first play click from start screen
    if (currentScene === -1) {
        requestFullScreen();
        setCurrentScene(0);
    }
    
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
      clearTimeout(timerRef.current);
    } else {
      setIsPlaying(true);
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
      if (currentScene === scenes.length - 1) {
        setCurrentScene(0);
      }
    }
  };

  const restart = (e) => {
    e?.stopPropagation();
    setCurrentScene(0);
    setIsPlaying(true);
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    setIsMuted(!isMuted);
    audioRef.current.muted = !isMuted;
  };

  // Insta-Story Tap Logic
  const handleTap = (e) => {
    if (currentScene === -1) return; // Don't tap on start screen

    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const clickX = clientX - left;

    // If clicked on left 30% of screen -> Go Back
    if (clickX < width * 0.3) {
      if (currentScene > 0) {
        setCurrentScene(prev => prev - 1);
      } else {
        setCurrentScene(0); 
      }
    } 
    // If clicked on right 70% of screen -> Go Forward
    else {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(prev => prev + 1);
      } else {
        setIsPlaying(false); // Finish if at end
      }
    }
    
    // Ensure audio plays if it was paused
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play().catch(e => console.log(e));
    }
  };

  // --- STYLES ---
  const goldText = "bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 animate-shimmer bg-[length:200%_auto]";
  const ivoryBg = "bg-[#FFFFF0]"; 

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 flex items-center justify-center font-serif overflow-hidden relative selection:bg-yellow-200">
      {/* Background Ambience (Desktop) */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>

      {/* Main "Phone" Container */}
      <div 
        onClick={handleTap}
        className={`relative w-full max-w-[450px] h-[100dvh] max-h-[900px] ${ivoryBg} shadow-2xl overflow-hidden flex flex-col transition-all duration-500 border-x-4 border-yellow-900/20 cursor-pointer group`}
      >
        
        {/* Audio: Updated to use the uploaded file name. 
            NOTE: Ensure this file is in your public/assets folder when deploying. */}
        <audio ref={audioRef} loop src="Muhammad_Al_Muqit_-_Wedding_(mp3.pm).mp3" />

        {/* --- GLOBAL ANIMATIONS --- */}
        {/* Floating Gold Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
           {[...Array(15)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-yellow-400/60 animate-float-particle" 
                   style={{
                     left: `${Math.random() * 100}%`,
                     top: `${Math.random() * 100}%`,
                     width: `${Math.random() * 4 + 2}px`,
                     height: `${Math.random() * 4 + 2}px`,
                     animationDuration: `${Math.random() * 10 + 10}s`,
                     animationDelay: `${Math.random() * 5}s`
                   }}
              />
           ))}
        </div>

        {/* --- DECORATIVE CORNERS --- */}
        <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none z-20 transition-opacity duration-1000">
           <svg viewBox="0 0 100 100" className="w-full h-full fill-yellow-600/40 opacity-80 rotate-180 drop-shadow-sm">
              <path d="M0 0 L100 0 C50 0 50 50 0 100 Z" />
              <circle cx="20" cy="20" r="5" className="fill-yellow-500 animate-pulse" />
              <path d="M10 10 Q 50 10 50 50" fill="none" stroke="#D4AF37" strokeWidth="2" />
           </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none z-20">
           <svg viewBox="0 0 100 100" className="w-full h-full fill-yellow-600/40 opacity-80 drop-shadow-sm">
              <path d="M0 0 L100 0 C50 0 50 50 0 100 Z" />
              <circle cx="20" cy="20" r="5" className="fill-yellow-500 animate-pulse" />
              <path d="M10 10 Q 50 10 50 50" fill="none" stroke="#D4AF37" strokeWidth="2" />
           </svg>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="flex-1 relative flex flex-col items-center justify-center p-6 text-center z-0">
          
          {/* START SCREEN */}
          {currentScene === -1 && (
            <div className="animate-fade-in flex flex-col items-center gap-6 z-30">
              <div className="w-24 h-24 rounded-full border-2 border-yellow-500 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                <Heart className="text-yellow-600 w-10 h-10" fill="#D4AF37" />
              </div>
              <h1 className={`text-4xl font-bold ${goldText} font-[Cinzel]`}>
                Wedding Invitation
              </h1>
              <p className="text-gray-600 italic">Inamdar Family</p>
              <button 
                onClick={togglePlay}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Play size={20} fill="currentColor" /> Open Invitation
              </button>
            </div>
          )}

          {/* SCENE 1: OPENING (BISMILLAH) */}
          {currentScene === 0 && (
            <div className="animate-fade-in-slow flex flex-col items-center w-full">
              <div className="text-yellow-600/30 text-7xl mb-6 animate-float-slow">﷽</div>
              <h2 className={`text-4xl leading-relaxed mb-6 font-bold text-yellow-700 font-['Amiri'] drop-shadow-sm`}>
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </h2>
              <p className="text-yellow-800/60 font-serif mt-4">In the name of Allah, <br/>the Most Gracious, the Most Merciful</p>
            </div>
          )}

          {/* SCENE 2: BLESSINGS */}
          {currentScene === 1 && (
            <div className="animate-slide-up w-full relative">
               <div className="absolute -top-20 -left-10 w-full h-full bg-gradient-to-b from-yellow-100/20 to-transparent blur-3xl pointer-events-none"></div>
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-6 font-bold">With the blessings of</p>
              
              <div className="space-y-4 relative z-10">
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-yellow-200 shadow-md animate-fade-in-delay-1 transform hover:scale-105 transition-transform duration-500">
                  <p className="text-gray-800 font-semibold font-[Cinzel]">Late Mr. Gulam Mohiuddin Sahab Inamdar</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-yellow-200 shadow-md animate-fade-in-delay-2 transform hover:scale-105 transition-transform duration-500">
                  <p className="text-gray-800 font-semibold font-[Cinzel]">Late Mr. Alhaj Iqbal Ahmed Sahab Inamdar</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-lg border border-yellow-200 shadow-md animate-fade-in-delay-3 transform hover:scale-105 transition-transform duration-500">
                  <p className="text-gray-800 font-semibold font-[Cinzel]">Late Mr. Gulam Yazdani Sahab Inamdar</p>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 3: HOST */}
          {currentScene === 2 && (
            <div className="animate-zoom-in w-full">
              <p className="text-yellow-700 italic mb-4 text-lg">Cordially Invite you</p>
              <div className="relative inline-block py-8 px-4 border-y-2 border-yellow-500/50 w-full bg-yellow-50/30">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFFF0] px-2 text-yellow-400">♦</div>
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#FFFFF0] px-2 text-yellow-400">♦</div>
                 
                 <h2 className={`text-2xl font-bold text-gray-800 mb-2 font-[Cinzel]`}>
                  Mr. Abdul Khuddus Sahab Inamdar
                </h2>
                <p className="text-gray-600 text-lg">(Beernahalli)</p>
              </div>
            </div>
          )}

          {/* SCENE 4: WALIMA TITLE */}
          {currentScene === 3 && (
            <div className="relative animate-fade-in w-full flex flex-col items-center">
              <div className="absolute inset-0 border-[6px] border-double border-yellow-400/40 rounded-lg transform rotate-2 scale-110 opacity-60"></div>
              
              <div className="z-10 bg-white/80 p-10 rounded-lg shadow-2xl backdrop-blur-md border border-yellow-100">
                <h1 className={`text-4xl font-extrabold ${goldText} font-[Cinzel] mb-3 tracking-wider`}>
                  Walima Ceremony
                </h1>
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent my-4 opacity-50"></div>
                <p className="text-yellow-700 font-['Amiri'] text-3xl drop-shadow-sm">دعوة وليمة</p>
              </div>
              
              {/* Animated Flowers */}
              <div className="absolute -top-4 -left-4 text-3xl animate-spin-slow opacity-80">🏵️</div>
              <div className="absolute -bottom-4 -right-4 text-3xl animate-spin-slow opacity-80">🏵️</div>
            </div>
          )}

          {/* SCENE 5: GROOM & BRIDE */}
          {currentScene === 4 && (
            <div className="w-full space-y-8">
              <div className="animate-slide-in-left bg-gradient-to-r from-yellow-50 to-transparent p-4 rounded-l-xl border-l-4 border-yellow-500 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Of his beloved son</p>
                <h2 className={`text-2xl font-bold text-yellow-900 font-[Cinzel]`}>Gulam Mohiuddin (Wajid)</h2>
                <p className="text-xs text-gray-600 italic mt-1">(Diploma in Mechanical Engineering)</p>
              </div>

              <div className="flex items-center justify-center gap-4 my-2 opacity-80 animate-pulse">
                <div className="h-[1px] w-12 bg-yellow-400"></div>
                <div className="text-yellow-600 font-script text-3xl">&</div>
                <div className="h-[1px] w-12 bg-yellow-400"></div>
              </div>

              <div className="animate-slide-in-right bg-gradient-to-l from-yellow-50 to-transparent p-4 rounded-r-xl border-r-4 border-yellow-500 shadow-sm text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">With Daughter of Late</p>
                <h2 className={`text-2xl font-bold text-yellow-900 font-[Cinzel]`}>Mr. Mohammed Rafeeq Ali</h2>
                <p className="text-xs text-gray-600 italic mt-1">(BSc – Gulbarga)</p>
              </div>
            </div>
          )}

          {/* SCENE 6: WALIMA DATE & VENUE */}
          {currentScene === 5 && (
            <div className="animate-flip-in w-full">
              <h3 className={`text-2xl font-bold ${goldText} mb-6 tracking-widest uppercase`}>Save The Date</h3>
              
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-yellow-100 relative overflow-hidden group hover:shadow-2xl transition-shadow">
                <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <span className="text-5xl font-bold text-gray-800 font-[Cinzel]">03</span>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 uppercase tracking-widest">January</div>
                    <div className="text-xl font-bold text-yellow-700">2026</div>
                  </div>
                </div>

                <div className="space-y-4 text-left">
                   <div className="flex items-center gap-4 text-gray-700 bg-gray-50 p-2 rounded">
                      <span className="text-yellow-600 text-2xl">📅</span> 
                      <span className="font-semibold">Saturday</span>
                   </div>
                   <div className="flex items-center gap-4 text-gray-700 bg-gray-50 p-2 rounded">
                      <span className="text-yellow-600 text-2xl">🕗</span> 
                      <span className="font-semibold">8:00 PM</span>
                   </div>
                   <div className="flex items-center gap-4 text-gray-700 bg-gray-50 p-2 rounded">
                      <span className="text-yellow-600 text-2xl">🕌</span> 
                      <span className="text-sm">14th Rajjab-ul-Murajjab</span>
                   </div>
                   <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-start gap-3">
                         <span className="text-yellow-600 text-2xl animate-bounce">📍</span> 
                         <p className="text-sm text-gray-600 leading-relaxed">
                           <span className="font-bold text-gray-900 text-lg block mb-1">Maniyar Function Hall</span>
                           Azadpur Road, Umar Colony, Gulbarga
                         </p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 7: NIKAH DETAILS */}
          {currentScene === 6 && (
            <div className="animate-slide-up-slow w-full h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold tracking-[0.2em] mb-3 shadow-sm">INSHA ALLAH</span>
                <h2 className={`text-3xl font-[Cinzel] text-yellow-900 border-b-2 border-yellow-200 inline-block pb-2`}>Nikah Ceremony</h2>
              </div>

              <div className="space-y-6 bg-white/80 p-6 rounded-2xl border border-yellow-200 shadow-xl backdrop-blur-sm">
                 <div className="flex gap-4 items-center">
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 text-white p-3 rounded-lg text-center min-w-[70px] shadow-lg">
                       <span className="block text-xs uppercase opacity-80">Jan</span>
                       <span className="block text-2xl font-bold">02</span>
                    </div>
                    <div>
                       <p className="font-bold text-gray-900 text-lg">Friday | After Namaz-e-Jumma</p>
                       <p className="text-xs text-gray-600 mt-1">Masjid-e-Noor, Azadpur Road</p>
                    </div>
                 </div>

                 <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>

                 <div className="flex gap-4 items-center">
                    <div className="bg-gray-800 text-white p-3 rounded-lg text-center min-w-[70px] shadow-lg">
                       <span className="block text-xs uppercase opacity-80">Time</span>
                       <span className="block text-2xl font-bold">8PM</span>
                    </div>
                    <div>
                       <p className="font-bold text-gray-900 text-lg">Dinner Reception</p>
                       <p className="text-xs text-gray-600 mt-1">Sadaat Function Hall, Near Bagher’s Circle</p>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* SCENE 8: CLOSING */}
          {currentScene === 7 && (
            <div className="animate-fade-in w-full text-center relative z-20">
               <div className="mb-12">
                 <p className="text-xl font-[Cinzel] text-gray-700 leading-relaxed drop-shadow-sm">
                   Your presence will add grace to this auspicious occasion
                 </p>
               </div>
               
               <div className="py-8 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 animate-pulse">
                    <Heart size={140} className="text-red-500" fill="currentColor" />
                  </div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-2 font-bold">With Best Compliments</p>
                  <h2 className={`text-4xl font-bold ${goldText} font-['Amiri'] drop-shadow-md`}>
                    Inamdar Family
                  </h2>
               </div>

               <button 
                onClick={restart}
                className="mt-12 text-yellow-800 flex items-center justify-center gap-2 mx-auto hover:text-yellow-600 transition-colors bg-white/50 px-6 py-2 rounded-full shadow-sm"
               >
                 <RotateCcw size={16} /> Replay Invitation
               </button>
            </div>
          )}

        </div>

        {/* --- CONTROLS --- */}
        {currentScene > -1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 z-40 pointer-events-none">
             {/* Note: pointer-events-none on container so clicks pass through to screen, buttons have pointer-events-auto */}
             <button 
               onClick={togglePlay}
               className="w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-yellow-700 hover:scale-110 transition-transform pointer-events-auto"
             >
               {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
             </button>
             <button 
               onClick={toggleMute}
               className="w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center text-yellow-700 hover:scale-110 transition-transform pointer-events-auto"
             >
               {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
             </button>
          </div>
        )}

        {/* Tap Hints (Visible briefly) */}
        {currentScene > -1 && isPlaying && (
            <>
                <div className="absolute top-1/2 left-4 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                    <ChevronLeft size={40} className="text-gray-400" />
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                    <ChevronRight size={40} className="text-gray-400" />
                </div>
            </>
        )}

        {/* Progress Bar */}
        {currentScene > -1 && (
          <div className="absolute bottom-0 left-0 h-1.5 bg-yellow-100 w-full z-50">
             {/* Segmented Progress Bar like Insta */}
            <div className="flex h-full w-full gap-0.5 px-0.5">
                {scenes.map((s, idx) => (
                    <div key={idx} className="h-full flex-1 bg-gray-200 rounded-full overflow-hidden relative">
                        {idx < currentScene ? (
                             <div className="absolute inset-0 bg-yellow-600"></div>
                        ) : idx === currentScene ? (
                             <div className="absolute inset-0 bg-yellow-600 animate-progress origin-left" style={{animationDuration: `${s.duration}ms`}}></div>
                        ) : null}
                    </div>
                ))}
            </div>
          </div>
        )}

      </div>

      {/* --- CSS STYLES FOR ANIMATIONS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;700;900&family=Lato:wght@300;400;700&family=Great+Vibes&display=swap');

        .font-script { font-family: 'Great Vibes', cursive; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; }
        .animate-fade-in-slow { animation: fadeIn 3s ease-out forwards; }
        
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slide-up { animation: slideUp 1s ease-out forwards; }
        .animate-slide-up-slow { animation: slideUp 2s ease-out forwards; }

        @keyframes zoomIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-zoom-in { animation: zoomIn 1.5s ease-out forwards; }

        @keyframes shimmer { 
          0% { background-position: 200% center; } 
          100% { background-position: -200% center; } 
        }
        .animate-shimmer { animation: shimmer 3s linear infinite; }

        @keyframes floatDown { 
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; } 
          50% { opacity: 1; }
          100% { transform: translateY(20px) rotate(10deg); opacity: 0; } 
        }
        .animate-float-down { animation: floatDown 4s ease-in-out infinite; }
        .animate-float-down-delayed { animation: floatDown 4s ease-in-out 2s infinite; }

        @keyframes slideInLeft { from { transform: translateX(-50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-slide-in-left { animation: slideInLeft 1s ease-out forwards; }

        @keyframes slideInRight { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        .animate-slide-in-right { animation: slideInRight 1s ease-out forwards; }

        @keyframes flipIn { from { transform: rotateX(90deg); opacity: 0; } to { transform: rotateX(0deg); opacity: 1; } }
        .animate-flip-in { animation: flipIn 1s ease-out forwards; }

        .animate-fade-in-delay-1 { opacity: 0; animation: fadeIn 1s ease-out 0.5s forwards; }
        .animate-fade-in-delay-2 { opacity: 0; animation: fadeIn 1s ease-out 1.5s forwards; }
        .animate-fade-in-delay-3 { opacity: 0; animation: fadeIn 1s ease-out 2.5s forwards; }

        @keyframes floatParticle {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        .animate-float-particle { animation: floatParticle linear infinite; }

        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 10s linear infinite; }

        @keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .animate-progress { animation: progress linear forwards; }

        @keyframes floatUpFade { 
           0% { transform: translateY(0) scale(1); opacity: 1; } 
           100% { transform: translateY(-100px) scale(0.5); opacity: 0; } 
        }
        .animate-float-up-fade { animation: floatUpFade 3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
