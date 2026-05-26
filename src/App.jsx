import { useEffect, useLayoutEffect, useState } from 'react';
import Stack from './components/Stack.jsx';
import ShinyText from './components/ShinyText.jsx';
import TextPressure from './components/TextPressure.jsx';
import RotatingText from './components/RotatingText.jsx';
import ScrollVelocity from './components/ScrollVelocity.jsx';
import CircularGallery from './components/CircularGallery.jsx';
import TrueFocus from './components/TrueFocus.jsx';
import ClickSpark from './components/ClickSpark.jsx';
import FlowingMenu from './components/FlowingMenu.jsx';
import CardSwap, { Card } from './components/CardSwap.jsx';
import LogoLoop from './components/LogoLoop.jsx';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack.jsx';
import DomeGallery from './components/DomeGallery.jsx';
import StaggeredMenu from './components/StaggeredMenu.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import LightRays from './components/LightRays.jsx';

import howSweetWhite from '../Haerin_姜海粼_4K壁纸_52张/009_solo_howsweet_white.jpg';
import flowerLogo from '../Haerin_姜海粼_4K壁纸_52张/Flower.png';
import hiroshiClose from '../Haerin_姜海粼_4K壁纸_52张/025_solo_hiroshi_close.jpg';
import omgClose from '../Haerin_姜海粼_4K壁纸_52张/030_solo_omg_close.jpg';
import supernaturalSoft from '../Haerin_姜海粼_4K壁纸_52张/032_solo_supernatural_soft.jpg';
import haerinBlack from '../Haerin_姜海粼_4K壁纸_52张/028_solo_haerin_black.jpg';
import howSweetPortrait from '../Haerin_姜海粼_4K壁纸_52张/012_solo_howsweet_portrait.jpg';
import howSweetMinimal from '../Haerin_姜海粼_4K壁纸_52张/015_solo_howsweet_minimal.jpg';
import galleryClean from '../Haerin_姜海粼_4K壁纸_52张/003_solo_haerin_clean.jpg';
import gallerySoft from '../Haerin_姜海粼_4K壁纸_52张/004_solo_haerin_soft.jpg';
import galleryBubblegumPose from '../Haerin_姜海粼_4K壁纸_52张/005_solo_bubblegum_pose.jpg';
import galleryBubblegumClose from '../Haerin_姜海粼_4K壁纸_52张/006_solo_bubblegum_close.jpg';
import galleryGetupDark from '../Haerin_姜海粼_4K壁纸_52张/007_solo_getup_dark.jpg';
import galleryGetupStage from '../Haerin_姜海粼_4K壁纸_52张/008_solo_getup_stage.jpg';
import galleryHowSweetBlue from '../Haerin_姜海粼_4K壁纸_52张/010_solo_howsweet_blue.jpg';
import galleryHowSweetCute from '../Haerin_姜海粼_4K壁纸_52张/011_solo_howsweet_cute.jpg';
import galleryHowSweetSide from '../Haerin_姜海粼_4K壁纸_52张/013_solo_howsweet_side.jpg';
import galleryHowSweetBright from '../Haerin_姜海粼_4K壁纸_52张/014_solo_howsweet_bright.jpg';
import galleryOmgRed from '../Haerin_姜海粼_4K壁纸_52张/016_solo_omg_red.jpg';
import galleryOmgBlue from '../Haerin_姜海粼_4K壁纸_52张/017_solo_omg_blue.jpg';
import flowingHaern from '../Haerin_姜海粼_4K壁纸_52张/019_solo_supernatural_close.jpg';
import flowingJiang from '../Haerin_姜海粼_4K壁纸_52张/027_solo_haerin_light.jpg';
import flowingNewjeans from '../Haerin_姜海粼_4K壁纸_52张/044_group_howsweet_haerin_center.jpg';
import flowingZengBin from '../Haerin_姜海粼_4K壁纸_52张/024_solo_hiroshi_supernatural.jpg';
import cardSupernaturalWhite from '../Haerin_姜海粼_4K壁纸_52张/018_solo_supernatural_white.jpg';
import cardSupernaturalPose1 from '../Haerin_姜海粼_4K壁纸_52张/020_solo_supernatural_pose1.jpg';
import cardSupernaturalPose2 from '../Haerin_姜海粼_4K壁纸_52张/021_solo_supernatural_pose2.jpg';
import cardSupernaturalPose3 from '../Haerin_姜海粼_4K壁纸_52张/022_solo_supernatural_pose3.jpg';
import cardSupernaturalPose4 from '../Haerin_姜海粼_4K壁纸_52张/023_solo_supernatural_pose4.jpg';
import cardSupernaturalMain from '../Haerin_姜海粼_4K壁纸_52张/031_solo_supernatural_main.jpg';
import cardSupernaturalGray from '../Haerin_姜海粼_4K壁纸_52张/033_solo_supernatural_gray.jpg';

const personalHomeUrl = 'https://space.bilibili.com/517428107?spm_id_from=333.1007.0.0';

const domePhotoModules = import.meta.glob(
  './assets/dome-gallery/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

const domeFullPhotoModules = import.meta.glob(
  ['../Haerin_姜海粼_4K壁纸_52张/*.{jpg,jpeg,png,webp}', '!../Haerin_姜海粼_4K壁纸_52张/New.jpg'],
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

const domeFullPhotoByName = Object.fromEntries(
  Object.entries(domeFullPhotoModules).map(([path, src]) => [path.split('/').pop(), src])
);

const domeGalleryImages = Object.entries(domePhotoModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const filename = path.split('/').pop() ?? 'Haerin photo';
    const label = filename
      .replace(/\.[^.]+$/, '')
      .replace(/^\d+_/, '')
      .replaceAll('_', ' ');

    return {
      src,
      fullSrc: domeFullPhotoByName[filename],
      alt: `Haerin ${label}`,
    };
  });

const heroPhotos = [
  { src: howSweetWhite, alt: 'Haerin How Sweet white portrait' },
  { src: hiroshiClose, alt: 'Haerin Hiroshi close portrait' },
  { src: omgClose, alt: 'Haerin OMG close portrait' },
  { src: supernaturalSoft, alt: 'Haerin Supernatural soft portrait' },
  { src: haerinBlack, alt: 'Haerin black portrait' },
  { src: howSweetPortrait, alt: 'Haerin How Sweet portrait' },
  { src: howSweetMinimal, alt: 'Haerin How Sweet minimal portrait' },
];

const haerinStory = [
  '姜海粼，英文名 Haerin，2006 年 5 月 15 日出生于韩国庆尚北道金泉市。她的名字像一片被光照亮的水面，安静、清澈，又带着一点让人想继续靠近的神秘感。',
  '在成为 NewJeans 的成员之前，她也只是一个慢慢长大的女孩。她带着很淡的表情、很稳的节奏感进入练习生活，把镜头感、舞台步伐和声音里的细节一点一点磨出来。',
  '2022 年，Haerin 以 NewJeans 成员的身份正式出道。从《Attention》到《Ditto》《OMG》《Super Shy》《How Sweet》，她的存在感并不张扬，却总能在一个眼神、一个转身、一个轻轻落下的音里被记住。',
  '她的人生故事还很年轻，所以每一次出现都像新的章节。姜海粼不是被一句话概括的人，她更像一段正在展开的旋律：清冷、柔和、认真，也在越来越自然地成为自己。',
];

const galleryItems = [
  { image: galleryClean, text: '~(=^･ω･^)' },
  { image: gallerySoft, text: '꜀(^. .^꜀ )꜆੭' },
  { image: galleryBubblegumPose, text: '(ˆ ̳◝ ·̫ ◜ ̳ˆ)' },
  { image: galleryBubblegumClose, text: '₍^·͈ 𖥦 ·͈^₎◞' },
  { image: galleryGetupDark, text: 'ฅ(ᯫ᳐᎑ ᎑ᯫ᳐)ฅ' },
  { image: galleryGetupStage, text: '(^_ ̫ _^)' },
  { image: galleryHowSweetBlue, text: '^ ̳ᴗ ̫ ᴗ ̳^ྀི' },
  { image: galleryHowSweetCute, text: '₍˄•༝•˄₎◞✩︎' },
  { image: galleryHowSweetSide, text: '𑁊^. .^𑁊' },
  { image: galleryHowSweetBright, text: '^.,.^' },
  { image: galleryOmgRed, text: 'ᗦ↞◃ ฅ^•ꈊ•^ฅو' },
  { image: galleryOmgBlue, text: '₍ᐞ॰༝॰ᐞ₎◞ ̑̑' },
];

const thirdScreenItems = [
  {
    text: 'Haern',
    image: flowingHaern,
    kicker: 'quiet focus',
    title: 'Haern',
    description:
      '这一格保留一点拼写上的私心：像把 Haerin 的名字折成一枚暗号。近景里的眼神干净、冷静，适合放在第三屏开头，先把注意力轻轻拉住。',
  },
  {
    text: '姜海粼',
    image: flowingJiang,
    kicker: 'soft chapter',
    title: '姜海粼',
    description:
      '中文名字更像一段温柔注释：海面、光、清澈的粼粼感。画面用浅色和花朵去承接她身上安静但很鲜明的气质。',
  },
  {
    text: 'Newjeans',
    image: flowingNewjeans,
    kicker: 'five in rhythm',
    title: 'Newjeans',
    description:
      'NewJeans 的魅力在于松弛又准确的整体感。五个人站在同一帧里，像不同音色落在同一拍上，干净、年轻，也很有记忆点。',
  },
  {
    text: 'ZengBin',
    image: flowingZengBin,
    kicker: 'collector note',
    title: 'ZengBin',
    description:
      '这一格留给制作者的署名视角：不是打断作品，而是在页面里放下一枚小小印章。选择这张冷调照片，是为了让名字也带一点克制的舞台感。',
  },
];

const featuredCatCards = [
  {
    image: cardSupernaturalWhite,
    label: 'SELECT 01',
    title: '清醒猫眼',
    text: '她把镜头看成一扇安静的窗，下一秒就能把全场噪音调低。',
  },
  {
    image: cardSupernaturalPose1,
    label: 'SELECT 02',
    title: '软着陆',
    text: '姜海粼的可爱不是扑过来，是轻轻落在你旁边，然后世界自动变亮。',
  },
  {
    image: cardSupernaturalPose2,
    label: 'SELECT 03',
    title: '猫科节拍',
    text: '像听见只有她知道的拍子，转身、停顿、抬眼，全都踩得刚刚好。',
  },
  {
    image: cardSupernaturalPose3,
    label: 'SELECT 04',
    title: '玻璃糖',
    text: '清冷外壳里藏一点甜，不喧哗，但会在回看时慢慢发光。',
  },
  {
    image: cardSupernaturalPose4,
    label: 'SELECT 05',
    title: '午后巡逻',
    text: '猫猫经过页面边缘，顺手检查一下大家今天有没有好好被治愈。',
  },
  {
    image: cardSupernaturalMain,
    label: 'SELECT 06',
    title: '救场主视觉',
    text: '好耶，是姜海粼。把这张翻到最前面，坏心情先暂停营业。',
  },
  {
    image: cardSupernaturalGray,
    label: 'SELECT 07',
    title: '银灰静电',
    text: '不需要太多动作，空气里一点点电流，就已经足够让人记住。',
  },
];

const lifeStackCards = [
  {
    image: howSweetPortrait,
    period: '2006 / Gimcheon',
    title: '名字里的水光',
    text: '姜海粼出生在韩国庆尚北道金泉市。名字里有海，也有粼粼的光，像她后来给人的第一印象：安静、清澈、但很难被忽略。',
    tag: 'birth note',
  },
  {
    image: galleryGetupStage,
    period: 'Trainee Days',
    title: '把节拍磨亮',
    text: '在正式站到舞台中央之前，她把练习生活过成一种慢慢校准的节奏。镜头感、动作线条、声音里的细节，都不是突然出现的。',
    tag: 'practice',
  },
  {
    image: flowingNewjeans,
    period: '2022 / NewJeans',
    title: '出道，像风进场',
    text: '2022 年，Haerin 以 NewJeans 成员身份被看见。从 Attention 开始，她不靠夸张抢镜，却总能用一个抬眼留下记忆点。',
    tag: 'debut',
  },
  {
    image: omgClose,
    period: 'Ditto / OMG',
    title: '冷静里的电流',
    text: '《Ditto》和《OMG》时期，她身上的反差变得更鲜明：表情克制，舞台却精准。那种猫眼一样的专注感，成了很多人入坑的瞬间。',
    tag: 'signature',
  },
  {
    image: cardSupernaturalMain,
    period: 'How Sweet / Supernatural',
    title: '长成自己的氛围',
    text: '后来从《How Sweet》到《Supernatural》，她的气质更舒展了。甜不是用力撒出来的，清冷也不是距离感，而是越来越自然地成为自己。',
    tag: 'chapter',
  },
];

const fanSiteLogos = [
  { mark: 'B', name: '哔哩哔哩', tone: 'blue', href: personalHomeUrl },
  { mark: 'NJ', name: 'NewJeans.kr', tone: 'black', href: 'https://newjeans.kr/' },
  { mark: 'JP', name: 'NewJeans JP', tone: 'cream', href: 'https://www.newjeans.jp/' },
  { mark: 'YT', name: 'NewJeans YouTube', tone: 'red', href: 'https://www.youtube.com/@NewJeans_official' },
  { mark: 'WV', name: 'NewJeans Weverse', tone: 'mint', href: 'https://weverse.io/newjeansofficial' },
  { mark: 'IG', name: 'NewJeans Instagram', tone: 'pink', href: 'https://www.instagram.com/newjeans_official/' },
  { mark: 'HR', name: 'Haerin Profile', tone: 'violet', href: 'https://kprofiles.com/haerin-newjeans-profile/' },
  { mark: 'CAT', name: 'Haerin Wiki', tone: 'green', href: 'https://newjeans.fandom.com/wiki/Haerin' },
  { mark: '2006', name: 'Haerin Wiki EN', tone: 'gray', href: 'https://en.wikipedia.org/wiki/Haerin' },
].map(logo => ({
  href: logo.href,
  ariaLabel: `打开 ${logo.name}`,
  node: (
    <span className={`fan-logo fan-logo--${logo.tone}`}>
      <span>{logo.mark}</span>
      <strong>{logo.name}</strong>
    </span>
  ),
}));

const navItems = [
  { label: 'Hero', link: '#hero', ariaLabel: 'Jump to Haerin hero' },
  { label: 'Story', link: '#story', ariaLabel: 'Jump to Haerin story' },
  { label: 'Flowing', link: '#flowing-menu', ariaLabel: 'Jump to flowing menu' },
  { label: 'Picks', link: '#photo-picks', ariaLabel: 'Jump to selected cat photos' },
  { label: 'Links', link: '#fan-links', ariaLabel: 'Jump to Haerin and NewJeans links' },
  { label: 'Life', link: '#life-stack', ariaLabel: 'Jump to Haerin life story stack' },
  { label: 'Gallery', link: '#dome-gallery', ariaLabel: 'Jump to all Haerin photos' },
];

const navSocialItems = [
  { label: 'Bilibili', link: personalHomeUrl },
  { label: 'NewJeans', link: 'https://newjeans.kr/' },
  { label: 'Instagram', link: 'https://www.instagram.com/newjeans_official/' },
];

const footerColumns = [
  {
    title: 'Pages',
    links: [
      { label: 'Hero', href: '#hero' },
      { label: 'Story', href: '#story' },
      { label: 'Gallery', href: '#dome-gallery' },
    ],
  },
  {
    title: 'Haerin',
    links: [
      { label: 'NewJeans', href: 'https://newjeans.kr/' },
      { label: 'Official JP', href: 'https://www.newjeans.jp/' },
      { label: 'Weverse', href: 'https://weverse.io/newjeansofficial' },
    ],
  },
  {
    title: 'Signals',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/newjeans_official/' },
      { label: 'YouTube', href: 'https://www.youtube.com/@NewJeans_official' },
      { label: 'Bilibili', href: personalHomeUrl },
    ],
  },
  {
    title: 'Credits',
    links: [
      { label: 'Made for Haerin', href: '#hero' },
      { label: 'Light by ReactBits', href: 'https://reactbits.dev/' },
      { label: 'Back to top', href: '#hero' },
    ],
  },
];

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const stackCards = heroPhotos.map(photo => (
    <img key={photo.src} className="card-image" src={photo.src} alt={photo.alt} />
  ));
  const flowingMenuItems = thirdScreenItems.map(item => ({
    ...item,
    link: '#flowing-menu',
    onClick: () => setActiveMenuItem(item),
  }));

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    scrollToTop();
    const frameId = window.requestAnimationFrame(scrollToTop);
    const timeoutId = window.setTimeout(scrollToTop, 0);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!activeMenuItem) return undefined;

    const handleKeyDown = ev => {
      if (ev.key === 'Escape') {
        setActiveMenuItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMenuItem]);

  return (
    <ClickSpark
      sparkColor="#000000"
      sparkSize={12}
      sparkRadius={24}
      sparkCount={10}
      duration={520}
      extraScale={1.2}
    >
      <main className="app-shell">
      <StaggeredMenu
        className="haerin-staggered-menu"
        position="right"
        colors={['#dffbff', '#8feaf5', '#00bcd4']}
        items={navItems}
        socialItems={navSocialItems}
        logoUrl={flowerLogo}
        menuButtonColor="#111111"
        openMenuButtonColor="#111111"
        accentColor="#00bcd4"
        isFixed
      />

      <section className="hero" id="hero" aria-label="HAERIN hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <ShinyText
              text="NEWJEANS / HAERIN"
              speed={4.5}
              color="#242424"
              shineColor="#fff4c7"
              spread={105}
              yoyo
              pauseOnHover
            />
          </p>
          <div className="title-pressure" aria-label="HAERIN">
            <TextPressure
              text="HAERIN"
              flex
              width
              weight
              italic={false}
              alpha={false}
              stroke={false}
              scale={false}
              textColor="#070707"
              minFontSize={72}
            />
          </div>
          <p className="hero-note">
            <RotatingText
              texts={[
                'Haerin feels like a soft little dream that makes the day brighter.',
                'Her gentle energy brings a peaceful warmth to every moment.',
                'Haerin is the kind of light that makes ordinary days feel special.',
              ]}
              rotationInterval={2600}
              splitBy="words"
              staggerDuration={0.035}
              staggerFrom="first"
              mainClassName="hero-note-rotating"
            />
          </p>
        </div>

        <div className="hero-visual" aria-label="Haerin photo stack">
          <div className="stack-frame">
            <Stack
              cards={stackCards}
              randomRotation
              sensitivity={140}
              sendToBackOnClick
              autoplay
              autoplayDelay={2600}
              pauseOnHover
              mobileClickOnly
            />
          </div>
        </div>
      </section>

      <div className="screen-divider" aria-label="Haerin screen divider">
        <ScrollVelocity
          texts={['Haerin', '姜海粼']}
          velocity={58}
          numCopies={8}
          className="divider-text"
          parallaxClassName="divider-parallax"
          scrollerClassName="divider-scroller"
        />
      </div>

      <section className="devotion" id="story" aria-label="Haerin story">
        <div className="devotion-inner">
          <div className="story-heading" aria-label="Haerin biography heading">
            <TrueFocus
              sentence="Haerin 姜海粼"
              blurAmount={3.6}
              borderColor="#111111"
              glowColor="rgba(255, 223, 234, 0.8)"
              animationDuration={0.72}
              pauseBetweenAnimations={1.15}
            />
          </div>

          <div className="devotion-copy">
            {haerinStory.map((paragraph, index) => (
              <p className="devotion-copy-text" style={{ '--delay': `${index * 110}ms` }} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="story-gallery" aria-label="Haerin circular photo gallery">
            <CircularGallery
              items={galleryItems}
              bend={2.6}
              borderRadius={0.075}
              textColor="#171717"
              font="bold 32px Inter, sans-serif"
              scrollSpeed={2.2}
              scrollEase={0.055}
            />
          </div>
        </div>
      </section>

      <section className="third-screen" id="flowing-menu" aria-label="Haerin flowing menu">
        <div className="third-screen-intro">
          <p className="third-screen-kicker">SCREEN 03 / FLOWING MENU</p>
          <h2>姜海粼猫猫最可爱</h2>
        </div>

        <div className="third-menu-frame">
          <FlowingMenu
            items={flowingMenuItems}
            speed={18}
            textColor="#0b0b0b"
            bgColor="#f4eadf"
            marqueeBgColor="#101010"
            marqueeTextColor="#fff7e8"
            borderColor="rgba(8, 8, 8, 0.18)"
          />
        </div>
      </section>

      <section className="fourth-screen" id="photo-picks" aria-label="Haerin selected cat photos">
        <div className="fourth-copy">
          <p className="fourth-kicker">SCREEN 04 / CARD SWAP</p>
          <h2>
            <span>Haerin，</span>
            <span>猫猫精选照片！</span>
          </h2>
          <p>好耶，是姜海粼！我们有救了！——for 曾斌</p>
        </div>

        <div className="card-swap-stage" aria-label="Haerin selected photo cards">
          <CardSwap
            width={410}
            height={560}
            cardDistance={62}
            verticalDistance={68}
            delay={3200}
            pauseOnHover
            skewAmount={5}
            easing="elastic"
          >
            {featuredCatCards.map(card => (
              <Card customClass="photo-swap-card" key={card.title}>
                <img src={card.image} alt={`姜海粼${card.title}精选照片`} />
                <div className="photo-card-copy">
                  <span>{card.label}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </section>

      <section className="logo-loop-screen" id="fan-links" aria-label="Haerin and NewJeans links">
        <div className="logo-loop-copy">
          <p>CLICK ANY LOGO</p>
          <span>这些入口都会跳到曾斌的哔哩哔哩主页</span>
        </div>
        <LogoLoop
          logos={fanSiteLogos}
          speed={72}
          direction="left"
          logoHeight={44}
          gap={18}
          pauseOnHover
          fadeOut
          fadeOutColor="#f8f0e5"
          scaleOnHover
          ariaLabel="NewJeans, Haerin and Bilibili logo links"
          className="fan-logo-loop"
        />
      </section>

      <section className="scroll-stack-screen" id="life-stack" aria-label="Haerin life story scroll stack">
        <div className="scroll-stack-copy">
          <p>SCREEN 05 / SCROLL STACK</p>
          <h2>
            <span>她的人生章节</span>
            <span>一张张叠起来。</span>
          </h2>
          <span>滚动卡片会一张张压进画面里：从姜海粼的出生、练习、出道，到越来越自然的舞台氛围。</span>
        </div>

        <div className="scroll-stack-frame">
          <ScrollStack
            itemDistance={150}
            itemScale={0.035}
            itemStackDistance={42}
            stackPosition="14%"
            scaleEndPosition="8%"
            baseScale={0.86}
            rotationAmount={0}
            blurAmount={0.6}
            useWindowScroll
            className="life-scroll-stack"
          >
            {lifeStackCards.map(card => (
              <ScrollStackItem
                key={card.title}
                itemClassName="life-stack-card"
              >
                <img src={card.image} alt={`${card.title} card`} />
                <div className="life-stack-card-copy">
                  <div className="life-stack-card-meta">
                    <span>{card.period}</span>
                    <strong>{card.tag}</strong>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      <section className="dome-gallery-screen" id="dome-gallery" aria-label="Haerin dome gallery">
        <div className="dome-gallery-copy">
          <p>SCREEN 06 / DOME GALLERY</p>
          <h2>
            <ShinyText
              text="All Haerin Photos"
              speed={4.2}
              color="#fff7ea"
              shineColor="#ffd7ec"
              spread={110}
              yoyo
              pauseOnHover
            />
          </h2>
          <span>全部照片进入同一个旋转穹顶，重复也没关系，重点交给组件本身。</span>
        </div>

        <div className="dome-gallery-frame" aria-label="All Haerin photos in a rotating dome">
          <DomeGallery
            images={domeGalleryImages}
            segments={35}
            fit={0.58}
            minRadius={520}
            maxRadius={860}
            maxVerticalRotationDeg={0}
            dragSensitivity={18}
            dragDampening={0.72}
            overlayBlurColor="#100d12"
            imageBorderRadius="18px"
            openedImageBorderRadius="26px"
            openedImageWidth="min(88vw, 1120px)"
            openedImageHeight="min(78vh, 630px)"
            grayscale={false}
            autoRotate
            autoRotateSpeed={-3.6}
          />
        </div>
      </section>

      <footer className="site-footer" aria-label="Final page">
        <div className="footer-light" aria-hidden="true">
          <LightRays
            raysOrigin="top-center"
            raysColor="#dcecff"
            raysSpeed={0.55}
            lightSpread={1.28}
            rayLength={1.9}
            fadeDistance={1.05}
            saturation={0.85}
            followMouse
            mouseInfluence={0.08}
            noiseAmount={0.025}
            distortion={0.04}
          />
        </div>

        <div className="site-footer-inner">
          <div className="footer-brand">
            <a className="footer-logo" href="#hero" aria-label="Back to Haerin hero">
              <span>H</span>
              <strong>haerin.verse</strong>
            </a>
            <p>Quiet frames, soft light, and a small archive for Haerin.</p>
            <div className="footer-socials" aria-label="Footer social links">
              <a href={personalHomeUrl} aria-label="Open Bilibili">B</a>
              <a href="https://www.instagram.com/newjeans_official/" aria-label="Open Instagram">IG</a>
              <a href="https://www.youtube.com/@NewJeans_official" aria-label="Open YouTube">YT</a>
            </div>
          </div>

          <nav className="footer-links" aria-label="Footer links">
            {footerColumns.map(column => (
              <div className="footer-column" key={column.title}>
                <h2>{column.title}</h2>
                {column.links.map(link => (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </nav>

          <div className="footer-bottom">
            <span>2026 Pixel Galaxies. Built with ReactBits light rays.</span>
            <a href="#hero">Return to first light</a>
          </div>
        </div>
      </footer>

      {activeMenuItem && (
        <div
          className="menu-modal-backdrop"
          role="presentation"
          onClick={() => setActiveMenuItem(null)}
        >
          <article
            className="menu-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeMenuItem.title} introduction`}
            onClick={ev => ev.stopPropagation()}
          >
            <button
              className="menu-modal-close"
              type="button"
              aria-label="Close introduction"
              onClick={() => setActiveMenuItem(null)}
            >
              ×
            </button>
            <img className="menu-modal-image" src={activeMenuItem.image} alt={activeMenuItem.title} />
            <div className="menu-modal-copy">
              <p>{activeMenuItem.kicker}</p>
              <h3>{activeMenuItem.title}</h3>
              <span>{activeMenuItem.description}</span>
            </div>
          </article>
        </div>
      )}

      <MusicPlayer />

      <button
        className="top-button"
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span>TOP</span>
      </button>
      </main>
    </ClickSpark>
  );
}

export default App;
