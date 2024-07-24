import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6">
      <div className="pt-24 pb-6 border-gray-200 border-b flex justify-between items-end">
        <h1 className="text-gray-900 font-bold tracking-tight text-4xl">High quality cotton selection</h1>
        <button>sort</button>
      </div>
    </main>
  );
}
