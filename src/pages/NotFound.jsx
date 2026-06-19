import Button from "../components/Button.jsx";


export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-white px-6">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-600">
          404
        </p>

        <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
          Page not found.
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          The page you are looking for does not exist or may still be under
          development.
        </p>

        <div className="mt-10 flex justify-center">
          <Button to="/">Return home</Button>
        </div>
      </div>
    </section>
  
  );
}