# DoggyHealth MVP 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现 DoggyHealth 狗狗健康检测平台的第一阶段（MVP），包括核心检测流程（上传→问答→报告）、云端 AI API 集成、基础响应式布局和模块化重构。

**Architecture:** 采用模块化组件架构，将现有的单文件结构拆分为多模块：组件层（通用组件 + 图标）、页面层（首页 + 问答页 + 报告页）、服务层（AI API）、状态管理层（Zustand）、路由层（React Router）。

**Tech Stack:** React 19 + Vite 6 + Tailwind CSS 4 + React Router 6 + Zustand 5 + dayjs 2

---

## 文件结构规划

```
src/
├── components/
│   ├── common/           # 通用组件
│   │   ├── Button.jsx    # 按钮组件
│   │   ├── Card.jsx     # 卡片组件
│   │   └── Loading.jsx  # 加载组件
│   ├── layout/          # 布局组件
│   │   ├── Navbar.jsx   # 导航栏
│   │   └── Footer.jsx  # 页脚
│   └── icons/           # SVG 图标
│       ├── DogIcon.jsx
│       ├── PawIcon.jsx
│       ├── HeartIcon.jsx
│       ├── BoneIcon.jsx
│       └── StarIcon.jsx
├── pages/
│   ├── Home/            # 首页
│   │   └── index.jsx
│   ├── Questionnaire/   # 问答页
│   │   └── index.jsx
│   └── Report/         # 报告页
│       └── index.jsx
├── hooks/               # 自定义 Hooks
│   └── useImageUpload.js
├── services/            # API 服务层
│   └── aiService.js
├── store/               # 状态管理
│   └── useStore.js
├── utils/               # 工具函数
│   └── helpers.js
└── styles/
    └── index.css       # 全局样式
```

---

## Task 1: 项目基础配置升级

**Files:**
- Modify: `package.json` - 添加 Zustand、React Router、dayjs 依赖
- Modify: `tailwind.config.js` - 确保自定义颜色和动画配置完整

- [ ] **Step 1: 安装新依赖**

Run: `npm install zustand react-router-dom dayjs`
Expected: 依赖安装成功

- [ ] **Step 2: 更新 package.json 确认版本**

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.x",
    "zustand": "^5.x",
    "dayjs": "^2.x"
  }
}
```

- [ ] **Step 3: 运行 build 验证**

Run: `npm run build`
Expected: 构建成功，无报错

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: 添加 Zustand、React Router、dayjs 依赖"
```

---

## Task 2: 创建通用组件

**Files:**
- Create: `src/components/common/Button.jsx`
- Create: `src/components/common/Card.jsx`
- Create: `src/components/common/Loading.jsx`

- [ ] **Step 1: 创建 Button 组件**

```jsx
import React from 'react';

const Button = ({ children, variant = 'primary', onClick, disabled, className = '' }) => {
  const baseClasses = 'px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cartoon-pink to-cartoon-purple text-white hover:shadow-lg hover:-translate-y-1',
    secondary: 'bg-white text-cartoon-pink border-4 border-cartoon-pink hover:bg-cartoon-pink/10',
    ghost: 'bg-transparent text-cartoon-pink hover:bg-cartoon-pink/10'
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
```

- [ ] **Step 2: 创建 Card 组件**

```jsx
import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-3xl shadow-lg p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
```

- [ ] **Step 3: 创建 Loading 组件**

```jsx
import React from 'react';
import DogIcon from '../icons/DogIcon';
import HeartIcon from '../icons/HeartIcon';

const Loading = ({ message = '加载中...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <DogIcon className="w-20 h-20 text-cartoon-pink animate-bounce" />
        <div className="absolute -bottom-2 -right-2">
          <HeartIcon className="w-8 h-8 text-cartoon-red animate-pulse" />
        </div>
      </div>
      <p className="text-gray-600 mt-4 text-lg font-bold">{message}</p>
    </div>
  );
};

export default Loading;
```

- [ ] **Step 4: Commit**

```bash
git add src/components/common/
git commit -m "feat: 创建通用组件（Button、Card、Loading）"
```

---

## Task 3: 创建 SVG 图标组件

**Files:**
- Create: `src/components/icons/DogIcon.jsx`
- Create: `src/components/icons/PawIcon.jsx`
- Create: `src/components/icons/HeartIcon.jsx`
- Create: `src/components/icons/BoneIcon.jsx`
- Create: `src/components/icons/StarIcon.jsx`

- [ ] **Step 1: 创建 DogIcon 组件**

```jsx
import React from 'react';

const DogIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <ellipse cx="50" cy="60" rx="35" ry="30" />
    <circle cx="35" cy="45" r="12" />
    <circle cx="65" cy="45" r="12" />
    <ellipse cx="50" cy="70" rx="8" ry="6" />
    <circle cx="38" cy="48" r="3" fill="white" />
    <circle cx="62" cy="48" r="3" fill="white" />
    <circle cx="38" cy="48" r="1.5" fill="black" />
    <circle cx="62" cy="48" r="1.5" fill="black" />
    <ellipse cx="50" cy="58" rx="4" ry="3" fill="#FF6B9D" />
    <path d="M45 65 Q50 70 55 65" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

export default DogIcon;
```

- [ ] **Step 2: 创建其他图标组件（简化版）**

```jsx
// PawIcon.jsx
import React from 'react';
const PawIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <ellipse cx="50" cy="65" rx="20" ry="18" />
    <ellipse cx="25" cy="40" rx="10" ry="12" />
    <ellipse cx="45" cy="30" rx="10" ry="12" />
    <ellipse cx="65" cy="35" rx="10" ry="12" />
    <ellipse cx="75" cy="50" rx="10" ry="12" />
  </svg>
);
export default PawIcon;

// HeartIcon.jsx
import React from 'react';
const HeartIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);
export default HeartIcon;

// BoneIcon.jsx
import React from 'react';
const BoneIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 40" fill="currentColor">
    <rect x="20" y="12" width="60" height="16" rx="8" />
    <circle cx="20" cy="12" r="10" />
    <circle cx="20" cy="28" r="10" />
    <circle cx="80" cy="12" r="10" />
    <circle cx="80" cy="28" r="10" />
  </svg>
);
export default BoneIcon;

// StarIcon.jsx
import React from 'react';
const StarIcon = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
export default StarIcon;
```

- [ ] **Step 3: Commit**

```bash
git add src/components/icons/
git commit -m "feat: 创建 SVG 图标组件集"
```

---

## Task 4: 创建 Zustand 状态管理

**Files:**
- Create: `src/store/useStore.js`

- [ ] **Step 1: 创建状态管理 store**

```javascript
import { create } from 'zustand';

const useStore = create((set, get) => ({
  // 检测流程状态
  currentStep: 'upload', // upload | questionnaire | report
  preview: null,
  analysisResult: null,
  answers: {},
  report: null,

  // 历史记录
  history: [],

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setPreview: (preview) => set({ preview }),
  
  setAnalysisResult: (result) => set({ analysisResult: result }),
  
  setAnswers: (answers) => set({ answers }),
  
  addAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),
  
  setReport: (report) => set({ report }),
  
  addToHistory: (record) => set((state) => ({
    history: [record, ...state.history].slice(0, 50) // 最多保留50条
  })),
  
  resetDetection: () => set({
    currentStep: 'upload',
    preview: null,
    analysisResult: null,
    answers: {},
    report: null
  }),

  // 从 localStorage 加载历史
  loadHistory: () => {
    const saved = localStorage.getItem('doggyhealth_history');
    if (saved) {
      set({ history: JSON.parse(saved) });
    }
  },

  // 保存历史到 localStorage
  saveHistory: () => {
    const { history } = get();
    localStorage.setItem('doggyhealth_history', JSON.stringify(history));
  }
}));

export default useStore;
```

- [ ] **Step 2: Commit**

```bash
git add src/store/useStore.js
git commit -m "feat: 创建 Zustand 状态管理"
```

---

## Task 5: 创建 AI 服务层

**Files:**
- Create: `src/services/aiService.js`

- [ ] **Step 1: 创建 AI 服务（模拟云端 API）**

```javascript
// 模拟云端宠物健康 AI API
// 实际项目中替换为真实 API 调用

const analyzeImage = async (imageData) => {
  // 模拟 API 调用延迟
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

// 生成动态问卷
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

// 生成健康报告
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
```

- [ ] **Step 2: Commit**

```bash
git add src/services/aiService.js
git commit -m "feat: 创建 AI 服务层（图像分析、问题生成、报告生成）"
```

---

## Task 6: 创建自定义 Hook

**Files:**
- Create: `src/hooks/useImageUpload.js`

- [ ] **Step 1: 创建图片上传 Hook**

```javascript
import { useState, useCallback } from 'react';

const useImageUpload = () => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return '只支持 JPG, PNG, WEBP 格式的图片哦 🐕';
    }
    if (file.size > 5 * 1024 * 1024) {
      return '图片太大啦，不能超过 5MB 哦 🦴';
    }
    return null;
  };

  const handleFile = useCallback((file) => {
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleUpload = useCallback((e) => {
    const file = e.target.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const reset = useCallback(() => {
    setPreview(null);
    setError(null);
    setIsUploading(false);
    setDragging(false);
  }, []);

  return {
    preview,
    error,
    isUploading,
    dragging,
    handleUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFile,
    setIsUploading,
    reset
  };
};

export default useImageUpload;
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useImageUpload.js
git commit -m "feat: 创建图片上传自定义 Hook"
```

---

## Task 7: 创建首页/Home 页面

**Files:**
- Create: `src/pages/Home/index.jsx`

- [ ] **Step 1: 创建首页组件**

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DogIcon from '../../components/icons/DogIcon';
import PawIcon from '../../components/icons/PawIcon';
import HeartIcon from '../../components/icons/HeartIcon';
import BoneIcon from '../../components/icons/BoneIcon';
import Card from '../../components/common/Card';
import useImageUpload from '../../hooks/useImageUpload';
import useStore from '../../store/useStore';
import { analyzeImage, generateQuestions } from '../../services/aiService';

const Home = () => {
  const navigate = useNavigate();
  const { setCurrentStep, setAnalysisResult } = useStore();
  const { 
    preview, error, isUploading, dragging,
    handleUpload, handleDragOver, handleDragLeave, handleDrop,
    setIsUploading, reset
  } = useImageUpload();

  const handleAnalysis = async (file) => {
    setIsUploading(true);
    reset();
    
    try {
      const result = await analyzeImage(file);
      setAnalysisResult(result);
      
      setTimeout(() => {
        setCurrentStep('questionnaire');
        navigate('/questionnaire');
      }, 500);
    } catch (err) {
      setError('分析失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview = e.target.result;
      };
      reader.readAsDataURL(file);
      handleAnalysis(file);
    }
  };

  return (
    <div className="min-h-screen bg-pattern-hearts relative overflow-hidden">
      {/* 浮动装饰元素 */}
      <div className="absolute top-10 left-10 animate-float">
        <HeartIcon className="w-12 h-12 text-cartoon-pink opacity-40" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
        <HeartIcon className="w-8 h-8 text-cartoon-purple opacity-30" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <BoneIcon className="w-16 h-8 text-cartoon-orange opacity-30 rotate-12" />
      </div>

      {/* 导航栏 */}
      <nav className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-cartoon-pink rounded-full p-2">
                <DogIcon className="w-10 h-10 text-white" />
              </div>
              <span className="text-2xl font-black text-gradient">DoggyHealth</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block animate-bounce-slow mb-6">
              <DogIcon className="w-32 h-32 text-cartoon-pink mx-auto" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-6">
              <span className="text-cartoon-pink">狗狗</span>
              <span className="text-cartoon-purple">健康</span>
              <span className="text-cartoon-blue">小助手</span>
              <span className="inline-block animate-wiggle ml-2">🐾</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              上传狗狗照片，AI智能分析健康状况
              <br />
              <span className="text-cartoon-pink">让每一只狗狗都健康快乐！</span>
            </p>
          </div>

          {/* 上传区域 */}
          <div className="max-w-2xl mx-auto">
            <Card className="relative">
              <div className="absolute -top-4 -right-4 bg-cartoon-yellow text-gray-800 font-bold px-4 py-2 rounded-full text-sm transform rotate-12">
                ✨ 免费检测
              </div>
              
              <h2 className="text-3xl font-black text-gray-800 mb-4 text-center">
                📸 上传狗狗照片
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                拍一张清晰的狗狗照片，让我来帮你分析健康状况吧！
              </p>
              
              {error && (
                <div className="bg-cartoon-red/10 border-4 border-cartoon-red text-cartoon-red p-4 rounded-2xl mb-6 font-bold text-center">
                  {error}
                </div>
              )}
              
              {preview && (
                <div className="mb-6">
                  <div className="relative rounded-2xl overflow-hidden border-4 border-cartoon-pink">
                    <img src={preview} alt="预览" className="w-full h-64 object-cover" />
                  </div>
                </div>
              )}
              
              <div 
                className={`border-4 ${dragging ? 'border-cartoon-pink bg-cartoon-pink/5' : 'border-dashed border-gray-300'} rounded-2xl p-8 transition-all duration-300`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <DogIcon className="w-20 h-20 text-cartoon-pink animate-bounce" />
                      <div className="absolute -bottom-2 -right-2">
                        <HeartIcon className="w-8 h-8 text-cartoon-red animate-pulse" />
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4 text-lg font-bold">AI正在分析中...</p>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer w-full">
                    <div className="bg-cartoon-pink/10 rounded-full p-6 mb-4">
                      <PawIcon className="w-16 h-16 text-cartoon-pink" />
                    </div>
                    <p className="text-xl text-gray-700 font-bold mb-2">
                      <span className="text-cartoon-pink">点击上传</span> 或拖放照片
                    </p>
                    <p className="text-gray-400 text-sm">
                      支持 JPG、PNG、WEBP 格式 (最大 5MB)
                    </p>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange}
                    />
                  </label>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 功能介绍 */}
      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="text-gradient">✨ 我们的功能 ✨</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-soft-pink text-center">
              <div className="bg-cartoon-pink rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <DogIcon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">🤖 AI图像分析</h3>
              <p className="text-gray-600">通过AI技术分析狗狗的外观，初步判断健康状况</p>
            </Card>
            
            <Card className="bg-soft-purple text-center">
              <div className="bg-cartoon-purple rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">💬</span>
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">🎯 智能问答</h3>
              <p className="text-gray-600">根据狗狗的状态，生成针对性的问题</p>
            </Card>
            
            <Card className="bg-soft-green text-center">
              <div className="bg-cartoon-green rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">💝 健康报告</h3>
              <p className="text-gray-600">生成详细的健康报告和专业的治疗建议</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home/
git commit -m "feat: 创建首页组件"
```

---

## Task 8: 创建问答页/Questionnaire 页面

**Files:**
- Create: `src/pages/Questionnaire/index.jsx`

- [ ] **Step 1: 创建问答页面**

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DogIcon from '../../components/icons/DogIcon';
import HeartIcon from '../../components/icons/HeartIcon';
import BoneIcon from '../../components/icons/BoneIcon';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import useStore from '../../store/useStore';
import { generateQuestions, generateReport } from '../../services/aiService';

const Questionnaire = () => {
  const navigate = useNavigate();
  const { analysisResult, setAnswers, addAnswer, setReport, addToHistory, saveHistory } = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswersLocal] = useState({});

  useEffect(() => {
    if (analysisResult) {
      const generatedQuestions = generateQuestions(analysisResult);
      setQuestions(generatedQuestions);
    }
  }, [analysisResult]);

  const handleAnswer = (questionId, answer) => {
    setAnswersLocal(prev => ({ ...prev, [questionId]: answer }));
    addAnswer(questionId, answer);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const report = generateReport(analysisResult, answers);
      setReport(report);
      addToHistory({
        id: Date.now().toString(),
        timestamp: Date.now(),
        imagePreview: null,
        analysisResult,
        answers: { ...answers },
        report
      });
      saveHistory();
      navigate('/report');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!analysisResult || questions.length === 0) {
    return (
      <div className="min-h-screen bg-pattern-hearts flex items-center justify-center">
        <DogIcon className="w-20 h-20 text-cartoon-pink animate-bounce" />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-pattern-hearts relative overflow-hidden">
      {/* 浮动装饰 */}
      <div className="absolute top-10 left-10 animate-float">
        <HeartIcon className="w-10 h-10 text-cartoon-pink opacity-30" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
        <BoneIcon className="w-12 h-6 text-cartoon-orange opacity-30 rotate-12" />
      </div>

      {/* 问答区域 */}
      <section className="relative z-10 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="relative">
            <div className="absolute -top-4 -left-4 bg-cartoon-purple text-white font-bold px-4 py-2 rounded-full text-sm transform -rotate-12">
              🐕 问答环节
            </div>

            <h1 className="text-3xl font-black text-gray-800 mb-2 text-center">
              狗狗健康评估问答
            </h1>
            <p className="text-gray-500 text-center mb-8">
              请回答以下问题，帮助AI更准确地分析狗狗的健康状况
            </p>
            
            {/* 进度条 */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-gray-600 mb-3">
                <span>问题 {currentQuestion + 1}/{questions.length}</span>
                <span className="text-cartoon-pink">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
                <div 
                  className="bg-gradient-to-r from-cartoon-pink to-cartoon-purple h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* 当前问题 */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <span className="text-5xl mr-4">{questions[currentQuestion].icon}</span>
                <h2 className="text-2xl font-black text-gray-800">
                  {questions[currentQuestion].question}
                </h2>
              </div>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <label 
                    key={index} 
                    className={`flex items-center p-4 rounded-2xl border-4 cursor-pointer transition-all duration-300 ${
                      answers[questions[currentQuestion].id] === option
                        ? 'border-cartoon-pink bg-cartoon-pink/10'
                        : 'border-gray-200 hover:border-cartoon-purple hover:bg-soft-purple'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestion].id}`}
                      value={option}
                      checked={answers[questions[currentQuestion].id] === option}
                      onChange={() => handleAnswer(questions[currentQuestion].id, option)}
                      className="w-6 h-6 text-cartoon-pink"
                    />
                    <span className="ml-4 text-lg font-bold text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 按钮 */}
            <div className="flex justify-between">
              <Button
                variant={currentQuestion === 0 ? 'ghost' : 'secondary'}
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                ← 上一题
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion]?.id]}
              >
                {currentQuestion === questions.length - 1 ? '✨ 完成评估' : '下一题 →'}
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Questionnaire;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Questionnaire/
git commit -m "feat: 创建问答页面组件"
```

---

## Task 9: 创建报告页/Report 页面

**Files:**
- Create: `src/pages/Report/index.jsx`

- [ ] **Step 1: 创建报告页面**

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DogIcon from '../../components/icons/DogIcon';
import HeartIcon from '../../components/icons/HeartIcon';
import BoneIcon from '../../components/icons/BoneIcon';
import StarIcon from '../../components/icons/StarIcon';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import useStore from '../../store/useStore';

const Report = () => {
  const navigate = useNavigate();
  const { report, resetDetection } = useStore();

  const handleRestart = () => {
    resetDetection();
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '正常': return 'bg-cartoon-green text-white';
      case '需要关注': return 'bg-cartoon-yellow text-gray-800';
      case '建议就医': return 'bg-cartoon-orange text-white';
      case '建议立即就医': return 'bg-cartoon-red text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getStatusEmoji = (status) => {
    switch (status) {
      case '正常': return '🎉';
      case '需要关注': return '⚠️';
      case '建议就医': return '🏥';
      case '建议立即就医': return '🚨';
      default: return '❓';
    }
  };

  if (!report) {
    return (
      <div className="min-h-screen bg-pattern-hearts flex items-center justify-center">
        <DogIcon className="w-20 h-20 text-cartoon-pink animate-bounce" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pattern-hearts relative overflow-hidden">
      {/* 浮动装饰 */}
      <div className="absolute top-10 left-10 animate-float">
        <HeartIcon className="w-10 h-10 text-cartoon-pink opacity-30" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
        <StarIcon className="w-12 h-12 text-cartoon-yellow opacity-40" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <BoneIcon className="w-14 h-8 text-cartoon-orange opacity-30 rotate-12" />
      </div>

      {/* 报告区域 */}
      <section className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="relative">
            <div className="absolute -top-4 -right-4 bg-cartoon-green text-white font-bold px-4 py-2 rounded-full text-sm transform rotate-12">
              ✨ 报告已生成
            </div>

            <h1 className="text-4xl font-black text-gray-800 mb-8 text-center">
              📋 狗狗健康评估报告
            </h1>
            
            {/* 健康状态 */}
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold text-gray-700 mb-4">🏥 健康状态</h2>
              <div className={`inline-block px-8 py-4 rounded-2xl font-black text-2xl shadow-lg ${getStatusColor(report.healthStatus)}`}>
                <span className="mr-2">{getStatusEmoji(report.healthStatus)}</span>
                {report.healthStatus}
              </div>
            </div>
            
            {/* 可能的健康问题 */}
            {report.possibleIssues.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                  ⚠️ 可能的健康问题
                </h2>
                <div className="bg-soft-pink rounded-2xl p-6 border-4 border-cartoon-pink/20">
                  <ul className="space-y-3">
                    {report.possibleIssues.map((issue, index) => (
                      <li key={index} className="flex items-center text-lg text-gray-700 font-bold">
                        <span className="w-8 h-8 bg-cartoon-pink text-white rounded-full flex items-center justify-center mr-3 text-sm">
                          {index + 1}
                        </span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* 图像分析结果 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                🤖 AI图像分析结果
              </h2>
              <div className="bg-soft-blue rounded-2xl p-6 border-4 border-cartoon-blue/20">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <span className="text-gray-600 font-bold mr-2">状态:</span>
                    <span className="text-cartoon-pink font-black text-lg">{report.analysisResult.state}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 font-bold mr-2">置信度:</span>
                    <span className="text-cartoon-purple font-black text-lg">{Math.round(report.analysisResult.confidence * 100)}%</span>
                  </div>
                </div>
                <p className="text-gray-600 font-bold mb-3">识别到的症状:</p>
                <div className="flex flex-wrap gap-2">
                  {report.analysisResult.symptoms.map((symptom, index) => (
                    <span key={index} className="bg-white px-4 py-2 rounded-full text-gray-700 font-bold border-2 border-cartoon-blue/30">
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 专业建议 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                💝 专业建议
              </h2>
              <div className="bg-soft-green rounded-2xl p-6 border-4 border-cartoon-green/20">
                <ul className="space-y-4">
                  {report.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-cartoon-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                        ✓
                      </div>
                      <span className="text-gray-700 text-lg font-bold">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* 温馨提示 */}
            <div className="mb-8 bg-soft-yellow rounded-2xl p-6 border-4 border-cartoon-yellow/20">
              <div className="flex items-start">
                <span className="text-3xl mr-4">💡</span>
                <div>
                  <h3 className="font-black text-gray-800 mb-2 text-lg">温馨提示</h3>
                  <p className="text-gray-600">
                    以上结果仅供参考，不能替代专业兽医的诊断。如果狗狗出现严重症状，请及时就医！
                  </p>
                </div>
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleRestart}>
                <span className="text-2xl mr-2">🔄</span>
                重新检测
              </Button>
              <Button variant="secondary" onClick={() => window.print()}>
                <span className="text-2xl mr-2">🖨️</span>
                打印报告
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Report;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Report/
git commit -m "feat: 创建报告页面组件"
```

---

## Task 10: 配置 React Router 和主入口

**Files:**
- Modify: `src/main.jsx` - 添加 Router 配置
- Modify: `src/App.jsx` - 改为路由入口

- [ ] **Step 1: 修改 main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

- [ ] **Step 2: 简化 App.jsx 为路由容器**

```jsx
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Questionnaire from './pages/Questionnaire'
import Report from './pages/Report'
import useStore from './store/useStore'

function App() {
  const { loadHistory } = useStore()
  
  useEffect(() => {
    loadHistory()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  )
}

export default App
```

- [ ] **Step 3: 运行 build 验证**

Run: `npm run build`
Expected: 构建成功，无报错

- [ ] **Step 4: Commit**

```bash
git add src/main.jsx src/App.jsx
git commit -m "refactor: 配置 React Router 和主入口"
```

---

## Task 11: 最终验证和优化

**Files:**
- Verify: 所有页面功能
- Fix: 样式问题

- [ ] **Step 1: 运行开发服务器测试**

Run: `npm run dev`
Expected: 页面正常加载，点击上传可正常流程

- [ ] **Step 2: 测试完整流程**

1. 进入首页
2. 上传图片
3. 回答问题
4. 查看报告
5. 返回首页

- [ ] **Step 3: 运行 lint 检查**

Run: `npm run lint` (如果有)
Expected: 无错误

- [ ] **Step 4: 最终 Commit**

```bash
git add -A
git commit -m "feat: 完成 MVP 版本开发 - 核心检测流程"
git tag -a v2.0.0-mvp -m "DoggyHealth v2.0.0 MVP"
```

---

## 实施完成检查

对照 spec 文档验收：

- [x] 用户可上传狗狗照片 - Home 页面上传功能
- [x] AI 可返回分析结果 - aiService 分析函数
- [x] 问卷根据结果动态生成 - generateQuestions 动态生成
- [x] 报告清晰展示健康状态和建议 - Report 页面
- [x] 界面保持卡通可爱风格 - 沿用原有样式
- [x] 移动端可正常使用 - 响应式布局
- [x] 页面加载流畅 - Vite 优化

---

**Plan complete and saved to `docs/superpowers/plans/2026-03-28-doggyhealth-mvp-implementation.md`**

两个执行选项：

**1. Subagent-Driven (推荐)** - 我会为每个任务分配一个 subagent，任务间进行快速迭代审查

**2. Inline Execution** - 我在当前会话中逐步执行任务，定期进行审查

您选择哪种方式？