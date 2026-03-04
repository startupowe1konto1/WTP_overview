import { useState, useMemo } from "react";

const LOGO = "data:image/jpeg;base64,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";

const RED = "#E63329";
const DARK = "#1a1a1a";
const MUTED = "#888";
const BORDER = "#eaeaea";
const BG = "#ffffff";
const LIGHT = "#fafafa";

const financials = [
  { year: "2020/21", gross: 1645, ebit: null, pretax: -155, net: -128, equity: -127 },
  { year: "2021/22", gross: 4111, ebit: null, pretax: 1753, net: 1358, equity: 1231 },
  { year: "2022/23", gross: 5269, ebit: null, pretax: 3911, net: 3041, equity: 2972 },
  { year: "2023/24", gross: 3080, ebit: null, pretax: 1833, net: 1413, equity: 2385 },
  { year: "2024/25", gross: 5287, ebit: 3038, pretax: 3197, net: 2489, equity: 4874 },
];

const team = [
  { name: "Ulrik Lehrskov-Schmidt", role: "CEO & Founder", bg: "Harvard, CFA, author 'The Pricing Roadmap'" },
  { name: "Christopher Truce", role: "COO & Co-Founder", bg: "Stanford EMBA, 18+ yrs fintech/SaaS" },
  { name: "Roee Hartuv", role: "Sr. Pricing Advisor, Head of GTM", bg: "MBA Tel Aviv, ex-Winning by Design, 20+ yrs B2B SaaS" },
  { name: "Morten Klank", role: "Sr. Pricing Advisor", bg: "INSEAD, 20+ yrs, turnaround PE-backed, ex-MD Envidan Software" },
  { name: "Michał Narkiewicz", role: "Pricing Advisor", bg: "10 yrs ad strategy, JTBD, value prop, product positioning" },
  { name: "Romain Anzalone", role: "Pricing Analyst", bg: "MSc Finance Imperial College, IB/VC/consulting" },
  { name: "Oliver Brunchmann", role: "CMO", bg: "B2B SaaS marketing, positioning, GTM strategy" },
  { name: "Laura Glentemose", role: "Marketing Manager", bg: "10+ yrs marketing, personal branding, storytelling" },
  { name: "Nicole Høyer", role: "EA (CEO)", bg: "MSc CBS, ex-Nasdaq product manager, 4 languages" },
  { name: "Frederik", role: "EA (CEO/COO)", bg: "5+ yrs consulting, operations" },
];

const phases = [
  { num: 1, title: "Design Sprint", weeks: "2–4 wks", items: ["C-suite workshops (CEO, CPO, COO, VP Sales)", "Current model analysis & segmentation", "'Pricing the customer, not the product' — JTBD + alternatives", "New packaging & pricing architecture"] },
  { num: 2, title: "Internal Validation", weeks: "2–4 wks", items: ["Stakeholder presentation of new model", "Cross-functional consensus (sales, product, finance, CS)", "Customer & channel partner validation interviews"] },
  { num: 3, title: "Sales Test", weeks: "4–8 wks", items: ["New pricing tested on new sales", "Feedback collection & objection handling", "Model iteration based on results"] },
  { num: 4, title: "Rollout & Implementation", weeks: "4–8 wks", items: ["Graduated rollout: low-risk → medium → key accounts", "Renegotiation support with existing clients", "Sales enablement: pitch decks, calculators, processes", "Build internal pricing tools"] },
];

const namedClients = [
  {
    name: "Contractbook", url: "https://contractbook.com", what: "CLM SaaS", hq: "Copenhagen, DK", arr: "<$10M",
    funding: "€3.5M seed (Gradient/Google AI), later $30M Series B",
    result: "ACV 10x, 45% quarterly growth, +70% next year, $30M Series B — 18 months early",
    competitors: [
      { n: "Juro", u: "https://juro.com", hq: "London, UK", fund: "Series B, $28M", pot: "HIGH", arg: "Direct competitor, similar scale. 'Contractbook 10x ACV after pricing redesign — is your pricing optimized?'" },
      { n: "Oneflow", u: "https://oneflow.com", hq: "Stockholm, SE", fund: "$61M funding", pot: "HIGH", arg: "Scandinavian CLM, growing fast. Public pricing page — easy entry point." },
      { n: "GetAccept", u: "https://www.getaccept.com", hq: "Malmö, SE", fund: "$26M funding", pot: "MED", arg: "Digital sales room + CLM. Scandinavian, B2B SaaS, growth stage." },
      { n: "Precisely Contracts", u: "https://preciselycontracts.com", hq: "Gothenburg, SE", fund: "€1.8M seed", pot: "MED", arg: "Scandinavian CLM, smaller — may need pricing help for scaling." },
      { n: "Concord", u: "https://www.concord.app", hq: "San Francisco, US", fund: "$22M funding", pot: "LOW", arg: "US-based, smaller reach for Valueships from Europe." },
    ]
  },
  {
    name: "BizBrains", url: "https://bizbrains.com", what: "Integration / EDI / iPaaS", hq: "Denmark", arr: "32→52M DKK",
    funding: "PE-backed (post multiple acquisitions)",
    result: "+62% recurring revenue in 12 months, first product alignment in 10 years",
    competitors: [
      { n: "Celigo", u: "https://www.celigo.com", hq: "Redwood City, US", fund: "$50M+ ARR, PE-backed", pot: "MED", arg: "iPaaS, PE-backed — pricing optimization classic. 'BizBrains +62% recurring rev after redesign.'" },
      { n: "Alumio", u: "https://www.alumio.com", hq: "Eindhoven, NL", fund: "Growth stage", pot: "HIGH", arg: "EU iPaaS, smaller — may need pricing strategy for expansion." },
      { n: "Corevist", u: "https://www.corevist.com", hq: "US", fund: "Mid-market", pot: "LOW", arg: "Niche SAP B2B commerce, smaller target." },
      { n: "Boomi", u: "https://boomi.com", hq: "US", fund: "$2B+ valuation", pot: "LOW", arg: "Too large for boutique engagement, enterprise." },
      { n: "MuleSoft (Salesforce)", u: "https://www.mulesoft.com", hq: "US", fund: "Part of Salesforce", pot: "LOW", arg: "Too large — corporate division." },
    ]
  },
  {
    name: "Envidan", url: "https://envidan.dk", what: "Water Management Consulting + SaaS", hq: "Denmark", arr: "$50–150M",
    funding: "Established (consulting + 20+ software products)",
    result: "600% price increase EnviStyr, 100% increase EnviDrift, zero churn, professional services revenue up",
    competitors: [
      { n: "InfoTiles", u: "https://infotiles.com", hq: "Norway", fund: "Early/growth stage", pot: "HIGH", arg: "AI water analytics, Scandinavian. 'Envidan 600% price increase — is your pricing ready?'" },
      { n: "Idrica (GoAigua)", u: "https://www.idrica.com", hq: "Spain", fund: "€50M+ revenue", pot: "MED", arg: "Large water management platform, SaaS transition." },
      { n: "Innovyze (Autodesk)", u: "https://www.innovyze.com", hq: "US/UK", fund: "Part of Autodesk", pot: "LOW", arg: "Corporate — less probable target." },
      { n: "Baseform", u: "https://baseform.com", hq: "Portugal", fund: "Smaller", pot: "MED", arg: "Water infra analytics, SaaS. May need pricing help." },
      { n: "Xylem / Sensus Analytics", u: "https://www.xylem.com", hq: "US (global)", fund: "$1B+ (group)", pot: "LOW", arg: "Enterprise — too large." },
    ]
  },
  {
    name: "Monta", url: "https://monta.com", what: "EV Charging Management Platform", hq: "Denmark", arr: "Series B €130M",
    funding: "Energize Capital, GreenPoint — 12 European markets + USA",
    result: "Company-wide alignment on new pricing model, international expansion support",
    competitors: [
      { n: "AMPECO", u: "https://www.ampeco.com", hq: "Bulgaria", fund: "$16M funding", pot: "HIGH", arg: "White-label EV charging, growth stage. 'Monta aligned company-wide — how does yours look?'" },
      { n: "Driivz (Vontier)", u: "https://driivz.com", hq: "Israel/US", fund: "Acquired by Vontier", pot: "MED", arg: "Post-acquisition — pricing alignment opportunity." },
      { n: "ChargeLab", u: "https://www.chargelab.co", hq: "Toronto, CA", fund: "$7M+ funding", pot: "MED", arg: "EV charging SaaS, growth stage, North America." },
      { n: "EVBox (Everon)", u: "https://evbox.com", hq: "Amsterdam, NL", fund: "Engie-backed", pot: "MED", arg: "HW+Software, EU-based, pricing complexity." },
      { n: "Current", u: "https://current.tech", hq: "Norway", fund: "Statkraft-backed", pot: "LOW", arg: "Utility-backed, pricing at scale." },
    ]
  },
  {
    name: "SafeEx", url: "https://safeex.com", what: "Inspection & Maintenance SaaS (O&G)", hq: "Scandinavia (global)", arr: "<$10M",
    funding: "Native B2B SaaS",
    result: "+40% entry-level tier pricing, simplified model, ready to scale",
    competitors: [
      { n: "MaintainX", u: "https://www.getmaintainx.com", hq: "San Francisco, US", fund: "$104M funding", pot: "MED", arg: "CMMS SaaS, growth stage. 'SafeEx +40% after redesign.'" },
      { n: "Limble CMMS", u: "https://limblecmms.com", hq: "Salt Lake City, US", fund: "$20M+ funding", pot: "MED", arg: "Maintenance management SaaS." },
      { n: "Fluix", u: "https://fluix.io", hq: "US/Ukraine", fund: "Mid-market", pot: "MED", arg: "Field inspection SaaS, oil & gas." },
      { n: "SafetyCulture (iAuditor)", u: "https://safetyculture.com", hq: "Australia", fund: "$250M+ funding", pot: "LOW", arg: "Large player, but pricing redesign relevant at scale." },
      { n: "GoAudits", u: "https://goaudits.com", hq: "Singapore", fund: "Smaller", pot: "MED", arg: "Audit & inspection SaaS, global." },
    ]
  },
  {
    name: "MapsPeople", url: "https://www.mapspeople.com", what: "Indoor Mapping & Navigation SaaS", hq: "Denmark", arr: "$10–50M",
    funding: "Established B2B SaaS",
    result: "99% faster enterprise deal signing, 75% property segment contribution growth",
    competitors: [
      { n: "Mapsted", u: "https://mapsted.com", hq: "Canada", fund: "Growth stage", pot: "HIGH", arg: "Indoor positioning SaaS. 'MapsPeople 99% faster enterprise deals — pricing is key.'" },
      { n: "inDoorway (2N)", u: "https://www.2n.com", hq: "Czech Republic", fund: "Smaller", pot: "MED", arg: "Indoor navigation, EU-based." },
      { n: "PointInside", u: "https://pointinside.com", hq: "US", fund: "Mid-market", pot: "MED", arg: "Indoor location for retail." },
    ]
  },
  {
    name: "Predicti", url: "https://predicti.com", what: "AI/Fintech Platform for Banks", hq: "Copenhagen, DK", arr: "<$10M",
    funding: "Founded 2022, early stage",
    result: "250% enterprise client growth, shortened sales cycle",
    competitors: [
      { n: "Personetics", u: "https://personetics.com", hq: "Israel/US", fund: "$75M+ funding", pot: "MED", arg: "AI banking personalization — may need pricing help at scale." },
      { n: "MX Technologies", u: "https://www.mx.com", hq: "US", fund: "$300M+ funding", pot: "LOW", arg: "Fintech data platform — too large." },
      { n: "Meniga", u: "https://meniga.com", hq: "Iceland", fund: "€12M funding", pot: "HIGH", arg: "Scandinavian fintech, bank data analytics, similar scale to Predicti." },
      { n: "Minna Technologies", u: "https://minnatechnologies.com", hq: "Gothenburg, SE", fund: "Growth stage", pot: "HIGH", arg: "Subscription mgmt for banks, Scandinavian, B2B SaaS." },
    ]
  },
  {
    name: "Proper", url: "https://www.proper.dk", what: "PropTech — Property Management Automation", hq: "Denmark + NL, DE", arr: "€7.3M funded",
    funding: "byFounders, Preseed Ventures, angels (Kim Baroudy, Christian Shin)",
    result: "300% ARR growth, 80% price increase, 146% SMB unit fee increase",
    competitors: [
      { n: "Pebble (fka Residently)", u: "https://www.hellopebble.com", hq: "London, UK", fund: "$10M funding", pot: "HIGH", arg: "Property management SaaS, EU growth. 'Proper 300% ARR growth thanks to pricing.'" },
      { n: "Rendin", u: "https://rendin.co", hq: "Estonia", fund: "€4M funding", pot: "HIGH", arg: "PropTech, Baltics/Nordics, growth stage — pricing redesign opportunity." },
      { n: "Homeday", u: "https://www.homeday.de", hq: "Berlin, DE", fund: "Various funding", pot: "MED", arg: "EU PropTech, different model." },
      { n: "Boligportal (Heimstaden)", u: "https://www.boligportal.dk", hq: "Denmark", fund: "Market leader DK", pot: "LOW", arg: "Marketplace model, less SaaS." },
    ]
  },
  {
    name: "Saxo Bank", url: "https://www.saxobank.com", what: "Trading & Investment Platform (B2B line)", hq: "Copenhagen, DK", arr: ">$150M",
    funding: "Established (AUM: billions DKK)",
    result: "Scalable pricing framework for SAS business line, per-client profitability transparency, fixed revenue growth",
    competitors: []
  },
  {
    name: "Microsoft", url: "https://www.microsoft.com", what: "Preferred Pricing Partner (Western Europe)", hq: "Global", arr: "Partnership",
    funding: "ISV ecosystem — helps ISVs build pricing incl. Azure costs",
    result: "'Ulrik is the only one who can bridge new technologies and cost structures into profitable business' — Dirk Kooreman, Microsoft",
    competitors: []
  },
];

const anonProjects = [
  { desc: "US WebOps Platform/PaaS for Drupal/WordPress", seg: "Native SaaS", arr: "+$120M", guess: "Pantheon.io", conf: "HIGH" },
  { desc: "European HR-Tech", seg: "Native SaaS & AI", arr: "$50–100M", guess: "Personio / HiBob / Factorial / Leapsome", conf: "LOW" },
  { desc: "US HR-Tech", seg: "Native SaaS & AI", arr: "$100–500M", guess: "Lattice / BambooHR / Culture Amp / 15Five", conf: "LOW" },
  { desc: "UK Compliance-Tech", seg: "Native SaaS", arr: "$10–25M", guess: "Vanta / Drata / OneTrust / Ideagen", conf: "LOW" },
  { desc: "Global Med-Tech (7x products)", seg: "HW & Perp-to-SaaS", arr: "$1B+", guess: "Philips Health Tech / Siemens Healthineers / GE", conf: "LOW" },
  { desc: "Chinese Retail Tech", seg: "SaaS", arr: "$50–100M", guess: "SHOPLAZZA / Cegid / Shopline", conf: "LOW" },
  { desc: "EU-US Prof. Services & SaaS", seg: "Prof. Services", arr: "$50–100M", guess: "Valcon / Cognizant unit / Avanade", conf: "LOW" },
  { desc: "US AI Contract Automation", seg: "Native SaaS", arr: "+$5M", guess: "Evisort / LinkSquares / Agiloft", conf: "MED" },
  { desc: "EU Pharma/Supply Chain AI", seg: "Native SaaS (Cloud)", arr: "+$5M", guess: "Aera Technology / Alloy.ai / Kinaxis", conf: "LOW" },
  { desc: "Global Dev-App Builder", seg: "Perp-to-SaaS", arr: "+$15M", guess: "Betty Blocks / Mendix / OutSystems / Zoho Creator", conf: "LOW" },
  { desc: "US Info Security-Tech", seg: "Native SaaS", arr: "$1B+", guess: "Recorded Future / Rapid7 / Qualys / Tenable", conf: "LOW" },
  { desc: "EU Fintech - Digital Bank", seg: "Hybrid", arr: "+$20M", guess: "Lunar / Pleo / Spendesk / Banking Circle", conf: "LOW" },
];

const topTargets = [
  { rank: 1, name: "Juro", ind: "CLM SaaS", hq: "London", url: "https://juro.com", why: "Direct Contractbook competitor (10x ACV after WTP). Series B, B2B SaaS — ideal VS target." },
  { rank: 2, name: "Oneflow", ind: "CLM SaaS", hq: "Stockholm", url: "https://oneflow.com", why: "Scandinavian CLM, $61M funding, fast growth. Public pricing page for analysis." },
  { rank: 3, name: "AMPECO", ind: "EV Charging", hq: "Bulgaria", url: "https://www.ampeco.com", why: "Monta competitor, growth stage, hardware+SaaS — pricing complexity ideal for VS." },
  { rank: 4, name: "InfoTiles", ind: "Water Analytics", hq: "Norway", url: "https://infotiles.com", why: "Nordic, AI water analytics. Envidan 600% price increase as proof — strong argument." },
  { rank: 5, name: "Alumio", ind: "iPaaS", hq: "Netherlands", url: "https://www.alumio.com", why: "EU integration platform, growth stage. BizBrains +62% as proof." },
  { rank: 6, name: "Meniga", ind: "Fintech/Banking", hq: "Iceland", url: "https://meniga.com", why: "Nordic fintech, bank analytics — Predicti 250% enterprise growth as proof." },
  { rank: 7, name: "Minna Technologies", ind: "Fintech/Banking", hq: "Gothenburg", url: "https://minnatechnologies.com", why: "Scandinavian, subscription mgmt for banks, B2B SaaS." },
  { rank: 8, name: "Mapsted", ind: "Indoor Mapping", hq: "Canada", url: "https://mapsted.com", why: "Indoor positioning SaaS, growth stage. MapsPeople success story." },
  { rank: 9, name: "Pebble", ind: "PropTech", hq: "London", url: "https://www.hellopebble.com", why: "Property mgmt SaaS, EU expansion. Proper 300% ARR argument." },
  { rank: 10, name: "Rendin", ind: "PropTech", hq: "Estonia", url: "https://rendin.co", why: "Nordic/Baltic PropTech, growth stage — ideal for VS scope." },
];

const pricing = [
  { seg: "<$10M ARR", range: "€30K–50K", note: "Shorter project, smaller scope" },
  { seg: "$10–50M ARR", range: "€50K–80K", note: "Standard redesign + implementation" },
  { seg: "$50–150M ARR", range: "€80K–120K", note: "Complex transformation" },
  { seg: "$150M+", range: "€100K–200K+", note: "Enterprise, multi-product, 6+ months" },
];

const confColor = c => c === "HIGH" ? "#2a8a2a" : c === "MED" ? "#c08000" : "#999";

const CompBadge = ({ pot }) => (
  <span style={{ display: "inline-block", padding: "2px 10px", fontSize: 10, fontWeight: 600, letterSpacing: 0.5, borderRadius: 3, background: `${confColor(pot)}15`, color: confColor(pot) }}>{pot}</span>
);

export default function WTPDashboard() {
  const [activeTab, setActiveTab] = useState("clients");
  const [selectedClient, setSelectedClient] = useState(null);
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [potFilter, setPotFilter] = useState("ALL");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "clients", label: "Case Studies" },
    { id: "anon", label: "Active Projects" },
    { id: "targets", label: "Top 10 Targets" },
  ];

  const allCompetitors = useMemo(() => {
    const list = [];
    namedClients.forEach(c => {
      c.competitors.forEach(comp => {
        list.push({ ...comp, clientName: c.name, clientResult: c.result });
      });
    });
    return list;
  }, []);

  const filteredComps = useMemo(() => {
    let f = allCompetitors;
    if (potFilter !== "ALL") f = f.filter(c => c.pot === potFilter);
    if (searchTerm) f = f.filter(c => c.n.toLowerCase().includes(searchTerm.toLowerCase()) || c.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    return f;
  }, [allCompetitors, potFilter, searchTerm]);

  const totalComps = allCompetitors.length;
  const highCount = allCompetitors.filter(c => c.pot === "HIGH").length;
  const medCount = allCompetitors.filter(c => c.pot === "MED").length;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: BG, color: DARK, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: ${RED}; color: white; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fu { animation: fadeUp 0.5s ease forwards; opacity: 0; }
        .tab-btn { padding: 10px 24px; font-size: 13px; font-weight: 500; border: none; cursor: pointer; font-family: inherit; transition: all 0.2s; background: transparent; color: ${MUTED}; border-bottom: 2px solid transparent; letter-spacing: 0.3px; }
        .tab-btn:hover { color: ${DARK}; }
        .tab-btn.active { color: ${RED}; border-bottom-color: ${RED}; }
        .card { background: white; border: 1px solid ${BORDER}; padding: 20px; transition: all 0.2s; cursor: pointer; }
        .card:hover { border-color: ${RED}; box-shadow: 0 2px 12px rgba(230,51,41,0.08); transform: translateY(-2px); }
        .badge { display: inline-block; padding: 3px 10px; font-size: 10px; font-weight: 600; letter-spacing: 0.5px; border-radius: 3px; }
        .modal-ov { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 100; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(3px); animation: fadeIn 0.2s ease; }
        .modal-box { background: white; max-width: 740px; width: 94%; padding: 40px; position: relative; max-height: 88vh; overflow-y: auto; border: 1px solid ${BORDER}; animation: fadeUp 0.3s ease; }
        .phase-card { border: 1px solid ${BORDER}; padding: 20px; cursor: pointer; transition: all 0.25s; position: relative; overflow: hidden; }
        .phase-card:hover { border-color: ${RED}; }
        .phase-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: ${RED}; opacity: 0; transition: opacity 0.2s; }
        .phase-card:hover::before, .phase-card.open::before { opacity: 1; }
        .comp-link { color: ${DARK}; text-decoration: none; font-weight: 400; border-bottom: 1px solid transparent; transition: all 0.2s; }
        .comp-link:hover { border-bottom-color: ${RED}; color: ${RED}; }
        .fin-row { transition: background 0.15s; }
        .fin-row:hover { background: #fef5f5; }
        .target-row { transition: all 0.15s; cursor: pointer; }
        .target-row:hover { background: #fef5f5; }
        .filter-btn { padding: 5px 14px; font-size: 11px; border: 1px solid ${BORDER}; background: white; cursor: pointer; font-family: inherit; transition: all 0.15s; color: ${MUTED}; border-radius: 20px; }
        .filter-btn:hover { border-color: ${RED}; color: ${RED}; }
        .filter-btn.active { background: ${RED}; color: white; border-color: ${RED}; }
        .search-input { padding: 8px 14px; font-size: 13px; border: 1px solid ${BORDER}; font-family: inherit; outline: none; width: 260px; transition: border-color 0.2s; }
        .search-input:focus { border-color: ${RED}; }
      `}</style>

      {/* HEADER */}
      <header style={{ padding: "36px 48px 0", maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={LOGO} alt="WTP" style={{ width: 48, height: 48, borderRadius: 6 }} />
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2.5, color: RED, textTransform: "uppercase", marginBottom: 4 }}>Competitive Intelligence Dossier</p>
              <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: DARK, lineHeight: 1.1 }}>Willingness to Pay</h1>
              <p style={{ fontSize: 13, color: MUTED, marginTop: 4, fontWeight: 300 }}>willingnesstopay.com · Copenhagen, Denmark · est. ~2015 · Holding: Adamos ApS</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 36, alignItems: "flex-end" }}>
            {[{ v: "150+", l: "Projects" },{ v: "242%", l: "Avg Price ↑" },{ v: "125", l: "Days Avg" },{ v: "10", l: "Team" },{ v: String(totalComps), l: "Comp. Mapped" }].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: RED, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* TABS */}
      <nav style={{ padding: "20px 48px 0", maxWidth: 1320, margin: "0 auto", position: "sticky", top: 0, background: BG, zIndex: 50 }}>
        <div style={{ display: "flex", borderBottom: `1px solid ${BORDER}` }}>
          {tabs.map(t => (
            <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </nav>

      {/* ===== OVERVIEW TAB ===== */}
      {activeTab === "overview" && (
        <section style={{ padding: "32px 48px 40px", maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* TEAM */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 6 }}>Team</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: DARK, fontWeight: 400, marginBottom: 16 }}>10-person boutique, senior-only delivery</h2>
              {team.map((t, i) => (
                <div key={i} className="fu" style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < team.length - 1 ? `1px solid ${BORDER}` : "none", animationDelay: `${i * 0.04}s` }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: i < 2 ? RED : LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: i < 2 ? "white" : MUTED, flexShrink: 0, marginTop: 2 }}>
                    {t.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: DARK }}>{t.name} <span style={{ color: MUTED, fontWeight: 300, fontSize: 11 }}>— {t.role}</span></div>
                    <div style={{ fontSize: 11, color: MUTED, fontWeight: 300, marginTop: 2 }}>{t.bg}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* FINANCIALS */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 6 }}>Financials</p>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: DARK, fontWeight: 400, marginBottom: 4 }}>WTP ApS — public data (DKK '000)</h2>
              <p style={{ fontSize: 11, color: MUTED, fontWeight: 300, marginBottom: 16 }}>Est. annual revenue: €1.1–2M · Avg project: €50–100K · Fixed fee per project</p>
              <div style={{ border: `1px solid ${BORDER}`, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", padding: "10px 16px", background: LIGHT, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, color: MUTED, textTransform: "uppercase" }}>
                  <span>Year</span><span style={{textAlign:"right"}}>Gross Profit</span><span style={{textAlign:"right"}}>Pre-tax</span><span style={{textAlign:"right"}}>Net</span><span style={{textAlign:"right"}}>Equity</span>
                </div>
                {financials.map((f, i) => (
                  <div key={i} className="fin-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", padding: "10px 16px", borderBottom: `1px solid ${BORDER}`, fontSize: 13 }}>
                    <span style={{ fontWeight: 500 }}>{f.year}</span>
                    <span style={{ textAlign: "right", fontWeight: 500, color: f.gross >= 5000 ? RED : DARK }}>{f.gross.toLocaleString()}</span>
                    <span style={{ textAlign: "right", color: f.pretax < 0 ? RED : DARK }}>{f.pretax.toLocaleString()}</span>
                    <span style={{ textAlign: "right", color: f.net < 0 ? RED : DARK }}>{f.net.toLocaleString()}</span>
                    <span style={{ textAlign: "right", color: f.equity < 0 ? RED : "#2a8a2a" }}>{f.equity.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 12 }}>Estimated Project Pricing</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {pricing.map((p, i) => (
                    <div key={i} style={{ padding: "14px 16px", background: LIGHT, border: `1px solid ${BORDER}` }}>
                      <div style={{ fontSize: 11, color: MUTED, marginBottom: 4 }}>{p.seg}</div>
                      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: RED }}>{p.range}</div>
                      <div style={{ fontSize: 10, color: MUTED, marginTop: 4 }}>{p.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* METHODOLOGY */}
          <div style={{ marginTop: 40 }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 6 }}>Methodology</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: DARK, fontWeight: 400, marginBottom: 16 }}>4-phase Pricing Redesign (avg 125 days)</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {phases.map(p => (
                <div key={p.num} className={`phase-card ${expandedPhase === p.num ? "open" : ""}`}
                  onClick={() => setExpandedPhase(expandedPhase === p.num ? null : p.num)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: RED, lineHeight: 1 }}>{p.num}</span>
                    <span style={{ fontSize: 10, color: MUTED, background: LIGHT, padding: "3px 8px", borderRadius: 2 }}>{p.weeks}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: DARK, marginBottom: 6 }}>{p.title}</div>
                  {expandedPhase === p.num && (
                    <div style={{ animation: "fadeIn 0.2s ease" }}>
                      {p.items.map((it, j) => (
                        <div key={j} style={{ fontSize: 12, color: "#555", padding: "4px 0", fontWeight: 300, paddingLeft: 12, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: RED }}>·</span>{it}
                        </div>
                      ))}
                    </div>
                  )}
                  {expandedPhase !== p.num && <div style={{ fontSize: 11, color: MUTED }}>Click to expand</div>}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
              {["Senior experts only — no juniors","End-to-end transformation","Outcome-focused, not hourly","No RFP participation","Book as top-of-funnel","B2B SaaS only — no B2C","No short-term / hourly work"].map(t => (
                <span key={t} style={{ fontSize: 11, padding: "5px 14px", border: `1px solid ${BORDER}`, color: "#555", borderRadius: 20 }}>{t}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CASE STUDIES TAB ===== */}
      {activeTab === "clients" && (
        <section style={{ padding: "24px 48px 40px", maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 13, color: MUTED, fontWeight: 300 }}>10 named clients from WTP case studies · {totalComps} competitor targets mapped</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["ALL","HIGH","MED","LOW"].map(f => (
                <button key={f} className={`filter-btn ${potFilter === f ? "active" : ""}`}
                  onClick={() => setPotFilter(f)}>{f === "ALL" ? `All (${totalComps})` : `${f} (${allCompetitors.filter(c=>c.pot===f).length})`}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
            {namedClients.map((c, i) => {
              const visibleComps = potFilter === "ALL" ? c.competitors : c.competitors.filter(comp => comp.pot === potFilter);
              if (potFilter !== "ALL" && visibleComps.length === 0) return null;
              return (
                <div key={i} className="card fu" style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => setSelectedClient(c)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <a href={c.url} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ fontSize: 18, fontWeight: 600, color: DARK, textDecoration: "none", borderBottom: "1px solid transparent", transition: "border-color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.borderBottomColor = RED}
                        onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}>
                        {c.name} <span style={{ fontSize: 12, color: MUTED }}>↗</span>
                      </a>
                      <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{c.what} · {c.hq}</div>
                    </div>
                    <span className="badge" style={{ background: "#fef5f5", color: RED }}>{c.arr}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#444", fontWeight: 400, lineHeight: 1.5, padding: "10px 0", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, marginBottom: 10 }}>
                    {c.result}
                  </div>
                  {c.competitors.length > 0 ? (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: MUTED, marginRight: 4 }}>{c.competitors.length} targets:</span>
                      {c.competitors.map((comp, j) => (
                        <span key={j} style={{ fontSize: 10, padding: "2px 8px", background: `${confColor(comp.pot)}10`, color: confColor(comp.pot), borderRadius: 3 }}>{comp.n}</span>
                      ))}
                    </div>
                  ) : (
                    <div style={{ fontSize: 10, color: MUTED }}>Partnership — no direct competitors</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== ACTIVE PROJECTS TAB ===== */}
      {activeTab === "anon" && (
        <section style={{ padding: "24px 48px 40px", maxWidth: 1320, margin: "0 auto" }}>
          <p style={{ fontSize: 13, color: MUTED, fontWeight: 300, marginBottom: 20 }}>Active projects listed on WTP website (anonymous). Identification based on public data — use with caution.</p>
          <div style={{ background: "white", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 2fr 80px", padding: "10px 16px", background: LIGHT, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, color: MUTED, textTransform: "uppercase" }}>
              <span>Description</span><span>Segment</span><span>ARR/Rev</span><span>Probable Identity</span><span style={{textAlign:"center"}}>Conf.</span>
            </div>
            {anonProjects.map((p, i) => (
              <div key={i} className="fu" style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1fr 2fr 80px", padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, alignItems: "center", fontSize: 13, animationDelay: `${i * 0.04}s` }}>
                <span style={{ fontWeight: 500 }}>{p.desc}</span>
                <span style={{ fontSize: 11, color: MUTED }}>{p.seg}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: RED }}>{p.arr}</span>
                <span style={{ fontSize: 12, color: "#555", fontWeight: 300 }}>{p.guess}</span>
                <span style={{ textAlign: "center" }}><CompBadge pot={p.conf} /></span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== TOP TARGETS TAB ===== */}
      {activeTab === "targets" && (
        <section style={{ padding: "24px 48px 40px", maxWidth: 1320, margin: "0 auto" }}>
          <p style={{ fontSize: 13, color: MUTED, fontWeight: 300, marginBottom: 20 }}>Highest-potential outbound targets for Valueships, based on WTP client competitors.</p>
          <div style={{ background: "white", border: `1px solid ${BORDER}`, overflow: "hidden" }}>
            {topTargets.map((t, i) => (
              <div key={i} className="target-row fu" style={{ display: "grid", gridTemplateColumns: "40px 1.2fr 1fr 0.8fr 2.5fr", padding: "16px 20px", borderBottom: `1px solid ${BORDER}`, alignItems: "start", animationDelay: `${i * 0.04}s` }}
                onClick={() => window.open(t.url, "_blank")}>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: i < 3 ? RED : MUTED, lineHeight: 1 }}>{t.rank}</span>
                <div>
                  <a href={t.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 15, fontWeight: 600, color: DARK, textDecoration: "none" }}
                    onClick={e => e.stopPropagation()}>
                    {t.name} <span style={{ fontSize: 11, color: MUTED }}>↗</span>
                  </a>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{t.url.replace("https://","").replace("www.","")}</div>
                </div>
                <span style={{ fontSize: 12, color: "#555" }}>{t.ind}</span>
                <span style={{ fontSize: 12, color: MUTED }}>{t.hq}</span>
                <span style={{ fontSize: 12, color: "#555", fontWeight: 300, lineHeight: 1.5 }}>{t.why}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, padding: 28, background: "#fef5f5", border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 10 }}>Valueships Differentiator vs WTP</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { title: "Bigger team (30 vs 10)", desc: "More concurrent project capacity — no bottleneck on single founder" },
                { title: "Broader scope", desc: "Not only SaaS — also e-commerce, marketplace, B2C" },
                { title: "Quantitative WTP research", desc: "Conjoint analysis, Van Westendorp, BPTO — ironic advantage vs WTP" },
                { title: "CEE proximity", desc: "Ideal for Central/Eastern European firms expanding west" },
                { title: "More competitive pricing", desc: "WTP targets premium segment (€50K–200K) — VS can undercut" },
                { title: "Data-first approach", desc: "Revenue diagnostics → research → implementation vs WTP's workshop-first" },
              ].map((d, i) => (
                <div key={i}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 4 }}>{d.title}</div>
                  <div style={{ fontSize: 12, color: "#555", fontWeight: 300 }}>{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== MODAL ===== */}
      {selectedClient && (
        <div className="modal-ov" onClick={() => setSelectedClient(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedClient(null)}
              style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "#bbb", cursor: "pointer", fontSize: 22, fontFamily: "inherit" }}>×</button>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 4 }}>{selectedClient.what}</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 30, color: DARK, fontWeight: 400, marginBottom: 4 }}>
              <a href={selectedClient.url} target="_blank" rel="noopener noreferrer"
                style={{ color: DARK, textDecoration: "none" }}>
                {selectedClient.name} <span style={{ fontSize: 16, color: MUTED }}>↗</span>
              </a>
            </h2>
            <p style={{ fontSize: 12, color: MUTED, marginBottom: 2 }}>{selectedClient.url.replace("https://","").replace("www.","")}</p>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 4 }}>{selectedClient.hq} · ARR: {selectedClient.arr}</p>
            <p style={{ fontSize: 12, color: "#555", fontWeight: 300, marginBottom: 20 }}>{selectedClient.funding}</p>

            <div style={{ padding: 16, background: "#fef5f5", border: `1px solid ${BORDER}`, marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: RED, textTransform: "uppercase", marginBottom: 6 }}>WTP Result</p>
              <p style={{ fontSize: 15, fontWeight: 500, color: DARK, lineHeight: 1.5 }}>{selectedClient.result}</p>
            </div>

            {selectedClient.competitors.length > 0 && (
              <div>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 12 }}>Competitor Targets for Valueships ({selectedClient.competitors.length})</p>
                {selectedClient.competitors.map((comp, j) => (
                  <div key={j} style={{ padding: "16px 0", borderBottom: j < selectedClient.competitors.length - 1 ? `1px solid ${BORDER}` : "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                      <span style={{ width: 22, fontSize: 12, color: "#ccc", flexShrink: 0 }}>{j + 1}</span>
                      <div style={{ flex: 1 }}>
                        <a href={comp.u} target="_blank" rel="noopener noreferrer" className="comp-link" style={{ fontSize: 14, fontWeight: 500 }}>
                          {comp.n} <span style={{ fontSize: 10, color: "#bbb" }}>↗</span>
                        </a>
                        <span style={{ fontSize: 11, color: "#bbb", marginLeft: 8 }}>{comp.u.replace("https://","").replace("www.","")}</span>
                      </div>
                      <CompBadge pot={comp.pot} />
                    </div>
                    <div style={{ marginLeft: 34 }}>
                      <div style={{ fontSize: 11, color: MUTED, marginBottom: 4 }}>{comp.hq} · {comp.fund}</div>
                      <div style={{ fontSize: 12, color: "#555", fontWeight: 300, lineHeight: 1.5, fontStyle: "italic" }}>{comp.arg}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedClient.competitors.length > 0 && (
              <div style={{ marginTop: 24, padding: 20, background: LIGHT, border: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, color: MUTED, textTransform: "uppercase", marginBottom: 8 }}>FOMO Outreach Template</p>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "#555", fontWeight: 300, fontStyle: "italic" }}>
                  "Your competitor <strong style={{ fontWeight: 500, color: RED, fontStyle: "normal" }}>{selectedClient.name}</strong> worked
                  with a pricing consultancy and achieved <strong style={{ fontWeight: 500, color: DARK, fontStyle: "normal" }}>{selectedClient.result.split(",")[0].toLowerCase()}</strong>.
                  In {selectedClient.what.toLowerCase()}, pricing architecture is the #1 lever for unit economics and fundraising. Valueships can help you capture that same value. 15 minutes?"
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ padding: "20px 48px", borderTop: `1px solid ${BORDER}`, maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "#ccc" }}>Valueships Competitive Intelligence · WTP Dossier v1.0 · {totalComps} competitors mapped ({highCount} HIGH, {medCount} MED)</span>
          <span style={{ fontSize: 11, color: "#ccc" }}>Confidential — internal use only · March 2026</span>
        </div>
      </footer>
    </div>
  );
}
