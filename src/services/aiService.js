// 宠智灵 API 配置
// 申请Token: https://docs.gjpet.com/
const API_CONFIG = {
  baseUrl: 'https://ms-ai.chongzhiling.com/async/api/v2/report-service/pic',
  token: 'YOUR_ACCESS_TOKEN', // 需要替换为真实的 access_token
  enabled: false // 设置为 true 启用真实 API
};

// 调用宠智灵 API 进行图像分析
const callChongZhiLingAPI = async (imageData, subModuleType = 2) => {
  const formData = new FormData();
  formData.append('imgfile', imageData);
  formData.append('pet_profile_id', 1); // 默认为1
  formData.append('sub_module_type', subModuleType);

  const response = await fetch(`${API_CONFIG.baseUrl}?token=${API_CONFIG.token}`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`API调用失败: ${response.status}`);
  }

  return response.json();
};

// 模拟 API 调用（当真实 API 未启用时使用）
const simulateAnalysis = async (imageData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const possibleStates = [
    {
      state: '正常',
      confidence: 0.85,
      symptoms: ['精神状态良好', '毛发有光泽', '姿势正常'],
      possibleIssues: [],
      severity: 0
    },
    {
      state: '可能不适',
      confidence: 0.75,
      symptoms: ['精神状态不佳', '姿势异常', '毛发无光泽'],
      possibleIssues: ['食欲不振', '疲劳', '轻微不适'],
      severity: 1
    },
    {
      state: '需要关注',
      confidence: 0.65,
      symptoms: ['精神萎靡', '姿势异常', '毛发杂乱'],
      possibleIssues: ['可能生病', '疼痛', '消化问题'],
      severity: 2
    }
  ];

  const randomIndex = Math.floor(Math.random() * possibleStates.length);
  return possibleStates[randomIndex];
};

// 主分析函数
const analyzeImage = async (imageData) => {
  if (API_CONFIG.enabled && API_CONFIG.token !== 'YOUR_ACCESS_TOKEN') {
    try {
      const result = await callChongZhiLingAPI(imageData, 2); // 使用表情识别
      // 解析宠智灵API返回结果并转换格式
      return parseChongZhiLingResult(result);
    } catch (error) {
      console.error('宠智灵API调用失败，使用模拟数据:', error);
      return simulateAnalysis(imageData);
    }
  }
  return simulateAnalysis(imageData);
};

// 解析宠智灵 API 返回结果
const parseChongZhiLingResult = (apiResult) => {
  // 根据宠智灵的返回格式进行解析
  // 这里需要根据实际API返回格式调整
  const advice = apiResult?.data?.advice || [];
  
  let state = '正常';
  let possibleIssues = [];
  
  if (advice.length > 0) {
    state = '可能不适';
    possibleIssues = advice.map(a => a.title);
  }
  
  return {
    state,
    confidence: 0.8,
    symptoms: advice.map(a => a.description?.explaination || a.title).slice(0, 3),
    possibleIssues,
    severity: state === '正常' ? 0 : 1
  };
};

const generateQuestions = (analysisResult) => {
  const baseQuestions = [
    {
      id: 'q1',
      question: '🍖 狗狗最近的饮食情况如何？',
      options: ['正常进食', '食欲不振', '完全不吃', '吃得比平时多'],
      icon: '🍖'
    },
    {
      id: 'q2',
      question: '😊 狗狗的精神状态怎么样？',
      options: ['活泼好动', '有点无精打采', '非常萎靡', '异常亢奋'],
      icon: '😊'
    },
    {
      id: 'q3',
      question: '💧 狗狗的饮水量有变化吗？',
      options: ['正常', '饮水量增加', '饮水量减少', '不喝水'],
      icon: '💧'
    }
  ];

  let questions = [...baseQuestions];

  if (analysisResult.state === '可能不适' || analysisResult.state === '需要关注') {
    questions.push(
      {
        id: 'q4',
        question: '🤢 狗狗最近有呕吐或腹泻的情况吗？',
        options: ['没有', '偶尔呕吐', '经常呕吐', '有腹泻'],
        icon: '🤢'
      },
      {
        id: 'q5',
        question: '💩 狗狗的排便情况如何？',
        options: ['正常', '便秘', '腹泻', '颜色异常'],
        icon: '💩'
      }
    );
  }

  if (analysisResult.possibleIssues.includes('消化问题')) {
    questions.push({
      id: 'q6',
      question: '🍽️ 狗狗最近的饮食有变化吗？',
      options: ['没有变化', '换了新狗粮', '吃了人食', '吃了异物'],
      icon: '🍽️'
    });
  }

  return questions;
};

const generateReport = (analysisResult, answers) => {
  let healthStatus = '正常';
  let severity = 0;

  if (analysisResult.state === '可能不适') {
    healthStatus = '需要关注';
    severity = 1;
  } else if (analysisResult.state === '需要关注') {
    healthStatus = '建议就医';
    severity = 2;
  }

  const answerValues = Object.values(answers);
  if (answerValues.includes('完全不吃') || answerValues.includes('非常萎靡')) {
    healthStatus = '建议立即就医';
    severity = 3;
  } else if (answerValues.includes('食欲不振') || answerValues.includes('有点无精打采')) {
    if (severity < 1) severity = 1;
    if (healthStatus === '正常') healthStatus = '需要关注';
  }

  let recommendations = [];
  if (severity === 0) {
    recommendations = [
      '🎉 继续保持良好的饮食和运动习惯',
      '🏥 定期带狗狗进行体检',
      '👀 注意观察狗狗的日常行为变化'
    ];
  } else if (severity === 1) {
    recommendations = [
      '🍖 调整狗狗的饮食，确保营养均衡',
      '😴 增加休息时间，避免过度运动',
      '⏰ 观察2-3天，如无改善建议就医'
    ];
  } else if (severity === 2) {
    recommendations = [
      '🏥 建议尽快带狗狗去看兽医',
      '📝 记录狗狗的症状和行为变化',
      '🛌 暂时减少运动，让狗狗充分休息'
    ];
  } else {
    recommendations = [
      '🚨 立即带狗狗去看兽医',
      '🤫 保持狗狗安静，避免刺激',
      '📋 准备好描述狗狗的症状和近期行为'
    ];
  }

  return {
    healthStatus,
    severity,
    possibleIssues: analysisResult.possibleIssues,
    recommendations,
    analysisResult,
    answers,
    createdAt: Date.now()
  };
};

export { analyzeImage, generateQuestions, generateReport };