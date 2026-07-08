const knowledgeBase = [
  {
    keywords: ["cholera"],
    disease: "Cholera",
    summary:
      "Cholera is a severe diarrheal illness caused by the bacterium Vibrio cholerae, usually spread through contaminated water or food.",
    symptoms:
      "Sudden watery diarrhea (often described as 'rice water' stool), vomiting, leg cramps, and rapid dehydration. Symptoms can appear within hours to 5 days after infection.",
    prevention:
      "Drink and use safe/boiled or chlorinated water. Wash hands with soap frequently, especially before eating and after using the toilet. Cook food thoroughly and eat it hot. Avoid raw seafood and unpeeled fruits/vegetables in outbreak areas.",
    treatment:
      "Immediate oral rehydration therapy (ORS) is critical. Severe cases need IV fluids at a health facility. Antibiotics may be given in moderate-to-severe cases. Untreated, severe cholera can kill within hours, so rapid rehydration is the priority.",
    whenToSeekHelp:
      "Seek medical care immediately if there is watery diarrhea with vomiting, signs of dehydration (sunken eyes, dry mouth, reduced urination, dizziness), especially in children and the elderly.",
  },
  {
    keywords: ["typhoid", "typhoid fever"],
    disease: "Typhoid Fever",
    summary:
      "Typhoid fever is caused by the bacterium Salmonella Typhi, spread through contaminated food and water, often linked to poor sanitation.",
    symptoms:
      "Sustained high fever (can last several days to weeks), headache, weakness, stomach pain, constipation or diarrhea, and sometimes a rash of flat, rose-colored spots.",
    prevention:
      "Drink boiled or treated water, avoid street food from unhygienic sources, wash hands regularly, and ensure proper sewage disposal in the community. Typhoid vaccines are also available in some regions.",
    treatment:
      "Requires antibiotics prescribed by a doctor. Rest and adequate fluids are important. Do not stop antibiotics early even if the person feels better, as this can cause relapse or resistance.",
    whenToSeekHelp:
      "Seek medical attention if fever persists more than 3 days, especially with severe headache, abdominal pain, or confusion.",
  },
  {
    keywords: ["hepatitis a", "hepatitis"],
    disease: "Hepatitis A",
    summary:
      "Hepatitis A is a liver infection caused by the Hepatitis A virus, usually spread through contaminated water or food, or close contact with an infected person.",
    symptoms:
      "Fatigue, nausea, abdominal pain, loss of appetite, low-grade fever, dark urine, and jaundice (yellowing of skin and eyes).",
    prevention:
      "Practice good hand hygiene, drink safe water, avoid raw or undercooked shellfish, and ensure proper handwashing after using the toilet and before preparing food. A vaccine is available and recommended in high-risk areas.",
    treatment:
      "There is no specific antiviral treatment; care focuses on rest, hydration, and a healthy diet while the liver heals. Avoid alcohol and unnecessary medications that stress the liver.",
    whenToSeekHelp:
      "See a doctor if jaundice appears, or if there is persistent vomiting, severe fatigue, or confusion, which could indicate liver complications.",
  },
  {
    keywords: ["diarrhea", "diarrhoea"],
    disease: "Diarrhea (General/Waterborne)",
    summary:
      "Diarrheal disease is one of the most common waterborne illnesses, often caused by bacteria, viruses, or parasites from contaminated water or food.",
    symptoms:
      "Frequent loose or watery stools, abdominal cramps, sometimes fever, nausea, and vomiting. Can lead to dehydration if not managed.",
    prevention:
      "Safe drinking water, proper handwashing, safe food handling, and good sanitation (toilets, waste disposal) are key. Breastfeeding infants exclusively for the first 6 months also reduces risk.",
    treatment:
      "Oral Rehydration Solution (ORS) is the first line of treatment to replace lost fluids and salts. Zinc supplementation is recommended for children. Continue feeding (do not starve the patient). Antibiotics are only needed for specific bacterial causes, as advised by a doctor.",
    whenToSeekHelp:
      "Seek help if there is blood in stool, high fever, signs of dehydration, diarrhea lasting more than 2 days, or if it's a young child, elderly person, or someone with a weak immune system.",
  },
  {
    keywords: ["leptospirosis", "lepto"],
    disease: "Leptospirosis",
    summary:
      "Leptospirosis is a bacterial disease spread through water or soil contaminated with the urine of infected animals (especially rats). It's common after flooding.",
    symptoms:
      "High fever, headache, muscle aches (especially calves), red eyes, vomiting, and sometimes jaundice in severe cases. Can progress to kidney or liver damage if untreated.",
    prevention:
      "Avoid wading or swimming in flood water or stagnant water, especially with open cuts or wounds. Use protective footwear in flood-prone areas. Control rodent populations around homes.",
    treatment:
      "Antibiotics (such as doxycycline or penicillin) are effective, especially if started early. Severe cases may require hospitalization for organ support.",
    whenToSeekHelp:
      "Seek medical care urgently if there is high fever with muscle pain after exposure to flood water, especially with yellowing skin/eyes or reduced urination.",
  },
  {
    keywords: ["water quality", "water testing", "ph", "turbidity"],
    disease: "Water Quality Basics",
    summary:
      "Water quality testing helps identify contamination risks before disease outbreaks happen. Key indicators include pH, turbidity, and presence of harmful bacteria.",
    symptoms: "Not applicable — this is about testing water sources, not a disease.",
    prevention:
      "Safe drinking water should have a pH between 6.5 and 8.5. Turbidity (cloudiness) should be low — high turbidity can hide harmful microbes and make disinfection less effective. Regularly test community water sources, especially after heavy rains or flooding.",
    treatment:
      "If water is found unsafe: boil water for at least 1 minute before drinking, use water purification tablets, or install a proper filtration system. Chlorination is effective for treating larger water supplies.",
    whenToSeekHelp:
      "Report unsafe water test results (high turbidity, abnormal pH, or suspected contamination) to local health/water authorities immediately.",
  },
  {
    keywords: ["handwashing", "hand hygiene", "wash hands"],
    disease: "Handwashing & Hygiene",
    summary:
      "Proper handwashing is one of the most effective ways to prevent the spread of waterborne and other infectious diseases.",
    symptoms: "Not applicable — this is a prevention practice.",
    prevention:
      "Wash hands with soap and clean water for at least 20 seconds, especially: before eating or preparing food, after using the toilet, after touching animals, and after caring for someone who is sick. If soap and water aren't available, use an alcohol-based hand sanitizer.",
    treatment: "Not applicable.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["ors", "oral rehydration", "dehydration"],
    disease: "Oral Rehydration Solution (ORS) & Dehydration",
    summary:
      "ORS is a simple, life-saving mixture of clean water, salt, and sugar that helps replace fluids lost during diarrhea or vomiting.",
    symptoms:
      "Signs of dehydration include: excessive thirst, dry mouth, reduced urination, sunken eyes, dizziness, fatigue, and in severe cases, confusion or unconsciousness.",
    prevention:
      "Keep ORS packets available in the household and at health centers, especially during monsoon season and outbreak periods.",
    treatment:
      "Mix ORS with clean water exactly as instructed on the packet. Give small, frequent sips, especially to children. Continue giving ORS throughout the illness, along with normal food once appetite returns.",
    whenToSeekHelp:
      "If a person cannot keep fluids down, shows severe dehydration signs, or is unconscious, take them to a health facility immediately for IV fluids.",
  },
  {
    keywords: ["flood", "flooding", "monsoon safety"],
    disease: "Flood & Monsoon Safety",
    summary:
      "Floods dramatically increase the risk of waterborne diseases by contaminating drinking water sources and spreading bacteria/parasites.",
    symptoms: "Not applicable — this is a general safety topic.",
    prevention:
      "Avoid contact with flood water where possible. Store drinking water in clean, covered containers before floods hit. Boil or treat all water during and after flooding, even if it looks clean. Keep food covered and away from flood water.",
    treatment: "Not applicable.",
    whenToSeekHelp:
      "Watch closely for fever, diarrhea, or skin infections in flood-affected communities and report clusters of illness to health authorities quickly.",
  },
  {
    keywords: ["malaria", "mosquito", "dengue"],
    disease: "Malaria & Mosquito-Borne Diseases",
    summary:
      "While not strictly waterborne, malaria and dengue are linked to stagnant water where mosquitoes breed, making them relevant to community water safety programs.",
    symptoms:
      "Malaria: fever, chills, sweating, headache, nausea. Dengue: high fever, severe headache, pain behind eyes, joint/muscle pain, rash.",
    prevention:
      "Eliminate stagnant water around homes (old tires, containers, blocked drains). Use mosquito nets, repellents, and wear long sleeves at dawn/dusk. Community-level larviciding of water bodies helps control breeding.",
    treatment:
      "Malaria requires antimalarial medication prescribed by a doctor after confirmed testing. Dengue has no specific cure — treatment focuses on fluids, rest, and fever management; avoid aspirin/ibuprofen which can worsen bleeding risk.",
    whenToSeekHelp:
      "Seek care immediately for high fever with chills, or any bleeding/bruising with fever, as this can indicate severe dengue.",
  },
  {
    keywords: ["boiling water", "boil water", "safe drinking water"],
    disease: "Safe Drinking Water Practices",
    summary:
      "Making water safe to drink is one of the most powerful ways to prevent nearly all waterborne diseases.",
    symptoms: "Not applicable — this is a prevention practice.",
    prevention:
      "Boil water for at least 1 minute (3 minutes at high altitude) to kill most pathogens. Alternatively, use water purification tablets, a good quality filter, or solar disinfection (leaving water in clear bottles in direct sunlight for 6+ hours). Store treated water in clean, covered containers, and use a clean cup/ladle — never dip hands into stored water.",
    treatment: "Not applicable.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["sanitation", "toilet", "open defecation"],
    disease: "Sanitation & Toilet Hygiene",
    summary:
      "Proper sanitation infrastructure, like safe toilets, is essential to prevent human waste from contaminating water sources.",
    symptoms: "Not applicable — this is a prevention practice.",
    prevention:
      "Use a proper latrine/toilet rather than open defecation, especially near water sources. Ensure toilets are located away from wells and rivers. Wash hands with soap after using the toilet. Community sanitation programs significantly reduce diarrheal disease rates.",
    treatment: "Not applicable.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["food safety", "food hygiene", "street food"],
    disease: "Food Safety & Hygiene",
    summary:
      "Contaminated food is a major pathway for waterborne and foodborne diseases, especially in areas with unsafe water supply.",
    symptoms: "Not applicable — this is a prevention practice.",
    prevention:
      "Cook food thoroughly, especially meat and seafood. Eat food while it's hot. Avoid raw vegetables/fruits that can't be peeled in high-risk areas. Wash fruits and vegetables with safe water. Store cooked food properly and reheat thoroughly before eating leftovers.",
    treatment: "Not applicable.",
    whenToSeekHelp:
      "If several people who ate the same food become sick with vomiting/diarrhea, report it to local health authorities as a possible food poisoning outbreak.",
  },
  {
    keywords: ["asha worker", "asha", "community health worker"],
    disease: "Role of ASHA Workers",
    summary:
      "ASHA (Accredited Social Health Activist) workers are community health workers who play a critical role in early detection and prevention of waterborne diseases in rural India.",
    symptoms: "Not applicable.",
    prevention:
      "ASHA workers should: monitor and report suspected disease cases quickly, educate communities on hygiene and safe water practices, distribute ORS and basic medicines, and coordinate with health officials during outbreaks.",
    treatment: "Not applicable.",
    whenToSeekHelp:
      "ASHA workers should escalate any cluster of similar symptoms in a village to the nearest Primary Health Centre (PHC) immediately.",
  },
  {
    keywords: ["outbreak", "epidemic", "cluster"],
    disease: "Outbreak Response Basics",
    summary:
      "An outbreak is when disease cases occur more often than expected in a specific area or group, often signaling contaminated water or food sources.",
    symptoms: "Not applicable.",
    prevention:
      "Regular water quality testing and quick case reporting help catch outbreaks early. This app automatically flags when 3 or more cases of the same disease appear in one district.",
    treatment: "Not applicable.",
    whenToSeekHelp:
      "If you notice several people in the same area getting sick with similar symptoms within a short time, report it immediately through the Case Reports section and notify local health officials.",
  },
  {
    keywords: ["pregnant", "pregnancy", "children risk"],
    disease: "High-Risk Groups (Pregnant Women & Children)",
    summary:
      "Pregnant women, young children, and elderly people are at higher risk of severe complications from waterborne diseases.",
    symptoms:
      "Same core symptoms as the specific disease, but dehydration and complications progress faster in these groups.",
    prevention:
      "Extra care with water and food safety is essential. Pregnant women should avoid unsafe water/food entirely where possible. Ensure children are up to date on relevant vaccines (like Hepatitis A, typhoid where available).",
    treatment:
      "Seek medical care earlier rather than later for these groups — do not wait to see if symptoms improve on their own.",
    whenToSeekHelp:
      "Any fever, diarrhea, or vomiting in a pregnant woman, infant, or elderly person should be checked by a health worker promptly.",
  },
  {
    keywords: ["paracetamol", "fever medicine", "acetaminophen"],
    disease: "Paracetamol (Fever & Pain Relief)",
    summary:
      "Paracetamol (acetaminophen) is a common medicine used to reduce fever and relieve mild pain. It's often the first choice for fever in waterborne diseases.",
    symptoms: "Not applicable — this is a medicine, not a disease.",
    prevention: "Not applicable.",
    treatment:
      "Take as per package instructions or a doctor's advice, usually every 4-6 hours as needed, not exceeding the daily maximum dose. Do not combine with other paracetamol-containing products. Avoid in people with liver problems without medical advice.",
    whenToSeekHelp:
      "If fever doesn't reduce after taking paracetamol, or returns quickly and repeatedly, see a doctor rather than continuing to self-medicate.",
  },
  {
    keywords: ["zinc", "zinc supplement", "zinc tablets"],
    disease: "Zinc Supplementation",
    summary:
      "Zinc supplements are recommended alongside ORS for children with diarrhea, as they help reduce the duration and severity of the illness and future episodes.",
    symptoms: "Not applicable — this is a treatment supplement.",
    prevention:
      "Regular zinc intake through diet (or supplements in deficient populations) can reduce diarrhea frequency in children.",
    treatment:
      "For children with diarrhea: 10mg/day for infants under 6 months, 20mg/day for children over 6 months, given for 10-14 days alongside ORS, as recommended by WHO/UNICEF guidelines.",
    whenToSeekHelp: "Consult a health worker for correct dosing, especially for infants.",
  },
  {
    keywords: ["antibiotics", "antibiotic resistance", "medicine course"],
    disease: "Antibiotics & Antibiotic Resistance",
    summary:
      "Antibiotics treat bacterial infections like typhoid and leptospirosis, but must be used correctly to avoid resistance, where bacteria become harder to treat.",
    symptoms: "Not applicable.",
    prevention:
      "Only take antibiotics prescribed by a qualified doctor. Complete the full course even if symptoms improve early. Never share antibiotics or use leftover doses from a previous illness.",
    treatment:
      "Follow the prescribed dose and duration exactly. Antibiotics do NOT work on viral infections (like most diarrhea or Hepatitis A), so they should only be used when a bacterial cause is confirmed or strongly suspected by a doctor.",
    whenToSeekHelp:
      "If side effects like severe rash, breathing difficulty, or severe stomach pain occur after taking antibiotics, seek medical help immediately.",
  },
  {
    keywords: ["vaccine", "vaccination", "immunization"],
    disease: "Vaccines for Waterborne Diseases",
    summary:
      "Vaccines exist for some waterborne diseases like typhoid and Hepatitis A, and can significantly reduce risk in high-exposure areas.",
    symptoms: "Not applicable.",
    prevention:
      "Typhoid vaccine and Hepatitis A vaccine are recommended in high-risk regions, especially for children and travelers. Vaccination doesn't replace safe water and hygiene practices — it's an added layer of protection.",
    treatment: "Not applicable.",
    whenToSeekHelp:
      "Consult your local health center or ASHA worker about vaccine availability and eligibility in your area.",
  },
  {
    keywords: ["chlorination", "chlorine tablets", "water disinfection"],
    disease: "Chlorination & Water Disinfection",
    summary:
      "Chlorination is a widely used, low-cost method to disinfect water at both household and community levels.",
    symptoms: "Not applicable.",
    prevention:
      "Use chlorine tablets or liquid chlorine (like sodium hypochlorite solution) following package instructions. Typically, water should sit for 30 minutes after adding chlorine before use. Store chlorinated water in clean, covered containers.",
    treatment: "Not applicable.",
    whenToSeekHelp:
      "If water still tastes/smells strongly of contamination after treatment, or if a community water source needs large-scale disinfection, contact water/health authorities.",
  },
  {
    keywords: ["well water", "borewell", "hand pump", "tube well"],
    disease: "Well & Borewell Water Safety",
    summary:
      "Wells, borewells, and hand pumps are common water sources in rural areas but can become contaminated from nearby latrines, flooding, or poor maintenance.",
    symptoms: "Not applicable.",
    prevention:
      "Locate wells at least 15-30 meters away from latrines/soak pits. Keep the area around the well clean and well-drained. Cover wells to prevent debris and animals from contaminating water. Test well water periodically, especially after floods.",
    treatment:
      "If contamination is suspected, boil or chlorinate the water before use and report it for community-level testing.",
    whenToSeekHelp:
      "Report any well water with unusual color, smell, or taste to local health/water authorities immediately.",
  },
  {
    keywords: ["rainwater harvesting", "rainwater storage"],
    disease: "Rainwater Harvesting & Storage",
    summary:
      "Rainwater harvesting can provide a valuable water source, but stored rainwater must be handled carefully to avoid contamination.",
    symptoms: "Not applicable.",
    prevention:
      "Use clean, covered storage tanks. Ensure roof catchment areas are clean of debris/bird droppings before collection. Filter and treat (boil or chlorinate) stored rainwater before drinking, especially after long storage periods.",
    treatment: "Not applicable.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["waste management", "garbage disposal", "solid waste"],
    disease: "Waste Management & Community Health",
    summary:
      "Poor waste management can contaminate nearby water sources and attract disease-carrying pests like rats and mosquitoes.",
    symptoms: "Not applicable.",
    prevention:
      "Dispose of household waste in covered bins, away from water sources. Avoid dumping waste near rivers, ponds, or wells. Support community waste collection and disposal systems where available.",
    treatment: "Not applicable.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["primary health centre", "phc", "hospital", "nearest hospital"],
    disease: "Primary Health Centres (PHC) & Referral",
    summary:
      "A Primary Health Centre (PHC) is usually the first point of contact for rural healthcare in India, equipped to handle common illnesses and refer serious cases further.",
    symptoms: "Not applicable.",
    prevention: "Not applicable.",
    treatment:
      "PHCs can provide ORS, basic medicines, and first-line treatment for many waterborne diseases. Severe cases (like severe dehydration, jaundice, or organ complications) are typically referred to a district hospital.",
    whenToSeekHelp:
      "Contact your nearest PHC or ASHA worker for any case that doesn't improve with home care, or immediately for severe symptoms.",
  },
  {
    keywords: ["risk level", "high risk", "medium risk", "low risk meaning"],
    disease: "Understanding Risk Levels in This App",
    summary:
      "This website automatically calculates a Risk Level (Low, Medium, or High) for each case report based on the disease type and reported symptoms.",
    symptoms: "Not applicable — this explains a website feature.",
    prevention: "Not applicable.",
    treatment:
      "High risk means the case needs urgent attention (e.g., cholera, or symptoms like dehydration/jaundice). Medium risk means the case should be monitored closely with specific treatment. Low risk means general monitoring and hygiene advice is sufficient. This is calculated automatically — you don't need to set it manually.",
    whenToSeekHelp:
      "Always treat a 'High' risk flag as a signal to act quickly, regardless of how the patient currently looks.",
  },
  {
    keywords: ["add report", "how to add report", "new case report", "submit report"],
    disease: "How to Add a Case Report (Website Help)",
    summary:
      "This explains how to submit a new case report on the AquaGuard NE website.",
    symptoms: "Not applicable — this is a website how-to.",
    prevention: "Not applicable.",
    treatment:
      "Go to the 'Add Report' page from the left menu or the 'New Case Report' button on the Dashboard. Fill in the patient's details, village, district, disease, symptoms, and date, then submit. The report will appear immediately in Case Reports with an automatically calculated risk level and suggested action.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["water quality page", "add water reading", "how to add water quality"],
    disease: "How to Add a Water Quality Reading (Website Help)",
    summary:
      "This explains how to record a new water quality test on the AquaGuard NE website.",
    symptoms: "Not applicable — this is a website how-to.",
    prevention: "Not applicable.",
    treatment:
      "Go to the 'Water Quality' page from the left menu or Dashboard Quick Actions. Fill in the source name, district, pH level, turbidity, risk level, and test date, then click 'Add Reading'. It will appear in the table below and on the Dashboard's Water Source Alerts if it's Medium or High risk.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["status meaning", "pending verified resolved", "what does pending mean"],
    disease: "Understanding Report Status (Website Help)",
    summary:
      "Each case report has a status showing where it is in the review process.",
    symptoms: "Not applicable — this is a website how-to.",
    prevention: "Not applicable.",
    treatment:
      "Pending means the report has been submitted but not yet reviewed. Verified means a health worker has confirmed the case details. Resolved means the patient has recovered or the case is closed. You can change a report's status using the dropdown in the Case Reports table.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["register user", "add asha worker", "how to register"],
    disease: "How to Register a New User (Website Help)",
    summary:
      "This explains how to add a new ASHA worker or staff account on the AquaGuard NE website.",
    symptoms: "Not applicable — this is a website how-to.",
    prevention: "Not applicable.",
    treatment:
      "Go to the 'Register User' page from the left menu. Fill in the required details for the new worker and submit. They can then log in with the credentials created.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["dashboard", "what is dashboard", "dashboard mean"],
    disease: "About the Dashboard (Website Help)",
    summary:
      "The Dashboard is the main overview page of the AquaGuard NE website.",
    symptoms: "Not applicable — this is a website how-to.",
    prevention: "Not applicable.",
    treatment:
      "It shows total reports, pending/verified/resolved counts, a disease breakdown chart, recent case reports, real water source alerts, and quick action buttons to jump to other pages like Add Report, Water Quality, and this chatbot.",
    whenToSeekHelp: "Not applicable.",
  },
  {
    keywords: ["about this website", "what is aquaguard", "purpose of this app"],
    disease: "About AquaGuard NE",
    summary:
      "AquaGuard NE is a smart community health monitoring and early warning system for water-borne disease surveillance across Northeast India.",
    symptoms: "Not applicable.",
    prevention: "Not applicable.",
    treatment:
      "It tracks cholera, typhoid, hepatitis A, diarrhea, and leptospirosis cases across NE India, provides digital case reporting, a real-time dashboard, automated outbreak alerts, water quality monitoring, and this health assistant chatbot — all to help health workers respond faster and more effectively.",
    whenToSeekHelp: "Not applicable.",
  },
];

export default knowledgeBase;