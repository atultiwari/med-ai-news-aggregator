export interface HealthcareTag {
    id: string
    label: string
    icon: string
    keywords: string[]
    color: string
    activeColor: string
}

export const HEALTHCARE_TAGS: HealthcareTag[] = [
    {
        id: 'pathology',
        label: 'Pathology',
        icon: '🔬',
        keywords: [
            'pathology', 'pathologist', 'histopathology', 'cytology', 'histology',
            'biopsy', 'tissue analysis', 'whole slide', 'wsi', 'surgical pathology',
            'anatomic pathology', 'clinical pathology', 'hematopathology',
            'dermatopathology', 'neuropathology', 'immunohistochemistry', 'ihc',
            'molecular pathology', 'digital pathology', 'computational pathology',
            'stain normalization', 'h&e stain', 'ki-67', 'specimen', 'biobank',
            'cell segmentation', 'frozen section', 'gross examination',
        ],
        color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
        activeColor: 'bg-violet-500 text-white shadow-md shadow-violet-500/25',
    },
    {
        id: 'radiology',
        label: 'Radiology',
        icon: '📷',
        keywords: [
            'radiology', 'radiologist', 'x-ray', 'xray', 'ct scan', 'mri',
            'ultrasound', 'mammography', 'pet scan', 'medical imaging',
            'dicom', 'pacs', 'nuclear medicine', 'fluoroscopy', 'angiography',
            'interventional radiology', 'neuroradiology', 'musculoskeletal imaging',
        ],
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        activeColor: 'bg-blue-500 text-white shadow-md shadow-blue-500/25',
    },
    {
        id: 'oncology',
        label: 'Oncology',
        icon: '🎗️',
        keywords: [
            'oncology', 'oncologist', 'cancer', 'tumor', 'tumour', 'carcinoma',
            'lymphoma', 'leukemia', 'leukaemia', 'melanoma', 'sarcoma', 'metastasis',
            'chemotherapy', 'immunotherapy', 'radiation therapy', 'targeted therapy',
            'neoplasm', 'malignant', 'benign', 'biopsy marker',
        ],
        color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
        activeColor: 'bg-pink-500 text-white shadow-md shadow-pink-500/25',
    },
    {
        id: 'surgery',
        label: 'Surgery',
        icon: '🔪',
        keywords: [
            'surgery', 'surgeon', 'surgical', 'operative', 'laparoscopic',
            'minimally invasive', 'robotic surgery', 'endoscopic', 'transplant',
            'cholecystectomy', 'appendectomy', 'hernia repair', 'anesthesia',
            'perioperative', 'postoperative', 'preoperative',
        ],
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        activeColor: 'bg-red-500 text-white shadow-md shadow-red-500/25',
    },
    {
        id: 'medicine',
        label: 'General Medicine',
        icon: '🩺',
        keywords: [
            'internal medicine', 'general medicine', 'clinical medicine',
            'primary care', 'family medicine', 'general practitioner',
            'chronic disease', 'hypertension', 'diabetes mellitus',
            'clinical trial', 'patient care', 'clinical decision',
            'evidence-based medicine', 'differential diagnosis',
        ],
        color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        activeColor: 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25',
    },
    {
        id: 'cardiology',
        label: 'Cardiology',
        icon: '❤️',
        keywords: [
            'cardiology', 'cardiologist', 'cardiac', 'heart', 'cardiovascular',
            'echocardiography', 'ecg', 'ekg', 'arrhythmia', 'myocardial',
            'coronary', 'atrial fibrillation', 'heart failure', 'stent',
            'angioplasty', 'pacemaker',
        ],
        color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
        activeColor: 'bg-rose-500 text-white shadow-md shadow-rose-500/25',
    },
    {
        id: 'neurology',
        label: 'Neurology',
        icon: '🧠',
        keywords: [
            'neurology', 'neurologist', 'neurological', 'brain', 'neuroscience',
            'alzheimer', 'parkinson', 'epilepsy', 'stroke', 'multiple sclerosis',
            'dementia', 'eeg', 'neurodegenerative', 'cerebral', 'cognitive',
            'neuropathy', 'brain imaging', 'neuroimaging',
        ],
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
        activeColor: 'bg-purple-500 text-white shadow-md shadow-purple-500/25',
    },
    {
        id: 'microbiology',
        label: 'Microbiology',
        icon: '🦠',
        keywords: [
            'microbiology', 'microbiologist', 'bacteria', 'bacterial', 'virus',
            'viral', 'fungal', 'antimicrobial', 'antibiotic', 'infection',
            'infectious disease', 'sepsis', 'culture', 'sensitivity',
            'resistance', 'amr', 'pcr', 'microbiome', 'pathogen',
        ],
        color: 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300',
        activeColor: 'bg-lime-500 text-white shadow-md shadow-lime-500/25',
    },
    {
        id: 'biochemistry',
        label: 'Biochemistry',
        icon: '⚗️',
        keywords: [
            'biochemistry', 'biochemical', 'enzyme', 'protein', 'metabolic',
            'metabolism', 'biomarker', 'assay', 'electrolyte', 'lipid panel',
            'glucose', 'hemoglobin', 'albumin', 'creatinine', 'liver function',
            'renal function', 'clinical chemistry', 'mass spectrometry',
        ],
        color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        activeColor: 'bg-amber-500 text-white shadow-md shadow-amber-500/25',
    },
    {
        id: 'pharmacology',
        label: 'Pharmacology',
        icon: '💊',
        keywords: [
            'pharmacology', 'pharmaceutical', 'drug discovery', 'drug development',
            'fda approval', 'clinical trial', 'dosage', 'pharmacokinetics',
            'pharmacodynamics', 'adverse effect', 'drug interaction',
            'therapeutic', 'prescription', 'drug target',
        ],
        color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
        activeColor: 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25',
    },
    {
        id: 'genomics',
        label: 'Genomics',
        icon: '🧬',
        keywords: [
            'genomics', 'genome', 'genetic', 'genetics', 'dna', 'rna',
            'sequencing', 'gene expression', 'crispr', 'proteomics',
            'transcriptomics', 'bioinformatics', 'variant', 'mutation',
            'hereditary', 'gene therapy', 'precision medicine', 'personalized medicine',
            'next generation sequencing', 'ngs', 'whole genome',
        ],
        color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
        activeColor: 'bg-teal-500 text-white shadow-md shadow-teal-500/25',
    },
    {
        id: 'dermatology',
        label: 'Dermatology',
        icon: '🧴',
        keywords: [
            'dermatology', 'dermatologist', 'skin', 'dermatologic', 'melanoma',
            'psoriasis', 'eczema', 'dermatitis', 'lesion', 'dermoscopy',
            'skin cancer', 'wound healing',
        ],
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
        activeColor: 'bg-orange-500 text-white shadow-md shadow-orange-500/25',
    },
    {
        id: 'pediatrics',
        label: 'Pediatrics',
        icon: '👶',
        keywords: [
            'pediatric', 'paediatric', 'pediatrics', 'neonatal', 'neonatology',
            'child health', 'infant', 'newborn', 'childhood', 'adolescent',
        ],
        color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
        activeColor: 'bg-sky-500 text-white shadow-md shadow-sky-500/25',
    },
    {
        id: 'ophthalmology',
        label: 'Ophthalmology',
        icon: '👁️',
        keywords: [
            'ophthalmology', 'ophthalmologist', 'eye', 'retina', 'retinal',
            'glaucoma', 'cataract', 'macular degeneration', 'fundus',
            'oct', 'optic nerve', 'visual acuity', 'cornea',
        ],
        color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
        activeColor: 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25',
    },
    {
        id: 'orthopedics',
        label: 'Orthopedics',
        icon: '🦴',
        keywords: [
            'orthopedic', 'orthopaedic', 'orthopedics', 'bone', 'fracture',
            'joint', 'spine', 'spinal', 'musculoskeletal', 'arthroplasty',
            'arthroscopy', 'ligament', 'tendon',
        ],
        color: 'bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300',
        activeColor: 'bg-stone-500 text-white shadow-md shadow-stone-500/25',
    },
    {
        id: 'psychiatry',
        label: 'Psychiatry',
        icon: '🧩',
        keywords: [
            'psychiatry', 'psychiatric', 'mental health', 'depression', 'anxiety',
            'schizophrenia', 'bipolar', 'psychosis', 'psychotherapy',
            'cognitive behavioral', 'ptsd', 'substance abuse', 'addiction',
        ],
        color: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300',
        activeColor: 'bg-fuchsia-500 text-white shadow-md shadow-fuchsia-500/25',
    },
    {
        id: 'obgyn',
        label: 'OB/GYN',
        icon: '🤰',
        keywords: [
            'obstetrics', 'gynecology', 'gynaecology', 'pregnancy', 'prenatal',
            'maternal', 'fetal', 'cervical', 'uterine', 'reproductive',
            'ivf', 'fertility', 'menstrual',
        ],
        color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
        activeColor: 'bg-pink-500 text-white shadow-md shadow-pink-500/25',
    },
    {
        id: 'emergency',
        label: 'Emergency Medicine',
        icon: '🚑',
        keywords: [
            'emergency medicine', 'emergency department', 'trauma', 'triage',
            'critical care', 'icu', 'intensive care', 'resuscitation',
            'acute care', 'first responder',
        ],
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        activeColor: 'bg-red-600 text-white shadow-md shadow-red-600/25',
    },
    {
        id: 'publichealth',
        label: 'Public Health',
        icon: '🌍',
        keywords: [
            'public health', 'epidemiology', 'pandemic', 'epidemic', 'vaccine',
            'vaccination', 'immunization', 'surveillance', 'outbreak',
            'global health', 'population health', 'preventive medicine',
            'health policy', 'who', 'cdc',
        ],
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        activeColor: 'bg-green-500 text-white shadow-md shadow-green-500/25',
    },
    {
        id: 'digital_health',
        label: 'Digital Health',
        icon: '📱',
        keywords: [
            'digital health', 'telehealth', 'telemedicine', 'ehr',
            'electronic health record', 'health informatics', 'mhealth',
            'wearable', 'remote monitoring', 'health app', 'patient portal',
            'interoperability', 'fhir', 'hl7',
        ],
        color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
        activeColor: 'bg-cyan-600 text-white shadow-md shadow-cyan-600/25',
    },
    {
        id: 'ai_tech',
        label: 'AI & Technology',
        icon: '🤖',
        keywords: [
            'artificial intelligence', 'machine learning', 'deep learning',
            'neural network', 'large language model', 'llm', 'gpt', 'transformer',
            'foundation model', 'generative ai', 'computer vision', 'nlp',
            'natural language processing', 'reinforcement learning', 'fine-tuning',
            'inference', 'diffusion', 'multimodal', 'open source', 'gpu', 'cuda',
        ],
        color: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
        activeColor: 'bg-slate-600 text-white shadow-md shadow-slate-600/25',
    },
]

const tagCache = new Map<string, string[]>()

export function matchSpecialtyTags(title: string): string[] {
    if (!title) return []

    const cached = tagCache.get(title)
    if (cached) return cached

    const lower = title.toLowerCase()
    const matched: string[] = []

    for (const tag of HEALTHCARE_TAGS) {
        for (const keyword of tag.keywords) {
            if (lower.includes(keyword)) {
                matched.push(tag.id)
                break
            }
        }
    }

    tagCache.set(title, matched)
    return matched
}

export function getTagById(id: string): HealthcareTag | undefined {
    return HEALTHCARE_TAGS.find(tag => tag.id === id)
}
