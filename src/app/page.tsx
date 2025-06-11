import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Array<{ url: string; title: string }>>([]);
  const [error, setError] = useState("");

  // 上传图片弹窗相关
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadKeyword, setUploadKeyword] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  // 模拟搜索功能（后续可接后端）
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setError("");
    setResults([]);
    // TODO: 替换为真实接口
    setTimeout(() => {
      if (!keyword.trim()) {
        setError("请输入关键词");
        setSearching(false);
        return;
      }
      // 假数据
      setResults([
        { url: "/next.svg", title: `与“${keyword}”相关的浪漫图片1` },
        { url: "/vercel.svg", title: `与“${keyword}”相关的浪漫图片2` },
      ]);
      setSearching(false);
    }, 1200);
  };

  // 模拟上传功能（后续可接后端）
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
    // TODO: 替换为真实上传接口
    setTimeout(() => {
      setUploadSuccess("上传成功！");
      setUploadFile(null);
      setUploadKeyword("");
      setUploading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-pink-500 drop-shadow-lg mb-2 animate-fade-in">
          遇见浪漫的你
        </h1>
        <p className="text-lg sm:text-xl text-purple-500 font-light animate-fade-in delay-200">
          用一张图片，记录每一次心动
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
            className="flex-1 rounded-l-full px-5 py-3 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/80 text-lg shadow"
            placeholder="输入关键词，寻找属于你们的回忆..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-r-full bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 font-semibold shadow transition-colors"
            disabled={searching}
          >
            {searching ? "搜索中..." : "搜索"}
          </button>
        </form>
        {/* 搜索结果展示 */}
        {error && <div className="text-red-400 text-center w-full">{error}</div>}
        {results.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
            {results.map((img, idx) => (
              <div key={idx} className="rounded-xl bg-white/80 shadow p-3 flex flex-col items-center">
                <img
                  src={img.url}
                  alt={img.title}
                  className="rounded-lg object-cover w-full h-40 mb-2 border border-pink-100"
                />
                <div className="text-pink-500 text-base font-medium text-center">{img.title}</div>
              </div>
            ))}
          </div>
        )}
        {/* 上传图片入口 */}
        <button
          type="button"
          className="inline-block rounded-full bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white px-8 py-3 font-bold shadow-lg transition-all text-lg animate-bounce"
          onClick={() => setShowUpload(true)}
        >
          上传你的浪漫瞬间
        </button>
        {/* 上传弹窗 */}
        {showUpload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-[90vw] max-w-md flex flex-col gap-4 relative animate-fade-in">
              <button
                className="absolute top-3 right-4 text-xl text-pink-400 hover:text-pink-600"
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
              <h2 className="text-2xl font-bold text-pink-500 mb-2">上传浪漫图片</h2>
              <form onSubmit={handleUpload} className="flex flex-col gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="border rounded px-3 py-2"
                  onChange={e => setUploadFile(e.target.files?.[0] || null)}
                  disabled={uploading}
                />
                <input
                  type="text"
                  className="border rounded px-3 py-2"
                  placeholder="请输入图片关键词（如：第一次约会）"
                  value={uploadKeyword}
                  onChange={e => setUploadKeyword(e.target.value)}
                  disabled={uploading}
                />
                {uploadError && <div className="text-red-400 text-center">{uploadError}</div>}
                {uploadSuccess && <div className="text-green-500 text-center">{uploadSuccess}</div>}
                <button
                  type="submit"
                  className="rounded-full bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 font-semibold shadow transition-colors disabled:opacity-60"
                  disabled={uploading}
                >
                  {uploading ? "上传中..." : "上传"}
                </button>
              </form>
            </div>
          </div>
        )}
        {/* 图录入口 */}
        <a
          href="#"
          className="inline-block rounded-full border-2 border-pink-300 text-pink-500 px-8 py-3 font-semibold shadow-sm hover:bg-pink-50 transition-all text-lg"
        >
          查看浪漫图录（需密码）
        </a>
      </main>
      <footer className="mt-16 text-center text-sm text-purple-300">
        © {new Date().getFullYear()} Love Gallery · 为你心动的每一天
      </footer>
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
          0%,
          100% {
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
