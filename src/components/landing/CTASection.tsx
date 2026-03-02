import { Button } from "../ui-elements/button";


export function CTASection() {
  return (
    <section className="px-4 py-12 w-full bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-6 rounded-3xl bg-gradient-to-r from-blue-600 bg-blue-400 p-12 text-center shadow-xl md:p-16">
          <h2 className="text-balance text-4xl font-bold text-white md:text-5xl">
            Get 500 free request.
          </h2>
          <p className="text-lg text-blue-100">No credit card required.</p>
          <Button label="Get Started" className="h-12 rounded-lg bg-cyan-300 px-8 py-3 font-bold text-blue-900 transition-all duration-300 hover:bg-cyan-300" />
        </div>
      </div>
    </section>
  );
}
