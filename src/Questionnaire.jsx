import { useState, useEffect } from 'react'

// 可爱的狗狗图标
const DogIcon = ({ className }) => (
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
)

// 爱心图标
const HeartIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
)

// 骨头图标
const BoneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 40" fill="currentColor">
    <rect x="20" y="12" width="60" height="16" rx="8" />
    <circle cx="20" cy="12" r="10" />
    <circle cx="20" cy="28" r="10" />
    <circle cx="80" cy="12" r="10" />
    <circle cx="80" cy="28" r="10" />
  </svg>
)

function Questionnaire({ analysisResult, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    if (analysisResult) {
      const generatedQuestions = generateQuestions(analysisResult)
      setQuestions(generatedQuestions)
    }
  }, [analysisResult])

  const generateQuestions = (result) => {
    const baseQuestions = [
      {
        id: 'q1',
        question: '🍖 狗狗最近的饮食情况如何？',
        options: ['正常进食 😊', '食欲不振 😕', '完全不吃 😰', '吃得比平时多 🤔'],
        icon: '🍖'
      },
      {
        id: 'q2',
        question: '😊 狗狗的精神状态怎么样？',
        options: ['活泼好动 🎾', '有点无精打采 😔', '非常萎靡 😢', '异常亢奋 🤪'],
        icon: '😊'
      },
      {
        id: 'q3',
        question: '💧 狗狗的饮水量有变化吗？',
        options: ['正常 💧', '饮水量增加 🌊', '饮水量减少 🏜️', '不喝水 🚫'],
        icon: '💧'
      }
    ]

    if (result.state === '可能不适' || result.state === '需要关注') {
      baseQuestions.push(
        {
          id: 'q4',
          question: '🤢 狗狗最近有呕吐或腹泻的情况吗？',
          options: ['没有 ✅', '偶尔呕吐 😕', '经常呕吐 😰', '有腹泻 💩'],
          icon: '🤢'
        },
        {
          id: 'q5',
          question: '💩 狗狗的排便情况如何？',
          options: ['正常 ✅', '便秘 😣', '腹泻 💦', '颜色异常 🎨'],
          icon: '💩'
        }
      )
    }

    if (result.possibleIssues.includes('消化问题')) {
      baseQuestions.push(
        {
          id: 'q6',
          question: '🍽️ 狗狗最近的饮食有变化吗？',
          options: ['没有变化 ✅', '换了新狗粮 🆕', '吃了人食 🍕', '吃了异物 ⚠️'],
          icon: '🍽️'
        }
      )
    }

    return baseQuestions
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete({ analysisResult, answers })
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  if (!analysisResult) {
    return (
      <div className="min-h-screen bg-pattern-hearts flex items-center justify-center">
        <div className="text-center">
          <DogIcon className="w-20 h-20 text-cartoon-pink animate-bounce mx-auto mb-4" />
          <p className="text-gray-600 text-xl font-bold">正在准备问题...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pattern-hearts relative overflow-hidden">
      {/* 浮动装饰 */}
      <div className="absolute top-10 left-10 animate-float">
        <HeartIcon className="w-10 h-10 text-cartoon-pink opacity-30" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
        <BoneIcon className="w-12 h-6 text-cartoon-orange opacity-30 rotate-12" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <DogIcon className="w-14 h-14 text-cartoon-purple opacity-20" />
      </div>

      {/* 导航栏 */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-cartoon-pink rounded-full p-2">
                <DogIcon className="w-10 h-10 text-white" />
              </div>
              <span className="text-2xl font-black text-gradient">DoggyHealth</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 问答区域 */}
      <section className="relative z-10 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-cartoon bg-white relative">
            {/* 装饰角标 */}
            <div className="absolute -top-4 -left-4 bg-cartoon-purple text-white font-bold px-4 py-2 rounded-full text-sm transform -rotate-12 shadow-lg">
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
                <span className="flex items-center">
                  <span className="text-2xl mr-1">📋</span>
                  问题 {currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-cartoon-pink">{Math.round((currentQuestion + 1) / questions.length * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
                <div 
                  className="bg-gradient-to-r from-cartoon-pink to-cartoon-purple h-full rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 当前问题 */}
            {questions.length > 0 && (
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
                      className={`flex items-center p-4 rounded-cartoon border-4 cursor-pointer transition-all duration-300 ${
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
                        className="w-6 h-6 text-cartoon-pink focus:ring-cartoon-pink border-4 border-gray-300"
                      />
                      <span className="ml-4 text-lg font-bold text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* 按钮 */}
            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-8 py-4 rounded-cartoon font-bold text-lg transition-all duration-300 ${
                  currentQuestion === 0 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-cartoon-purple hover:bg-cartoon-purple/10 border-4 border-cartoon-purple'
                }`}
              >
                ← 上一题
              </button>
              <button
                onClick={handleNext}
                disabled={!answers[questions[currentQuestion]?.id]}
                className={`px-8 py-4 rounded-cartoon font-bold text-lg transition-all duration-300 ${
                  !answers[questions[currentQuestion]?.id]
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cartoon-pink to-cartoon-purple text-white hover:shadow-lg transform hover:-translate-y-1'
                }`}
              >
                {currentQuestion === questions.length - 1 ? '✨ 完成评估' : '下一题 →'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="relative z-10 bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-lg">© 2026 DoggyHealth. 保留所有权利。🐕💕</p>
        </div>
      </footer>
    </div>
  )
}

export default Questionnaire