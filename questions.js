/**
 * Seed question bank — original FRCS-style single-best-answer questions.
 * Schema: { id, topic, difficulty, stem, options[4], answer (index), explanation }
 * Replace or extend this array (or load from a JSON endpoint) with your own bank.
 */
const QUESTION_BANK = [
  // ---------- General Surgery ----------
  {
    id: "gs-1", topic: "General Surgery", difficulty: "Core",
    stem: "A 54-year-old man presents with colicky abdominal pain, vomiting and distension 3 weeks after an open cholecystectomy. AXR shows dilated small bowel. What is the most likely cause?",
    options: ["Adhesions", "Incarcerated hernia", "Crohn's stricture", "Gallstone ileus"],
    answer: 0,
    explanation: "Adhesions are the commonest cause of small bowel obstruction in adults with previous abdominal surgery. Always exclude hernia and consider malignancy/Crohn's in patients without prior surgery."
  },
  {
    id: "gs-2", topic: "General Surgery", difficulty: "Core",
    stem: "Which structure is compressed during the Pringle manoeuvre?",
    options: ["Coeliac axis", "Hepatoduodenal ligament contents", "Splenic artery", "Inferior vena cava"],
    answer: 1,
    explanation: "The Pringle manoeuvre compresses the portal triad (hepatic artery, portal vein, bile duct) within the free edge of the lesser omentum to control hepatic inflow bleeding."
  },
  {
    id: "gs-3", topic: "General Surgery", difficulty: "Core",
    stem: "Charcot's triad (RUQ pain, fever, jaundice) is classically seen in which condition?",
    options: ["Acute cholecystitis", "Ascending cholangitis", "Acute pancreatitis", "Obstructing gallstone ileus"],
    answer: 1,
    explanation: "Charcot's triad indicates ascending cholangitis (often from choledocholithiasis). Add hypotension and confusion → Reynolds' pentad; treat urgently with antibiotics and biliary drainage."
  },
  {
    id: "gs-4", topic: "General Surgery", difficulty: "Core",
    stem: "A direct inguinal hernia protrudes in relation to the inferior epigastric vessels in which direction?",
    options: ["Lateral", "Medial", "Superior", "Posterior"],
    answer: 1,
    explanation: "Direct hernias push through the posterior wall of the inguinal canal medial to the inferior epigastric vessels; indirect hernias enter the deep ring lateral to them."
  },
  {
    id: "gs-5", topic: "General Surgery", difficulty: "Core",
    stem: "Which hernia is most common in women and carries the highest risk of strangulation?",
    options: ["Indirect inguinal", "Direct inguinal", "Femoral", "Umbilical"],
    answer: 2,
    explanation: "Femoral hernias are more common in women and have a narrow, rigid neck → high risk of incarceration and strangulation; repair promptly."
  },
  {
    id: "gs-6", topic: "General Surgery", difficulty: "Advanced",
    stem: "Visceral pain from an inflamed appendix is initially felt periumbilically. Which spinal segment carries this afferent pain?",
    options: ["T6", "T8", "T10", "T12"],
    answer: 2,
    explanation: "The appendix is a midgut derivative; visceral afferents enter at T10, producing referred periumbilical pain before inflammation reaches the parietal peritoneum (RIF somatic pain)."
  },
  {
    id: "gs-7", topic: "General Surgery", difficulty: "Advanced",
    stem: "In TNM staging for colorectal cancer, a tumour invading through the muscularis propria into the perirectal tissues, with no nodal disease, is which stage group?",
    options: ["Stage I", "Stage IIA", "Stage IIB", "Stage III"],
    answer: 1,
    explanation: "T3N0M0 corresponds to Stage IIA. T1–T2N0M0 is Stage I, T4N0M0 is Stage IIB/IIC depending on detail, and any N+ without metastasis is Stage III."
  },

  // ---------- Orthopaedics ----------
  {
    id: "or-1", topic: "Orthopaedics", difficulty: "Core",
    stem: "A Colles' fracture is a distal radius fracture with which displacement?",
    options: ["Volar displacement of the distal fragment", "Dorsal displacement of the distal fragment", "Lateral displacement only", "Impacted, non-displaced"],
    answer: 1,
    explanation: "Colles' = extra-articular distal radius fracture with dorsal angulation/displacement producing the 'dinner fork' deformity; usually FOOSH. Volar displacement = Smith's fracture."
  },
  {
    id: "or-2", topic: "Orthopaedics", difficulty: "Core",
    stem: "A 78-year-old woman sustains a displaced intracapsular femoral neck fracture after a fall. What is the definitive treatment of choice?",
    options: ["Dynamic hip screw", "Cannulated screws", "Hemiarthroplasty", "Conservative traction"],
    answer: 2,
    explanation: "In an older patient with a displaced intracapsular fracture, the disrupted blood supply (medial circumflex) makes AVN/non-union likely — arthroplasty is preferred. Cannulated screws for nondisplaced; DHS for extracapsular."
  },
  {
    id: "or-3", topic: "Orthopaedics", difficulty: "Core",
    stem: "A 24-year-old rugby player dislocates his shoulder. What is the commonest direction and the typical associated labral injury?",
    options: ["Posterior dislocation; reverse Bankart", "Anterior dislocation; anteroinferior labral (Bankart) lesion", "Inferior dislocation; SLAP lesion", "Anterior dislocation; rotator cuff tear only"],
    answer: 1,
    explanation: "Anterior dislocation accounts for ~95% of cases; the Bankart lesion is an anteroinferior glenoid labral tear. Axillary nerve injury is common and must be documented."
  },
  {
    id: "or-4", topic: "Orthopaedics", difficulty: "Advanced",
    stem: "Which finding is the earliest and most reliable sign of acute compartment syndrome?",
    options: ["Pulselessness", "Pain out of proportion / on passive stretch", "Pallor of the limb", "Complete sensory loss"],
    answer: 1,
    explanation: "Pain out of proportion and pain on passive stretch of involved muscles are the earliest signs; the other 'Ps' are late signs of irreversible ischaemia. Diagnosis is clinical; measure compartment pressure if unclear (ΔP < 30 mmHg relative to diastolic)."
  },
  {
    id: "or-5", topic: "Orthopaedics", difficulty: "Core",
    stem: "A fall on an outstretched hand causes snuffbox tenderness but normal initial radiographs. What is the most appropriate management?",
    options: ["Discharge with analgesia", "Treat as scaphoid fracture and immobilise, repeat imaging in 10–14 days", "Immediate ORIF", "CT only if pain persists at 6 weeks"],
    answer: 1,
    explanation: "Scaphoid fractures are often radiographically occult at presentation. Immobilise (thumb spica) and repeat X-ray/MRI at 10–14 days; missed fractures risk proximal pole AVN and non-union."
  },

  // ---------- Trauma & Critical Care ----------
  {
    id: "tc-1", topic: "Trauma & Critical Care", difficulty: "Core",
    stem: "During ATLS primary survey, a patient with suspected tension pneumothorax should be treated with immediate needle decompression at which site?",
    options: ["2nd intercostal space, mid-clavicular line", "5th intercostal space, mid-axillary line (or 2nd ICS MCL per protocol)", "4th intercostal space, mid-clavicular line", "Below the 12th rib posteriorly"],
    answer: 1,
    explanation: "Needle decompression is performed immediately without awaiting CXR; site varies by protocol (4th/5th ICS AAL per ATLS 10th ed, or 2nd ICS MCL historically). Definitive treatment is chest drain + senior help."
  },
  {
    id: "tc-2", topic: "Trauma & Critical Care", difficulty: "Core",
    stem: "Massive transfusion protocol typically uses which ratio of packed red cells : FFP : platelets?",
    options: ["1:1:1", "2:1:1", "4:1:1", "1:2:4"],
    answer: 0,
    explanation: "A 1:1:1 protocol approximates whole blood and reduces dilutional coagulopathy; give TXA early (within 3 h) and correct hypocalcaemia and hypothermia."
  },
  {
    id: "tc-3", topic: "Trauma & Critical Care", difficulty: "Advanced",
    stem: "Beck's triad of cardiac tamponade consists of hypotension, raised JVP and which third feature?",
    options: ["Muffled heart sounds", "Pulsus paradoxus only", "Widened pulse pressure", "Kussmaul's sign"],
    answer: 0,
    explanation: "Beck's triad: hypotension, elevated JVP, muffled heart sounds. Pulsus paradoxus supports the diagnosis; definitive management is pericardiocentesis/surgical drainage."
  },

  // ---------- Vascular ----------
  {
    id: "va-1", topic: "Vascular", difficulty: "Core",
    stem: "What is the usual diameter threshold for elective repair of an asymptomatic abdominal aortic aneurysm in a man?",
    options: ["3.0 cm", "4.0 cm", "5.5 cm", "7.0 cm"],
    answer: 2,
    explanation: "5.5 cm in men (≈5.0 cm in women) is the conventional elective repair threshold; below this, ultrasound surveillance with cardiovascular risk factor modification."
  },
  {
    id: "va-2", topic: "Vascular", difficulty: "Core",
    stem: "The '6 Ps' of acute limb ischaemia include pain, pallor, pulselessness, paraesthesia, paralysis and which one?",
    options: ["Pruritus", "Perishingly cold (poikilothermia)", "Pitting oedema", "Pulsatile mass"],
    answer: 1,
    explanation: "The 6 Ps: pain, pallor, pulselessness, paraesthesia, paralysis, perishingly cold. Sensation/motor loss indicate irreversible ischaemia risk — revascularise urgently (embolectomy ± imaging first)."
  },

  // ---------- Urology ----------
  {
    id: "ur-1", topic: "Urology", difficulty: "Core",
    stem: "First-line analgesia for acute renal colic is:",
    options: ["IV opioids", "NSAIDs (e.g. diclofenac)", "Paracetamol alone", "Antispasmodics"],
    answer: 1,
    explanation: "NSAIDs are first line — they reduce ureteric spasm and prostaglandin-mediated pain; opioids are second line. Assess for infection/obstruction (sepsis → urgent decompression)."
  },
  {
    id: "ur-2", topic: "Urology", difficulty: "Core",
    stem: "The commonest organism causing uncomplicated urinary tract infection is:",
    options: ["Klebsiella pneumoniae", "Proteus mirabilis", "Escherichia coli", "Enterococcus faecalis"],
    answer: 2,
    explanation: "E. coli accounts for ~80–85% of uncomplicated UTIs. Proteus suggests stones (urease, struvite); Enterococcus is commoner in catheter-associated/HCU infection."
  },
  {
    id: "ur-3", topic: "Urology", difficulty: "Advanced",
    stem: "TUR syndrome after transurethral prostate resection is caused mainly by:",
    options: ["Hyperkalaemia from blood transfusion", "Dilutional hyponatraemia from irrigation fluid absorption", "Sepsis from infected urine", "CO2 embolism"],
    answer: 1,
    explanation: "Absorption of hypotonic irrigation fluid causes dilutional hyponatraemia with confusion, hypertension, bradycardia and visual disturbances. Use isotonic irrigation where possible; monitor procedure time."
  },

  // ---------- Cardiothoracic ----------
  {
    id: "ct-1", topic: "Cardiothoracic", difficulty: "Core",
    stem: "Which conduit has the best long-term patency for CABG when grafted to the LAD?",
    options: ["Great saphenous vein", "Left internal mammary artery", "Radial artery", "Synthetic graft"],
    answer: 1,
    explanation: "LIMA-to-LAD gives superior long-term patency and survival. Radial artery is a good second arterial conduit; vein grafts are more prone to intimal hyperplasia/atherosclerosis."
  },

  // ---------- Neurosurgery ----------
  {
    id: "ns-1", topic: "Neurosurgery", difficulty: "Core",
    stem: "A 22-year-old man has a lucid interval after a head injury, then rapid deterioration. The classic causative vessel is the:",
    options: ["Bridging veins", "Middle meningeal artery", "Anterior cerebral artery", "Basilar artery"],
    answer: 1,
    explanation: "Epidural haematoma classically follows temporal bone fracture with middle meningeal artery bleeding and a lucid interval. Bridging vein rupture causes subdural haematoma."
  },
  {
    id: "ns-2", topic: "Neurosurgery", difficulty: "Advanced",
    stem: "Cushing's triad of raised intracranial pressure comprises hypertension, bradycardia and:",
    options: ["Hyperthermia", "Irregular respiration", "Pupillary constriction", "Hypoglycaemia"],
    answer: 1,
    explanation: "Cushing's reflex: hypertension with bradycardia and irregular breathing (Cheyne–Stokes) due to brainstem ischaemia — a pre-terminal sign requiring urgent ICP control."
  },

  // ---------- Upper GI / HPB ----------
  {
    id: "ug-1", topic: "Upper GI & HPB", difficulty: "Core",
    stem: "A patient with acute pancreatitis has periumbilical bruising. This sign is called:",
    options: ["Grey Turner's sign", "Cullen's sign", "Kehr's sign", "Murphy's sign"],
    answer: 1,
    explanation: "Cullen's sign = periumbilical bruising; Grey Turner's = flank bruising — both suggest retroperitoneal haemorrhage in necrotising pancreatitis. Murphy's sign is cholecystitis; Kehr's is referred shoulder pain (splenic injury)."
  },
  {
    id: "ug-2", topic: "Upper GI & HPB", difficulty: "Advanced",
    stem: "Which procedure is standard for a resectable adenocarcinoma of the pancreatic head?",
    options: ["Distal pancreatectomy", "Pancreaticoduodenectomy (Whipple)", "Total pancreatectomy", "Palliative bypass only"],
    answer: 1,
    explanation: "The Whipple procedure (pancreaticoduodenectomy) resects the pancreatic head, duodenum, gallbladder and distal CBD with reconstruction. Distal lesions → distal pancreatectomy ± splenectomy."
  }
];
