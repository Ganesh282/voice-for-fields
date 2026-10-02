export type Lang = "en" | "te" | "ta";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
];

type Opt = Record<Lang, string>;

export const STATES = [
  "Andhra Pradesh",
  "Telangana",
  "Tamil Nadu",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Odisha",
  "Other",
];

export const FARMER_TYPES: { value: string; label: Opt }[] = [
  { value: "marginal", label: { en: "Marginal farmer", te: "సన్నకారు రైతు", ta: "குறு விவசாயி" } },
  { value: "small", label: { en: "Small farmer", te: "చిన్న రైతు", ta: "சிறு விவசாயி" } },
  { value: "medium", label: { en: "Medium farmer", te: "మధ్యస్థ రైతు", ta: "நடுத்தர விவசாயி" } },
  { value: "large", label: { en: "Large farmer", te: "పెద్ద రైతు", ta: "பெரிய விவசாயி" } },
  { value: "tenant", label: { en: "Tenant / Sharecropper", te: "కౌలు రైతు", ta: "குத்தகை விவசாயி" } },
];

export const IRRIGATION_TYPES: { value: string; label: Opt }[] = [
  { value: "borewell", label: { en: "Borewell", te: "బోరుబావి", ta: "ஆழ்துளை கிணறு" } },
  { value: "canal", label: { en: "Canal", te: "కాలువ", ta: "கால்வாய்" } },
  { value: "drip", label: { en: "Drip / Sprinkler", te: "డ్రిప్ / స్ప్రింక్లర్", ta: "சொட்டு நீர் / தெளிப்பு" } },
  { value: "rainfed", label: { en: "Rain-fed", te: "వర్షాధారం", ta: "மானாவாரி" } },
];

export const LANGUAGE_OPTIONS: { value: Lang; label: string }[] = [
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "en", label: "English" },
  { value: "ta", label: "தமிழ் (Tamil)" },
];

export const T: Record<
  Lang,
  {
    tagline: string;
    subtitle: string;
    headline1: string;
    headline2: string;
    intro: string;
    name: string;
    age: string;
    state: string;
    district: string;
    preferred_language: string;
    land_size: string;
    farmer_type: string;
    crop_type: string;
    irrigation_type: string;
    annual_income: string;
    ph_name: string;
    ph_district: string;
    ph_crop: string;
    select: string;
    submit: string;
    sample: string;
    voiceLabel: string;
    required: string;
    welcomeTitle: string;
    welcomeBody: string;
    back: string;
  }
> = {
  en: {
    tagline: "Voice-first · Telugu · English · Tamil",
    subtitle: "Farmer Welfare Assistant",
    headline1: "Grow with",
    headline2: "your AI Mitra",
    intro:
      "Register once and talk to a voice assistant that finds the right welfare schemes for your land, crop and income — in your own language.",
    name: "Full name",
    age: "Age",
    state: "State",
    district: "District",
    preferred_language: "Preferred language",
    land_size: "Land size (acres)",
    farmer_type: "Farmer type",
    crop_type: "Crop type",
    irrigation_type: "Irrigation type",
    annual_income: "Annual income (₹)",
    ph_name: "Ravi Kumar",
    ph_district: "Guntur",
    ph_crop: "Rice",
    select: "Select",
    submit: "Start voice chat with Mitra",
    sample: "“Which subsidy can I get for my 3-acre rice farm?”",
    voiceLabel: "Voice assistant",
    required: "Please fill in all fields correctly.",
    welcomeTitle: "Namaste",
    welcomeBody: "Your profile is ready. Your voice assistant will now guide you to the best schemes.",
    back: "Edit details",
  },
  te: {
    tagline: "వాయిస్ ఫస్ట్ · తెలుగు · English · தமிழ்",
    subtitle: "రైతు సంక్షేమ సహాయకుడు",
    headline1: "ఎదగండి",
    headline2: "మీ AI మిత్రతో",
    intro:
      "ఒకసారి నమోదు చేసుకోండి — మీ భూమి, పంట, ఆదాయానికి సరిపోయే సంక్షేమ పథకాలను మీ భాషలోనే వాయిస్ అసిస్టెంట్ తెలియజేస్తుంది.",
    name: "పూర్తి పేరు",
    age: "వయస్సు",
    state: "రాష్ట్రం",
    district: "జిల్లా",
    preferred_language: "ఇష్టమైన భాష",
    land_size: "భూమి విస్తీర్ణం (ఎకరాలు)",
    farmer_type: "రైతు రకం",
    crop_type: "పంట రకం",
    irrigation_type: "నీటిపారుదల రకం",
    annual_income: "వార్షిక ఆదాయం (₹)",
    ph_name: "రవి కుమార్",
    ph_district: "గుంటూరు",
    ph_crop: "వరి",
    select: "ఎంచుకోండి",
    submit: "మిత్రతో వాయిస్ చాట్ ప్రారంభించండి",
    sample: "“నా 3 ఎకరాల వరి పొలానికి ఏ సబ్సిడీ వస్తుంది?”",
    voiceLabel: "వాయిస్ అసిస్టెంట్",
    required: "దయచేసి అన్ని వివరాలను సరిగ్గా నింపండి.",
    welcomeTitle: "నమస్తే",
    welcomeBody: "మీ ప్రొఫైల్ సిద్ధంగా ఉంది. మీ వాయిస్ అసిస్టెంట్ ఇప్పుడు ఉత్తమ పథకాల వైపు మార్గనిర్దేశం చేస్తుంది.",
    back: "వివరాలు మార్చండి",
  },
  ta: {
    tagline: "குரல் முதன்மை · தமிழ் · English · తెలుగు",
    subtitle: "விவசாயி நல உதவியாளர்",
    headline1: "வளருங்கள்",
    headline2: "உங்கள் AI மித்ராவுடன்",
    intro:
      "ஒருமுறை பதிவு செய்யுங்கள் — உங்கள் நிலம், பயிர், வருமானத்திற்கு ஏற்ற நலத்திட்டங்களை உங்கள் மொழியிலேயே குரல் உதவியாளர் கண்டறிவார்.",
    name: "முழு பெயர்",
    age: "வயது",
    state: "மாநிலம்",
    district: "மாவட்டம்",
    preferred_language: "விருப்ப மொழி",
    land_size: "நில அளவு (ஏக்கர்)",
    farmer_type: "விவசாயி வகை",
    crop_type: "பயிர் வகை",
    irrigation_type: "பாசன வகை",
    annual_income: "ஆண்டு வருமானம் (₹)",
    ph_name: "ரவி குமார்",
    ph_district: "கோயம்புத்தூர்",
    ph_crop: "நெல்",
    select: "தேர்வு செய்க",
    submit: "மித்ராவுடன் குரல் உரையாடலைத் தொடங்கு",
    sample: "“என் 3 ஏக்கர் நெல் வயலுக்கு என்ன மானியம் கிடைக்கும்?”",
    voiceLabel: "குரல் உதவியாளர்",
    required: "அனைத்து விவரங்களையும் சரியாக நிரப்பவும்.",
    welcomeTitle: "வணக்கம்",
    welcomeBody: "உங்கள் சுயவிவரம் தயார். உங்கள் குரல் உதவியாளர் சிறந்த திட்டங்களுக்கு வழிகாட்டுவார்.",
    back: "விவரங்களைத் திருத்து",
  },
};
