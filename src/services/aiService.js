const analyzeImage = async (imageData) => {
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