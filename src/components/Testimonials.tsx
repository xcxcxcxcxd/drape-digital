import React from 'react';
import reviewsData from '../data/reviews.json';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  // Use a subset of reviews for the marquee to keep DOM light and speed readable
  const displayReviews = reviewsData.slice(0, 24);
  const midPoint = Math.ceil(displayReviews.length / 2);
  const row1 = displayReviews.slice(0, midPoint);
  const row2 = displayReviews.slice(midPoint);

  const ReviewCard: React.FC<{ name: string; text: string }> = ({ name, text }) => (
    <div className="glass p-6 md:p-8 rounded-2xl min-w-[300px] md:min-w-[400px] max-w-[400px] flex-shrink-0 flex flex-col gap-4">
      <div className="flex text-agency-accent">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="text-agency-white/80 font-light leading-relaxed flex-grow text-sm md:text-base">"{text}"</p>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-agency-white/10">
        <div className="w-10 h-10 rounded-full bg-agency-white/10 flex items-center justify-center font-bold text-agency-white">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-agency-white">{name}</p>
          <p className="text-xs text-agency-white/40">Verified Client</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">
          Trusted by <span className="bg-gradient-to-r from-agency-accent-dark to-agency-accent text-transparent bg-clip-text">Founders</span>
        </h2>
        <p className="text-agency-white/60 text-lg md:text-xl max-w-2xl mx-auto">
          Over 90+ 5-star reviews from businesses we've helped scale.
        </p>
      </div>

      <div className="relative flex flex-col gap-8 w-full group">
        {/* Left/Right Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-agency-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-agency-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 - Marquee */}
        <div className="flex w-[200%] md:w-max">
          <div className="flex gap-6 animate-marquee shrink-0 pr-6 hover:[animation-play-state:paused]">
            {row1.map((review, i) => (
              <ReviewCard key={`r1a-${i}`} name={review.name} text={review.text} />
            ))}
          </div>
          <div className="flex gap-6 animate-marquee shrink-0 hover:[animation-play-state:paused]">
            {row1.map((review, i) => (
              <ReviewCard key={`r1b-${i}`} name={review.name} text={review.text} />
            ))}
          </div>
        </div>

        {/* Row 2 - Reverse Marquee */}
        <div className="flex w-[200%] md:w-max">
          <div className="flex gap-6 animate-marquee shrink-0 pr-6 hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse', animationDuration: '45s' }}>
            {row2.map((review, i) => (
              <ReviewCard key={`r2a-${i}`} name={review.name} text={review.text} />
            ))}
          </div>
          <div className="flex gap-6 animate-marquee shrink-0 hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse', animationDuration: '45s' }}>
            {row2.map((review, i) => (
              <ReviewCard key={`r2b-${i}`} name={review.name} text={review.text} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
