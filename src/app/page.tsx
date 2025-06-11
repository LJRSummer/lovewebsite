"use client";
// 首页：黑白极简高级风，支持自定义贴图和文案
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  // 搜索相关状态
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Array<{ url: string; title: string }>>([]);
  const [error, setError] = useState("");

  // 上传图片弹窗相关状态
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadKeyword, setUploadKeyword] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // 图录弹窗相关状态
  const [showGallery, setShowGallery] = useState(false);
  const [galleryPassword, setGalleryPassword] = useState("");
  const [galleryError, setGalleryError] = useState("");
  const [galleryImages, setGalleryImages] = useState<Array<{ url: string; title: string }>>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const GALLERY_PASSWORD = "020908"; // 图录访问密码，可自定义

  // 全局图片数组，初始为假数据，后续上传会追加
  const [images, setImages] = useState<Array<{ url: string; title: string }>>([
    { url: "/next.svg", title: "第一次见面" },
    { url: "/vercel.svg", title: "第一次约会" },
    { url: "/file.svg", title: "一起看电影" },
  ]);

  // 搜索功能（本地模拟）
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
      // 搜索 images 数组，关键词模糊匹配 title
      const filtered = images.filter(img => img.title.includes(keyword.trim()));
      if (filtered.length === 0) {
        setError("未找到相关图片");
      }
      setResults(filtered);
      setSearching(false);
    }, 800);
  };

  // 上传功能（本地模拟）
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setUploadError("");
    setUploadSuccess("");
    if (!uploadFile) {
      setUploadError("请先选择图片");
      setUploading(false);
      return;
    }
    if (!uploadKeyword.trim()) {
      setUploadError("请填写关键词");
      setUploading(false);
      return;
    }
    // 生成本地图片 URL
    const newUrl = URL.createObjectURL(uploadFile);
    const newImg = { url: newUrl, title: uploadKeyword.trim() };
    setTimeout(() => {
      setImages(prev => [...prev, newImg]);
      setUploadSuccess("上传成功！");
      setUploadFile(null);
      setUploadKeyword("");
      setUploading(false);
    }, 1000);
  };

  // 打开图录弹窗
  const handleOpenGallery = () => {
    setShowGallery(true);
    setGalleryPassword("");
    setGalleryError("");
    setGalleryImages([]);
  };

  // 图录密码校验与加载（本地模拟）
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
      // 展示所有 images
      setGalleryImages(images);
      setGalleryLoading(false);
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative p-4"
      // 如需自定义背景图片，将下方 style 替换为 backgroundImage: 'url(/your-bg.jpg)'
      style={{
        backgroundImage: 'url(/background.jpg)', // public 目录下的图片，路径前不要加 app
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 顶部贴图，可自定义图片路径 */}
      <div className="mb-6 flex justify-center">
        <Image src="/xiangji.svg" alt="装饰贴图" width={80} height={80} className="opacity-80" />
      </div>
      {/* 顶部标题和副标题，支持自定义文案 */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-2 animate-fade-in drop-shadow-lg">
          Hi, 王先生
        </h1>
        <p className="text-lg sm:text-xl text-neutral-200 font-light animate-fade-in delay-200 drop-shadow">
          明月高悬于夜空，眼下是春天
        </p>
      </header>
      <main className="w-full max-w-xl flex flex-col gap-8 items-center">
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
          />
          <button
            type="submit"
            className="rounded-r-full bg-white/20 hover:bg-white/40 text-white border border-white px-6 py-3 font-semibold shadow transition-colors backdrop-blur disabled:opacity-60"
            disabled={searching}
          >
            {searching ? "搜索中..." : "搜索"}
          </button>
        </form>
        {/* 搜索结果展示 */}
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
        {/* 上传图片入口 */}
        <button
          type="button"
          className="inline-block rounded-full border-2 border-white text-white px-8 py-3 font-bold shadow-sm hover:bg-white/20 hover:text-black transition-all text-lg animate-bounce backdrop-blur"
          onClick={() => setShowUpload(true)}
        >
          上传秘藏
        </button>
        {/* 上传弹窗 */}
        {showUpload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-black/80 rounded-2xl shadow-xl p-8 w-[90vw] max-w-md flex flex-col gap-4 relative animate-fade-in border border-white/20">
              <button
                className="absolute top-3 right-4 text-xl text-white hover:text-neutral-300"
                onClick={() => {
                  setShowUpload(false);
                  setUploadError("");
                  setUploadSuccess("");
                  setUploadFile(null);
                  setUploadKeyword("");
                }}
                aria-label="关闭"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">上传图片</h2>
              <form onSubmit={handleUpload} className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="border border-white/30 rounded px-3 py-2 bg-black/40 text-white"
                  onChange={e => setUploadFile(e.target.files?.[0] || null)}
                  disabled={uploading}
                />
                <input
                  type="text"
                  className="border border-white/30 rounded px-3 py-2 bg-black/40 text-white"
                  placeholder="请输入图片关键词（如：第一次约会）"
                  value={uploadKeyword}
                  onChange={e => setUploadKeyword(e.target.value)}
                  disabled={uploading}
                />
                {uploadError && <div className="text-red-400 text-center">{uploadError}</div>}
                {uploadSuccess && <div className="text-green-400 text-center">{uploadSuccess}</div>}
                <button
                  type="submit"
                  className="rounded-full bg-white/20 hover:bg-white/40 text-white border border-white px-6 py-2 font-semibold shadow transition-colors disabled:opacity-60 backdrop-blur"
                  disabled={uploading}
                >
                  {uploading ? "上传中..." : "上传"}
                </button>
              </form>
            </div>
          </div>
        )}
        {/* 图录入口 */}
        <button
          type="button"
          className="inline-block rounded-full border-2 border-white text-white px-8 py-3 font-semibold shadow-sm hover:bg-white/20 hover:text-black transition-all text-lg backdrop-blur"
          onClick={handleOpenGallery}
        >
          查看图录（需密码）
        </button>
        {/* 图录弹窗 */}
        {showGallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-black/80 rounded-2xl shadow-xl p-8 w-[90vw] max-w-md flex flex-col gap-4 relative animate-fade-in border border-white/20">
              <button
                className="absolute top-3 right-4 text-xl text-white hover:text-neutral-300"
                onClick={() => {
                  setShowGallery(false);
                  setGalleryPassword("");
                  setGalleryError("");
                  setGalleryImages([]);
                }}
                aria-label="关闭"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold text-white mb-2">碎片</h2>
              {galleryImages.length === 0 ? (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {galleryImages.map((img, idx) => (
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
      <footer className="mt-16 text-center text-sm text-white/80 drop-shadow">
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
