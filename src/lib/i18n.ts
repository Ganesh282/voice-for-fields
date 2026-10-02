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

export const V: Record<
  Lang,
  {
    ask: Record<
      | "name"
      | "age"
      | "state"
      | "district"
      | "preferred_language"
      | "land_size"
      | "farmer_type"
      | "crop_type"
      | "irrigation_type"
      | "annual_income",
      string
    >;
    guide: string;
    guideHint: string;
    stop: string;
    speakField: string;
    listening: string;
    heard: string;
    retry: string;
    unsupported: string;
    micDenied: string;
    allDone: string;
  }
> = {
  en: {
    ask: {
      name: "Please tell me your name.",
      age: "How old are you?",
      state: "Which state are you from? Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, Kerala, Maharashtra or Odisha.",
      district: "Tell me your district name.",
      preferred_language: "Which language do you prefer? Telugu, English or Tamil.",
      land_size: "How many acres of land do you have?",
      farmer_type: "What type of farmer are you? Marginal, small, medium, large or tenant farmer.",
      crop_type: "Which crop do you grow?",
      irrigation_type: "How do you water your crop? Borewell, canal, drip or rain-fed.",
      annual_income: "What is your yearly income in rupees?",
    },
    guide: "Fill the form by voice",
    guideHint: "Mitra asks each question aloud. Just speak your answer.",
    stop: "Stop",
    speakField: "Speak your answer for",
    listening: "Listening… please speak now",
    heard: "Got it",
    retry: "Sorry, I could not understand. Please try again.",
    unsupported: "Voice input is not supported in this browser. Please open this page in Google Chrome.",
    micDenied: "Microphone is blocked. Please allow microphone access and try again.",
    allDone: "All details are filled. Please check them and press the start button.",
  },
  te: {
    ask: {
      name: "దయచేసి మీ పేరు చెప్పండి.",
      age: "మీ వయస్సు ఎంత?",
      state: "మీది ఏ రాష్ట్రం? ఆంధ్రప్రదేశ్, తెలంగాణ, తమిళనాడు, కర్ణాటక, కేరళ, మహారాష్ట్ర లేదా ఒడిశా.",
      district: "మీ జిల్లా పేరు చెప్పండి.",
      preferred_language: "మీకు ఇష్టమైన భాష ఏది? తెలుగు, ఇంగ్లీష్ లేదా తమిళం.",
      land_size: "మీకు ఎన్ని ఎకరాల భూమి ఉంది?",
      farmer_type: "మీరు ఏ రకం రైతు? సన్నకారు, చిన్న, మధ్యస్థ, పెద్ద లేదా కౌలు రైతు.",
      crop_type: "మీరు ఏ పంట పండిస్తున్నారు?",
      irrigation_type: "మీ పంటకు నీరు ఎలా అందుతుంది? బోరుబావి, కాలువ, డ్రిప్ లేదా వర్షాధారం.",
      annual_income: "మీ సంవత్సర ఆదాయం ఎంత రూపాయలు?",
    },
    guide: "వాయిస్‌తో ఫారం నింపండి",
    guideHint: "మిత్ర ప్రతి ప్రశ్నను గట్టిగా అడుగుతుంది. మీ జవాబు చెప్పండి చాలు.",
    stop: "ఆపండి",
    speakField: "మాట్లాడి చెప్పండి:",
    listening: "వింటున్నాను… ఇప్పుడు మాట్లాడండి",
    heard: "అర్థమైంది",
    retry: "క్షమించండి, అర్థం కాలేదు. దయచేసి మళ్లీ చెప్పండి.",
    unsupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ పని చేయదు. దయచేసి Google Chrome లో తెరవండి.",
    micDenied: "మైక్రోఫోన్ నిలిపివేయబడింది. దయచేసి అనుమతించి మళ్లీ ప్రయత్నించండి.",
    allDone: "అన్ని వివరాలు నింపబడ్డాయి. దయచేసి సరిచూసి ప్రారంభ బటన్ నొక్కండి.",
  },
  ta: {
    ask: {
      name: "உங்கள் பெயரைச் சொல்லுங்கள்.",
      age: "உங்கள் வயது என்ன?",
      state: "உங்கள் மாநிலம் எது? ஆந்திரப் பிரதேசம், தெலங்கானா, தமிழ்நாடு, கர்நாடகா, கேரளா, மகாராஷ்டிரா அல்லது ஒடிசா.",
      district: "உங்கள் மாவட்டத்தின் பெயரைச் சொல்லுங்கள்.",
      preferred_language: "உங்களுக்கு விருப்பமான மொழி எது? தெலுங்கு, ஆங்கிலம் அல்லது தமிழ்.",
      land_size: "உங்களிடம் எத்தனை ஏக்கர் நிலம் உள்ளது?",
      farmer_type: "நீங்கள் எந்த வகை விவசாயி? குறு, சிறு, நடுத்தர, பெரிய அல்லது குத்தகை விவசாயி.",
      crop_type: "நீங்கள் என்ன பயிர் செய்கிறீர்கள்?",
      irrigation_type: "உங்கள் பயிருக்கு எப்படி தண்ணீர் பாய்ச்சுகிறீர்கள்? ஆழ்துளை கிணறு, கால்வாய், சொட்டு நீர் அல்லது மானாவாரி.",
      annual_income: "உங்கள் ஆண்டு வருமானம் எத்தனை ரூபாய்?",
    },
    guide: "குரலால் படிவத்தை நிரப்புங்கள்",
    guideHint: "மித்ரா ஒவ்வொரு கேள்வியையும் சத்தமாகக் கேட்கும். உங்கள் பதிலைச் சொல்லுங்கள்.",
    stop: "நிறுத்து",
    speakField: "பேசிப் பதிலளிக்க:",
    listening: "கேட்கிறேன்… இப்போது பேசுங்கள்",
    heard: "புரிந்தது",
    retry: "மன்னிக்கவும், புரியவில்லை. மீண்டும் சொல்லுங்கள்.",
    unsupported: "இந்த உலாவியில் குரல் உள்ளீடு இல்லை. Google Chrome-இல் திறக்கவும்.",
    micDenied: "மைக்ரோஃபோன் தடுக்கப்பட்டுள்ளது. அனுமதித்து மீண்டும் முயற்சிக்கவும்.",
    allDone: "அனைத்து விவரங்களும் நிரப்பப்பட்டன. சரிபார்த்து தொடங்கு பொத்தானை அழுத்தவும்.",
  },
};
