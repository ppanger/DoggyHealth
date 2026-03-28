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

// 星星图标
const StarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

function HealthReport({ assessmentData, onRestart }) {
  const [report, setReport] = useState(null)

  useEffect(() => {
    if (assessmentData) {
      const generatedReport = generateHealthReport(assessmentData)
      setReport(generatedReport)
    }
  }, [assessmentData])

  const generateHealthReport = (data) => {
    const { analysisResult, answers } = data
    
    let healthStatus = '正常'
    let severity = 0
    
    if (analysisResult.state === '可能不适') {
      healthStatus = '需要关注'
      severity = 1
    } else if (analysisResult.state === '需要关注') {
      healthStatus = '建议就医'
      severity = 2
    }
    
    const answerValues = Object.values(answers)
    if (answerValues.includes('完全不吃 😰') || answerValues.includes('非常萎靡 😢')) {
      healthStatus = '建议立即就医'
      severity = 3
    } else if (answerValues.includes('食欲不振 😕') || answerValues.includes('有点无精打采 😔')) {
      if (severity < 1) severity = 1
      if (healthStatus === '正常') healthStatus = '需要关注'
    }
    
    let recommendations = []
    if (severity === 0) {
      recommendations = [
        '🎉 继续保持良好的饮食和运动习惯',
        '🏥 定期带狗狗进行体检',
        '👀 注意观察狗狗的日常行为变化'
      ]
    } else if (severity === 1) {
      recommendations = [
        '🍖 调整狗狗的饮食，确保营养均衡',
        '😴 增加休息时间，避免过度运动',
        '⏰ 观察2-3天，如无改善建议就医'
      ]
    } else if (severity === 2) {
      recommendations = [
        '🏥 建议尽快带狗狗去看兽医',
        '📝 记录狗狗的症状和行为变化',
        '🛌 暂时减少运动，让狗狗充分休息'
      ]
    } else {
      recommendations = [
        '🚨 立即带狗狗去看兽医',
        '🤫 保持狗狗安静，避免刺激',
        '📋 准备好描述狗狗的症状和近期行为'
      ]
    }
    
    const possibleIssues = analysisResult.possibleIssues
    
    return {
      healthStatus,
      severity,
      possibleIssues,
      recommendations,
      analysisResult,
      answers
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case '正常':
        return 'bg-cartoon-green text-white'
      case '需要关注':
        return 'bg-cartoon-yellow text-gray-800'
      case '建议就医':
        return 'bg-cartoon-orange text-white'
      case '建议立即就医':
        return 'bg-cartoon-red text-white'
      default:
        return 'bg-gray-400 text-white'
    }
  }

  const getStatusEmoji = (status) => {
    switch (status) {
      case '正常':
        return '🎉'
      case '需要关注':
        return '⚠️'
      case '建议就医':
        return '🏥'
      case '建议立即就医':
        return '🚨'
      default:
        return '❓'
    }
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-pattern-hearts flex items-center justify-center">
        <div className="text-center">
          <DogIcon className="w-20 h-20 text-cartoon-pink animate-bounce mx-auto mb-4" />
          <p className="text-gray-600 text-xl font-bold">正在生成健康报告...</p>
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
        <StarIcon className="w-12 h-12 text-cartoon-yellow opacity-40" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <BoneIcon className="w-14 h-8 text-cartoon-orange opacity-30 rotate-12" />
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

      {/* 报告区域 */}
      <section className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-cartoon bg-white relative">
            {/* 装饰角标 */}
            <div className="absolute -top-4 -right-4 bg-cartoon-green text-white font-bold px-4 py-2 rounded-full text-sm transform rotate-12 shadow-lg">
              ✨ 报告已生成
            </div>

            <h1 className="text-4xl font-black text-gray-800 mb-8 text-center">
              📋 狗狗健康评估报告
            </h1>
            
            {/* 健康状态 */}
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                🏥 健康状态
              </h2>
              <div className={`inline-block px-8 py-4 rounded-cartoon font-black text-2xl shadow-lg ${getStatusColor(report.healthStatus)}`}>
                <span className="mr-2">{getStatusEmoji(report.healthStatus)}</span>
                {report.healthStatus}
              </div>
            </div>
            
            {/* 可能的健康问题 */}
            {report.possibleIssues.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                  <span className="text-2xl mr-2">⚠️</span>
                  可能的健康问题
                </h2>
                <div className="bg-soft-pink rounded-cartoon p-6 border-4 border-cartoon-pink/20">
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
                <span className="text-2xl mr-2">🤖</span>
                AI图像分析结果
              </h2>
              <div className="bg-soft-blue rounded-cartoon p-6 border-4 border-cartoon-blue/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                <span className="text-2xl mr-2">💝</span>
                专业建议
              </h2>
              <div className="bg-soft-green rounded-cartoon p-6 border-4 border-cartoon-green/20">
                <ul className="space-y-4">
                  {report.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-cartoon-green text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-bold">
                        ✓
                      </div>
                      <span className="text-gray-700 text-lg font-bold leading-relaxed">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* 温馨提示 */}
            <div className="mb-8 bg-soft-yellow rounded-cartoon p-6 border-4 border-cartoon-yellow/20">
              <div className="flex items-start">
                <span className="text-3xl mr-4">💡</span>
                <div>
                  <h3 className="font-black text-gray-800 mb-2 text-lg">温馨提示</h3>
                  <p className="text-gray-600 leading-relaxed">
                    以上结果仅供参考，不能替代专业兽医的诊断。如果狗狗出现严重症状，请及时就医！
                  </p>
                </div>
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onRestart}
                className="px-8 py-4 bg-gradient-to-r from-cartoon-pink to-cartoon-purple text-white rounded-cartoon font-black text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <span className="text-2xl mr-2">🔄</span>
                重新检测
              </button>
              <button
                onClick={() => window.print()}
                className="px-8 py-4 bg-white text-gray-700 rounded-cartoon font-black text-lg border-4 border-gray-300 hover:border-cartoon-blue hover:text-cartoon-blue transition-all duration-300 flex items-center justify-center"
              >
                <span className="text-2xl mr-2">🖨️</span>
                打印报告
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

export default HealthReport