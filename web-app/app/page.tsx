import MangaTranslator from "@/components/manga-translator";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <div className="container mx-auto px-4"> */}
        <MangaTranslator />
      {/* </div> */}
      <footer className="mt-auto py-6 text-center text-sm text-white bg-slate-800">
        Powered by <a href="https://spheron.network" className="text-blue-600 hover:underline">Spheron</a> 
      </footer>
    </div>
  );
}
