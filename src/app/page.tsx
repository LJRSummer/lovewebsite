import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [keyword, setKeyword] = useState("");

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
          onSubmit={(e) => {
            e.preventDefault();
            /* TODO: 搜索功能 */
          }}
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
          >
            搜索
          </button>
        </form>
        {/* 上传图片入口 */}
        <a
          href="#"
          className="inline-block rounded-full bg-gradient-to-r from-pink-300 to-purple-300 hover:from-pink-400 hover:to-purple-400 text-white px-8 py-3 font-bold shadow-lg transition-all text-lg animate-bounce"
        >
          上传你的浪漫瞬间
        </a>
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
