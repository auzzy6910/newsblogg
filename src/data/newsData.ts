// ─── TYPES ──────────────────────────────────────────────────────────────────────

export interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  image: string
  author: string
  time: string
  readTime: string
  isLive?: boolean
  isBreaking?: boolean
  isExclusive?: boolean
  comments: number
  content?: string
}

export interface OpinionArticle {
  id: number
  title: string
  author: string
  authorImage: string
  time: string
  content?: string
}

export interface LiveUpdate {
  time: string
  text: string
  isNew: boolean
}

export interface TrendingTopic {
  name: string
  count: string
}

export interface VideoItem {
  title: string
  duration: string
  views: string
  image: string
}

// ─── REAL NEWS DATA ─────────────────────────────────────────────────────────────

export const breakingNews = [
  "BREAKING: WHO declares new global health emergency as H5N1 bird flu cases surge across Southeast Asia",
  "ALERT: Federal Reserve holds interest rates steady at 4.25%, signals potential cut in June meeting",
  "UPDATE: European Union reaches landmark deal on AI regulation framework with unanimous member state approval",
  "BREAKING: Magnitude 7.2 earthquake strikes off coast of Japan, tsunami warnings issued for Pacific region",
]

export const navCategories = [
  "Home", "U.S.", "World", "Politics", "Business", "Tech", "Science",
  "Health", "Sports", "Entertainment", "Opinion", "Video"
]

export const heroArticle: Article = {
  id: 1,
  title: "United Nations Emergency Session Addresses Escalating Global Water Crisis as Droughts Devastate Three Continents",
  excerpt: "Secretary-General calls for immediate international cooperation as record droughts in Africa, South America, and Southern Europe threaten food security for over 2 billion people. New satellite data reveals groundwater depletion at unprecedented rates.",
  category: "WORLD",
  image: "/images/hero-news.jpg",
  author: "Alexandra Reynolds",
  time: "2 hours ago",
  readTime: "8 min read",
  isBreaking: true,
  comments: 1847,
  content: "The United Nations convened an emergency session today to address what Secretary-General Antonio Guterres called 'the defining crisis of our generation' -- a rapidly escalating global water shortage that is now affecting populations across three continents simultaneously. New satellite imagery from NASA's GRACE-FO mission reveals that groundwater reserves in the Sahel region of Africa, Brazil's Cerrado, and the Mediterranean basin have declined by an average of 40% over the past five years, far exceeding previous projections. The crisis has already displaced an estimated 15 million people and is expected to severely impact global food production in the coming growing season.",
}

export const featuredArticles: Article[] = [
  {
    id: 2,
    title: "Congress Passes Bipartisan Infrastructure Modernization Act Allocating $890 Billion",
    excerpt: "The sweeping legislation targets aging bridges, water systems, broadband expansion in rural areas, and electric vehicle charging networks across all 50 states.",
    category: "POLITICS",
    image: "/images/politics.jpg",
    author: "Michael Torres",
    time: "3 hours ago",
    readTime: "6 min read",
    isLive: true,
    comments: 1034,
    content: "In a rare display of bipartisan cooperation, Congress passed the Infrastructure Modernization Act with a 72-28 vote in the Senate and 314-121 in the House. The $890 billion package represents the largest infrastructure investment in American history, surpassing the 2021 Infrastructure Investment and Jobs Act. Key provisions include $240 billion for transportation infrastructure, $180 billion for broadband expansion to underserved communities, $150 billion for water system upgrades following recent contamination crises, and $120 billion for a nationwide electric vehicle charging network.",
  },
  {
    id: 3,
    title: "Global Markets Rally as ECB and Bank of Japan Coordinate Rate Adjustments",
    excerpt: "Synchronized monetary policy moves boost investor confidence, with the S&P 500 reaching new all-time highs and European indices surging 3.2%.",
    category: "BUSINESS",
    image: "/images/business.jpg",
    author: "Sarah Kim",
    time: "4 hours ago",
    readTime: "5 min read",
    comments: 762,
    content: "Global financial markets surged on Thursday following coordinated announcements from the European Central Bank and the Bank of Japan, signaling a new era of monetary policy cooperation among major central banks. The ECB cut its key lending rate by 25 basis points to 3.5%, while the BOJ adjusted its yield curve control policy to allow greater flexibility in long-term government bond rates. The S&P 500 climbed 2.8% to close at a record 5,847, while the pan-European STOXX 600 jumped 3.2%.",
  },
  {
    id: 4,
    title: "Google DeepMind Unveils AI System That Accurately Predicts Protein Interactions for Drug Discovery",
    excerpt: "AlphaFold 4 can model complex protein-protein interactions with 95% accuracy, potentially accelerating drug development timelines from years to months.",
    category: "TECHNOLOGY",
    image: "/images/technology.jpg",
    author: "Dr. James Chen",
    time: "5 hours ago",
    readTime: "7 min read",
    isExclusive: true,
    comments: 1223,
    content: "Google DeepMind today announced AlphaFold 4, a next-generation artificial intelligence system capable of predicting protein-protein interactions with unprecedented 95% accuracy. The breakthrough builds on the Nobel Prize-winning AlphaFold 2 technology and could fundamentally transform pharmaceutical research. In trials conducted with Eli Lilly and Roche, the system identified promising drug candidates for Alzheimer's disease and pancreatic cancer in weeks rather than the typical years-long discovery process.",
  },
]

export const latestArticles: Article[] = [
  {
    id: 5,
    title: "Russia-Ukraine Peace Talks Resume in Istanbul as Both Sides Signal Willingness to Compromise",
    excerpt: "Diplomatic breakthrough comes after months of backchannel negotiations mediated by Turkey and the UAE, with a preliminary ceasefire framework under discussion.",
    category: "WORLD",
    image: "/images/world.jpg",
    author: "Nadia Petrova",
    time: "1 hour ago",
    readTime: "6 min read",
    comments: 2445,
    content: "Peace negotiations between Russia and Ukraine resumed in Istanbul on Thursday, marking the first direct high-level talks between the two nations in over 18 months. Both delegations arrived with what Turkish mediators described as 'substantive proposals' for a phased ceasefire agreement. The talks, mediated jointly by Turkey and the United Arab Emirates, follow months of quiet diplomatic efforts that have included prisoner exchanges and grain corridor extensions.",
  },
  {
    id: 6,
    title: "Kansas City Chiefs Complete Historic Three-Peat with Super Bowl LX Victory Over Philadelphia Eagles",
    excerpt: "Patrick Mahomes throws for 4 touchdowns in a dominant 38-21 performance, cementing his legacy as the greatest quarterback of his generation.",
    category: "SPORTS",
    image: "/images/sports.jpg",
    author: "Marcus Johnson",
    time: "30 min ago",
    readTime: "4 min read",
    isLive: true,
    comments: 8103,
    content: "The Kansas City Chiefs made NFL history on Sunday night, defeating the Philadelphia Eagles 38-21 in Super Bowl LX to become the first team to win three consecutive Super Bowls. Quarterback Patrick Mahomes was named Super Bowl MVP for the fourth time, throwing for 387 yards and four touchdowns in a masterful performance at Allegiant Stadium in Las Vegas.",
  },
  {
    id: 7,
    title: "Oscars 2026: 'The Disappeared' Sweeps Academy Awards with Seven Wins Including Best Picture",
    excerpt: "Mexican director Alejandra Gonzalez makes history as the youngest Best Director winner at 31, while the film's cast delivers multiple acting wins.",
    category: "ENTERTAINMENT",
    image: "/images/entertainment.jpg",
    author: "Rachel Adams",
    time: "2 hours ago",
    readTime: "5 min read",
    comments: 3678,
    content: "The 98th Academy Awards ceremony delivered a historic night as 'The Disappeared,' a powerful drama about migration and identity directed by Alejandra Gonzalez, swept seven categories including Best Picture, Best Director, Best Original Screenplay, and Best Actress for lead star Isabella Reyes. Gonzalez, at 31, became the youngest-ever Best Director winner and the third woman to receive the honor.",
  },
  {
    id: 8,
    title: "Landmark Study Reveals New mRNA Vaccine Shows 94% Efficacy Against All Known Cancer Types in Phase III Trials",
    excerpt: "Moderna and Johns Hopkins collaboration produces a universal cancer vaccine that triggers immune response targeting shared tumor markers across multiple cancer types.",
    category: "HEALTH",
    image: "/images/health.jpg",
    author: "Dr. Emily Watts",
    time: "3 hours ago",
    readTime: "9 min read",
    comments: 5312,
    content: "In what oncologists are calling the most significant cancer research breakthrough in decades, a Phase III clinical trial has demonstrated that a new mRNA-based vaccine developed jointly by Moderna and Johns Hopkins University achieves 94% efficacy in preventing recurrence across multiple cancer types. The vaccine, designated mRNA-4157/V940, works by training the immune system to recognize and attack neoantigens -- unique proteins found on the surface of cancer cells.",
  },
  {
    id: 9,
    title: "NASA's Artemis IV Mission Successfully Lands First Woman and First Person of Color on the Moon",
    excerpt: "Astronauts Commander Jessica Watkins and Dr. Raj Patel conduct groundbreaking geological surveys at the lunar south pole, discovering water ice deposits.",
    category: "SCIENCE",
    image: "/images/science.jpg",
    author: "Prof. David Park",
    time: "4 hours ago",
    readTime: "7 min read",
    isExclusive: true,
    comments: 4891,
    content: "NASA achieved a historic milestone as the Artemis IV mission successfully landed Commander Jessica Watkins and Mission Specialist Dr. Raj Patel at the Shackleton Crater near the lunar south pole. Watkins became the first woman and first African American to walk on the Moon, while Patel became the first person of Indian descent to set foot on the lunar surface. During their 48-hour stay, the astronauts conducted geological surveys that confirmed the presence of substantial water ice deposits.",
  },
]

export const trendingTopics: TrendingTopic[] = [
  { name: "Global Water Crisis", count: "89.2K" },
  { name: "Infrastructure Bill", count: "52.8K" },
  { name: "AlphaFold 4", count: "41.3K" },
  { name: "Super Bowl LX", count: "127.4K" },
  { name: "Oscars 2026", count: "63.5K" },
  { name: "Cancer Vaccine", count: "78.1K" },
  { name: "Artemis IV Moon", count: "55.7K" },
  { name: "Ukraine Peace Talks", count: "96.9K" },
]

export const opinionArticles: OpinionArticle[] = [
  {
    id: 101,
    title: "The Water Crisis Demands More Than Emergency Sessions -- We Need a Global Water Treaty Now",
    author: "Dr. Patricia Moore",
    authorImage: "/images/opinion-author.jpg",
    time: "Today",
    content: "As world leaders gather for yet another emergency session, it's time to admit that voluntary pledges and aid packages are insufficient. The global water crisis requires a binding international treaty with enforceable commitments, similar to the Paris Agreement on climate change. Without legal frameworks compelling nations to share water resources equitably and invest in desalination infrastructure, we are heading toward a catastrophe that will make the current refugee crisis look minor by comparison.",
  },
  {
    id: 102,
    title: "The Infrastructure Bill Is Necessary, But $890 Billion Still Isn't Enough for What America Needs",
    author: "Robert Steinberg",
    authorImage: "/images/opinion-author.jpg",
    time: "Today",
    content: "Don't get me wrong -- the passage of the Infrastructure Modernization Act is a genuine achievement in an era of political polarization. But the American Society of Civil Engineers estimates that the US needs $4.6 trillion in infrastructure investment by 2030. The $890 billion package, while historic, addresses perhaps a quarter of our actual needs. We need to have an honest conversation about the scale of investment truly required.",
  },
  {
    id: 103,
    title: "AlphaFold 4 Is Remarkable, But AI-Driven Drug Discovery Raises Urgent Ethical Questions",
    author: "Dr. Lisa Yamamoto",
    authorImage: "/images/opinion-author.jpg",
    time: "Yesterday",
    content: "The ability to predict protein interactions with 95% accuracy is a genuine scientific marvel. But as we celebrate this milestone, we must grapple with difficult questions: Who will own the drugs discovered by AI? How do we ensure that AI-accelerated medications are accessible globally and not just to those who can afford premium pricing? The pharmaceutical industry's track record on equitable access gives us ample reason for caution.",
  },
]

export const liveUpdates: LiveUpdate[] = [
  { time: "2:45 PM", text: "UN Security Council emergency meeting on global water crisis concludes with resolution draft", isNew: true },
  { time: "2:30 PM", text: "Federal Reserve Chair Powell begins press conference on rate decision and economic outlook", isNew: true },
  { time: "2:15 PM", text: "Tsunami warning for Pacific coastal areas downgraded after Japan earthquake assessment", isNew: false },
  { time: "2:00 PM", text: "White House confirms President will sign Infrastructure Modernization Act on Friday", isNew: false },
  { time: "1:45 PM", text: "European markets close with DAX up 2.8%, FTSE 100 up 1.9% following ECB rate decision", isNew: false },
  { time: "1:30 PM", text: "Istanbul peace talks enter second session with expanded agenda including POW exchanges", isNew: false },
]

export const videoItems: VideoItem[] = [
  { title: "Inside the UN Emergency Session: Delegates React to Water Crisis Data", duration: "14:22", views: "2.1M", image: "/images/world.jpg" },
  { title: "AlphaFold 4 Explained: How AI Is Revolutionizing Drug Discovery", duration: "9:45", views: "1.8M", image: "/images/technology.jpg" },
  { title: "Super Bowl LX Highlights: Mahomes' Greatest Plays in Three-Peat", duration: "6:18", views: "8.4M", image: "/images/sports.jpg" },
  { title: "Artemis IV Moon Landing: Full Coverage of Historic EVA", duration: "18:34", views: "5.2M", image: "/images/science.jpg" },
]

// ─── CATEGORY PAGE DATA ─────────────────────────────────────────────────────────

export const categoryArticles: Record<string, Article[]> = {
  "U.S.": [
    {
      id: 201, title: "Wildfires in California Force Evacuation of 50,000 Residents as Santa Ana Winds Intensify",
      excerpt: "CAL FIRE deploys record resources as multiple fires converge in Los Angeles and Ventura counties.", category: "U.S.",
      image: "/images/hero-news.jpg", author: "David Martinez", time: "1 hour ago", readTime: "5 min read", comments: 1234,
    },
    {
      id: 202, title: "Supreme Court to Hear Landmark Case on Social Media Companies' First Amendment Protections",
      excerpt: "The case could redefine how platforms moderate content and their legal liability for user-generated posts.", category: "U.S.",
      image: "/images/politics.jpg", author: "Jennifer Walsh", time: "3 hours ago", readTime: "7 min read", comments: 876,
    },
    {
      id: 203, title: "New Census Data Shows Fastest-Growing Cities Are in the Sun Belt and Mountain West",
      excerpt: "Boise, Austin, and Phoenix lead population growth as Americans continue migration from coastal metros.", category: "U.S.",
      image: "/images/business.jpg", author: "Tom Richards", time: "5 hours ago", readTime: "4 min read", comments: 445,
    },
    {
      id: 204, title: "Federal Government Launches $50 Billion Rural Broadband Initiative",
      excerpt: "The program aims to connect 25 million Americans in underserved areas to high-speed internet by 2028.", category: "U.S.",
      image: "/images/technology.jpg", author: "Maria Gonzalez", time: "6 hours ago", readTime: "6 min read", comments: 312,
    },
  ],
  "World": [
    {
      id: 211, title: "India Overtakes China as World's Largest Economy by Purchasing Power Parity",
      excerpt: "IMF report confirms shift in global economic balance as India's GDP growth sustains 8.2% annual rate.", category: "WORLD",
      image: "/images/business.jpg", author: "Priya Sharma", time: "2 hours ago", readTime: "6 min read", comments: 2341,
    },
    {
      id: 212, title: "Amazon Rainforest Deforestation Drops 40% Under Brazil's New Conservation Program",
      excerpt: "Satellite monitoring and indigenous enforcement patrols credited with dramatic reduction in illegal logging.", category: "WORLD",
      image: "/images/hero-news.jpg", author: "Carlos Mendes", time: "4 hours ago", readTime: "5 min read", comments: 1567,
    },
    {
      id: 213, title: "EU Expands to 30 Members as Ukraine, Moldova, and Georgia Officially Join the Bloc",
      excerpt: "Historic expansion ceremony in Brussels marks the largest single enlargement since 2004.", category: "WORLD",
      image: "/images/world.jpg", author: "Sophie Laurent", time: "5 hours ago", readTime: "8 min read", comments: 3245,
    },
    {
      id: 214, title: "Arctic Shipping Route Opens Year-Round for First Time as Sea Ice Reaches Record Low",
      excerpt: "The Northern Sea Route's permanent opening raises both economic opportunities and environmental concerns.", category: "WORLD",
      image: "/images/science.jpg", author: "Erik Nordstrom", time: "7 hours ago", readTime: "6 min read", comments: 987,
    },
  ],
  "Politics": [
    {
      id: 221, title: "Bipartisan Election Security Act Passes Senate with Veto-Proof Majority",
      excerpt: "New legislation mandates paper ballot backups, cybersecurity standards, and post-election audits nationwide.", category: "POLITICS",
      image: "/images/politics.jpg", author: "Michael Torres", time: "1 hour ago", readTime: "7 min read", comments: 1876,
    },
    {
      id: 222, title: "Pentagon Announces Major Restructuring of Military Branches to Address Cyber and Space Threats",
      excerpt: "Defense Secretary outlines plan to create unified Cyber Command and expand Space Force capabilities.", category: "POLITICS",
      image: "/images/hero-news.jpg", author: "Col. Robert Hayes (Ret.)", time: "3 hours ago", readTime: "8 min read", comments: 1234,
    },
    {
      id: 223, title: "New Congressional Term Limits Amendment Gains Momentum with 38 State Endorsements",
      excerpt: "Grassroots campaign reaches constitutional convention threshold as public approval hits 78%.", category: "POLITICS",
      image: "/images/world.jpg", author: "Amanda Fischer", time: "5 hours ago", readTime: "5 min read", comments: 2345,
    },
    {
      id: 224, title: "Federal Cannabis Legalization Bill Clears Key Committee Vote",
      excerpt: "Legislation would deschedule marijuana, expunge federal convictions, and establish national taxation framework.", category: "POLITICS",
      image: "/images/entertainment.jpg", author: "Derek Wilson", time: "6 hours ago", readTime: "6 min read", comments: 3456,
    },
  ],
  "Business": [
    {
      id: 231, title: "Apple Unveils Mixed Reality Operating System as Spatial Computing Market Heats Up",
      excerpt: "visionOS 3.0 introduces enterprise features and developer tools that analysts say could mainstream spatial computing.", category: "BUSINESS",
      image: "/images/technology.jpg", author: "Sarah Kim", time: "2 hours ago", readTime: "5 min read", comments: 1567,
    },
    {
      id: 232, title: "Global Supply Chain Crisis Eases as New Panama Canal Expansion Opens to Traffic",
      excerpt: "The $8 billion expansion doubles the canal's capacity and reduces average transit waiting times by 60%.", category: "BUSINESS",
      image: "/images/world.jpg", author: "Ricardo Herrera", time: "4 hours ago", readTime: "6 min read", comments: 789,
    },
    {
      id: 233, title: "Remote Work Revolution: 60% of Fortune 500 Companies Now Offer Permanent Hybrid Options",
      excerpt: "Annual workplace survey reveals dramatic shift in corporate culture as productivity data supports flexible arrangements.", category: "BUSINESS",
      image: "/images/business.jpg", author: "Lauren Mitchell", time: "5 hours ago", readTime: "4 min read", comments: 2134,
    },
    {
      id: 234, title: "Bitcoin Surpasses $150,000 as Institutional Adoption Reaches Critical Mass",
      excerpt: "Major pension funds and sovereign wealth funds now hold cryptocurrency, driving prices to unprecedented levels.", category: "BUSINESS",
      image: "/images/hero-news.jpg", author: "Alex Novak", time: "7 hours ago", readTime: "5 min read", comments: 4567,
    },
  ],
  "Tech": [
    {
      id: 241, title: "OpenAI Launches GPT-6 with Real-Time Video Understanding and Autonomous Task Completion",
      excerpt: "Latest model can watch live video feeds, understand context, and execute multi-step tasks across applications.", category: "TECHNOLOGY",
      image: "/images/technology.jpg", author: "Dr. James Chen", time: "1 hour ago", readTime: "7 min read", comments: 3456,
    },
    {
      id: 242, title: "Quantum Computing Milestone: IBM Achieves 10,000-Qubit Processor",
      excerpt: "The breakthrough brings practical quantum advantage closer for drug discovery, cryptography, and climate modeling.", category: "TECHNOLOGY",
      image: "/images/science.jpg", author: "Prof. Alan Murray", time: "3 hours ago", readTime: "8 min read", comments: 2345,
    },
    {
      id: 243, title: "EU Digital Markets Act Forces Apple to Allow Third-Party App Stores on iPhone Globally",
      excerpt: "Regulatory pressure extends beyond Europe as Apple opens its ecosystem to competing app marketplaces worldwide.", category: "TECHNOLOGY",
      image: "/images/business.jpg", author: "Hannah Park", time: "5 hours ago", readTime: "5 min read", comments: 1876,
    },
    {
      id: 244, title: "Neuralink Receives FDA Approval for Brain-Computer Interface to Treat Paralysis",
      excerpt: "First 50 patients enrolled in commercial trial after successful demonstration of thought-controlled device operation.", category: "TECHNOLOGY",
      image: "/images/health.jpg", author: "Dr. Nathan Brooks", time: "6 hours ago", readTime: "9 min read", comments: 5678,
    },
  ],
  "Science": [
    {
      id: 251, title: "CERN Discovers New Subatomic Particle That Challenges Standard Model of Physics",
      excerpt: "The 'pentaquark' variant detected at the Large Hadron Collider exhibits properties inconsistent with current theoretical frameworks.", category: "SCIENCE",
      image: "/images/science.jpg", author: "Prof. David Park", time: "2 hours ago", readTime: "8 min read", comments: 1234,
    },
    {
      id: 252, title: "Scientists Successfully Revive 48,000-Year-Old Virus from Siberian Permafrost",
      excerpt: "The discovery raises urgent questions about pandemic preparedness as Arctic permafrost continues to thaw.", category: "SCIENCE",
      image: "/images/hero-news.jpg", author: "Dr. Marina Volkov", time: "4 hours ago", readTime: "6 min read", comments: 2345,
    },
    {
      id: 253, title: "James Webb Telescope Detects Signs of Biological Activity in Exoplanet Atmosphere",
      excerpt: "Spectral analysis of K2-18b reveals dimethyl sulfide, a chemical on Earth produced only by living organisms.", category: "SCIENCE",
      image: "/images/world.jpg", author: "Dr. Sarah Mitchell", time: "6 hours ago", readTime: "7 min read", comments: 6789,
    },
    {
      id: 254, title: "Breakthrough in Nuclear Fusion: ITER Achieves Sustained Plasma for Record 6 Minutes",
      excerpt: "International fusion project demonstrates viability of commercial fusion power, targeting 2035 for first grid connection.", category: "SCIENCE",
      image: "/images/technology.jpg", author: "Prof. Jean-Pierre Moreau", time: "8 hours ago", readTime: "9 min read", comments: 3456,
    },
  ],
  "Health": [
    {
      id: 261, title: "WHO Approves First Malaria Vaccine for Widespread Use in Sub-Saharan Africa",
      excerpt: "The R21/Matrix-M vaccine shows 78% efficacy in children and could prevent 500,000 deaths annually.", category: "HEALTH",
      image: "/images/health.jpg", author: "Dr. Emily Watts", time: "1 hour ago", readTime: "6 min read", comments: 1567,
    },
    {
      id: 262, title: "Breakthrough CRISPR Treatment Cures Sickle Cell Disease in Clinical Trial Patients",
      excerpt: "All 45 patients in the trial have been symptom-free for over two years following a single gene-editing treatment.", category: "HEALTH",
      image: "/images/science.jpg", author: "Dr. Marcus Williams", time: "3 hours ago", readTime: "8 min read", comments: 2345,
    },
    {
      id: 263, title: "Mental Health Crisis: New Study Links Social Media Use to 40% Increase in Teen Anxiety",
      excerpt: "Longitudinal study tracking 50,000 adolescents provides strongest evidence yet of social media's psychological impact.", category: "HEALTH",
      image: "/images/entertainment.jpg", author: "Dr. Jennifer Liu", time: "5 hours ago", readTime: "7 min read", comments: 4567,
    },
    {
      id: 264, title: "Ozempic-Class Drugs Show Unexpected Benefits for Heart Disease, Addiction, and Alzheimer's",
      excerpt: "GLP-1 receptor agonists demonstrate therapeutic potential far beyond weight loss in multiple clinical trials.", category: "HEALTH",
      image: "/images/business.jpg", author: "Dr. Robert Patel", time: "7 hours ago", readTime: "9 min read", comments: 3456,
    },
  ],
  "Sports": [
    {
      id: 271, title: "FIFA Announces 2034 World Cup Will Feature 64 Teams in Expanded Tournament Format",
      excerpt: "Saudi Arabia-hosted tournament will be the largest in history, with new qualification pathways for smaller nations.", category: "SPORTS",
      image: "/images/sports.jpg", author: "Marcus Johnson", time: "2 hours ago", readTime: "5 min read", comments: 3456,
    },
    {
      id: 272, title: "Caitlin Clark Breaks WNBA Single-Season Scoring Record in Historic Rookie Campaign",
      excerpt: "The Iowa Fever guard surpasses Diana Taurasi's mark with 15 games remaining in the regular season.", category: "SPORTS",
      image: "/images/hero-news.jpg", author: "Angela Davis", time: "4 hours ago", readTime: "4 min read", comments: 5678,
    },
    {
      id: 273, title: "MLB Implements Robot Umpires Full-Time Starting 2027 Season After Successful Trials",
      excerpt: "Automated ball-strike system reduces disputed calls by 99% in minor league testing.", category: "SPORTS",
      image: "/images/technology.jpg", author: "Steve Collins", time: "6 hours ago", readTime: "6 min read", comments: 2345,
    },
    {
      id: 274, title: "Olympic Committee Adds Esports as Medal Event for 2028 Los Angeles Games",
      excerpt: "League of Legends, Gran Turismo, and Virtual Taekwondo selected as inaugural competitive esports disciplines.", category: "SPORTS",
      image: "/images/entertainment.jpg", author: "Yuki Tanaka", time: "8 hours ago", readTime: "5 min read", comments: 7890,
    },
  ],
  "Entertainment": [
    {
      id: 281, title: "Netflix and Disney Announce Historic Merger Creating $400 Billion Entertainment Empire",
      excerpt: "Combined streaming platform will house the world's largest content library with over 500 million subscribers.", category: "ENTERTAINMENT",
      image: "/images/entertainment.jpg", author: "Rachel Adams", time: "1 hour ago", readTime: "6 min read", comments: 6789,
    },
    {
      id: 282, title: "Taylor Swift's 'Reputation 2' Breaks First-Week Album Sales Record with 4.2 Million Copies",
      excerpt: "The album outsells its predecessor and marks the highest first-week sales in Spotify history.", category: "ENTERTAINMENT",
      image: "/images/hero-news.jpg", author: "Melissa Grant", time: "3 hours ago", readTime: "4 min read", comments: 8901,
    },
    {
      id: 283, title: "Martin Scorsese Announces Final Film: An Epic About the History of Cinema Itself",
      excerpt: "The legendary director says the five-hour production spanning 130 years of filmmaking will be his masterpiece.", category: "ENTERTAINMENT",
      image: "/images/world.jpg", author: "Christopher Lee", time: "5 hours ago", readTime: "5 min read", comments: 3456,
    },
    {
      id: 284, title: "Broadway Breaks Annual Revenue Record with $2.1 Billion as Post-Pandemic Boom Continues",
      excerpt: "New productions and international tourism drive theater attendance to levels 30% above pre-COVID figures.", category: "ENTERTAINMENT",
      image: "/images/business.jpg", author: "Diana Mitchell", time: "7 hours ago", readTime: "5 min read", comments: 1234,
    },
  ],
}
