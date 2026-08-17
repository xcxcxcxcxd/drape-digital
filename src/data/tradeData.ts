export interface TradeConfig {
  slug: string;
  trade: string;
  tradeNoun: string;        // "locksmiths"
  tradePlural: string;      // "Locksmith Websites"
  heroH1: string;
  heroSub: string;
  leadValue: string;
  decisionTime: string;
  buyingChannel: string;
  seoTitle: string;
  seoDesc: string;
  problemSection: {
    scenario: string;
    searchBehavior: string;
    whatsBroken: string;
  };
  exampleJobs: string[];
  exampleAreas: string[];
  faq: { q: string; a: string }[];
}

export const trades: TradeConfig[] = [
  {
    slug: "locksmith-websites",
    trade: "Locksmith",
    tradeNoun: "locksmiths",
    tradePlural: "Locksmith Websites",
    heroH1: "Websites for locksmiths who need the phone to ring",
    heroSub: "We build the site first. You see it live, on a real URL, before you pay anything. If it's not better than what you've got, walk away and keep the pages.",
    leadValue: "£150–£800",
    decisionTime: "under 90 seconds",
    buyingChannel: "phone, one thumb, probably raining",
    seoTitle: "Locksmith Website Design & SEO | Drape Digital",
    seoDesc: "We build and rank websites for locksmiths. Demo-first — see your site live before you pay. Click-to-call, local SEO, Google Business Profile, call tracking.",
    problemSection: {
      scenario: "Your customer is standing outside their own front door. It's raining. They've got one hand on a phone and four tabs open.",
      searchBehavior: "They're not reading your About page. They're looking for two things: can you actually get in, and what will it cost. Whichever site answers first gets the call.",
      whatsBroken: "Most locksmith sites answer neither. Big photo of a door. \"Quality service since 2009.\" Phone number in the footer, in grey.",
    },
    exampleJobs: [
      "Broken key extraction",
      "Transponder programming",
      "Panic bar repair",
      "Lock rekeying",
      "Master key systems",
      "Push-pull paddle repair",
      "High-security lock install",
      "Storefront lock replacement",
    ],
    exampleAreas: ["Downtown", "West End", "Suburbs", "Industrial parks"],
    faq: [
      {
        q: "do you only build sites for locksmiths",
        a: "No. We build for any emergency call-out trade — towing, garage doors, HVAC, plumbers, electricians. Locksmiths are where we started, so we know the vertical cold.",
      },
      {
        q: "how long until I see something",
        a: "Three working days for the homepage. We build it on a live URL before we ask for anything.",
      },
      {
        q: "what if I already have a website",
        a: "We'll rebuild your homepage for free. If it's better than what you've got, we talk about finishing the site. If not, keep the files.",
      },
      {
        q: "do you do Google Ads for locksmiths",
        a: "Yes, in Tier 3. We manage Google Ads and Local Services Ads. Locksmith clicks run $40–$80, so budget matters — we'll tell you if your area isn't worth it.",
      },
      {
        q: "can you help with a suspended Google Business Profile",
        a: "We've done reinstatements. Locksmith GBP suspensions are common — Google flags the category. We know the process, but can't guarantee Google's timeline.",
      },
      {
        q: "what don't you do",
        a: "Logos, brand books, social media, e-commerce, national SEO. We build sites that make phones ring for local trades. That's it.",
      },
    ],
  },
  {
    slug: "towing-websites",
    trade: "Towing",
    tradeNoun: "towing companies",
    tradePlural: "Towing Websites",
    heroH1: "Websites for towing companies that need calls, not clicks",
    heroSub: "We build the site first. You see it live before you pay. If it doesn't look like it'll win calls off your competitor's site, walk away.",
    leadValue: "£100–£500",
    decisionTime: "under 60 seconds",
    buyingChannel: "phone, roadside, stressed",
    seoTitle: "Towing Company Website Design & SEO | Drape Digital",
    seoDesc: "We build and rank websites for towing companies. Demo-first — see your site live before you pay. Click-to-call, local SEO, dispatch-ready.",
    problemSection: {
      scenario: "Your customer is standing on a hard shoulder. Car won't start. It's dark, it's cold, and they've got three tabs open on a phone with 12% battery.",
      searchBehavior: "They don't care about your fleet photos. They want to know: can you get here, how fast, and what's it going to cost to move a 2019 Honda Civic three miles.",
      whatsBroken: "Most towing sites show a stock photo of a flatbed. \"24/7 Towing Services.\" No price, no ETA, no area map. The customer calls whichever number they see first.",
    },
    exampleJobs: [
      "Roadside assistance",
      "Flatbed towing",
      "Motorcycle towing",
      "Long-distance towing",
      "Accident recovery",
      "Jump start service",
      "Lockout assistance",
      "Winch-out service",
    ],
    exampleAreas: ["Highways", "Downtown", "Industrial", "Residential"],
    faq: [
      {
        q: "do you build sites for towing companies specifically",
        a: "Yes. Towing, locksmiths, garage doors, HVAC — any emergency trade where the customer calls from a phone in a panic. Same economics, same site architecture.",
      },
      {
        q: "how fast can I get a site up",
        a: "Homepage in three working days. Full site in two weeks. We build it live on a real URL before you pay anything.",
      },
      {
        q: "do you handle Google Ads for towing",
        a: "In Tier 3, yes. Towing clicks are expensive. We'll tell you upfront if your market and budget make ads viable before we take your money.",
      },
      {
        q: "what about dispatch integration",
        a: "We don't build dispatch software. We build the site that makes the phone ring. If you need dispatch, we'll recommend someone, but that's not our lane.",
      },
      {
        q: "can you rank me for 'towing near me'",
        a: "That's a map pack result — it depends on your Google Business Profile, reviews, and proximity. Our Tier 2 builds the location pages and GBP presence that feed that ranking. Takes 4–6 months.",
      },
      {
        q: "I only cover a small area, is it worth it",
        a: "If you're doing 3+ jobs a day, yes. One extra call a day at your average tow fee pays for the site in a week. If your area is too thin, we'll tell you.",
      },
    ],
  },
  {
    slug: "garage-door-websites",
    trade: "Garage Door",
    tradeNoun: "garage door companies",
    tradePlural: "Garage Door Websites",
    heroH1: "Websites for garage door companies that convert on the first visit",
    heroSub: "We build the site first. You see it live on a real URL. If it's not better than what you've got, walk away and keep the pages.",
    leadValue: "£200–£1,200",
    decisionTime: "under 2 minutes",
    buyingChannel: "phone, standing in the garage, door won't close",
    seoTitle: "Garage Door Website Design & SEO | Drape Digital",
    seoDesc: "Websites for garage door repair and installation companies. Demo-first — we build it, you see it live, then decide. Local SEO, click-to-call, real pricing.",
    problemSection: {
      scenario: "Your customer's garage door is stuck open. It's 7am, they need to get to work, and the car is trapped inside. They're searching on their phone in the driveway.",
      searchBehavior: "They want three things: can you fix it today, how much is a spring replacement, and are you actually nearby. Everything else is noise.",
      whatsBroken: "Most garage door sites are a gallery of doors nobody asked to see. No prices, no service area, no emergency number above the fold. The call goes to whoever answers those questions.",
    },
    exampleJobs: [
      "Spring replacement",
      "Opener installation",
      "Panel replacement",
      "Cable repair",
      "Off-track repair",
      "Roller replacement",
      "Weatherseal replacement",
      "New garage door install",
    ],
    exampleAreas: ["Residential suburbs", "New builds", "Industrial parks"],
    faq: [
      {
        q: "do you build sites for garage door companies",
        a: "Yes. Garage door repair is an emergency trade — same buying pattern as locksmith or towing. Customer's on a phone, door's broken, they call whoever looks like they can fix it today.",
      },
      {
        q: "what makes your sites different from a Wix template",
        a: "Specific job pages that rank for what people actually search — 'garage door spring replacement [city]' not 'our services.' Real prices on the page. A call button that follows the thumb.",
      },
      {
        q: "can you show pricing on the site if my prices vary",
        a: "Yes. 'Spring replacement from £85' is better than nothing. We use the 'from' price for common jobs. Customers know the final bill depends on the job — they just want to know the ballpark.",
      },
      {
        q: "what if I do installs too, not just repair",
        a: "We build pages for both. Repair pages are emergency-conversion pages. Install pages are more considered — different layout, before/after photos, longer copy. Same site, two modes.",
      },
      {
        q: "do I really need location pages",
        a: "If you serve more than one town, yes. 'Garage door repair [town name]' is how people search. One page per area you actually serve, with real detail about the buildings there.",
      },
      {
        q: "what don't you do",
        a: "We don't build e-commerce sites to sell doors online. We don't do social media. We don't do national SEO. We build sites that make local phones ring.",
      },
    ],
  },
  {
    slug: "hvac-websites",
    trade: "HVAC",
    tradeNoun: "HVAC companies",
    tradePlural: "HVAC Websites",
    heroH1: "Websites for HVAC companies that turn search into service calls",
    heroSub: "We build the site first. You see it live before you pay anything. No contract, no deposit — just a working site with your name on it.",
    leadValue: "£150–£2,000",
    decisionTime: "under 3 minutes",
    buyingChannel: "phone, house is too hot or too cold, needs it fixed today",
    seoTitle: "HVAC Website Design & SEO | Drape Digital",
    seoDesc: "Websites for HVAC companies — heating, cooling, emergency repair. Demo-first model. We build your site live before you pay. Local SEO and call tracking included.",
    problemSection: {
      scenario: "It's August. The AC died at 2pm. Your customer's house is 35°C and they've got a toddler. They're on their phone searching 'emergency AC repair' and they'll call the first number that looks real.",
      searchBehavior: "They don't care about your NATE certifications. They want to know: can you come today, what's the diagnostic fee, and do you work on their brand of unit.",
      whatsBroken: "Most HVAC sites list every service ever invented. 'Heating, cooling, ventilation, indoor air quality, ductwork, maintenance plans.' Nobody reads it. The customer wants one answer: when can you get here.",
    },
    exampleJobs: [
      "AC repair",
      "Furnace repair",
      "Heat pump install",
      "Ductwork repair",
      "Thermostat replacement",
      "Refrigerant recharge",
      "Boiler service",
      "Emergency heating repair",
    ],
    exampleAreas: ["Residential", "Commercial", "New construction"],
    faq: [
      {
        q: "do you build HVAC websites specifically",
        a: "Yes. HVAC is an emergency trade in summer and winter. Same site architecture as locksmith or towing — phone-first, price on the page, call button fixed to the viewport.",
      },
      {
        q: "what about maintenance plan signups",
        a: "We can add a maintenance plan page, but it's not the priority. The site is built to convert emergency calls first. Maintenance upsell happens on the second visit or via email follow-up.",
      },
      {
        q: "can you rank me for 'AC repair near me'",
        a: "That's the goal. Tier 2 builds location pages one area at a time, manages your Google Business Profile, and posts real job photos monthly. Map pack rankings take 4–6 months of consistent work.",
      },
      {
        q: "do you do Google Ads for HVAC",
        a: "In Tier 3. HVAC clicks are seasonal — expensive in July, cheaper in March. We'll show you the monthly cost before you commit and tell you if your area is too competitive for your budget.",
      },
      {
        q: "I do residential and commercial — can the site handle both",
        a: "Yes. Separate sections. Commercial leads search differently — 'commercial HVAC contractor [city]' — so they get their own pages. Residential is the emergency funnel.",
      },
      {
        q: "what if I'm just starting out and have no reviews",
        a: "We set up a review collection SMS flow in Tier 2. After every job, your customer gets a text with a direct link to leave a Google review. Three months of this changes everything.",
      },
    ],
  },
];

export function getTradeBySlug(slug: string): TradeConfig | undefined {
  return trades.find((t) => t.slug === slug);
}
