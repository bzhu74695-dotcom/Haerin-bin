import { useEffect, useMemo, useRef, useState } from 'react';
import AnimatedList from './AnimatedList.jsx';
import BlurText from './BlurText.jsx';
import ElasticSlider from './ElasticSlider.jsx';
import StaggeredMenu from './StaggeredMenu.jsx';
import './MusicPlayer.css';

const musicModules = import.meta.glob('../../Music/*.{mp3,aac,wav,ogg,m4a,flac}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const flowerModules = import.meta.glob('../../Haerin_*/Flower.png', {
  eager: true,
  query: '?url',
  import: 'default',
});

const flowerRecord = Object.values(flowerModules)[0];

const tracks = Object.entries(musicModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const filename = path.split('/').pop() ?? 'NewJeans';
    const title = filename.replace(/\.[^.]+$/, '');

    return { title, filename, src };
  });

const formatTime = seconds => {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

function MusicPlayer() {
  const audioRef = useRef(null);
  const shouldResumeRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.72);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const currentTrack = tracks[currentIndex] ?? tracks[0];
  const trackNames = useMemo(() => tracks.map(track => track.title), []);
  const progress = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.load();
    setCurrentTime(0);
    setDuration(0);

    if (!shouldResumeRef.current) return;

    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;

    shouldResumeRef.current = true;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(true);
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    shouldResumeRef.current = false;
    audio.pause();
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const selectTrack = index => {
    shouldResumeRef.current = true;
    setCurrentIndex(index);
  };

  const playPrevious = () => {
    shouldResumeRef.current = isPlaying;
    setCurrentIndex(index => (index - 1 + tracks.length) % tracks.length);
  };

  const playNext = () => {
    shouldResumeRef.current = isPlaying;
    setCurrentIndex(index => (index + 1) % tracks.length);
  };

  const handleSeek = event => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const nextTime = (Number(event.target.value) / 100) * duration;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  if (!tracks.length) return null;

  return (
    <StaggeredMenu
      className="music-staggered-menu"
      position="left"
      colors={['#fff4c7', '#ffd7ec', '#bfefff']}
      menuButtonLabel="Music"
      closeButtonLabel="Close"
      displayLogo={false}
      logoAriaLabel="Spin music logo"
      panelAriaLabel="NewJeans music player"
      menuButtonColor="#111111"
      openMenuButtonColor="#111111"
      accentColor="#ff7ab6"
      isFixed
      displaySocials={false}
      displayItemNumbering={false}
      panelContent={
        <section className="music-panel" aria-label="NewJeans music player">
          <audio
            ref={audioRef}
            src={currentTrack.src}
            preload="metadata"
            onLoadedMetadata={event => setDuration(event.currentTarget.duration)}
            onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)}
            onEnded={playNext}
          />

          <div className="music-panel-header">
            <p>NEWJEANS PLAYER</p>
            <span>{tracks.length} tracks</span>
          </div>

          <div className="music-now">
            <div className={`music-orb ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true">
              <img src={flowerRecord} alt="" />
            </div>
            <div className="music-now-copy">
              <span>Now playing</span>
              <div className="music-title-window" data-long-title={currentTrack.title.length > 9 || undefined}>
                <div className="music-title-track">
                  <BlurText
                    key={currentTrack.title}
                    as="h2"
                    text={currentTrack.title}
                    animateBy="letters"
                    delay={35}
                    direction="top"
                    stepDuration={0.24}
                    className="music-title-blur"
                  />
                  {currentTrack.title.length > 9 && (
                    <h2 className="music-title-blur music-title-duplicate" aria-hidden="true">
                      {currentTrack.title}
                    </h2>
                  )}
                </div>
              </div>
              <p>{currentTrack.filename}</p>
            </div>
          </div>

          <div className="music-progress">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              aria-label="Seek through current song"
              style={{ '--music-progress': `${progress}%` }}
              onChange={handleSeek}
            />
            <div className="music-time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="music-controls" aria-label="Playback controls">
            <button type="button" onClick={playPrevious} aria-label="Previous song">
              {'< Prev'}
            </button>
            <button className="music-play-button" type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause song' : 'Play song'}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button type="button" onClick={playNext} aria-label="Next song">
              {'Next >'}
            </button>
          </div>

          <div className="music-volume">
            <span>Volume</span>
            <strong>{Math.round(volume * 100)}%</strong>
            <ElasticSlider
              className="music-volume-slider"
              defaultValue={Math.round(volume * 100)}
              startingValue={0}
              maxValue={100}
              isStepped
              stepSize={1}
              leftIcon={null}
              rightIcon={null}
              showValue={false}
              onChange={value => setVolume(value / 100)}
            />
          </div>

          <div className="music-list-block">
            <div className="music-list-title">
              <span>Playlist</span>
              <strong>NewJeans</strong>
            </div>
            <AnimatedList
              items={trackNames}
              initialSelectedIndex={currentIndex}
              onItemSelect={(_, index) => selectTrack(index)}
              className="music-track-list"
              itemClassName="music-track-item"
              showGradients
              enableArrowNavigation={false}
              displayScrollbar={false}
            />
          </div>
        </section>
      }
    />
  );
}

export default MusicPlayer;
