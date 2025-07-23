"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  // 搜索相关状态
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Array<{ url: string; title: string }>>([]);
  const [error, setError] = useState("");

  // 规则介绍弹窗状态
  const [showRules, setShowRules] = useState(false);

  // 图录弹窗相关状态
  const [showGallery, setShowGallery] = useState(false);
  const [galleryPassword, setGalleryPassword] = useState("");
  const [galleryError, setGalleryError] = useState("");
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryUnlocked, setGalleryUnlocked] = useState(false);
  const GALLERY_PASSWORD = "020908"; // 图录访问密码，可自定义

  // 自动获取 public/albums 下所有图片
  const [images, setImages] = useState<Array<{ url: string; title: string }>>([]);

  // 彩蛋相关状态
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [easterEggImage, setEasterEggImage] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  // 搜索功能
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setError("");
    setResults([]);
    setTimeout(() => {
      if (!keyword.trim()) {
        setError("请输入关键词");
        setSearching(false);
        return;
      }
      // 彩蛋判断
      if (keyword.trim() === "梁靖然") {
        const img = images.find(img => img.title === "梁靖然");
        if (img) {
          setEasterEggImage(img);
          setEasterEggActive(true);
        } else {
          setError("未找到相关图片");
        }
        setSearching(false);
        setKeyword("");
        return;
      }
      const filtered = images.filter(img => img.title.includes(keyword.trim()));
      if (filtered.length === 0) {
        setError("未找到相关图片");
      }
      setResults(filtered);
      setSearching(false);
      setKeyword("");
    }, 800);
  };

  // 关闭搜索结果
  const handleCloseResults = () => {
    setResults([]);
    setError("");
  };

  // 打开图录弹窗
  const handleOpenGallery = () => {
    setShowGallery(true);
    setGalleryPassword("");
    setGalleryError("");
    setGalleryUnlocked(false);
  };

  // 图录密码校验
  const handleGallerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGalleryError("");
    setGalleryLoading(true);
    setTimeout(() => {
      if (galleryPassword !== GALLERY_PASSWORD) {
        setGalleryError("密码错误，请重试");
        setGalleryLoading(false);
        return;
      }
      setGalleryUnlocked(true);
      setGalleryLoading(false);
    }, 800);
  };

  // 关闭图录弹窗
  const handleCloseGallery = () => {
    setShowGallery(false);
    setGalleryPassword("");
    setGalleryError("");
    setGalleryLoading(false);
    setGalleryUnlocked(false);
  };

  // 关闭彩蛋
  const handleCloseEasterEgg = () => {
    setEasterEggActive(false);
    setEasterEggImage(null);
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center relative p-4"
        style={{
          backgroundImage: easterEggActive
            ? 'url(/easter-bg.jpg)' // 彩蛋背景图，放在 public 目录
            : 'url(/background.jpg)',
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s"
        }}
      >
        {/* 顶部黑色渐变遮罩，提升字体可读性 */}
        <div className="pointer-events-none select-none fixed inset-0 z-0" style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.40) 60%, rgba(0,0,0,0.80) 100%)"
        }} />
        {/* 彩蛋特效层 */}
        {easterEggActive && (
          <>
            {/* 星星特效 */}
            <div className="fixed inset-0 pointer-events-none z-[100]">
              {[...Array(60)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${8 + Math.random() * 8}px`,
                    height: `${8 + Math.random() * 8}px`,
                    background: "white",
                    borderRadius: "50%",
                    boxShadow: "0 0 12px 4px #fff",
                    opacity: 0.7 + Math.random() * 0.3,
                    animation: `starfall 2.5s linear ${Math.random() * 2}s infinite`
                  }}
                />
              ))}
              <style jsx>{`
                @keyframes starfall {
                  0% { transform: translateY(-40px) scale(1); opacity: 1; }
                  80% { opacity: 1; }
                  100% { transform: translateY(80px) scale(0.7); opacity: 0; }
                }
              `}</style>
            </div>
            {/* 居中放大图片弹窗 */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black/60">
              <div className="relative flex flex-col items-center">
                <button
                  className="absolute -top-10 right-0 text-4xl text-white hover:text-neutral-300"
                  onClick={handleCloseEasterEgg}
                  aria-label="关闭"
                  style={{top:0, right:0}}
                >
                  ×
                </button>
                <Image
                  src={easterEggImage?.url || ""}
                  alt={easterEggImage?.title || ""}
                  width={480}
                  height={320}
                  className="rounded-2xl shadow-2xl border-4 border-white animate-easter-pop"
                  style={{maxWidth:"80vw", maxHeight:"60vh"}}
                />
                <div className="text-white text-2xl font-bold mt-6 drop-shadow-xl">{easterEggImage?.title}</div>
              </div>
              <style jsx>{`
                .animate-easter-pop {
                  animation: easterPop 0.8s cubic-bezier(.68,-0.55,.27,1.55);
                }
                @keyframes easterPop {
                  0% { transform: scale(0.5); opacity: 0; }
                  80% { transform: scale(1.05); opacity: 1; }
                  100% { transform: scale(1); opacity: 1; }
                }
              `}</style>
            </div>
          </>
        )}
        {/* 顶部贴图，可自定义图片路径 */}
        <div className="mb-6 flex justify-center z-10">
          <Image src="/xiangji.svg" alt="装饰贴图" width={80} height={80} className="opacity-80" />
        </div>
        {/* 顶部标题和副标题，支持自定义文案 */}
        <header className="mb-10 text-center z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2 animate-fade-in drop-shadow-2xl" style={{textShadow:'0 4px 24px #000, 0 1px 0 #222'}}>
            Hi, 王先生
          </h1>
          <p className="text-lg sm:text-xl text-neutral-100 font-light animate-fade-in delay-200 drop-shadow-xl" style={{textShadow:'0 2px 12px #000, 0 1px 0 #222'}}>
            明月高悬于夜空，眼下是春天
          </p>
        </header>
        <main className="w-full max-w-xl flex flex-col gap-8 items-center z-10">
          {/* 搜索模块 */}
          <form
            className="w-full flex gap-2"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              className="flex-1 rounded-l-full px-5 py-3 border border-white focus:outline-none focus:ring-2 focus:ring-white bg-black/40 text-white text-lg shadow placeholder:text-neutral-300"
              placeholder="输入关键词，寻找属于你们的回忆..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              disabled={easterEggActive}
            />
            <button
              type="submit"
              className="rounded-r-full bg-white/20 hover:bg-white/40 text-white border border-white px-6 py-3 font-semibold shadow transition-colors backdrop-blur disabled:opacity-60"
              disabled={searching || easterEggActive}
            >
              {searching ? "搜索中..." : "搜索"}
            </button>
          </form>
          {/* 搜索结果展示 */}
          {(error || results.length > 0) && !easterEggActive && (
            <div className="w-full relative">
              {results.length > 0 && (
                <button
                  type="button"
                  className="absolute -top-8 right-0 text-white text-2xl px-2 hover:text-neutral-300 z-10"
                  onClick={handleCloseResults}
                  aria-label="关闭搜索结果"
                >
                  ×
                </button>
              )}
              {error && <div className="text-white text-center w-full drop-shadow">{error}</div>}
              {results.length > 0 && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                  {results.map((img, idx) => (
                    <div key={idx} className="rounded-xl bg-black/40 shadow p-3 flex flex-col items-center border border-white/30">
                      <Image
                        src={img.url}
                        alt={img.title}
                        width={320}
                        height={160}
                        className="rounded-lg object-cover w-full h-40 mb-2 border border-white/20"
                      />
                      <div className="text-white text-base font-medium text-center drop-shadow">{img.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* 规则介绍入口 */}
          <button
            type="button"
            className="inline-block rounded-full border-2 border-white text-white px-8 py-3 font-bold shadow-sm hover:bg-white/20 hover:text-black transition-all text-lg animate-bounce backdrop-blur"
            onClick={() => setShowRules(true)}
            disabled={easterEggActive}
          >
            规则介绍
          </button>
          {/* 规则介绍弹窗 */}
          {showRules && !easterEggActive && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-black/80 rounded-2xl shadow-xl p-8 w-[90vw] max-w-md flex flex-col gap-4 relative animate-fade-in border border-white/20 items-center">
                <button
                  className="absolute top-3 right-4 text-xl text-white hover:text-neutral-300"
                  onClick={() => setShowRules(false)}
                  aria-label="关闭"
                >
                  ×
                </button>
                {/* 信封样式 */}
                <div className="w-32 h-24 rounded-t-lg relative mb-4 shadow-lg overflow-hidden">
                  <Image
                    src="/envelope.png"
                    alt="信封"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-lg"
                    priority
                  />
                </div>
                <div className="text-white text-center text-base leading-relaxed px-2">
                  北冰洋与尼罗河会在湿云中交融<br />
                  1. 输入关键词，可能是地点/人物/事件。<br />
                  2. 图录的密码，最简单不过了。<br />
                  3. 你知道的吧。<br />
                  4. 有问题请联系梁小姐。
                </div>
              </div>
            </div>
          )}
          {/* 图录入口 */}
          <button
            type="button"
            className="inline-block rounded-full border-2 border-white text-white px-8 py-3 font-semibold shadow-sm hover:bg-white/20 hover:text-black transition-all text-lg backdrop-blur"
            onClick={handleOpenGallery}
            disabled={easterEggActive}
          >
            查看图录（需密码）
          </button>
          {/* 图录弹窗 */}
          {showGallery && !easterEggActive && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-black/80 rounded-2xl shadow-xl p-8 w-[90vw] max-w-md flex flex-col gap-4 relative animate-fade-in border border-white/20">
                <button
                  className="absolute top-3 right-4 text-xl text-white hover:text-neutral-300"
                  onClick={handleCloseGallery}
                  aria-label="关闭"
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold text-white mb-2">碎片</h2>
                {!galleryUnlocked ? (
                  <form onSubmit={handleGallerySubmit} className="flex flex-col gap-4">
                    <input
                      type="password"
                      className="border border-white/30 rounded px-3 py-2 bg-black/40 text-white"
                      placeholder="请输入访问密码"
                      value={galleryPassword}
                      onChange={e => setGalleryPassword(e.target.value)}
                      disabled={galleryLoading}
                    />
                    {galleryError && <div className="text-red-400 text-center">{galleryError}</div>}
                    <button
                      type="submit"
                      className="rounded-full bg-white/20 hover:bg-white/40 text-white border border-white px-6 py-2 font-semibold shadow transition-colors disabled:opacity-60 backdrop-blur"
                      disabled={galleryLoading}
                    >
                      {galleryLoading ? "验证中..." : "进入图录"}
                    </button>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 max-h-80 overflow-y-auto">
                    {images.map((img, idx) => (
                      <div key={idx} className="rounded-xl bg-black/40 shadow p-3 flex flex-col items-center border border-white/30">
                        <Image
                          src={img.url}
                          alt={img.title}
                          width={240}
                          height={120}
                          className="rounded-lg object-cover w-full h-32 mb-2 border border-white/20"
                        />
                        <div className="text-white text-base font-medium text-center drop-shadow">{img.title}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
        {/* 页脚，可自定义文案 */}
        <footer className="mt-16 text-center text-sm text-white/90 drop-shadow-xl z-10" style={{textShadow:'0 2px 8px #000'}}>
          © {new Date().getFullYear()} Love lies beyond mountains and seas.
        </footer>
        {/* 动画样式，可根据需要调整 */}
        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 1.2s ease;
          }
          .animate-bounce {
            animation: bounce 2s infinite;
          }
          .animate-easter-pop {
            animation: easterPop 0.8s cubic-bezier(.68,-0.55,.27,1.55);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0);}
            50% { transform: translateY(-10px);}
          }
          @keyframes easterPop {
            0% { transform: scale(0.5); opacity: 0;}
            80% { transform: scale(1.05); opacity: 1;}
            100% { transform: scale(1); opacity: 1;}
          }
          @keyframes starfall {
            0% { transform: translateY(-40px) scale(1); opacity: 1;}
            80% { opacity: 1;}
            100% { transform: translateY(80px) scale(0.7); opacity: 0;}
          }
        `}</style>
      </div>
    </>
  );
}