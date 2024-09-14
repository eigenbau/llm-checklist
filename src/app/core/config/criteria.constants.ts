import { Criterion } from '../stores/checklist.store';

// Criteria list
export const CRITERION_LIST: Criterion[] = [
  {
    question:
      'Does the intended use of the LLM comply with all applicable regulations from regulatory authorities?',
    required: true,
    questionRationale:
      'Ensuring that the intended use of the LLM complies with all applicable regulations from regulatory authorities is essential for legal and ethical adherence. This compliance safeguards patient rights, prevents legal repercussions, and maintains the integrity and trustworthiness of the healthcare practice.',
  },
  {
    question:
      'Does the provider permit their LLM to be used for the intended task?',
    required: true,
    questionRationale:
      'Confirming that the provider permits the LLM product to be used for the intended healthcare task is crucial for regulatory compliance. For example, ChatGPT does not allow its models to be used for healthcare purposes, highlighting the importance of adhering to provider restrictions to avoid legal and ethical issues.',
  },
  {
    question:
      'Does the LLM meet all applicable regulatory requirements, e.g., active Software as a Medical Device license?',
    required: true,
    questionRationale:
      'Ensuring that the LLM product meets all applicable regulatory requirements, such as having an active Software as a Medical Device (SaMD) license, is essential for legal compliance and patient safety.',
  },
  {
    question:
      'Does the LLM and your workflow comply with all applicable informed consent regulations?',
    required: true,
    questionRationale:
      'Ensuring that the LLM workflow complies with all applicable informed consent regulations is crucial for protecting patient rights and maintaining ethical standards.',
  },
  {
    question:
      'Do you have a plan in place to monitor regulatory compliance periodically?',
    required: true,
    questionRationale:
      "Having a plan to periodically monitor regulatory compliance is crucial to ensure that the LLM adheres to evolving legal and ethical standards. This proactive approach helps prevent legal issues, maintains patient trust, and ensures the system's ongoing legitimacy and safety in clinical practice.",
  },
  {
    question:
      'Is the LLM suitable for the intended task, i.e. is it trained for the specific purpose?',
    required: false,
    questionRationale:
      'Ensuring the LLM is task-specific reduces errors and improves accuracy, which is critical for patient safety in healthcare.',
  },
  {
    question:
      'For clinical tasks, is the LLM valid for the target patient population?',
    required: false,
    questionRationale:
      "It's crucial that the LLM is validated for the target population to ensure accuracy and avoid bias, as patient demographics can affect clinical outcomes and recommendations.",
  },
  {
    question:
      'Is the LLM unbiased, i.e., fair within the identified use-case and target patient population?',
    required: false,
    questionRationale:
      'Ensuring the LLM is unbiased is essential to prevent disparities in care, particularly for vulnerable populations, and to promote equitable healthcare outcomes.',
  },
  {
    question: 'Is the LLM interface suitable for the end-user?',
    required: false,
    questionRationale:
      'The suitability of the LLM interface for the end-user is crucial because it directly impacts the usability and efficiency of the system in a clinical setting. A user-friendly interface ensures that healthcare providers can easily navigate and utilize the LLM without extensive training, thereby minimizing disruptions to their workflow. It also reduces the likelihood of errors, enhances user satisfaction, and promotes consistent use of the system, which is essential for maintaining high standards of patient care.',
  },
  {
    question: 'Does the LLM output transparent, explainable results?',
    required: false,
    questionRationale:
      "Transparency and explainability in the LLM's output are crucial. It ensures that healthcare providers can review output reasoning, and it aligns with regulatory trends that prioritize safety, accountability, and ethical standards in AI deployment.",
  },
  {
    question:
      'Does the end-user have the necessary knowledge to identify errors/hallucinations?',
    required: false,
    questionRationale:
      "Ensuring that the end-user can identify errors or hallucinations in the LLM's output is crucial for patient safety and accurate clinical decisions. Healthcare providers must recognize incorrect or harmful recommendations to prevent errors and maintain trust in the AI system. However, fulfilling this criterion can be challenging, as LLM outputs often appear coherent even when they are not. For example, an LLM might generate a plausible but incorrect medical diagnosis, making it difficult for users without specialized knowledge to detect the error. This underscores the need for robust training and continuous education for end-users.",
  },
  {
    question:
      'Is a subject matter expert involved in approving all outputs that are acted upon, i.e. is there a human in the loop (HITL)?',
    required: false,
    questionRationale:
      "Involving a subject matter expert to approve all outputs that are acted upon ensures a 'human in the loop' (HITL) approach, which is vital for maintaining the accuracy and reliability of clinical decisions. This oversight helps catch potential errors or biases in the LLM's recommendations, providing an additional layer of safety and accountability. HITL is particularly important in healthcare, where incorrect decisions can have serious consequences. It aligns with best practices and emerging regulatory guidelines that emphasize the necessity of human oversight in AI-driven processes to safeguard patient outcomes.",
  },
  {
    question:
      'Does the LLM implementation plan mitigate the risk of domain knowledge decline for any stakeholder?',
    required: false,
    questionRationale:
      "Mitigating the risk of domain knowledge decline is crucial when implementing an LLM in clinical practice. Over-reliance on AI can erode healthcare providers' expertise and critical thinking skills. An effective implementation plan should include ongoing training and collaborative decision-making to maintain and enhance domain knowledge, ensuring sustained high-quality patient care.",
  },
  {
    question: 'Does the LLM sufficiently protect sensitive input data?',
    required: false,
    questionRationale:
      'Protecting sensitive input data is crucial for patient privacy and regulatory compliance. The LLM must have robust security measures to prevent unauthorized access and breaches. However, sufficiently de-identifying personal health information (PHI) while maintaining data quality can be challenging, as it requires balancing privacy with the need for accurate and useful data. This complexity underscores the importance of advanced data protection strategies.',
  },
  {
    question:
      'Does sensitive data only travel within applicable legal boundaries?',
    required: false,
    questionRationale:
      'Ensuring that sensitive protected health information (PHI) data only travels within applicable geographic boundaries is crucial for compliance with regional privacy laws and regulations. This reduces the risk of unauthorized access and misuse of data, safeguarding patient privacy.',
  },
  {
    question: 'Is data sufficiently protected during transport?',
    required: false,
    questionRationale:
      'Ensuring that protected health information (PHI) data is sufficiently protected during transport is critical for maintaining patient privacy and complying with legal standards. Robust encryption and secure transmission protocols are necessary to prevent unauthorized access and data breaches. This protection is essential to safeguard sensitive information, avoid legal repercussions, and maintain trust in the healthcare system.',
  },
  {
    question:
      'Is data only used by the LLM for the intended task and not for secondary tasks, e.g. model training?',
    required: false,
    questionRationale:
      'Ensuring that data is only used by the LLM for the intended task and not for secondary purposes, such as model training, is crucial for maintaining patient privacy and trust. This practice aligns with various regulatory requirements, preventing unauthorized use or misuse of sensitive information.',
  },
  {
    question: 'Can end-users report issues and give feedback?',
    required: false,
    questionRationale:
      'Allowing end-users to report issues and provide feedback is essential for the continuous improvement and safety of the LLM. This feedback loop helps identify and rectify errors, enhance system performance, and adapt the LLM to better meet clinical needs. It also fosters user engagement and trust, ensuring that the system remains effective and reliable in a dynamic healthcare environment.',
  },
  {
    question: 'Does the LLM integrate sufficiently into the existing workflow?',
    required: false,
    questionRationale:
      'Ensuring that the LLM integrates sufficiently into the existing workflow is crucial for minimizing disruptions and maximizing efficiency in clinical practice. Seamless integration allows healthcare providers to adopt the LLM without significant changes to their routine, thereby enhancing user acceptance and utilization. It also ensures that the LLM complements existing systems and processes, leading to improved patient care and operational efficiency.',
  },
  {
    question: 'Do you have a plan in place for end-user training?',
    required: false,
    questionRationale:
      'Having a plan in place for end-user training is essential to ensure that healthcare providers can effectively and safely use the LLM. Proper training enhances user competence, reduces errors, and maximizes the benefits of the technology, leading to improved patient care and system efficiency.',
  },
  {
    question:
      'Does your LLM workflow explicitly disclose what content, decision, recommendation, etc., was generated by the LLM?',
    required: false,
    questionRationale:
      'Explicitly disclosing what content, decisions, or recommendations were generated by the LLM is essential for transparency and accountability. This practice aligns with emerging regulations that emphasize the importance of transparency in AI-driven healthcare systems.',
  },
  {
    question:
      'For clinical tasks, does the LLM perform equal to or better than a clinician?',
    required: false,
    questionRationale:
      'Ensuring that the LLM performs equal to or better than local clinicians for clinical tasks is crucial for maintaining high standards of patient care. This benchmark increases the possibility for the LLM to add value to the clinical practice. It also helps in gaining the trust of healthcare providers and patients.',
  },
  {
    question:
      'For clinical tasks, does the LLM maintain or even improve patient-provider interaction?',
    required: false,
    questionRationale:
      'Ensuring the LLM maintains or improves patient-provider interaction is crucial, as technology often disrupts rather than facilitates relationship development, impacting trust and patient satisfaction.',
  },
  {
    question: 'Does the LLM offer a favourable cost-benefit ratio?',
    required: false,
    questionRationale:
      'Evaluating whether the LLM offers a favorable cost-benefit ratio is essential to ensure that the investment in the technology translates into tangible improvements in efficiency, accuracy, and patient outcomes, justifying the costs involved.',
  },
  {
    question:
      'Do you have a process in place that will alert you if the LLM model changed significantly in its performance and output?',
    required: false,
    questionRationale:
      'Having a process in place to alert you if the LLM model changes significantly in its performance and output is crucial for maintaining reliability and safety. This ensures that any deviations are promptly identified and addressed, preventing potential negative impacts on patient care.',
  },
];
