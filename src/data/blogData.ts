export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;           // ISO date
  readTime: string;       // "6 min read"
  category: string;
  content: string;        // Full post body in JSX-ready text (paragraphs separated by \n\n)
}

export const blogPosts: BlogPost[] = [
  {
    slug: "locksmith-google-maps-ranking",
    title: "Why your locksmith website doesn't show up on Google Maps",
    excerpt: "You're paying for a site. You've got reviews. You still don't show in the map pack. Here's why, and what actually moves the needle.",
    date: "2025-01-15",
    readTime: "7 min read",
    category: "Local SEO",
    content: `Most locksmiths think the map pack is about reviews. It isn't. Reviews help, but Google's local ranking uses three factors: relevance, distance, and prominence. You can't change distance. You can change the other two.

Relevance means Google understands what you do and where. If your Google Business Profile says "locksmith" and your website says "security solutions provider," Google doesn't know what to show you for. Match the language your customers type. "Emergency locksmith [city]" — not "residential and commercial security services."

Prominence is where most locksmith sites fail. Google measures prominence partly through what it finds on your website. If your site has one page that says "we serve the greater [metro] area," you're invisible for any specific town in that metro.

Build one page per area you actually serve. Not 200 spun pages — 10 to 15 real ones, with real detail. Name the building types. Name the lock types common in that area's housing stock. If you've done a job on a specific street, mention it.

Your Google Business Profile needs weekly posts. Not stock photos — real job photos from your phone. A broken key next to a new one. A deadbolt install before and after. Google reads the metadata and the image content. A geotagged photo from a job in Croydon tells Google you actually work in Croydon.

Citations still matter, but less than they did in 2019. Get your NAP consistent across the top 30 directories and stop there. Paying for 500 citations is wasting money.

The uncomfortable truth: if your competitor is physically closer to the searcher and has a real website with location pages, you will not outrank them in the map pack for that searcher's location. That's not an SEO failure — it's how proximity works. Focus on the areas where you're actually based.`,
  },
  {
    slug: "locksmith-google-ads-cost",
    title: "What a locksmith lead actually costs on Google Ads right now",
    excerpt: "Locksmith clicks run £30–£80. Here's what that means for your actual cost per job, and when ads aren't worth it.",
    date: "2025-01-22",
    readTime: "5 min read",
    category: "Google Ads",
    content: `Locksmith keywords are some of the most expensive in local services. "Emergency locksmith" in a major UK city runs £40–£80 per click. Not per call — per click. Most clicks don't call. A 10% click-to-call rate is good, which means your actual cost per phone lead is £400–£800.

That sounds insane until you look at what a locksmith charges. If your average emergency job is £150–£250, and you close 60% of calls, you're paying roughly £667–£1,333 per job in ad spend. On a £150 job, that's a loss. On a £250 lock change at 11pm, you might break even.

So when do Google Ads make sense for a locksmith? Three conditions:

Your average job value is above £200. Below that, the maths doesn't work in competitive cities. You're either in a less competitive area where clicks are cheaper (£15–£25), or your services lean toward higher-ticket work — commercial lock installs, access control, master key systems.

You have call tracking. Without it, you're guessing which clicks became jobs. We use tracked numbers on every site we build. You'll see "Tuesday, 9 calls, 5 from ads, 3 booked." That's the only way to know if the spend is working.

Your site actually converts. Sending £50 clicks to a site that doesn't show prices, doesn't have a sticky call button, and makes people scroll for your phone number is burning money. Fix the site first, then turn on ads.

Local Services Ads (the "Google Guaranteed" badge) are often cheaper per lead than regular search ads for locksmiths. The verification process is painful — Google requires background checks and licence proof for locksmiths specifically — but once you're through, leads run £20–£40 each instead of £60–£80.

What we tell clients: don't start with ads. Start with the site and Google Business Profile. Spend three months building location pages and collecting reviews. Then test ads with £500/month and measure cost per actual booked job. If it's above your profit margin, stop.`,
  },
  {
    slug: "locksmith-gbp-suspended",
    title: "Google Business Profile suspended? Here's the reinstatement process for locksmiths",
    excerpt: "Locksmith GBP suspensions are epidemic. Google flags the category. Here's the actual reinstatement process — not the forum advice.",
    date: "2025-02-01",
    readTime: "8 min read",
    category: "Google Business Profile",
    content: `If you're a locksmith and your Google Business Profile just got suspended, you're not alone. Google suspends locksmith profiles at a higher rate than almost any other trade category. The reason is fraud — the locksmith category has been heavily abused by lead-gen scams for years, and Google's response is aggressive automated enforcement that catches legitimate businesses too.

There are two types of suspension. A "soft" suspension means your profile is still visible but you can't edit it. A "hard" suspension means your profile is gone from search and maps entirely. The reinstatement process is different for each.

For a soft suspension: log into your Google Business Profile, click the red banner, and fill out the reinstatement form. You'll need to provide proof you're a real business at a real address. This means: a photo of your licence, a photo of your vehicle with any branding, a utility bill or lease agreement for your business address, and a photo of your storefront or office (if you have one). If you operate from home, a photo of your van parked at the address works.

For a hard suspension: the same form, but expect it to take longer. Google's review team is slow — 3 to 14 business days is typical, but we've seen it take 6 weeks. Do not create a new profile while waiting. Duplicate profiles make the situation worse and can result in a permanent ban.

Common reasons locksmiths get flagged:

You listed a service area that's unrealistically large. If you claim to serve a 100-mile radius, Google doesn't believe you. Shrink it to where you actually dispatch regularly.

You have keywords in your business name. If your profile says "Dave's 24/7 Emergency Locksmith Services" and your legal business name is "Dave's Locks Ltd," Google will flag the mismatch.

Someone reported you. Competitors do this. Lead-gen companies do this. There's no way to prevent it, but having your documentation ready means reinstatement is faster.

The biggest mistake we see: locksmiths who get frustrated and give up on the profile, or pay a "GBP recovery expert" £500 to do what the free reinstatement form does. Don't. The form is the process. The documentation is the work.

One thing we do offer: if you're our client, we handle the reinstatement filing as part of Tier 2. We've done enough of these to know which documentation format gets approved fastest.`,
  },
  {
    slug: "locksmith-tracked-phone-number",
    title: "Should a locksmith use a tracked phone number?",
    excerpt: "Yes. And here's the NAP trap that stops most locksmiths from doing it right.",
    date: "2025-02-10",
    readTime: "5 min read",
    category: "Call Tracking",
    content: `Short answer: yes. If you're spending money on a website or ads and you don't have call tracking, you're flying blind. You don't know which pages generate calls, which ads work, or whether that £600/month in SEO is doing anything.

A tracked phone number is a second number that forwards to your real line. Software logs every call — time, duration, source (organic, ads, direct), and often records the call. You see exactly which part of your marketing is making the phone ring.

Now the trap. Google's local ranking relies partly on NAP consistency — Name, Address, Phone number. Your phone number needs to match across your website, your Google Business Profile, your directory listings, and your social profiles. If they all say one number and your website says a different one, that's a consistency signal to Google that something is off.

Here's how to do it without killing your NAP:

Use your real number as the primary number on your Google Business Profile and all directory citations. Don't touch those.

Use the tracked number on your website only. Google doesn't crawl your GBP to match against your website in the way people think — the NAP check is across directories and data aggregators, not between your GBP and your own site.

If you run Google Ads, use a separate tracked number for ads. Now you have three numbers: real (GBP + directories), tracked-organic (website), tracked-paid (ads). You can see exactly where every call comes from.

Some call tracking providers add the number via JavaScript swap — the page loads with your real number and swaps it for the tracked number for specific visitors. This is fine for Google. The crawler sees your real number. The human visitor sees the tracked number.

Cost: tracked numbers from providers like Zadarma, CallRail, or WildJar run £10–£30/month per number. That's less than one locksmith call-out fee. If tracking tells you that your "transponder key" page generates 8 calls a month and your "commercial locks" page generates zero, that one insight pays for 5 years of tracking.

What we do: every site we build includes a tracked number in Tier 1. In Tier 2, we add out-of-hours routing — missed calls after 6pm get an auto-text-back: "Got your call. A locksmith will ring you back in [X] minutes." That one text recovers calls that would otherwise go to your competitor.`,
  },
  {
    slug: "location-pages-case-study",
    title: "Real numbers: what 40 location pages did to one locksmith's calls",
    excerpt: "A Montreal locksmith went from 3 calls a week to 14. Here's what we built, what we didn't, and what actually moved.",
    date: "2025-02-20",
    readTime: "6 min read",
    category: "Case Study",
    content: `This is from a real client build. We've anonymised the business name but the numbers are from their call tracking dashboard.

The starting point: a 166-page locksmith site in Montreal. Most of those pages were auto-generated location pages — the kind where every page says the same paragraph with the neighbourhood name swapped. "Proudly serving [Neighbourhood]. Our professional locksmith team provides fast, reliable service in [Neighbourhood] and surrounding areas." That page existed 166 times.

Google ranked exactly none of them.

What we did: we deleted 126 pages. We kept 40 — one for each area the locksmith actually dispatches to regularly. Then we rewrote every page with real content.

Each page included: the type of housing stock in that area (triplex walk-ups in Plateau-Mont-Royal, post-war bungalows in Saint-Laurent), the specific lock types common in those buildings (mortise locks on the older triplexes, Weiser deadbolts on the newer condos), typical response time from the locksmith's shop to that neighbourhood, and one specific job the locksmith had done there.

Results over 4 months:

Month 1: no change. Google was still re-crawling the site after the deletion of 126 pages.

Month 2: 6 of the 40 pages appeared in the top 20 for "[neighbourhood] locksmith." Calls went from 3/week to 5/week.

Month 3: 14 pages in the top 20. The "Plateau-Mont-Royal locksmith" page hit position 3. Calls hit 9/week.

Month 4: 18 pages in the top 20. Total calls: 14/week. The locksmith had to hire a second tech.

What didn't work: the suburban pages with newer housing stock performed worst. Newer subdivisions have fewer lock problems — the hardware is still under warranty. The best-performing pages were older neighbourhoods with aging lock hardware and multi-unit buildings.

The lesson: 40 real pages beat 166 hollow ones. And the "realness" isn't about word count — it's about whether the page contains a fact that only someone who actually works in that neighbourhood would know.`,
  },
  {
    slug: "ftc-review-rules-trade-sites",
    title: "The FTC review rules that now apply to your site (and the £50k fine)",
    excerpt: "Fake reviews became officially illegal in October 2024. Here's what the rule actually says and what you need to change on your site.",
    date: "2025-03-01",
    readTime: "6 min read",
    category: "Compliance",
    content: `In October 2024, the US Federal Trade Commission published its final rule on fake reviews. In the UK, the Digital Markets, Competition and Consumers Act (DMCC) does roughly the same thing. If you're a trade business with a website, two things are now explicitly illegal that were previously grey areas:

Fake reviews. This includes: writing your own reviews under fake names, paying someone to write a review who never used your service, buying review packages (those "$99 for 50 five-star Google reviews" services), and using AI to generate reviews. The FTC fine is up to $50,000 per violation. Per review. Not per batch.

Review suppression. Selectively asking happy customers for reviews while not asking unhappy ones. Cherry-picking which reviews to display on your website. Using contract terms that prevent customers from leaving negative reviews.

What this means for your website:

If you have a "Testimonials" section with quotes you wrote yourself, take it down. Even paraphrased real customer feedback counts as fake if the customer didn't write or approve it.

If you're displaying a star rating — "4.9 out of 5 from 346 reviews" — it must be from a verifiable source. Linking to your Google Business Profile reviews is fine. Making up a number is not.

If you use a review widget that only shows 5-star reviews, that's suppression. Show all of them or link to the source where all of them are visible.

What you should be doing instead:

Set up an automated review request. After every job, send an SMS with a direct link to your Google review page. We build this into Tier 2 — it's a simple two-line text: "Thanks for using [Business]. If you've got 30 seconds, a Google review helps us a lot: [link]." Send it to everyone, not just the happy ones.

Use structured data. If you display reviews on your site, use the Review schema with the actual author name, date, and rating. This tells Google the review is real and gives you rich snippets in search results.

One thing we refuse to do: we will never write reviews for a client, generate reviews with AI, or build a testimonial section with fabricated quotes. We've turned down clients who asked. The risk isn't worth it — not for us, and not for you.

The practical version: real reviews from real customers, collected consistently, displayed honestly. It's slower. It also won't get you fined $50,000 per review.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
