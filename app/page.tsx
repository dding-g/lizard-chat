import AiPage from "./(ai)/pages";

export default async function Home() {
  return (
    <div className="pt-20">
      <div className="max-w-[1024px] mx-auto">
        <h1 className="my-2 font-serif text-3xl font-bold">🦎우리 개코</h1>
        <div className="px-10 pb-10 border-2 border-gray-200 rounded-lg">
          <AiPage />
        </div>
      </div>
    </div>
  );
}
