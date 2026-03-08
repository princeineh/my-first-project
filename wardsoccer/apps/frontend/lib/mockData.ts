// ─── PRE-SEASON / LAUNCH STATE ───────────────────────────────────────────────

export const launchState = {
  phase: "onboarding" as "onboarding" | "preseason" | "full_season",
  daysToPreseason: 28,
  totalOnboardingDays: 30,
  daysPassed: 2,
  launchDate: "2026-03-08",
  preseasonDate: "2026-04-08",
};

// Live join counter (simulated)
export const joinStats = {
  totalPlayers:    347,
  totalAgencies:    89,   // coaches, referees, scouts, trainers, etc.
  totalVendors:     24,
  districtsForming: 12,
  districtsActive:   0,   // none activated yet — need full team + agencies
  clubsBuilding:    10,
};

// What each district needs to activate
export const districtActivationRequirements = {
  minPlayers:  18,   // full squad
  coaches:      1,
  referees:     2,
  scouts:       1,
  trainers:     1,
  firstAid:     1,
  mediaReps:    1,
};

// Districts in formation (no active matches)
export const formingDistricts = [
  {
    id: "ph-main", name: "Port Harcourt Main", state: "Rivers", lga: "Port Harcourt",
    ownerClub: "Man United", players: 14, coaches: 1, referees: 1, scouts: 0, trainers: 1, media: 1, firstAid: 0,
    color: "#22c55e",
    recentJoiners: ["Chukwu E.", "Tunde B.", "Segun L."],
  },
  {
    id: "obio", name: "Obio-Akpor", state: "Rivers", lga: "Obio-Akpor",
    ownerClub: "Chelsea", players: 9, coaches: 0, referees: 1, scouts: 1, trainers: 0, media: 0, firstAid: 0,
    color: "#3b82f6",
    recentJoiners: ["Emeka O.", "Femi A."],
  },
  {
    id: "lagos-is", name: "Lagos Island", state: "Lagos", lga: "Lagos Island",
    ownerClub: "Arsenal", players: 16, coaches: 1, referees: 2, scouts: 1, trainers: 1, media: 1, firstAid: 1,
    color: "#ef4444",
    recentJoiners: ["Bisi A.", "Rasheed M.", "Yemi O."],
  },
  {
    id: "ikeja", name: "Ikeja", state: "Lagos", lga: "Ikeja",
    ownerClub: "Liverpool", players: 11, coaches: 1, referees: 0, scouts: 0, trainers: 1, media: 1, firstAid: 0,
    color: "#dc2626",
    recentJoiners: ["Kelechi I.", "Seun O."],
  },
  {
    id: "gwagwalada", name: "Gwagwalada", state: "FCT Abuja", lga: "Gwagwalada",
    ownerClub: "Barcelona", players: 7, coaches: 0, referees: 1, scouts: 0, trainers: 0, media: 0, firstAid: 0,
    color: "#f59e0b",
    recentJoiners: ["Ibrahim M."],
  },
  {
    id: "warri-north", name: "Warri North", state: "Delta", lga: "Warri North",
    ownerClub: "Real Madrid", players: 12, coaches: 1, referees: 1, scouts: 1, trainers: 0, media: 1, firstAid: 0,
    color: "#94a3b8",
    recentJoiners: ["Ovie E.", "Delta O.", "Rume E."],
  },
];

// Recent joiners feed
export const recentJoiners = [
  { id: "j1", name: "Chukwu Emeka",   role: "Player",   club: "Man United", district: "Port Harcourt", time: "2m ago"  },
  { id: "j2", name: "Mr. Adeyemi",    role: "Coach",    club: "Arsenal",    district: "Lagos Island",  time: "5m ago"  },
  { id: "j3", name: "Bisi Adeleke",   role: "Player",   club: "Arsenal",    district: "Lagos Island",  time: "9m ago"  },
  { id: "j4", name: "Mama Chika",     role: "Vendor",   club: "—",          district: "Enugu North",   time: "14m ago" },
  { id: "j5", name: "Rasheed Musa",   role: "Player",   club: "Chelsea",    district: "Lagos Island",  time: "18m ago" },
  { id: "j6", name: "Dr. Nwosu",      role: "First Aid",club: "—",          district: "Port Harcourt", time: "31m ago" },
  { id: "j7", name: "Kelechi Ihe",    role: "Player",   club: "Liverpool",  district: "Ikeja",         time: "45m ago" },
  { id: "j8", name: "Oga Kits",       role: "Vendor",   club: "—",          district: "Port Harcourt", time: "1h ago"  },
];

// Nigeria location data
export const nigeriaStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export const lgasByState: Record<string, string[]> = {
  "Rivers": ["Port Harcourt", "Obio-Akpor", "Eleme", "Okrika", "Bonny", "Degema", "Etche", "Gokana", "Khana", "Tai", "Ogu-Bolo"],
  "Lagos":  ["Lagos Island", "Lagos Mainland", "Ikeja", "Alimosho", "Oshodi-Isolo", "Surulere", "Kosofe", "Mushin", "Agege", "Ifako-Ijaye", "Shomolu", "Ajeromi-Ifelodun", "Badagry", "Epe", "Ikorodu"],
  "FCT Abuja": ["AMAC", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Abaji"],
  "Delta":  ["Warri North", "Warri South", "Warri South-West", "Uvwie", "Ethiope East", "Ethiope West", "Sapele", "Ughelli North", "Ughelli South"],
  "Enugu":  ["Enugu North", "Enugu South", "Igbo-Eze North", "Igbo-Eze South", "Nkanu East", "Nkanu West", "Udi", "Ezeagu"],
  "Kano":   ["Kano Municipal", "Fagge", "Dala", "Gwale", "Tarauni", "Nassarawa", "Kumbotso", "Ungogo"],
  "Oyo":    ["Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Egbeda", "Oluyole"],
  "Ogun":   ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Sagamu", "Ijebu Ode", "Ijebu North"],
  "Anambra":["Onitsha North", "Onitsha South", "Awka North", "Awka South", "Nnewi North", "Nnewi South", "Oji-River"],
  "Imo":    ["Owerri Municipal", "Owerri North", "Owerri West", "Orlu", "Okigwe", "Mbaise"],
  "Edo":    ["Oredo", "Egor", "Ikpoba-Okha", "Ovia North-East", "Ovia South-West", "Akoko-Edo"],
  "Kaduna": ["Kaduna North", "Kaduna South", "Chikun", "Igabi", "Zaria"],
  "Plateau":["Jos North", "Jos South", "Barkin Ladi", "Bassa", "Shendam"],
  "Cross River": ["Calabar Municipal", "Calabar South", "Ogoja", "Obudu", "Ikom"],
  "Akwa Ibom": ["Uyo", "Ikot Ekpene", "Eket", "Oron", "Abak"],
  "Abia":   ["Umuahia North", "Umuahia South", "Aba North", "Aba South", "Arochukwu"],
};

// Ward / neighbourhood data per LGA
export const wardsByLga: Record<string, string[]> = {
  // Rivers State
  "Port Harcourt": ["GRA Phase 1", "GRA Phase 2", "GRA Phase 3", "Rumuola", "Diobu", "Mile 1", "Mile 2", "Mile 3", "Trans Amadi", "Borokiri", "D-Line", "Rumuobiakani", "Elechi", "Woji", "Rumuagali"],
  "Obio-Akpor":    ["Rumuigbo", "Rumuola", "Rumuodara", "Ozuoba", "Rumuephircom", "Apara", "Eneka", "Rukpokwu", "Rumunduru", "Mgbuoba", "Eligbam"],
  "Eleme":         ["Ogale", "Ebubu", "Aleto", "Alesa", "Agbonchia", "Otera"],
  "Bonny":         ["Bonny Town", "Finima", "Peterside"],
  // Lagos State
  "Lagos Island":  ["Lagos Island I", "Lagos Island II", "Lagos Island III", "Campos", "Olowogbowo"],
  "Lagos Mainland":["Yaba", "Ebute-Meta East", "Ebute-Meta West", "Alagomeji", "Iwaya"],
  "Ikeja":         ["Alausa", "Oregun", "Ojota", "Maryland", "Agidingbi", "Toyin", "Allen Avenue", "Owode", "Ikeja GRA"],
  "Alimosho":      ["Egbeda", "Idimu", "Igando", "Isheri-Oshun", "Akowonjo", "Shasha"],
  "Surulere":      ["Surulere I", "Surulere II", "Randle", "Ijeshatedo", "Itire", "Ojuelegba"],
  "Oshodi-Isolo":  ["Oshodi", "Isolo", "Ejigbo", "Okota", "Ago Palace"],
  "Kosofe":        ["Ketu", "Mile 12", "Ojota", "Alapere", "Ogudu"],
  // FCT Abuja
  "AMAC":          ["Garki", "Wuse 1", "Wuse 2", "Maitama", "Asokoro", "Central Business District", "Gwarinpa", "Kado", "Life Camp", "Utako"],
  "Bwari":         ["Bwari Town", "Dutse", "Ushafa", "Kawu"],
  "Gwagwalada":    ["Gwagwalada Town", "Dobi", "Zuba", "Kutunku"],
  "Kuje":          ["Kuje Town", "Rubochi", "Kujekwa"],
  // Delta State
  "Warri North":   ["Koko", "Burutu", "Bomadi", "Patani"],
  "Warri South":   ["Warri Central", "Warri West", "Ovwian", "Aladja", "Ekpan"],
  "Uvwie":         ["Effurun", "Ugboroke", "Igbudu", "Ekpan"],
  // Enugu State
  "Enugu North":   ["Ogui", "Asata", "Coal Camp", "Achara Layout", "New Haven", "Independence Layout"],
  "Enugu South":   ["GRA", "Trans-Ekulu", "Emene", "Abakpa-Nike"],
  // Kano State
  "Kano Municipal":["Fagge", "Dala", "Kofar Mata", "Kofar Nassarawa", "Dakata", "Kabuga"],
  "Nassarawa":     ["Nassarawa I", "Nassarawa II", "Hausawa", "Dorayi"],
  // Oyo State
  "Ibadan North":  ["Agodi-Gate", "Oke-Offa", "Aperin", "Basorun", "Bodija"],
  "Ibadan South-West": ["Iyaganku", "Oke-Ado", "Oluyole Estate", "Ashi", "Ring Road"],
  "Egbeda":        ["Egbeda", "Akobo", "Irepo", "Oremeji"],
  // Ogun State
  "Abeokuta South":["Ita-Oshin", "Adatan", "Kemta", "Oke-Lantoro"],
  "Sagamu":        ["Sagamu I", "Sagamu II", "Remo North"],
  // Edo State
  "Oredo":         ["GRA", "Oka", "Aduwawa", "Oregbeni", "Mission Road"],
  "Egor":          ["Uselu", "Ugbowo", "Ikpoba Hill", "Airport Road"],
  // Cross River
  "Calabar Municipal": ["State Housing", "Watt Market", "Henshaw Town", "Satellite Town", "Big Qua"],
  "Calabar South": ["Edim Otop", "Ikot Ansa", "Diamond Hill"],
  // Akwa Ibom
  "Uyo":           ["Use Offot", "Etim Ekpo", "Idu Layout", "Ewet Housing", "Wellington Bassey Way"],
  // Abia
  "Aba South":     ["Ogbor Hill", "Aba South I", "Aba South II", "Okpu Umuobo"],
  "Aba North":     ["Aba North I", "Aba North II", "Cemetery Road"],
};

// ─── LEAGUES ─────────────────────────────────────────────────────────────────
export const leagues = [
  { id: "pl",         name: "Premier League", country: "England",     flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "#3b0764" },
  { id: "laliga",     name: "La Liga",         country: "Spain",       flag: "🇪🇸",     color: "#c41e3a" },
  { id: "bundesliga", name: "Bundesliga",      country: "Germany",     flag: "🇩🇪",     color: "#d4213d" },
  { id: "seriea",     name: "Serie A",         country: "Italy",       flag: "🇮🇹",     color: "#1a56db" },
  { id: "ligue1",     name: "Ligue 1",         country: "France",      flag: "🇫🇷",     color: "#00529f" },
  { id: "eredivisie", name: "Eredivisie",      country: "Netherlands", flag: "🇳🇱",     color: "#e77d00" },
  { id: "npfl",       name: "NPFL",            country: "Nigeria",     flag: "🇳🇬",     color: "#22c55e" },
  { id: "nnl",        name: "NNL (Div. 2)",    country: "Nigeria",     flag: "🇳🇬",     color: "#f59e0b" },
  { id: "spl",        name: "Saudi Pro League", country: "Saudi Arabia", flag: "🇸🇦",    color: "#16a34a" },
  { id: "mls",        name: "MLS",              country: "USA / Canada", flag: "🇺🇸",    color: "#dc2626" },
];

// ─── EXISTING DATA ────────────────────────────────────────────────────────────

export const liveMatches = [
  {
    id: "m1",
    homeClub: "Man United PH",
    awayClub: "Chelsea Lagos",
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    district: "Port Harcourt",
    venue: "Rumuola Field",
    status: "live",
    homeOwnerDistrict: "Port Harcourt",
    awayOwnerDistrict: "Lagos",
    districtMatches: [
      { district: "Port Harcourt", home: 2, away: 1, status: "live", minute: 67 },
      { district: "Lagos",         home: 0, away: 0, status: "live", minute: 62 },
      { district: "Abuja",         home: 1, away: 2, status: "live", minute: 71 },
      { district: "Warri",         home: 3, away: 0, status: "FT"              },
    ],
    events: [
      { id: "e1", minute: 12, type: "goal",   player: "Chukwu Emeka",   team: "home", assist: "Tunde Bello" },
      { id: "e2", minute: 34, type: "yellow", player: "Rasheed Musa",   team: "away" },
      { id: "e3", minute: 45, type: "goal",   player: "Bisi Adeleke",   team: "away" },
      { id: "e4", minute: 58, type: "goal",   player: "Femi Okonkwo",   team: "home", assist: "Chukwu Emeka" },
      { id: "e5", minute: 67, type: "yellow", player: "Chukwu Emeka",   team: "home" },
    ],
    districtPlayers: {
      "Port Harcourt": {
        home: ["Chukwu Emeka", "Femi Okonkwo", "Tunde Bello", "Segun Lawal", "Kola Adeyemi"],
        away: ["Rasheed Musa", "Bisi Adeleke", "Emeka Eze", "Jide Ojo", "Yemi Adesanya"],
      },
    },
  },
  {
    id: "m2",
    homeClub: "Arsenal Warri",
    awayClub: "Liverpool Enugu",
    homeScore: 1,
    awayScore: 1,
    minute: 45,
    district: "Warri",
    venue: "Effurun Stadium",
    status: "live",
    homeOwnerDistrict: "Warri",
    awayOwnerDistrict: "Enugu",
    districtMatches: [
      { district: "Warri",   home: 1, away: 1, status: "live", minute: 45 },
      { district: "Enugu",   home: 0, away: 2, status: "live", minute: 48 },
      { district: "Calabar", home: 2, away: 0, status: "live", minute: 42 },
    ],
    events: [
      { id: "e6", minute: 22, type: "goal",   player: "Ovie Ejiro",  team: "home" },
      { id: "e7", minute: 39, type: "goal",   player: "Kelechi Ihe", team: "away", assist: "Seun Ojo" },
    ],
    districtPlayers: {
      "Warri": {
        home: ["Ovie Ejiro", "Precious Amata", "Delta Obi", "Rume Efejiro", "Ebuka Chukwu"],
        away: ["Kelechi Ihe", "Seun Ojo", "Onyeka Madu", "Obinna Nze", "Chidi Eze"],
      },
    },
  },
];

export const upcomingMatches = [
  { id: "u1", homeClub: "Tottenham PH",   awayClub: "Barcelona Abuja",  kickoff: "18:00", date: "Today",    slot: "Evening" },
  { id: "u2", homeClub: "Real Madrid NG", awayClub: "Bayern Kano",      kickoff: "20:00", date: "Today",    slot: "Evening" },
  { id: "u3", homeClub: "Juventus Lagos", awayClub: "PSG Delta",        kickoff: "07:00", date: "Tomorrow", slot: "Morning" },
];

export const buzzFeed = [
  { id: "b1", type: "goal",      text: "Chukwu Emeka nets a screamer for Man United PH! ⚽🔥",      time: "2m ago",  district: "Port Harcourt" },
  { id: "b2", type: "rating",    text: "Femi Okonkwo rated 8.9 after brace vs Chelsea Lagos",        time: "5m ago",  district: "Port Harcourt" },
  { id: "b3", type: "goal",      text: "Kelechi Ihe equalises for Liverpool Enugu in Warri clash",   time: "8m ago",  district: "Warri"         },
  { id: "b4", type: "red",       text: "Rasheed Musa sees red — Chelsea Lagos down to 10 men 🟥",   time: "12m ago", district: "Lagos"         },
  { id: "b5", type: "milestone", text: "Arsenal Warri wins 3rd straight — climbing the table 📈",   time: "25m ago", district: "Warri"         },
];

export const standings = [
  { pos: 1, club: "Man United PH",    played: 8, won: 6, drawn: 1, lost: 1, pts: 19, form: ["W","W","D","W","W"] },
  { pos: 2, club: "Arsenal Warri",    played: 8, won: 5, drawn: 2, lost: 1, pts: 17, form: ["W","W","W","D","W"] },
  { pos: 3, club: "Chelsea Lagos",    played: 8, won: 4, drawn: 3, lost: 1, pts: 15, form: ["D","W","L","W","D"] },
  { pos: 4, club: "Liverpool Enugu",  played: 8, won: 4, drawn: 1, lost: 3, pts: 13, form: ["L","W","W","D","L"] },
  { pos: 5, club: "Barcelona Abuja",  played: 8, won: 3, drawn: 2, lost: 3, pts: 11, form: ["L","D","W","L","W"] },
  { pos: 6, club: "Real Madrid NG",   played: 8, won: 3, drawn: 1, lost: 4, pts: 10, form: ["W","L","L","D","L"] },
  { pos: 7, club: "Tottenham PH",     played: 8, won: 2, drawn: 2, lost: 4, pts:  8, form: ["L","L","D","W","L"] },
  { pos: 8, club: "Bayern Kano",      played: 8, won: 1, drawn: 1, lost: 6, pts:  4, form: ["L","L","L","D","L"] },
];

export const topScorers = [
  { rank: 1, name: "Chukwu Emeka",   club: "Man United PH",   goals: 11, assists: 4, rating: 8.4, district: "Port Harcourt" },
  { rank: 2, name: "Femi Okonkwo",   club: "Man United PH",   goals:  9, assists: 3, rating: 8.1, district: "Port Harcourt" },
  { rank: 3, name: "Ovie Ejiro",     club: "Arsenal Warri",   goals:  8, assists: 5, rating: 7.9, district: "Warri"         },
  { rank: 4, name: "Kelechi Ihe",    club: "Liverpool Enugu", goals:  7, assists: 2, rating: 7.6, district: "Enugu"         },
  { rank: 5, name: "Bisi Adeleke",   club: "Chelsea Lagos",   goals:  6, assists: 6, rating: 7.8, district: "Lagos"         },
];

export const playerProfile = {
  name: "Chukwu Emeka",
  position: "ST",
  district: "Port Harcourt",
  club: "Man United PH",
  age: 22,
  rating: 8.4,
  form: "up" as const,
  kitStatus: "pending" as "purchased" | "pending" | "none",
  stats: { goals: 11, assists: 4, yellowCards: 2, redCards: 0, matchesPlayed: 8, avgRating: 8.1 },
  recentMatches: [
    { opponent: "Chelsea Lagos",   result: "W 2-1", rating: 9.2, goals: 2, assists: 0 },
    { opponent: "Arsenal Warri",   result: "D 1-1", rating: 7.4, goals: 1, assists: 0 },
    { opponent: "Liverpool Enugu", result: "W 3-0", rating: 8.8, goals: 1, assists: 2 },
    { opponent: "Barcelona Abuja", result: "W 2-0", rating: 8.0, goals: 1, assists: 1 },
    { opponent: "Bayern Kano",     result: "W 4-1", rating: 7.9, goals: 2, assists: 1 },
  ],
};

export const districts = [
  { id: "ph",  name: "Port Harcourt", activeMatches: 3, players: 142, topClub: "Man United PH",   color: "#22c55e", ownerClub: "Man United PH"   },
  { id: "lg",  name: "Lagos",         activeMatches: 2, players: 198, topClub: "Chelsea Lagos",    color: "#3b82f6", ownerClub: "Chelsea Lagos"    },
  { id: "ab",  name: "Abuja",         activeMatches: 1, players: 87,  topClub: "Barcelona Abuja",  color: "#f59e0b", ownerClub: "Barcelona Abuja"  },
  { id: "wri", name: "Warri",         activeMatches: 2, players: 64,  topClub: "Arsenal Warri",    color: "#ef4444", ownerClub: "Arsenal Warri"    },
  { id: "en",  name: "Enugu",         activeMatches: 1, players: 53,  topClub: "Liverpool Enugu",  color: "#8b5cf6", ownerClub: "Liverpool Enugu"  },
  { id: "ka",  name: "Kano",          activeMatches: 0, players: 41,  topClub: "Bayern Kano",      color: "#64748b", ownerClub: "Bayern Kano"      },
];

// ─── NEW DATA ─────────────────────────────────────────────────────────────────

// All registerable roles
export const roles = [
  { id: "player",   label: "Player",        icon: "⚽", description: "Register, get kitted, and compete in your district matches." },
  { id: "coach",    label: "Coach",         icon: "📋", description: "Train squads, select lineups, vote on jersey assignments." },
  { id: "referee",  label: "Referee",       icon: "🟨", description: "Officiate matches, confirm results, log events on the app." },
  { id: "scout",    label: "Scout",         icon: "🔭", description: "Evaluate players in the academy, vote on jersey selection." },
  { id: "media",    label: "Media / Press", icon: "🎥", description: "Cover matches, report on governance, publish buzz content." },
  { id: "trainer",  label: "Trainer",       icon: "🏋️", description: "Manage player fitness, track conditioning, support coaches." },
  { id: "firstaid", label: "First Aid",     icon: "🏥", description: "On-pitch medical support during academy and season matches." },
  { id: "vendor",   label: "Vendor",        icon: "🛍️", description: "Sell or lend official kits, shoes, and accessories to players." },
  { id: "analyst",  label: "Data Analyst",  icon: "📊", description: "Track stats, produce match reports, support coaching decisions." },
  { id: "manager",  label: "Manager",       icon: "🏢", description: "Run club finances, manage governance, approve transactions." },
  { id: "official", label: "Club Official", icon: "🎖️", description: "Governing body representative — oversee district operations." },
  { id: "fan",      label: "Fan",           icon: "📣", description: "Follow your club, engage with buzz, vote on fan polls." },
];

// Club registry — full divisions, organised by league
export const clubs = [
  // ── Premier League (20 clubs) ─────────────────────────────────────────────
  { id: "arsenal",     leagueId: "pl", name: "Arsenal",        badge: "🔴", ownerDistrict: "Warri",         color: "#ef4444", squadSize: 21, openSlots: 4  },
  { id: "avilla",      leagueId: "pl", name: "Aston Villa",    badge: "🟣", ownerDistrict: "Ibadan",         color: "#7c3aed", squadSize: 14, openSlots: 11 },
  { id: "bournemouth", leagueId: "pl", name: "Bournemouth",    badge: "🔴", ownerDistrict: "Ilorin",         color: "#dc2626", squadSize: 9,  openSlots: 16 },
  { id: "brentford",   leagueId: "pl", name: "Brentford",      badge: "🔴", ownerDistrict: "Abeokuta",       color: "#ef4444", squadSize: 8,  openSlots: 17 },
  { id: "brighton",    leagueId: "pl", name: "Brighton",       badge: "🔵", ownerDistrict: "Calabar",        color: "#1e40af", squadSize: 10, openSlots: 15 },
  { id: "chelsea",     leagueId: "pl", name: "Chelsea",        badge: "🔵", ownerDistrict: "Lagos",           color: "#3b82f6", squadSize: 19, openSlots: 6  },
  { id: "crystal",     leagueId: "pl", name: "Crystal Palace", badge: "🔵", ownerDistrict: "Oshogbo",        color: "#1d4ed8", squadSize: 7,  openSlots: 18 },
  { id: "everton",     leagueId: "pl", name: "Everton",        badge: "🔵", ownerDistrict: "Zaria",           color: "#1d4ed8", squadSize: 11, openSlots: 14 },
  { id: "fulham",      leagueId: "pl", name: "Fulham",         badge: "⚪", ownerDistrict: "Asaba",           color: "#94a3b8", squadSize: 8,  openSlots: 17 },
  { id: "ipswich",     leagueId: "pl", name: "Ipswich Town",   badge: "🔵", ownerDistrict: "Onitsha",        color: "#1d4ed8", squadSize: 6,  openSlots: 19 },
  { id: "leicester",   leagueId: "pl", name: "Leicester City", badge: "🔵", ownerDistrict: "Kaduna",          color: "#1d4ed8", squadSize: 9,  openSlots: 16 },
  { id: "lfc",         leagueId: "pl", name: "Liverpool",      badge: "🔴", ownerDistrict: "Enugu",           color: "#dc2626", squadSize: 18, openSlots: 7  },
  { id: "mancity",     leagueId: "pl", name: "Man City",       badge: "🔵", ownerDistrict: "Kano",            color: "#6ec6ff", squadSize: 20, openSlots: 5  },
  { id: "manutd",      leagueId: "pl", name: "Man United",     badge: "🔴", ownerDistrict: "Port Harcourt",  color: "#ef4444", squadSize: 22, openSlots: 3  },
  { id: "newcastle",   leagueId: "pl", name: "Newcastle Utd",  badge: "⚫", ownerDistrict: "Benin City",     color: "#1e293b", squadSize: 13, openSlots: 12 },
  { id: "nforest",     leagueId: "pl", name: "Nottm Forest",   badge: "🔴", ownerDistrict: "Makurdi",        color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "southampton", leagueId: "pl", name: "Southampton",    badge: "🔴", ownerDistrict: "Uyo",             color: "#ef4444", squadSize: 7,  openSlots: 18 },
  { id: "spurs",       leagueId: "pl", name: "Tottenham",      badge: "⚪", ownerDistrict: "Abuja",           color: "#94a3b8", squadSize: 16, openSlots: 9  },
  { id: "westham",     leagueId: "pl", name: "West Ham",       badge: "🔴", ownerDistrict: "Aba",             color: "#7f1d1d", squadSize: 11, openSlots: 14 },
  { id: "wolves",      leagueId: "pl", name: "Wolves",         badge: "🟡", ownerDistrict: "Jos",             color: "#f59e0b", squadSize: 9,  openSlots: 16 },
  // ── La Liga (20 clubs) ────────────────────────────────────────────────────
  { id: "alaves",      leagueId: "laliga", name: "Alaves",          badge: "🔵", ownerDistrict: "Ondo",       color: "#1d4ed8", squadSize: 5,  openSlots: 20 },
  { id: "athletic",    leagueId: "laliga", name: "Athletic Club",   badge: "🔴", ownerDistrict: "Sokoto",     color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "atletico",    leagueId: "laliga", name: "Atletico Madrid", badge: "🔴", ownerDistrict: "Benin City", color: "#c41e3a", squadSize: 15, openSlots: 10 },
  { id: "barca",       leagueId: "laliga", name: "Barcelona",       badge: "🔵", ownerDistrict: "Abuja",      color: "#1d4ed8", squadSize: 20, openSlots: 5  },
  { id: "betis",       leagueId: "laliga", name: "Real Betis",      badge: "🟢", ownerDistrict: "Ikeja",      color: "#22c55e", squadSize: 7,  openSlots: 18 },
  { id: "celta",       leagueId: "laliga", name: "Celta Vigo",      badge: "🔵", ownerDistrict: "Lafia",      color: "#6ec6ff", squadSize: 6,  openSlots: 19 },
  { id: "espanyol",    leagueId: "laliga", name: "Espanyol",        badge: "🔵", ownerDistrict: "Bauchi",     color: "#3b82f6", squadSize: 5,  openSlots: 20 },
  { id: "getafe",      leagueId: "laliga", name: "Getafe",          badge: "🔵", ownerDistrict: "Yola",       color: "#3b82f6", squadSize: 5,  openSlots: 20 },
  { id: "girona",      leagueId: "laliga", name: "Girona",          badge: "🔴", ownerDistrict: "Ekiti",      color: "#ef4444", squadSize: 7,  openSlots: 18 },
  { id: "laspalmas",   leagueId: "laliga", name: "Las Palmas",      badge: "🟡", ownerDistrict: "Sapele",     color: "#f59e0b", squadSize: 6,  openSlots: 19 },
  { id: "leganes",     leagueId: "laliga", name: "Leganes",         badge: "🔵", ownerDistrict: "Minna",      color: "#3b82f6", squadSize: 5,  openSlots: 20 },
  { id: "mallorca",    leagueId: "laliga", name: "Mallorca",        badge: "🔴", ownerDistrict: "Sagamu",     color: "#dc2626", squadSize: 7,  openSlots: 18 },
  { id: "osasuna",     leagueId: "laliga", name: "Osasuna",         badge: "🔴", ownerDistrict: "Kebbi",      color: "#dc2626", squadSize: 6,  openSlots: 19 },
  { id: "rayo",        leagueId: "laliga", name: "Rayo Vallecano",  badge: "⚪", ownerDistrict: "Nnewi",      color: "#94a3b8", squadSize: 5,  openSlots: 20 },
  { id: "rm",          leagueId: "laliga", name: "Real Madrid",     badge: "⚪", ownerDistrict: "Kaduna",     color: "#94a3b8", squadSize: 17, openSlots: 8  },
  { id: "realsociedad",leagueId: "laliga", name: "Real Sociedad",   badge: "🔵", ownerDistrict: "Akure",      color: "#3b82f6", squadSize: 9,  openSlots: 16 },
  { id: "sevilla",     leagueId: "laliga", name: "Sevilla",         badge: "⚪", ownerDistrict: "Jos",        color: "#e2e8f0", squadSize: 12, openSlots: 13 },
  { id: "valencia",    leagueId: "laliga", name: "Valencia",        badge: "🟡", ownerDistrict: "Warri",      color: "#f59e0b", squadSize: 8,  openSlots: 17 },
  { id: "valladolid",  leagueId: "laliga", name: "Valladolid",      badge: "🟣", ownerDistrict: "Lokoja",     color: "#7c3aed", squadSize: 5,  openSlots: 20 },
  { id: "villarreal",  leagueId: "laliga", name: "Villarreal",      badge: "🟡", ownerDistrict: "Uyo",        color: "#f59e0b", squadSize: 10, openSlots: 15 },
  // ── Bundesliga (18 clubs) ─────────────────────────────────────────────────
  { id: "augsburg",    leagueId: "bundesliga", name: "Augsburg",            badge: "🔴", ownerDistrict: "Kafanchan",   color: "#dc2626", squadSize: 6,  openSlots: 19 },
  { id: "bayern",      leagueId: "bundesliga", name: "Bayern Munich",       badge: "🔴", ownerDistrict: "Sokoto",      color: "#dc2626", squadSize: 15, openSlots: 10 },
  { id: "bochum",      leagueId: "bundesliga", name: "Bochum",              badge: "🔵", ownerDistrict: "Eket",        color: "#1d4ed8", squadSize: 5,  openSlots: 20 },
  { id: "dortmund",    leagueId: "bundesliga", name: "Dortmund",            badge: "🟡", ownerDistrict: "Maiduguri",   color: "#f59e0b", squadSize: 16, openSlots: 9  },
  { id: "frankfurt",   leagueId: "bundesliga", name: "Eintracht Frankfurt", badge: "⚫", ownerDistrict: "Gboko",       color: "#1e293b", squadSize: 10, openSlots: 15 },
  { id: "freiburg",    leagueId: "bundesliga", name: "Freiburg",            badge: "🔴", ownerDistrict: "Asaba",       color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "gladbach",    leagueId: "bundesliga", name: "M'gladbach",          badge: "⚫", ownerDistrict: "Ogbomosho",   color: "#1e293b", squadSize: 9,  openSlots: 16 },
  { id: "heidenheim",  leagueId: "bundesliga", name: "Heidenheim",          badge: "🔴", ownerDistrict: "Otukpo",      color: "#dc2626", squadSize: 5,  openSlots: 20 },
  { id: "hoffenheim",  leagueId: "bundesliga", name: "Hoffenheim",          badge: "🔵", ownerDistrict: "Gusau",       color: "#3b82f6", squadSize: 7,  openSlots: 18 },
  { id: "kiel",        leagueId: "bundesliga", name: "Holstein Kiel",       badge: "🔵", ownerDistrict: "Damaturu",    color: "#1d4ed8", squadSize: 5,  openSlots: 20 },
  { id: "leipzig",     leagueId: "bundesliga", name: "RB Leipzig",          badge: "🔴", ownerDistrict: "Makurdi",     color: "#dc2626", squadSize: 11, openSlots: 14 },
  { id: "leverkusen",  leagueId: "bundesliga", name: "Leverkusen",          badge: "🔴", ownerDistrict: "Calabar",     color: "#ef4444", squadSize: 14, openSlots: 11 },
  { id: "mainz",       leagueId: "bundesliga", name: "Mainz",               badge: "🔴", ownerDistrict: "Aba",         color: "#dc2626", squadSize: 7,  openSlots: 18 },
  { id: "stpauli",     leagueId: "bundesliga", name: "St. Pauli",           badge: "🔴", ownerDistrict: "Sapele",      color: "#7f1d1d", squadSize: 6,  openSlots: 19 },
  { id: "stuttgart",   leagueId: "bundesliga", name: "Stuttgart",           badge: "🔴", ownerDistrict: "Abeokuta",    color: "#dc2626", squadSize: 10, openSlots: 15 },
  { id: "unionberlin", leagueId: "bundesliga", name: "Union Berlin",        badge: "🔴", ownerDistrict: "Nnewi",       color: "#dc2626", squadSize: 7,  openSlots: 18 },
  { id: "werder",      leagueId: "bundesliga", name: "Werder Bremen",       badge: "🟢", ownerDistrict: "Akure",       color: "#22c55e", squadSize: 9,  openSlots: 16 },
  { id: "wolfsburg",   leagueId: "bundesliga", name: "Wolfsburg",           badge: "🟢", ownerDistrict: "Ilorin",      color: "#22c55e", squadSize: 8,  openSlots: 17 },
  // ── Serie A (20 clubs) ────────────────────────────────────────────────────
  { id: "acmilan",     leagueId: "seriea", name: "AC Milan",       badge: "🔴", ownerDistrict: "Warri North",    color: "#ef4444", squadSize: 13, openSlots: 12 },
  { id: "atalanta",    leagueId: "seriea", name: "Atalanta",       badge: "🔵", ownerDistrict: "Zaria",           color: "#3b82f6", squadSize: 12, openSlots: 13 },
  { id: "bologna",     leagueId: "seriea", name: "Bologna",        badge: "🔴", ownerDistrict: "Onitsha",        color: "#dc2626", squadSize: 9,  openSlots: 16 },
  { id: "cagliari",    leagueId: "seriea", name: "Cagliari",       badge: "🔴", ownerDistrict: "Gombe",          color: "#dc2626", squadSize: 6,  openSlots: 19 },
  { id: "como",        leagueId: "seriea", name: "Como",           badge: "🔵", ownerDistrict: "Ogbomosho",      color: "#3b82f6", squadSize: 5,  openSlots: 20 },
  { id: "empoli",      leagueId: "seriea", name: "Empoli",         badge: "🔵", ownerDistrict: "Okene",          color: "#3b82f6", squadSize: 5,  openSlots: 20 },
  { id: "fiorentina",  leagueId: "seriea", name: "Fiorentina",     badge: "🟣", ownerDistrict: "Oshogbo",        color: "#7c3aed", squadSize: 10, openSlots: 15 },
  { id: "genoa",       leagueId: "seriea", name: "Genoa",          badge: "🔴", ownerDistrict: "Ekiti",          color: "#dc2626", squadSize: 7,  openSlots: 18 },
  { id: "inter",       leagueId: "seriea", name: "Inter Milan",    badge: "🔵", ownerDistrict: "Owerri",         color: "#3b82f6", squadSize: 15, openSlots: 10 },
  { id: "juventus",    leagueId: "seriea", name: "Juventus",       badge: "⚫", ownerDistrict: "Lagos",          color: "#1e293b", squadSize: 14, openSlots: 11 },
  { id: "lazio",       leagueId: "seriea", name: "Lazio",          badge: "🔵", ownerDistrict: "Kaduna",          color: "#6ec6ff", squadSize: 11, openSlots: 14 },
  { id: "lecce",       leagueId: "seriea", name: "Lecce",          badge: "🟡", ownerDistrict: "Bauchi",          color: "#f59e0b", squadSize: 6,  openSlots: 19 },
  { id: "monza",       leagueId: "seriea", name: "Monza",          badge: "🔴", ownerDistrict: "Wukari",          color: "#dc2626", squadSize: 5,  openSlots: 20 },
  { id: "napoli",      leagueId: "seriea", name: "Napoli",         badge: "🔵", ownerDistrict: "Aba",             color: "#1d4ed8", squadSize: 11, openSlots: 14 },
  { id: "parma",       leagueId: "seriea", name: "Parma",          badge: "🟡", ownerDistrict: "Lafia",           color: "#f59e0b", squadSize: 6,  openSlots: 19 },
  { id: "roma",        leagueId: "seriea", name: "AS Roma",        badge: "🔴", ownerDistrict: "Enugu",           color: "#c41e3a", squadSize: 9,  openSlots: 16 },
  { id: "torino",      leagueId: "seriea", name: "Torino",         badge: "🔴", ownerDistrict: "Lokoja",          color: "#7f1d1d", squadSize: 8,  openSlots: 17 },
  { id: "udinese",     leagueId: "seriea", name: "Udinese",        badge: "⚫", ownerDistrict: "Minna",           color: "#1e293b", squadSize: 7,  openSlots: 18 },
  { id: "venezia",     leagueId: "seriea", name: "Venezia",        badge: "🟠", ownerDistrict: "Gboko",           color: "#f97316", squadSize: 5,  openSlots: 20 },
  { id: "verona",      leagueId: "seriea", name: "Hellas Verona",  badge: "🔵", ownerDistrict: "Ondo",            color: "#1d4ed8", squadSize: 6,  openSlots: 19 },
  // ── Ligue 1 (18 clubs) ───────────────────────────────────────────────────
  { id: "angers",      leagueId: "ligue1", name: "Angers",          badge: "⚫", ownerDistrict: "Okigwe",         color: "#1e293b", squadSize: 5,  openSlots: 20 },
  { id: "auxerre",     leagueId: "ligue1", name: "Auxerre",         badge: "🔵", ownerDistrict: "Orlu",            color: "#1d4ed8", squadSize: 6,  openSlots: 19 },
  { id: "brest",       leagueId: "ligue1", name: "Brest",           badge: "🔴", ownerDistrict: "Nnewi",           color: "#dc2626", squadSize: 9,  openSlots: 16 },
  { id: "lehavre",     leagueId: "ligue1", name: "Le Havre",        badge: "🔵", ownerDistrict: "Otukpo",          color: "#1d4ed8", squadSize: 5,  openSlots: 20 },
  { id: "lens",        leagueId: "ligue1", name: "Lens",            badge: "🟡", ownerDistrict: "Gusau",           color: "#f59e0b", squadSize: 8,  openSlots: 17 },
  { id: "lille",       leagueId: "ligue1", name: "Lille",           badge: "🔴", ownerDistrict: "Birnin Kebbi",    color: "#dc2626", squadSize: 11, openSlots: 14 },
  { id: "lyon",        leagueId: "ligue1", name: "Lyon",            badge: "🔵", ownerDistrict: "Ibadan",          color: "#06b6d4", squadSize: 10, openSlots: 15 },
  { id: "marseille",   leagueId: "ligue1", name: "Marseille",       badge: "⚪", ownerDistrict: "Uyo",             color: "#94a3b8", squadSize: 11, openSlots: 14 },
  { id: "monaco",      leagueId: "ligue1", name: "Monaco",          badge: "🔴", ownerDistrict: "Abeokuta",        color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "montpellier", leagueId: "ligue1", name: "Montpellier",     badge: "🔵", ownerDistrict: "Damaturu",        color: "#3b82f6", squadSize: 5,  openSlots: 20 },
  { id: "nantes",      leagueId: "ligue1", name: "Nantes",          badge: "🟡", ownerDistrict: "Asaba",           color: "#f59e0b", squadSize: 7,  openSlots: 18 },
  { id: "nice",        leagueId: "ligue1", name: "Nice",            badge: "🔴", ownerDistrict: "Iseyin",          color: "#dc2626", squadSize: 9,  openSlots: 16 },
  { id: "psg",         leagueId: "ligue1", name: "PSG",             badge: "🔵", ownerDistrict: "Delta",           color: "#1d4ed8", squadSize: 12, openSlots: 13 },
  { id: "reims",       leagueId: "ligue1", name: "Reims",           badge: "🔴", ownerDistrict: "Kafanchan",       color: "#dc2626", squadSize: 6,  openSlots: 19 },
  { id: "rennes",      leagueId: "ligue1", name: "Rennes",          badge: "🔴", ownerDistrict: "Ogoja",           color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "saintetienne",leagueId: "ligue1", name: "Saint-Etienne",   badge: "🟢", ownerDistrict: "Abeokuta",        color: "#22c55e", squadSize: 6,  openSlots: 19 },
  { id: "strasbourg",  leagueId: "ligue1", name: "Strasbourg",      badge: "🔵", ownerDistrict: "Yola",            color: "#3b82f6", squadSize: 7,  openSlots: 18 },
  { id: "toulouse",    leagueId: "ligue1", name: "Toulouse",        badge: "🟣", ownerDistrict: "Sagamu",          color: "#7c3aed", squadSize: 7,  openSlots: 18 },
  // ── Eredivisie (18 clubs) ─────────────────────────────────────────────────
  { id: "ajax",        leagueId: "eredivisie", name: "Ajax",              badge: "⚪", ownerDistrict: "Yola",        color: "#e2e8f0", squadSize: 9,  openSlots: 16 },
  { id: "almere",      leagueId: "eredivisie", name: "Almere City",       badge: "🔴", ownerDistrict: "Biu",         color: "#ef4444", squadSize: 5,  openSlots: 20 },
  { id: "azalkmaar",   leagueId: "eredivisie", name: "AZ Alkmaar",        badge: "🔴", ownerDistrict: "Kafanchan",   color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "cambuur",     leagueId: "eredivisie", name: "SC Cambuur",        badge: "🟡", ownerDistrict: "Otukpo",      color: "#f59e0b", squadSize: 5,  openSlots: 20 },
  { id: "fctwente",    leagueId: "eredivisie", name: "FC Twente",         badge: "🔴", ownerDistrict: "Ogbomosho",   color: "#dc2626", squadSize: 10, openSlots: 15 },
  { id: "feyenoord",   leagueId: "eredivisie", name: "Feyenoord",         badge: "🔴", ownerDistrict: "Ilorin",      color: "#dc2626", squadSize: 11, openSlots: 14 },
  { id: "goahead",     leagueId: "eredivisie", name: "Go Ahead Eagles",   badge: "🟡", ownerDistrict: "Birnin Kebbi",color: "#f59e0b", squadSize: 5,  openSlots: 20 },
  { id: "groningen",   leagueId: "eredivisie", name: "Groningen",         badge: "🟢", ownerDistrict: "Lokoja",      color: "#22c55e", squadSize: 6,  openSlots: 19 },
  { id: "heerenveen",  leagueId: "eredivisie", name: "Heerenveen",        badge: "🔵", ownerDistrict: "Gombe",       color: "#1d4ed8", squadSize: 7,  openSlots: 18 },
  { id: "heracles",    leagueId: "eredivisie", name: "Heracles",          badge: "⚫", ownerDistrict: "Wukari",      color: "#1e293b", squadSize: 5,  openSlots: 20 },
  { id: "nacbreda",    leagueId: "eredivisie", name: "NAC Breda",         badge: "🟡", ownerDistrict: "Okene",       color: "#f59e0b", squadSize: 5,  openSlots: 20 },
  { id: "nec",         leagueId: "eredivisie", name: "NEC Nijmegen",      badge: "🔴", ownerDistrict: "Ogbomosho",   color: "#dc2626", squadSize: 6,  openSlots: 19 },
  { id: "psv",         leagueId: "eredivisie", name: "PSV Eindhoven",     badge: "🔴", ownerDistrict: "Kano",        color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "rkc",         leagueId: "eredivisie", name: "RKC Waalwijk",      badge: "🟡", ownerDistrict: "Iseyin",      color: "#f59e0b", squadSize: 5,  openSlots: 20 },
  { id: "sparta",      leagueId: "eredivisie", name: "Sparta Rotterdam",  badge: "🔴", ownerDistrict: "Asaba",       color: "#dc2626", squadSize: 6,  openSlots: 19 },
  { id: "utrecht",     leagueId: "eredivisie", name: "Utrecht",           badge: "🔴", ownerDistrict: "Gboko",       color: "#dc2626", squadSize: 7,  openSlots: 18 },
  { id: "willemii",    leagueId: "eredivisie", name: "Willem II",         badge: "🔴", ownerDistrict: "Kebbi",       color: "#dc2626", squadSize: 5,  openSlots: 20 },
  { id: "zwolle",      leagueId: "eredivisie", name: "PEC Zwolle",        badge: "🔵", ownerDistrict: "Orlu",        color: "#3b82f6", squadSize: 5,  openSlots: 20 },
  // ── NPFL — Nigeria Professional Football League (20 clubs) ───────────────
  { id: "enyimba",     leagueId: "npfl", name: "Enyimba FC",          badge: "🟢", ownerDistrict: "Aba",           color: "#22c55e", squadSize: 16, openSlots: 9  },
  { id: "kanopillars", leagueId: "npfl", name: "Kano Pillars",        badge: "🟢", ownerDistrict: "Kano",          color: "#22c55e", squadSize: 14, openSlots: 11 },
  { id: "riversunited",leagueId: "npfl", name: "Rivers United",       badge: "🔵", ownerDistrict: "Port Harcourt", color: "#1d4ed8", squadSize: 18, openSlots: 7  },
  { id: "sunshine",    leagueId: "npfl", name: "Sunshine Stars",      badge: "🟡", ownerDistrict: "Akure",         color: "#f59e0b", squadSize: 13, openSlots: 12 },
  { id: "heartland",   leagueId: "npfl", name: "Heartland FC",        badge: "🔴", ownerDistrict: "Owerri",        color: "#dc2626", squadSize: 15, openSlots: 10 },
  { id: "insurance",   leagueId: "npfl", name: "Bendel Insurance",    badge: "🟢", ownerDistrict: "Benin City",    color: "#22c55e", squadSize: 12, openSlots: 13 },
  { id: "plateau",     leagueId: "npfl", name: "Plateau United",      badge: "🔵", ownerDistrict: "Jos",           color: "#1d4ed8", squadSize: 14, openSlots: 11 },
  { id: "lobistars",   leagueId: "npfl", name: "Lobi Stars",          badge: "🟡", ownerDistrict: "Makurdi",       color: "#f59e0b", squadSize: 11, openSlots: 14 },
  { id: "wikki",       leagueId: "npfl", name: "Wikki Tourists",      badge: "🟢", ownerDistrict: "Bauchi",        color: "#22c55e", squadSize: 9,  openSlots: 16 },
  { id: "elkanemi",    leagueId: "npfl", name: "El-Kanemi Warriors",  badge: "⚫", ownerDistrict: "Maiduguri",     color: "#1e293b", squadSize: 10, openSlots: 15 },
  { id: "shooting",    leagueId: "npfl", name: "Shooting Stars SC",   badge: "🟡", ownerDistrict: "Ibadan",        color: "#f59e0b", squadSize: 13, openSlots: 12 },
  { id: "kwaraunited", leagueId: "npfl", name: "Kwara United",        badge: "🔴", ownerDistrict: "Ilorin",        color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "dakkada",     leagueId: "npfl", name: "Dakkada FC",          badge: "🟣", ownerDistrict: "Uyo",           color: "#7c3aed", squadSize: 7,  openSlots: 18 },
  { id: "nasarawa",    leagueId: "npfl", name: "Nasarawa United",     badge: "🟢", ownerDistrict: "Lafia",         color: "#22c55e", squadSize: 10, openSlots: 15 },
  { id: "akwaunited",  leagueId: "npfl", name: "Akwa United",         badge: "🔵", ownerDistrict: "Uyo",           color: "#3b82f6", squadSize: 11, openSlots: 14 },
  { id: "gombeunited", leagueId: "npfl", name: "Gombe United",        badge: "🔴", ownerDistrict: "Gombe",         color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "remostars",   leagueId: "npfl", name: "Remo Stars",          badge: "🔵", ownerDistrict: "Sagamu",        color: "#1d4ed8", squadSize: 12, openSlots: 13 },
  { id: "nigertor",    leagueId: "npfl", name: "Niger Tornadoes",     badge: "🔴", ownerDistrict: "Minna",         color: "#dc2626", squadSize: 8,  openSlots: 17 },
  { id: "bayelsaunited",leagueId: "npfl", name: "Bayelsa United",     badge: "🔵", ownerDistrict: "Yenagoa",       color: "#3b82f6", squadSize: 9,  openSlots: 16 },
  { id: "ifeanyi",     leagueId: "npfl", name: "FC Ifeanyi Ubah",     badge: "🟡", ownerDistrict: "Nnewi",         color: "#f59e0b", squadSize: 7,  openSlots: 18 },
  // ── NNL — Nigeria National League / Division 2 (16 clubs) ────────────────
  { id: "abujafc",     leagueId: "nnl", name: "Abuja FC",             badge: "🔵", ownerDistrict: "Abuja",         color: "#3b82f6", squadSize: 8,  openSlots: 17 },
  { id: "adamawa",     leagueId: "nnl", name: "Adamawa United",       badge: "🟢", ownerDistrict: "Yola",          color: "#22c55e", squadSize: 7,  openSlots: 18 },
  { id: "akalites",    leagueId: "nnl", name: "Akalites FC",          badge: "🔴", ownerDistrict: "Abakaliki",     color: "#ef4444", squadSize: 5,  openSlots: 20 },
  { id: "angles",      leagueId: "nnl", name: "Angles FC",            badge: "🟡", ownerDistrict: "Awka",          color: "#f59e0b", squadSize: 5,  openSlots: 20 },
  { id: "crowborough", leagueId: "nnl", name: "Crown FC",             badge: "🟣", ownerDistrict: "Ogbomosho",     color: "#7c3aed", squadSize: 6,  openSlots: 19 },
  { id: "dynamofc",    leagueId: "nnl", name: "Dynamo FC",            badge: "🔵", ownerDistrict: "Okene",         color: "#1d4ed8", squadSize: 5,  openSlots: 20 },
  { id: "edofc",       leagueId: "nnl", name: "Edo Queens",           badge: "🟢", ownerDistrict: "Benin City",    color: "#22c55e", squadSize: 7,  openSlots: 18 },
  { id: "ekitiutd",    leagueId: "nnl", name: "Ekiti United",         badge: "🔴", ownerDistrict: "Ekiti",         color: "#dc2626", squadSize: 6,  openSlots: 19 },
  { id: "gaborone",    leagueId: "nnl", name: "Gateway FC",           badge: "🟢", ownerDistrict: "Abeokuta",      color: "#22c55e", squadSize: 7,  openSlots: 18 },
  { id: "gbonganutd",  leagueId: "nnl", name: "Osun United",          badge: "🟡", ownerDistrict: "Oshogbo",       color: "#f59e0b", squadSize: 6,  openSlots: 19 },
  { id: "idealfc",     leagueId: "nnl", name: "Ideal FC",             badge: "🔴", ownerDistrict: "Calabar",       color: "#ef4444", squadSize: 5,  openSlots: 20 },
  { id: "jigawafc",    leagueId: "nnl", name: "Jigawa Golden Stars",  badge: "🟡", ownerDistrict: "Dutse",         color: "#f59e0b", squadSize: 7,  openSlots: 18 },
  { id: "kogi",        leagueId: "nnl", name: "Kogi United",          badge: "🔴", ownerDistrict: "Lokoja",        color: "#dc2626", squadSize: 6,  openSlots: 19 },
  { id: "lasgidi",     leagueId: "nnl", name: "Lagos City FC",        badge: "🔵", ownerDistrict: "Surulere",      color: "#3b82f6", squadSize: 9,  openSlots: 16 },
  { id: "niger",       leagueId: "nnl", name: "Niger United",         badge: "🟢", ownerDistrict: "Minna",         color: "#22c55e", squadSize: 6,  openSlots: 19 },
  { id: "riverstars",  leagueId: "nnl", name: "Rivers Stars",         badge: "🔴", ownerDistrict: "Obio-Akpor",    color: "#ef4444", squadSize: 8,  openSlots: 17 },

  // ── Saudi Pro League ──────────────────────────────────────────────────────
  { id: "alhilal",     leagueId: "spl", name: "Al-Hilal",             badge: "🔵", ownerDistrict: "Riyadh",        color: "#1d4ed8", squadSize: 6,  openSlots: 19 },
  { id: "alnassr",     leagueId: "spl", name: "Al-Nassr",             badge: "🟡", ownerDistrict: "Riyadh",        color: "#f59e0b", squadSize: 8,  openSlots: 17 },
  { id: "alittihad",   leagueId: "spl", name: "Al-Ittihad",           badge: "🟡", ownerDistrict: "Jeddah",        color: "#eab308", squadSize: 7,  openSlots: 18 },
  { id: "alahli",      leagueId: "spl", name: "Al-Ahli",              badge: "🟢", ownerDistrict: "Jeddah",        color: "#16a34a", squadSize: 6,  openSlots: 19 },
  { id: "alqadsiah",   leagueId: "spl", name: "Al-Qadsiah",           badge: "🔵", ownerDistrict: "Al-Khobar",     color: "#3b82f6", squadSize: 5,  openSlots: 20 },
  { id: "alshabab",    leagueId: "spl", name: "Al-Shabab",            badge: "🔴", ownerDistrict: "Riyadh",        color: "#dc2626", squadSize: 5,  openSlots: 20 },
  { id: "alfayha",     leagueId: "spl", name: "Al-Fayha",             badge: "🟢", ownerDistrict: "Al-Ahsa",       color: "#22c55e", squadSize: 4,  openSlots: 21 },
  { id: "alfateh",     leagueId: "spl", name: "Al-Fateh",             badge: "🔵", ownerDistrict: "Al-Ahsa",       color: "#1d4ed8", squadSize: 5,  openSlots: 20 },
  { id: "altaawoun",   leagueId: "spl", name: "Al-Taawoun",           badge: "🟡", ownerDistrict: "Buraidah",      color: "#f59e0b", squadSize: 4,  openSlots: 21 },
  { id: "alraed",      leagueId: "spl", name: "Al-Raed",              badge: "🟢", ownerDistrict: "Buraidah",      color: "#16a34a", squadSize: 4,  openSlots: 21 },
  { id: "damacfc",     leagueId: "spl", name: "Damac FC",             badge: "🔵", ownerDistrict: "Khamis Mushait", color: "#6366f1", squadSize: 4, openSlots: 21 },
  { id: "alriyadh",    leagueId: "spl", name: "Al-Riyadh",            badge: "🔵", ownerDistrict: "Riyadh",        color: "#2563eb", squadSize: 4,  openSlots: 21 },
  { id: "alkhaleej",   leagueId: "spl", name: "Al-Khaleej",           badge: "🔵", ownerDistrict: "Al-Khobar",     color: "#0ea5e9", squadSize: 4,  openSlots: 21 },
  { id: "alettifaq",   leagueId: "spl", name: "Al-Ettifaq",           badge: "🔵", ownerDistrict: "Dammam",        color: "#0284c7", squadSize: 5,  openSlots: 20 },
  { id: "alwehda",     leagueId: "spl", name: "Al-Wehda",             badge: "🟢", ownerDistrict: "Mecca",         color: "#22c55e", squadSize: 4,  openSlots: 21 },
  { id: "alakhdoud",   leagueId: "spl", name: "Al-Akhdoud",           badge: "🟢", ownerDistrict: "Al-Khobar",     color: "#15803d", squadSize: 3,  openSlots: 22 },
  { id: "abhaclub",    leagueId: "spl", name: "Abha Club",            badge: "🔵", ownerDistrict: "Abha",          color: "#4f46e5", squadSize: 3,  openSlots: 22 },
  { id: "alhazm",      leagueId: "spl", name: "Al-Hazm",              badge: "🔴", ownerDistrict: "Ar-Rass",       color: "#ef4444", squadSize: 3,  openSlots: 22 },

  // ── MLS ───────────────────────────────────────────────────────────────────
  { id: "intermiami",  leagueId: "mls", name: "Inter Miami CF",       badge: "🩷", ownerDistrict: "Miami",         color: "#f43f5e", squadSize: 9,  openSlots: 16 },
  { id: "lagalaxy",    leagueId: "mls", name: "LA Galaxy",            badge: "🔵", ownerDistrict: "Los Angeles",   color: "#1d4ed8", squadSize: 7,  openSlots: 18 },
  { id: "lafc",        leagueId: "mls", name: "LAFC",                 badge: "⚫", ownerDistrict: "Los Angeles",   color: "#111827", squadSize: 7,  openSlots: 18 },
  { id: "seattle",     leagueId: "mls", name: "Seattle Sounders",     badge: "🟢", ownerDistrict: "Seattle",       color: "#16a34a", squadSize: 6,  openSlots: 19 },
  { id: "atlantautd",  leagueId: "mls", name: "Atlanta United",       badge: "🔴", ownerDistrict: "Atlanta",       color: "#dc2626", squadSize: 6,  openSlots: 19 },
  { id: "nycfc",       leagueId: "mls", name: "NYCFC",                badge: "🔵", ownerDistrict: "New York",      color: "#6366f1", squadSize: 6,  openSlots: 19 },
  { id: "nyredbulls",  leagueId: "mls", name: "NY Red Bulls",         badge: "🔴", ownerDistrict: "New Jersey",    color: "#ef4444", squadSize: 5,  openSlots: 20 },
  { id: "phillyunion", leagueId: "mls", name: "Philadelphia Union",   badge: "🔵", ownerDistrict: "Philadelphia",  color: "#1e40af", squadSize: 5,  openSlots: 20 },
  { id: "fccincinnati",leagueId: "mls", name: "FC Cincinnati",        badge: "🔵", ownerDistrict: "Cincinnati",    color: "#2563eb", squadSize: 5,  openSlots: 20 },
  { id: "columbus",    leagueId: "mls", name: "Columbus Crew",        badge: "🟡", ownerDistrict: "Columbus",      color: "#eab308", squadSize: 5,  openSlots: 20 },
  { id: "portland",    leagueId: "mls", name: "Portland Timbers",     badge: "🟢", ownerDistrict: "Portland",      color: "#16a34a", squadSize: 5,  openSlots: 20 },
  { id: "sportingkc",  leagueId: "mls", name: "Sporting KC",          badge: "🔵", ownerDistrict: "Kansas City",   color: "#1d4ed8", squadSize: 5,  openSlots: 20 },
  { id: "austinfc",    leagueId: "mls", name: "Austin FC",            badge: "🟢", ownerDistrict: "Austin",        color: "#15803d", squadSize: 4,  openSlots: 21 },
  { id: "nashville",   leagueId: "mls", name: "Nashville SC",         badge: "🟡", ownerDistrict: "Nashville",     color: "#ca8a04", squadSize: 4,  openSlots: 21 },
  { id: "chicagofire", leagueId: "mls", name: "Chicago Fire",         badge: "🔴", ownerDistrict: "Chicago",       color: "#dc2626", squadSize: 4,  openSlots: 21 },
  { id: "dcunited",    leagueId: "mls", name: "D.C. United",          badge: "⚫", ownerDistrict: "Washington DC", color: "#374151", squadSize: 4,  openSlots: 21 },
  { id: "orlandocity", leagueId: "mls", name: "Orlando City",         badge: "🟣", ownerDistrict: "Orlando",       color: "#7c3aed", squadSize: 4,  openSlots: 21 },
  { id: "newengland",  leagueId: "mls", name: "New England Revolution",badge: "🔵", ownerDistrict: "Boston",       color: "#1e3a8a", squadSize: 4,  openSlots: 21 },
  { id: "coloradorp",  leagueId: "mls", name: "Colorado Rapids",      badge: "🔴", ownerDistrict: "Denver",        color: "#b91c1c", squadSize: 3,  openSlots: 22 },
  { id: "fcdallas",    leagueId: "mls", name: "FC Dallas",            badge: "🔴", ownerDistrict: "Dallas",        color: "#dc2626", squadSize: 3,  openSlots: 22 },
  { id: "houston",     leagueId: "mls", name: "Houston Dynamo",       badge: "🟠", ownerDistrict: "Houston",       color: "#ea580c", squadSize: 4,  openSlots: 21 },
  { id: "minnesota",   leagueId: "mls", name: "Minnesota United",     badge: "🔵", ownerDistrict: "Minneapolis",   color: "#1d4ed8", squadSize: 3,  openSlots: 22 },
  { id: "rsl",         leagueId: "mls", name: "Real Salt Lake",       badge: "🔴", ownerDistrict: "Salt Lake City", color: "#b91c1c", squadSize: 3, openSlots: 22 },
  { id: "sanjose",     leagueId: "mls", name: "San Jose Earthquakes", badge: "🔵", ownerDistrict: "San Jose",      color: "#1d4ed8", squadSize: 3,  openSlots: 22 },
  { id: "charlottefc", leagueId: "mls", name: "Charlotte FC",         badge: "🔵", ownerDistrict: "Charlotte",     color: "#1e40af", squadSize: 3,  openSlots: 22 },
  { id: "torontofc",   leagueId: "mls", name: "Toronto FC",           badge: "🔴", ownerDistrict: "Toronto",       color: "#dc2626", squadSize: 3,  openSlots: 22 },
  { id: "vancouver",   leagueId: "mls", name: "Vancouver Whitecaps",  badge: "🔵", ownerDistrict: "Vancouver",     color: "#2563eb", squadSize: 3,  openSlots: 22 },
  { id: "cfmontreal",  leagueId: "mls", name: "CF Montréal",          badge: "🔵", ownerDistrict: "Montreal",      color: "#1d4ed8", squadSize: 3,  openSlots: 22 },
  { id: "stlouis",     leagueId: "mls", name: "St. Louis City SC",    badge: "🔵", ownerDistrict: "St. Louis",     color: "#3b82f6", squadSize: 3,  openSlots: 22 },
];

// Club applicants (players who applied for a jersey)
export const clubApplicants = [
  { id: "a1", clubId: "manutd", name: "Tunde Williams",  position: "ST",  district: "Port Harcourt", path: "academy",  age: 20, rating: 7.8, votes: { scouts: 4, coaches: 3, media: 2, managers: 1 }, status: "voting" },
  { id: "a2", clubId: "manutd", name: "Biodun Afolabi",  position: "CM",  district: "Lagos",         path: "transfer", age: 24, rating: 8.1, votes: { scouts: 5, coaches: 4, media: 3, managers: 2 }, status: "voting" },
  { id: "a3", clubId: "manutd", name: "Emeka Nwosu",     position: "CB",  district: "Port Harcourt", path: "academy",  age: 21, rating: 7.2, votes: { scouts: 2, coaches: 2, media: 1, managers: 0 }, status: "voting" },
  { id: "a4", clubId: "chelsea",name: "Segun Adeyemi",   position: "LW",  district: "Lagos",         path: "academy",  age: 19, rating: 7.5, votes: { scouts: 3, coaches: 2, media: 2, managers: 1 }, status: "voting" },
];

// District ownership map
export const districtOwnership: Record<string, string> = {
  "Port Harcourt": "Man United PH",
  "Lagos":         "Chelsea Lagos",
  "Warri":         "Arsenal Warri",
  "Enugu":         "Liverpool Enugu",
  "Abuja":         "Barcelona Abuja",
  "Kano":          "Bayern Kano",
};

// Season state
export const seasonState = {
  phase: "full_season" as "preseason" | "full_season",
  week: 9,
  matchday: 9,
  totalWeeks: 38,
  preseasonWeeks: 8,
  schedule: "Premier League 2025/26",
};

// Preseason elimination bracket
export const eliminationBracket = [
  { round: "Round 1", matches: [
    { home: "Man United", away: "Juventus",  result: "W 2-0", winner: "Man United", eliminated: "Juventus"  },
    { home: "Chelsea",    away: "PSG",       result: "W 3-1", winner: "Chelsea",    eliminated: "PSG"       },
    { home: "Arsenal",    away: "AC Milan",  result: "W 1-0", winner: "Arsenal",    eliminated: "AC Milan"  },
    { home: "Liverpool",  away: "Atletico",  result: "W 2-1", winner: "Liverpool",  eliminated: "Atletico"  },
  ]},
  { round: "Round 2", matches: [
    { home: "Barcelona",  away: "Dortmund",  result: "W 4-2", winner: "Barcelona",  eliminated: "Dortmund"  },
    { home: "Real Madrid",away: "Porto",     result: "W 2-0", winner: "Real Madrid",eliminated: "Porto"     },
    { home: "Tottenham",  away: "Sevilla",   result: "W 1-0", winner: "Tottenham",  eliminated: "Sevilla"   },
    { home: "Bayern",     away: "Napoli",    result: "W 3-0", winner: "Bayern",     eliminated: "Napoli"    },
  ]},
];

// Eliminated teams
export const eliminatedClubs = ["Juventus", "PSG", "AC Milan", "Atletico", "Dortmund", "Porto", "Sevilla", "Napoli"];

// Vendors
export const vendorList = [
  {
    id: "v1", name: "Oga Kits PH", district: "Port Harcourt", type: "sell" as const,
    rating: 4.8, verified: true, products: [
      { name: "Full Kit Pack",    price: 8500,  category: "kit"   },
      { name: "Jersey Only",      price: 4000,  category: "kit"   },
      { name: "Football Boots",   price: 6500,  category: "shoes" },
      { name: "Training Shorts",  price: 1500,  category: "kit"   },
    ],
  },
  {
    id: "v2", name: "Lagos Sports Hub", district: "Lagos", type: "sell" as const,
    rating: 4.6, verified: true, products: [
      { name: "Full Kit Pack",   price: 8000,  category: "kit"  },
      { name: "Goalkeeper Kit",  price: 9500,  category: "kit"  },
      { name: "Shin Guards",     price: 1200,  category: "accessories" },
    ],
  },
  {
    id: "v3", name: "Lend-A-Boot Warri", district: "Warri", type: "lend" as const,
    rating: 4.3, verified: true, products: [
      { name: "Boots (per match)", price: 500,  category: "shoes" },
      { name: "Shin Guards (per match)", price: 200, category: "accessories" },
    ],
  },
  {
    id: "v4", name: "Abuja Elite Kits", district: "Abuja", type: "sell" as const,
    rating: 4.9, verified: true, products: [
      { name: "Premium Full Kit", price: 11000, category: "kit"   },
      { name: "Jersey Only",      price: 5000,  category: "kit"   },
      { name: "Football Boots",   price: 8000,  category: "shoes" },
    ],
  },
  {
    id: "v5", name: "Mama Chika Sports", district: "Enugu", type: "sell" as const,
    rating: 4.5, verified: false, products: [
      { name: "Full Kit Pack",  price: 7500, category: "kit"   },
      { name: "Football Boots", price: 5500, category: "shoes" },
    ],
  },
];

// Governance transaction log
export const governanceLog = [
  { id: "t1", date: "2026-03-07", type: "registration", description: "Player registration — Chukwu Emeka",          amount: 7499,  platformFee: 281,  status: "completed", district: "Port Harcourt" },
  { id: "t2", date: "2026-03-07", type: "kit_sale",     description: "Kit purchase via Oga Kits PH",               amount: 8500,  platformFee: 319,  status: "completed", district: "Port Harcourt" },
  { id: "t3", date: "2026-03-06", type: "registration", description: "Coach registration — Mr. Adeyemi",           amount: 7499,  platformFee: 281,  status: "completed", district: "Lagos"         },
  { id: "t4", date: "2026-03-06", type: "transfer",     description: "Transfer: Biodun Afolabi → Man United",      amount: 50000, platformFee: 1875, status: "completed", district: "Lagos",
    breakdown: { coach: 12500, media: 5000, analyst: 5000, platform: 1875, player: 25625 }
  },
  { id: "t5", date: "2026-03-05", type: "kit_sale",     description: "Installment 1/3 — Lagos Sports Hub",         amount: 2500,  platformFee: 94,   status: "completed", district: "Lagos"         },
  { id: "t6", date: "2026-03-05", type: "facility",     description: "Rumuola Field rental — MD8",                 amount: -15000, platformFee: 0,   status: "completed", district: "Port Harcourt" },
  { id: "t7", date: "2026-03-04", type: "coach_pay",    description: "Coach salary — Mr. Adeyemi (MD8)",           amount: -20000, platformFee: 0,   status: "completed", district: "Lagos"         },
];

// Governance decisions/voting log
export const governanceDecisions = [
  { id: "d1", date: "2026-03-07", title: "Jersey awarded — Biodun Afolabi (Man United CM)", votes: { for: 10, against: 2 }, outcome: "Approved", reporters: ["Lagos Buzz", "PH Sports"] },
  { id: "d2", date: "2026-03-06", title: "Rumuola Field selected as PH District Stadium", votes: { for: 8, against: 1 },  outcome: "Approved", reporters: ["WardSoccer Media"] },
  { id: "d3", date: "2026-03-05", title: "Vendor approval — Mama Chika Sports (Enugu)",   votes: { for: 6, against: 3 },  outcome: "Approved", reporters: ["Enugu FC Blog"] },
];

// Daily reports (fan-facing)
export const dailyReports = [
  {
    id: "r1", date: "2026-03-07", title: "Match Day 9 Report",
    summary: "Man United PH leads after a 2-1 victory over Chelsea Lagos. Chukwu Emeka scores a screamer. District wins across 3 of 4 zones earn Man United the bonus point.",
    highlights: ["Emeka brace (12' & 58')", "District bonus point secured", "Biodun Afolabi jersey awarded after voting"],
    financials: { collected: 16998, spent: 15000, platformFee: 600 },
  },
  {
    id: "r2", date: "2026-03-06", title: "Match Day 8 Report",
    summary: "Arsenal Warri defeats Liverpool Enugu 2-1 in a closely contested fixture. Transfer window opens next week.",
    highlights: ["Ovie Ejiro goal of the week", "Transfer window opens MD10", "2 new vendors approved for Enugu"],
    financials: { collected: 22498, spent: 20000, platformFee: 844 },
  },
];

// Onboarding sensitization slides (shared base)
export const onboardingSlides = [
  {
    id: 1, icon: "⚽",
    title: "Welcome to WardSoccer.ng",
    body: "The largest grassroots football ecosystem in Africa. We bring the beautiful game to your district — no travel, no barriers, just football.",
  },
  {
    id: 2, icon: "🗺️",
    title: "How the League Works",
    body: "Fixtures happen simultaneously across all districts. Man United's Lagos fans vs Chelsea's Lagos fans — your district is the stadium. Results aggregate to crown the winner.",
  },
  {
    id: 3, icon: "🏆",
    title: "Preseason → Full Season",
    body: "Everyone starts in the Academy (Preseason). Only the best clubs survive and earn their place in the Full Season. Lose → go home.",
  },
  {
    id: 4, icon: "💰",
    title: "Your Financial Obligations",
    body: "Registration: ₦7,499 (one-time). Official Kit: from ₦7,500 (pay in instalments). Platform takes 3.75% on every transaction for maintenance.",
  },
  {
    id: 5, icon: "🤝",
    title: "Everyone Has a Role",
    body: "Players, Coaches, Referees, Scouts, Media, Trainers, Vendors — every role matters. Transfers involve coaches, media, and analysts who are paid for their part.",
  },
  {
    id: 6, icon: "🔍",
    title: "Full Transparency",
    body: "Every governance decision, every naira collected and spent, is visible on the platform. Media can report it. Fans receive daily reports automatically.",
  },
];

// Referee match queue
export const refereeMatches = [
  { id: "rm1", fixture: "Man United PH vs Chelsea Lagos", venue: "Rumuola Field",    district: "Port Harcourt", date: "Today",    time: "16:00", status: "live"     },
  { id: "rm2", fixture: "Arsenal Warri vs Liverpool Enugu", venue: "Effurun Stadium",district: "Warri",         date: "Today",    time: "16:00", status: "live"     },
  { id: "rm3", fixture: "Barcelona Abuja vs Real Madrid", venue: "Abuja FC Ground",  district: "Abuja",         date: "Tomorrow", time: "07:00", status: "upcoming" },
];

// Scout evaluations
export const scoutEvaluations = [
  { id: "se1", player: "Tunde Williams", position: "ST",  district: "Port Harcourt", age: 20, speed: 8, technique: 7, teamwork: 8, rating: 7.8, recommendation: "Academy Select" },
  { id: "se2", player: "Emeka Nwosu",    position: "CB",  district: "Port Harcourt", age: 21, speed: 6, technique: 7, teamwork: 9, rating: 7.2, recommendation: "Academy Select" },
  { id: "se3", player: "Ada Okafor",     position: "LW",  district: "Enugu",         age: 19, speed: 9, technique: 8, teamwork: 7, rating: 8.0, recommendation: "Fast Track"    },
];

// Coach squad — with availability tracking
export const coachSquad = {
  club: "Man United PH",
  district: "Port Harcourt",
  nextFixture: {
    opponent: "Chelsea Lagos",
    date: "Preseason Match Day 1",
    kickoff: "16:00",
    venue: "Rumuola Field",
    notificationSent: true,
    deadline: "48h before kickoff",
  },
  players: [
    { name: "Chukwu Emeka",  position: "ST",  rating: 8.4, status: "eligible",   kitStatus: "purchased", availability: "available",   notified: true  },
    { name: "Femi Okonkwo",  position: "CAM", rating: 8.1, status: "eligible",   kitStatus: "purchased", availability: "available",   notified: true  },
    { name: "Tunde Bello",   position: "CM",  rating: 7.5, status: "eligible",   kitStatus: "purchased", availability: "available",   notified: true  },
    { name: "Emeka Nwosu",   position: "CB",  rating: 7.3, status: "eligible",   kitStatus: "purchased", availability: "unavailable", notified: true  },
    { name: "Precious Ibe",  position: "GK",  rating: 7.1, status: "eligible",   kitStatus: "purchased", availability: "pending",     notified: true  },
    { name: "Bayo Salami",   position: "RB",  rating: 6.9, status: "eligible",   kitStatus: "purchased", availability: "pending",     notified: true  },
    { name: "Segun Lawal",   position: "LB",  rating: 7.0, status: "ineligible", kitStatus: "none",      availability: "none",        notified: false },
    { name: "Kola Adeyemi",  position: "CB",  rating: 6.8, status: "ineligible", kitStatus: "pending",   availability: "none",        notified: false },
  ],
};
