import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Play, Pause, SkipForward, SkipBack, Eye, ChevronUp, ChevronDown } from 'lucide-react';

interface DemoScene {
  time: number;
  timeLabel: string;
  path: string;
  title: string;
}

const DEMO_SCENES: DemoScene[] = [
  { time: 0, timeLabel: '00:00', path: '/register-resource', title: 'Register Community Resource' },
  { time: 6, timeLabel: '00:06', path: '/request', title: 'Citizen Aid Intake' },
  { time: 12, timeLabel: '00:12', path: '/request/photos', title: 'Damage Photo & AI Lighting QC' },
  { time: 17, timeLabel: '00:17', path: '/request/status/Request-50', title: 'We got your request (Status)' },
  { time: 20, timeLabel: '00:20', path: '/coordinator', title: 'Sorting Queue (42 open)' },
  { time: 24, timeLabel: '00:24', path: '/coordinator/review/Request-50', title: 'Model Suggestion & S2 Override' },
  { time: 27, timeLabel: '00:27', path: '/coordinator/assign/Request-50', title: 'Assign Volunteer Team (White River)' },
  { time: 29, timeLabel: '00:29', path: '/coordinator/map', title: 'Coverage Map (Fishers Gap)' },
  { time: 33, timeLabel: '00:33', path: '/coordinator/operations', title: 'Operations Overview & Audit Log' },
];

const TOTAL_DURATION = 35; // 35 seconds matching the demo video scrubber

export const DemoPlayerBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(12);
  const [isMinimized, setIsMinimized] = useState(false);

  // Synchronize route when scrubber or scenes advance
  const syncToScene = (targetTime: number) => {
    // Find closest scene at or preceding targetTime
    const scene = [...DEMO_SCENES].reverse().find(s => s.time <= targetTime) || DEMO_SCENES[0];
    if (location.pathname !== scene.path) {
      navigate(scene.path);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 1;
          if (next > TOTAL_DURATION) {
            setIsPlaying(false);
            return 0;
          }
          syncToScene(next);
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, location.pathname]);

  const currentScene = [...DEMO_SCENES].reverse().find(s => s.time <= currentTime) || DEMO_SCENES[0];

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setCurrentTime(val);
    syncToScene(val);
  };

  const jumpNext = () => {
    const nextScene = DEMO_SCENES.find(s => s.time > currentTime) || DEMO_SCENES[0];
    setCurrentTime(nextScene.time);
    navigate(nextScene.path);
  };

  const jumpPrev = () => {
    const prevScenes = DEMO_SCENES.filter(s => s.time < currentTime);
    const target = prevScenes.length > 0 ? prevScenes[prevScenes.length - 1] : DEMO_SCENES[0];
    setCurrentTime(target.time);
    navigate(target.path);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isMinimized) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 9999,
          backgroundColor: '#9a472c',
          color: '#ffffff',
          padding: '0.45rem 0.85rem',
          borderRadius: '999px',
          boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          fontSize: '0.78rem',
          fontWeight: 700,
        }}
        onClick={() => setIsMinimized(false)}
      >
        <Play size={13} fill="#ffffff" />
        <span>Open Demo Video Player ({formatSeconds(currentTime)} / 00:35)</span>
        <ChevronUp size={14} />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(154, 71, 44, 0.95)',
        backdropFilter: 'blur(6px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        padding: '0.45rem 1.5rem',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
    >
      {/* Top status info line */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.85 }}>
            AidFlow 35s Demo Video Scrubber
          </span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span style={{ fontWeight: 600, color: '#ffeadf' }}>
            Scene: {currentScene.title}
          </span>
        </div>

        <button
          onClick={() => setIsMinimized(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            color: '#ffffff',
            opacity: 0.85,
            fontSize: '0.72rem',
            fontWeight: 600,
          }}
          title="Minimize video controls"
        >
          <span>Hide player</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Main Scrubber Control Row matching the screenshots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Play/Pause & Skip Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            onClick={jumpPrev}
            style={{ color: '#ffffff', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
            title="Previous scene"
          >
            <SkipBack size={16} fill="#ffffff" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#9a472c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={isPlaying ? 'Pause' : 'Play walkthrough'}
          >
            {isPlaying ? <Pause size={15} fill="#9a472c" /> : <Play size={15} fill="#9a472c" style={{ marginLeft: '2px' }} />}
          </button>

          <button
            onClick={jumpNext}
            style={{ color: '#ffffff', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
            title="Next scene"
          >
            <SkipForward size={16} fill="#ffffff" />
          </button>
        </div>

        {/* Current Time */}
        <span style={{ fontSize: '0.75rem', fontWeight: 700, minWidth: '38px', fontVariantNumeric: 'tabular-nums' }}>
          {formatSeconds(currentTime)}
        </span>

        {/* Timeline Range Bar */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="range"
            min={0}
            max={TOTAL_DURATION}
            value={currentTime}
            onChange={handleSeek}
            style={{
              width: '100%',
              accentColor: '#ffffff',
              cursor: 'pointer',
              height: '4px',
            }}
          />
        </div>

        {/* Total Duration */}
        <span style={{ fontSize: '0.75rem', fontWeight: 700, minWidth: '38px', opacity: 0.85, fontVariantNumeric: 'tabular-nums' }}>
          00:35
        </span>
      </div>
    </div>
  );
};
