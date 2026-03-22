import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Share2, Bookmark, ArrowUp, Menu, X } from 'lucide-react';
import { Chart } from './components/Chart';
import { InteractiveBudget } from './components/InteractiveBudget';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[70] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation - Removed as requested */}
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <header className="max-w-4xl mx-auto px-6 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-label text-xs font-bold tracking-[0.4em] uppercase text-primary mb-8 block">
              Public Data Brief
            </span>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tight text-on-surface mb-10 leading-[0.95]">
              Would Cutting Sports Lower Tuition?
            </h1>
            <p className="font-headline italic text-2xl md:text-3xl text-on-surface/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              A Look at the University of Rochester
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="h-[1px] w-16 bg-primary/20"></div>
              <p className="font-label text-xs uppercase tracking-[0.3em] font-bold">Prepared by Ainhoa Gil Uriarte — ECON 224W, Spring 2026</p>
              <div className="h-[1px] w-16 bg-primary/20"></div>
            </div>
          </motion.div>
        </header>

        {/* Key Stats */}
        <section className="max-w-6xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-on-surface/5 border border-on-surface/5">
            {[
              { label: 'Total Budget Impact', value: '0.14%', sub: 'Athletics share of UR budget (2023)' },
              { label: 'Annual Cost Per Student', value: '~$1,300', sub: 'Implied savings per undergraduate' },
              { label: 'Relative Scale', value: '< 2%', sub: 'Impact on total tuition bill' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface p-12 text-center group hover:bg-surface-container-low transition-colors duration-500"
              >
                <p className="text-5xl font-headline font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </p>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] font-bold mb-1">{stat.label}</p>
                <p className="font-body italic text-xs text-on-surface/40">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Article Body */}
        <article className="max-w-3xl mx-auto px-6">
          <div className="prose prose-neutral prose-lg max-w-none">
            <p className="font-body text-2xl leading-relaxed first-letter:text-8xl first-letter:font-headline first-letter:font-bold first-letter:mr-4 first-letter:float-left first-letter:text-primary first-letter:leading-none mb-12">
              When people talk about rising tuition, athletics is usually one of the first things that gets blamed. The idea is simple. Universities spend millions on sports, so if those programs were cut, costs should go down. At first glance, that feels pretty convincing.
            </p>
            
            <p className="font-body text-2xl leading-relaxed mb-8">
              But once you actually look at the numbers for the University of Rochester, that story starts to fall apart. Athletics is visible, but that does not mean it is financially important in the way people assume.
            </p>

            <p className="font-body text-2xl leading-relaxed mb-12">
              So the real question is not whether athletics costs money, because it obviously does. The question is whether it is large enough to actually matter.
            </p>

            <section id="data" className="mt-24">
              <h2 className="font-headline text-4xl font-bold mb-8">Athletics Is Not Driving Spending Growth</h2>
              <p className="font-body text-2xl leading-relaxed mb-8">
                To start, athletics spending has not been increasing in any meaningful way. In real December 2025 dollars, total athletics expenditures were about $6.1 million in 2004 and about $8.7 million in 2023. Most of that increase happens early on, and after the late 2000s spending mostly levels off in the $7 to $9 million range.
              </p>
              
              <Chart 
                id="spending-over-time"
                title="Athletics spending over time"
                src="https://datawrapper.dwcdn.net/CprGX/1/"
              />

              <p className="font-body text-2xl leading-relaxed my-8">
                At the same time, spending per athlete is also extremely stable. It sits around $14,000 to $17,000 per athlete per year, with an average close to $15,000 over the entire period. So right away, athletics is not exploding. It is not even steadily growing. It is basically flat.
              </p>

              <Chart 
                id="cost-per-athlete"
                title="Cost per athlete"
                src="https://datawrapper.dwcdn.net/rNuLX/1/"
              />

              <p className="font-body text-lg italic text-on-surface/50 leading-relaxed mt-4 mb-8 border-l-2 border-on-surface/10 pl-6">
                  Note: UR spends approximately $15,000 per athlete per year in real terms. 
                  For context, total university spending divided by undergraduate enrollment 
                  is roughly $1,000,000 per student, but this is not an apples-to-apples 
                  comparison. That figure includes research, hospital operations, and 
                  graduate programs, none of which are comparable to per-athlete 
                  athletics spending. A fairer comparison would use only student-facing 
                  expenditures, which would yield a much lower number. Nonetheless, the 
  contrast is instructive: athletics is expensive per participant (~$15,000) 
  but negligible in aggregate (high intensity, low total impact).
              </p>
            </section>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="my-20 p-10 border-l-4 border-primary bg-surface-container"
            >
              <p className="font-label text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4">
                Key Finding
              </p>
              <p className="font-headline text-3xl text-on-surface/90 leading-tight">
                Athletics is operating at essentially the same scale as a single mid-sized student fee.
              </p>
            </motion.div>

            <section className="mt-24">
              <h2 className="font-headline text-4xl font-bold mb-8">Meanwhile, the Rest of the University Has Grown Massive</h2>
              <p className="font-body text-2xl leading-relaxed mb-8">
                Now compare that to total university spending. In 2004, total real expenditures were about $3.0 billion. By 2023, that number is over $6.4 billion. So while athletics increased by maybe $2–3 million, the university as a whole increased by more than $3 billion.
              </p>

              <Chart 
                id="total-spending"
                title="Total university spending"
                src="https://datawrapper.dwcdn.net/4Ia21/2/"
              />

              <p className="font-body text-2xl leading-relaxed my-8">
                Because of that, athletics is actually becoming less important over time. In 2004, athletics accounted for about 0.20 percent of total spending. By 2023, it is down to about 0.14 percent. That is roughly a one third decline in its share of the budget. So if anything, athletics is shrinking in relative importance while everything else is growing around it. In real terms, total university spending grew at roughly 3.8 percent per year since 2004, while athletics grew at under 1 percent annually. That gap in growth rates is the core of the story.
              </p>

              <Chart 
                id="percent-budget"
                title="Athletics as % of budget"
                src="https://datawrapper.dwcdn.net/6njV9/6/"
              />
            </section>

            <section className="mt-24">
              <h2 className="font-headline text-4xl font-bold mb-8">Student Services Still Grow Without Athletics</h2>
              <p className="font-body text-2xl leading-relaxed mb-8">
                The same pattern shows up when looking at student services. In 2004, student services spending in real terms was about $53 million. By 2023, it is about $94 million. If you remove athletics from that category, spending still rises from about $47 million to $85 million.
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
                So almost all of the growth is still there even without athletics. This is important because it gives a clean comparison. Even if athletics spending were zero, student services would still be increasing significantly. That means athletics is not the reason this category is growing.
              </p>
              
              <Chart 
                id="student-services"
                title="Student services with/without athletics"
                src="https://datawrapper.dwcdn.net/o6lJI/1/"
              />
            </section>

            <InteractiveBudget />

            <p className="font-body text-2xl leading-relaxed mb-8">
  Removing athletics entirely would barely change the slope of total spending or student services over time. As the charts above show, the trend lines are nearly indistinguishable with or without it.
</p>

            <section className="mt-24">
              <h2 className="font-headline text-4xl font-bold mb-8">What If We Actually Cut Athletics?</h2>
              <p className="font-body text-2xl leading-relaxed mb-8">
                This is where the scale becomes really clear. In 2023, athletics spending is about $8.7 million. If you divide that by roughly 6,300 undergraduate students, the implied savings is about $1,300 per student per year. To put that in perspective, $8.7 million represents less than half a day of total university spending — the university spends roughly $17.5 million every single day.
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
                Now compare that to the actual cost of attending Rochester. Tuition alone is about $69,030 per year, before fees, housing, or anything else. So even in the extreme case where athletics is completely eliminated, tuition would fall by less than 2 percent.
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
                And even that assumes every dollar saved gets passed directly to students, which is not how university budgeting usually works.
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
                What makes this even clearer is comparing it to something students have actually seen recently. The new UR Essentials textbook program increased costs by about $1,310 per student per year. With roughly 6,300 undergraduates, that generates about $8.3 million in additional revenue for the university.
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
                So eliminating athletics would save almost exactly the same amount per student as this single fee increased.
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
                That comparison really puts things into perspective. Students clearly notice a $1,300 fee increase, but no one would argue that this fee is the main reason tuition is high. Athletics is operating at essentially the same scale.
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
                In other words, eliminating all of athletics would have roughly the same financial impact as removing one mid-sized student fee. 
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
                So yes, cutting athletics would reduce costs. But in the context of total tuition and overall university spending, it is not large enough to meaningfully change the outcome.
              </p>
            </section>

            <section className="mt-24 pt-24 border-t border-on-surface/10">
              <h2 className="font-headline text-4xl font-bold mb-8 italic">A Note on Measurement and What We Might Be Missing</h2>
              <p className="font-body text-2xl leading-relaxed mb-8">
                There is one important caveat here. The athletics data comes from EADA, and it focuses on operating expenses. That means capital spending on athletic facilities is not fully captured. In practice, this includes things like building or renovating fields, gyms, or training centers. Those costs can be large, but they are often financed separately and spread out over time, so they do not show up cleanly in annual expense data. This matters because it means the true cost of athletics could be somewhat higher than what we see here.
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
  It is also worth noting that athletics programs often appear financially neutral in the data because deficits are internally subsidized by the university and reported as balanced. This is partly why athletics costs appear inside the student services category in IPEDS (the accounting obscures the true subsidy).
</p>
              <p className="font-body text-2xl leading-relaxed mb-12">
                However, even if we added those costs in, it is very unlikely that athletics would go from less than 0.2 percent of the budget to something that meaningfully changes the overall picture. The scale difference is just too large.
              </p>
            </section>

            <section className="mt-24">
              <h2 className="font-headline text-4xl font-bold mb-8">What Does This Case Study Teach Us About Higher Educational Reform?</h2>
              <p className="font-body text-2xl leading-relaxed mb-8">
                At this point, the main takeaway is not just about athletics. It is about how people think about university spending more generally. Athletics gets attention because it is visible. People see teams, facilities, and events, so it feels like a big expense.
              </p>
              <p className="font-body text-2xl leading-relaxed mb-8">
                At the same time, much larger categories like administration, academic support, and general operations grow in the background without the same level of scrutiny. Public debates tend to focus on the wrong things. Smaller, more visible costs get blamed, while larger and less visible costs are mostly ignored.
              </p>
                {/* Four-card grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-on-surface/5 border border-on-surface/5 my-12">
      {[
        {
          q: "How universities grow",
          a: "Large institutions grow through many small, hard-to-see expansions across dozens of budget categories simultaneously (not through one visible line item like athletics)."
        },
        {
          q: "Why some costs attract scrutiny",
          a: "Athletics is tangible. You can see the teams, the facilities, the events. Most of the real spending growth happens invisibly, in administration, research infrastructure, and institutional support."
        },
        {
          q: "What this suggests about reform",
          a: "Cutting highly visible spending is often politically attractive, but not economically meaningful. If the goal is to slow tuition growth, the focus has to be on the biggest parts of the budget, not the most obvious ones."
        },
        {
          q: "The economist's principle",
          a: "Magnitudes matter. It is not enough to identify something that costs money. You have to ask how large it is relative to everything else. In this case, athletics is not large enough to drive the outcome people care about."
        },
      ].map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-surface p-10 hover:bg-surface-container transition-colors duration-300"
        >
          <p className="font-label text-sm uppercase tracking-[0.3em] font-bold text-primary mb-4">
            {card.q}
          </p>
          <p className="font-body text-xl leading-relaxed text-on-surface/80">
            {card.a}
          </p>
        </motion.div>
      ))}
    </div>
    <p className="font-body text-2xl leading-relaxed mt-8">
  Ultimately, what drives reform debates is not magnitudes, it is optics. Athletics attracts scrutiny because it is visible and easy to point to, not because the numbers justify the attention. The actual dollars tell a different story, and they point elsewhere.
</p>
            </section>

            <section className="mt-32 mb-24">
              <h2 className="font-headline text-5xl font-bold mb-10">Conclusion</h2>
              <p className="font-body text-2xl leading-relaxed text-on-surface/90 mb-8">
                Overall, the data shows that athletics is a visible but relatively small part of the University of Rochester’s budget. Spending on sports has remained mostly flat, while total university spending has more than doubled. As a result, athletics now accounts for a smaller share of the budget than it did twenty years ago. The most surprising finding is how dramatically that share has fallen. Most people would expect athletics spending to have grown relative to the rest of the budget, not shrunk.
              </p>
              <p className="font-body text-2xl leading-relaxed text-on-surface/90">
                If athletics were completely eliminated, the savings would be about $1,300 per student per year, which is small relative to tuition levels of around $69,000 per year. That means cutting sports would not meaningfully change the trajectory of tuition or overall spending. So while athletics is often an easy target in discussions about cost, the numbers are unambiguous. Athletics is too small to meaningfully move the needle on tuition, and not even close to the main driver of rising costs.
              </p>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-on-surface/10 pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            <span className="font-label text-[12px] text-on-surface/30 normal-case tracking-wide">
    Sources: Equity in Athletics Data Analysis (EADA), U.S. Dept. of Education · IPEDS Finance Survey (FASB), NCES · BLS CPI-U, adjusted to December 2025
  </span>
            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-3 font-label text-[10px] uppercase tracking-[0.2em] text-primary font-bold"
            >
              Back to Top 
              <span className="p-2 border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <ArrowUp size={14} />
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
