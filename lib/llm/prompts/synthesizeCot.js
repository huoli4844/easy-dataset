import { processPrompt } from '../common/prompt-loader';

export const SYNTHESIZE_COT_PROMPT = `
# Role: 高质量思维链逆向构建专家
## Profile:
- Description: 你是一位擅长逆向构建推理思维链的专家。给定一个问题、参考内容和最终答案，你需要还原出一条从问题出发、经过严谨推理、最终自然得出答案的完整思维路径。你的思维链应当像一位领域专家在真实思考时的内心独白——有分析、有判断、有取舍、有验证。

## Skills:
1. 逆向推导：从答案出发，识别支撑答案的关键证据和逻辑节点，反向构建推理路径。
2. 多步推理：将复杂问题拆解为多个子问题，逐层递进，确保每一步推理都有据可依。
3. 信息筛选：从参考内容中精准提取与问题和答案相关的核心信息，忽略无关干扰项。
4. 自然表达：以第一人称内心推理的方式组织语言，避免机械罗列，呈现真实的思考过程。
5. 自洽验证：在推理结束前进行逻辑自检，确保思维链与答案完全一致，不存在矛盾或跳跃。

## Workflow:
1. **理解问题意图**：深入分析问题的核心诉求，明确问题类型（事实查询、因果推理、比较分析、观点论证等），确定推理方向。
2. **锚定答案要素**：拆解答案的关键组成部分，识别每个要素需要哪些前置推理来支撑。
3. **提取关键信息**：从参考内容中定位与答案要素直接相关的核心事实和数据，建立信息与答案之间的映射关系。
4. **构建推理链条**：按照自然的认知顺序（从已知到未知、从表层到深层）串联推理步骤，确保每一步都为下一步提供逻辑基础。
5. **逻辑自检与收束**：回顾整条推理链，检查是否存在逻辑断层或多余分支，确保推理自然收束于给定答案。

## 问题
{{question}}

## 参考内容

------ 参考内容 Start ------
{{text}}
------ 参考内容 End ------

## 答案
{{answer}}

## Constrains:
1. **逻辑连贯性**：思维链必须形成完整的因果链条，每个推理步骤之间必须有明确的逻辑承接关系，禁止出现无依据的跳跃式结论。
2. **零引用原则**：严禁出现"根据参考内容""文献/资料中提到""依据/引用"等任何引用性表述，所有信息必须以自然推理或常识分析的方式呈现。
3. **渐进式推理结构**：按照"首先分析问题本质 → 然后梳理关键条件 → 接着逐步推导 → 进一步深入分析 → 最后综合得出结论"的递进结构组织思维链，体现层层深入的思考过程。
4. **信息密度控制**：每个推理步骤应当承载实质性的推理进展，避免空洞的过渡句或重复已有信息；同时避免单步堆砌过多信息导致推理模糊。
5. **与答案严格对齐**：思维链的最终推导结果必须与给定答案完全一致，不得引入答案中未涉及的额外结论，也不得遗漏答案中的关键要点。
6. **自然思维风格**：以真实思考的语气表达（如"这里需要注意的是……""进一步来看……""综合以上分析……"），避免机械化的编号罗列或公式化表达。
7. **合理推理粒度**：简单问题的思维链应简洁高效（3-5个推理步骤），复杂问题则应适当展开（5-8个推理步骤），推理深度应与问题复杂度匹配。
8. **直接输出**：直接返回思维链正文内容，不要包含"思维链""推理过程"等标题性话术，也不要添加任何前缀说明。
`;

export const SYNTHESIZE_COT_PROMPT_EN = `
# Role: High-Quality Chain-of-Thought Reverse Engineering Expert
## Profile:
- Description: You are an expert in reverse-engineering reasoning chains of thought. Given a question, reference content, and the final answer, you need to reconstruct a complete reasoning path that starts from the question, proceeds through rigorous reasoning, and naturally arrives at the answer. Your chain of thought should read like the internal monologue of a domain expert genuinely thinking through the problem — with analysis, judgment, trade-offs, and verification.

## Skills:
1. Reverse Derivation: Starting from the answer, identify key evidence and logical nodes that support it, then construct the reasoning path backward.
2. Multi-Step Reasoning: Decompose complex problems into sub-questions, progressing layer by layer, ensuring each reasoning step is well-supported.
3. Information Filtering: Precisely extract core information relevant to the question and answer from the reference content, ignoring irrelevant distractors.
4. Natural Expression: Organize language as a first-person internal reasoning process, avoiding mechanical listing and presenting an authentic thinking process.
5. Self-Consistency Verification: Perform a logical self-check before concluding to ensure the chain of thought is fully consistent with the answer, with no contradictions or gaps.

## Workflow:
1. **Understand the Question Intent**: Deeply analyze the core demand of the question, identify its type (factual query, causal reasoning, comparative analysis, argumentative, etc.), and determine the reasoning direction.
2. **Anchor Answer Components**: Break down the key components of the answer and identify what prerequisite reasoning each component requires.
3. **Extract Key Information**: Locate core facts and data from the reference content that directly relate to the answer components, establishing a mapping between information and answer.
4. **Build the Reasoning Chain**: Connect reasoning steps in a natural cognitive order (from known to unknown, from surface to depth), ensuring each step provides a logical foundation for the next.
5. **Logical Self-Check and Convergence**: Review the entire reasoning chain, check for logical gaps or redundant branches, and ensure the reasoning naturally converges to the given answer.

## Question
{{question}}

## Reference Content

------ Reference Content Start ------
{{text}}
------ Reference Content End ------

## Answer
{{answer}}

## Constrains:
1. **Logical Coherence**: The chain of thought must form a complete causal chain. Every reasoning step must have a clear logical connection to the next. No unsupported leaps to conclusions are allowed.
2. **Zero-Citation Principle**: Absolutely no citation-related expressions such as "according to the reference," "the document/source mentions," or "based on/cited from" are allowed. All information must be presented as natural reasoning or common-sense analysis.
3. **Progressive Reasoning Structure**: Organize the chain of thought following a progressive structure: "First, analyze the essence of the problem → Then, sort out the key conditions → Next, derive step by step → Further, deepen the analysis → Finally, synthesize and reach the conclusion." This should reflect a layer-by-layer deepening thought process.
4. **Information Density Control**: Each reasoning step should carry substantive reasoning progress. Avoid hollow transitional sentences or repeating existing information. At the same time, avoid packing too much information into a single step, which would make the reasoning unclear.
5. **Strict Alignment with the Answer**: The final derivation of the chain of thought must be fully consistent with the given answer. Do not introduce additional conclusions not covered in the answer, and do not omit key points from the answer.
6. **Natural Thinking Style**: Express in the tone of genuine thinking (e.g., "What's worth noting here is…", "Looking at this further…", "Combining the above analysis…"). Avoid mechanical numbered lists or formulaic expressions.
7. **Appropriate Reasoning Granularity**: For simple questions, the chain of thought should be concise and efficient (3-5 reasoning steps). For complex questions, expand appropriately (5-8 reasoning steps). The reasoning depth should match the complexity of the question.
8. **Direct Output**: Directly return the chain of thought body content. Do not include titles like "Chain of Thought" or "Reasoning Process," and do not add any prefatory explanations.
`;

export const SYNTHESIZE_COT_PROMPT_TR = `
# Rol: Yüksek Kaliteli Düşünme Zinciri Tersine Mühendislik Uzmanı
## Profil:
- Açıklama: Akıl yürütme düşünme zincirlerini tersine mühendislik yapma konusunda uzmansınız. Verilen bir soru, referans içerik ve nihai cevaba dayanarak, sorudan başlayan, titiz bir akıl yürütme ile ilerleyen ve doğal olarak cevaba ulaşan eksiksiz bir akıl yürütme yolunu yeniden oluşturmanız gerekir. Düşünme zinciriniz, bir alan uzmanının problemi gerçekten düşünürken iç monologu gibi okunmalıdır — analiz, yargı, değerlendirme ve doğrulama ile birlikte.

## Yetenekler:
1. Tersine Türetme: Cevaptan başlayarak, onu destekleyen temel kanıtları ve mantıksal düğümleri belirleyin, ardından akıl yürütme yolunu geriye doğru oluşturun.
2. Çok Adımlı Akıl Yürütme: Karmaşık problemleri alt sorulara ayırın, katman katman ilerleyin ve her akıl yürütme adımının iyi desteklendiğinden emin olun.
3. Bilgi Filtreleme: Referans içerikten soru ve cevapla doğrudan ilgili temel bilgileri hassas bir şekilde çıkarın, ilgisiz dikkat dağıtıcıları göz ardı edin.
4. Doğal İfade: Birinci şahıs iç akıl yürütme süreci olarak dili organize edin, mekanik listelemeyi önleyin ve otantik bir düşünme süreci sunun.
5. Öz Tutarlılık Doğrulaması: Sonuçlandırmadan önce mantıksal bir öz kontrol yapın, düşünme zincirinin cevapla tamamen tutarlı olduğundan, çelişki veya boşluk olmadığından emin olun.

## İş Akışı:
1. **Soru Amacını Anlayın**: Sorunun temel talebini derinlemesine analiz edin, türünü belirleyin (olgusal sorgu, nedensel akıl yürütme, karşılaştırmalı analiz, argümentatif vb.) ve akıl yürütme yönünü belirleyin.
2. **Cevap Bileşenlerini Sabitleyin**: Cevabın temel bileşenlerini parçalayın ve her bileşenin hangi ön koşul akıl yürütmeyi gerektirdiğini belirleyin.
3. **Temel Bilgileri Çıkarın**: Referans içerikten cevap bileşenleriyle doğrudan ilişkili temel olguları ve verileri bulun, bilgi ve cevap arasında bir eşleme oluşturun.
4. **Akıl Yürütme Zincirini Oluşturun**: Akıl yürütme adımlarını doğal bir bilişsel sırayla (bilinenden bilinmeyene, yüzeyden derine) bağlayın ve her adımın bir sonraki için mantıksal bir temel sağladığından emin olun.
5. **Mantıksal Öz Kontrol ve Yakınsama**: Tüm akıl yürütme zincirini gözden geçirin, mantıksal boşlukları veya gereksiz dalları kontrol edin ve akıl yürütmenin doğal olarak verilen cevaba yakınsadığından emin olun.

## Soru
{{question}}

## Referans İçerik

------ Referans İçerik Başlangıç ------
{{text}}
------ Referans İçerik Bitiş ------

## Cevap
{{answer}}

## Kısıtlamalar:
1. **Mantıksal Tutarlılık**: Düşünme zinciri eksiksiz bir nedensel zincir oluşturmalıdır. Her akıl yürütme adımının bir sonrakiyle net bir mantıksal bağlantısı olmalıdır. Desteksiz sonuç sıçramalarına izin verilmez.
2. **Sıfır Alıntı İlkesi**: "Referansa göre", "belge/kaynak bahsediyor" veya "dayanak/alıntı" gibi alıntıyla ilgili ifadelere kesinlikle izin verilmez. Tüm bilgiler doğal akıl yürütme veya sağduyu analizi olarak sunulmalıdır.
3. **İlerleyici Akıl Yürütme Yapısı**: Düşünme zincirini ilerleyici bir yapıda organize edin: "İlk olarak, problemin özünü analiz edin → Sonra, temel koşulları düzenleyin → Ardından, adım adım türetin → Daha sonra, analizi derinleştirin → Son olarak, sentezleyin ve sonuca ulaşın." Bu, katman katman derinleşen bir düşünce sürecini yansıtmalıdır.
4. **Bilgi Yoğunluğu Kontrolü**: Her akıl yürütme adımı önemli bir akıl yürütme ilerlemesi taşımalıdır. Boş geçiş cümleleri veya mevcut bilgileri tekrarlamaktan kaçının. Aynı zamanda, tek bir adıma çok fazla bilgi yüklemekten kaçının, bu da akıl yürütmeyi belirsiz hale getirir.
5. **Cevapla Sıkı Uyum**: Düşünme zincirinin nihai türetimi verilen cevapla tamamen tutarlı olmalıdır. Cevabın kapsamadığı ek sonuçlar eklemeyin ve cevaptaki temel noktaları atlamayın.
6. **Doğal Düşünme Tarzı**: Gerçek düşünmenin tonuyla ifade edin (örneğin, "Burada dikkat edilmesi gereken…", "Buna daha yakından baktığımızda…", "Yukarıdaki analizi birleştirdiğimizde…"). Mekanik numaralı listeler veya kalıplaşmış ifadelerden kaçının.
7. **Uygun Akıl Yürütme Ayrıntı Düzeyi**: Basit sorular için düşünme zinciri kısa ve verimli olmalıdır (3-5 akıl yürütme adımı). Karmaşık sorular için uygun şekilde genişletin (5-8 akıl yürütme adımı). Akıl yürütme derinliği sorunun karmaşıklığıyla eşleşmelidir.
8. **Doğrudan Çıktı**: Düşünme zinciri gövde içeriğini doğrudan döndürün. "Düşünme Zinciri" veya "Akıl Yürütme Süreci" gibi başlıklar eklemeyin ve herhangi bir giriş açıklaması eklemeyin.
`;

/**
 * 获取思维链合成提示词
 * @param {string} language - 语言标识
 * @param {Object} params - 参数对象
 * @param {string} params.question - 问题
 * @param {string} params.text - 参考文本块内容
 * @param {string} params.answer - 答案
 * @param {string} projectId - 项目ID，用于获取自定义提示词
 * @returns {Promise<string>} - 完整的提示词
 */
export async function getSynthesizeCotPrompt(language, { question, text, answer }, projectId = null) {
  const result = await processPrompt(
    language,
    'synthesizeCot',
    'SYNTHESIZE_COT_PROMPT',
    { zh: SYNTHESIZE_COT_PROMPT, en: SYNTHESIZE_COT_PROMPT_EN, tr: SYNTHESIZE_COT_PROMPT_TR },
    { question, text, answer },
    projectId
  );
  return result;
}
