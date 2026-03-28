import { useState } from 'react'
import Questionnaire from './Questionnaire'
import HealthReport from './HealthReport'

// 可爱的狗狗 SVG 图标
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

// 爪印图标
const PawIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <ellipse cx="50" cy="65" rx="20" ry="18" />
    <ellipse cx="25" cy="40" rx="10" ry="12" />
    <ellipse cx="45" cy="30" rx="10" ry="12" />
    <ellipse cx="65" cy="35" rx="10" ry="12" />
    <ellipse cx="75" cy="50" rx="10" ry="12" />
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

function App() {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [assessmentData, setAssessmentData] = useState(null)
  const [currentStep, setCurrentStep] = useState('upload')

  // 模拟AI图像分析函数
  const analyzeImage = (imageData) => {
    const possibleStates = [
      {
        state: '正常',
        confidence: 0.85,
        symptoms: ['精神状态良好', '毛发有光泽', '姿势正常'],
        possibleIssues: []
      },
      {
        state: '可能不适',
        confidence: 0.75,
        symptoms: ['精神状态不佳', '姿势异常', '毛发无光泽'],
        possibleIssues: ['食欲不振', '疲劳', '轻微不适']
      },
      {
        state: '需要关注',
        confidence: 0.65,
        symptoms: ['精神萎靡', '姿势异常', '毛发杂乱'],
        possibleIssues: ['可能生病', '疼痛', '消化问题']
      }
    ]
    
    const randomIndex = Math.floor(Math.random() * possibleStates.length)
    return possibleStates[randomIndex]
  }

  const handleFileChange = (file) => {
    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('只支持 JPG, PNG, WEBP 格式的图片哦 🐕')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('图片太大啦，不能超过 5MB 哦 🦴')
      return
    }

    setError(null)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
    }
    reader.readAsDataURL(file)

    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      const result = analyzeImage(file)
      setAnalysisResult(result)
      setTimeout(() => {
        setCurrentStep('questionnaire')
      }, 300)
    }, 2000)
  }

  const handleUpload = (e) => {
    const file = e.target.files[0]
    handleFileChange(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  const handleQuestionnaireComplete = (data) => {
    setAssessmentData(data)
    setCurrentStep('report')
  }

  const handleRestart = () => {
    setCurrentStep('upload')
    setPreview(null)
    setError(null)
    setAnalysisResult(null)
    setAssessmentData(null)
  }

  return (
    <>
      {currentStep === 'upload' && (
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
          <div className="absolute top-40 left-1/4 animate-float" style={{ animationDelay: '1.5s' }}>
            <PawIcon className="w-10 h-10 text-cartoon-blue opacity-25" />
          </div>
          <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '0.8s' }}>
            <PawIcon className="w-14 h-14 text-cartoon-green opacity-20" />
          </div>

          {/* 导航栏 */}
          <nav className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <div className="flex items-center space-x-3">
                  <div className="bg-cartoon-pink rounded-full p-2 animate-pulse-soft">
                    <DogIcon className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-2xl font-black text-gradient">DoggyHealth</span>
                </div>
                <button className="btn-cartoon bg-cartoon-pink text-lg">
                  🐕 开始检测
                </button>
              </div>
            </div>
          </nav>

          {/* 英雄区域 */}
          <section className="relative z-10 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* 标题区域 */}
              <div className="text-center mb-12">
                <div className="inline-block animate-bounce-slow mb-6">
                  <DogIcon className="w-32 h-32 text-cartoon-pink mx-auto" />
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-6 leading-tight">
                  <span className="text-cartoon-pink">狗狗</span>
                  <span className="text-cartoon-purple">健康</span>
                  <span className="text-cartoon-blue">小助手</span>
                  <span className="inline-block animate-wiggle">🐾</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                  上传狗狗照片，AI智能分析健康状况
                  <br />
                  <span className="text-cartoon-pink">让每一只狗狗都健康快乐！</span>
                </p>
              </div>

              {/* 上传区域 */}
              <div className="max-w-2xl mx-auto">
                <div className="card-cartoon bg-white relative">
                  {/* 装饰角标 */}
                  <div className="absolute -top-4 -right-4 bg-cartoon-yellow text-gray-800 font-bold px-4 py-2 rounded-full text-sm transform rotate-12 shadow-lg">
                    ✨ 免费检测
                  </div>
                  
                  <h2 className="text-3xl font-black text-gray-800 mb-4 text-center">
                    📸 上传狗狗照片
                  </h2>
                  <p className="text-gray-600 mb-6 text-center text-lg">
                    拍一张清晰的狗狗照片，让我来帮你分析健康状况吧！
                  </p>
                  
                  {error && (
                    <div className="bg-cartoon-red/10 border-4 border-cartoon-red text-cartoon-red p-4 rounded-cartoon mb-6 font-bold text-center">
                      {error}
                    </div>
                  )}
                  
                  {preview && (
                    <div className="mb-6">
                      <div className="relative rounded-cartoon overflow-hidden border-4 border-cartoon-pink">
                        <img 
                          src={preview} 
                          alt="狗狗照片预览" 
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 rounded-full p-2">
                          <HeartIcon className="w-6 h-6 text-cartoon-pink" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div 
                    className={`border-4 ${dragging ? 'border-cartoon-pink bg-cartoon-pink/5' : 'border-dashed border-gray-300'} rounded-cartoon p-8 transition-all duration-300`}
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
                        <p className="text-gray-400 text-sm">稍等片刻哦 🐕</p>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center cursor-pointer w-full">
                        <div className="flex flex-col items-center justify-center">
                          <div className="bg-cartoon-pink/10 rounded-full p-6 mb-4">
                            <PawIcon className="w-16 h-16 text-cartoon-pink" />
                          </div>
                          <p className="text-xl text-gray-700 font-bold mb-2">
                            <span className="text-cartoon-pink">点击上传</span> 或拖放照片
                          </p>
                          <p className="text-gray-400 text-sm">
                            支持 JPG、PNG、WEBP 格式 (最大 5MB)
                          </p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*" 
                          onChange={handleUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 功能介绍 */}
          <section className="relative z-10 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-black text-center mb-12">
                <span className="text-gradient">✨ 我们的功能 ✨</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 功能1 */}
                <div className="card-cartoon bg-soft-pink text-center group">
                  <div className="bg-cartoon-pink rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <DogIcon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-3">
                    🤖 AI图像分析
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    通过先进的AI技术，分析狗狗的表情、姿态和外观，初步判断健康状况
                  </p>
                </div>
                
                {/* 功能2 */}
                <div className="card-cartoon bg-soft-purple text-center group">
                  <div className="bg-cartoon-purple rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-4xl">💬</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-3">
                    🎯 智能问答
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    根据狗狗的状态，生成针对性的问题，收集更多健康信息
                  </p>
                </div>
                
                {/* 功能3 */}
                <div className="card-cartoon bg-soft-green text-center group">
                  <div className="bg-cartoon-green rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-4xl">📋</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-3">
                    💝 健康报告
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    综合分析结果，生成详细的健康报告和专业的治疗建议
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 常见问题 */}
          <section className="relative z-10 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-black text-center mb-12">
                <span className="text-gradient">❓ 常见问题 ❓</span>
              </h2>
              
              <div className="space-y-6">
                <div className="card-cartoon bg-white">
                  <h3 className="text-xl font-black text-gray-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🤔</span>
                    检测结果准确吗？
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    我们的AI模型经过大量数据训练，能够识别常见的健康问题。但请注意，这只是初步筛查，不能替代专业兽医的诊断哦！
                  </p>
                </div>
                
                <div className="card-cartoon bg-white">
                  <h3 className="text-xl font-black text-gray-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🔒</span>
                    上传的照片会被保存吗？
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    我们尊重您的隐私，上传的照片仅用于分析，不会被保存或用于其他目的，请放心使用！
                  </p>
                </div>
                
                <div className="card-cartoon bg-white">
                  <h3 className="text-xl font-black text-gray-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">⏱️</span>
                    多久能得到检测结果？
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    通常在上传照片后几秒钟内就能完成分析，加上问答环节，整个过程大约需要5-10分钟，很快的哦！
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 页脚 */}
          <footer className="relative z-10 bg-gray-800 text-white py-12 mt-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                  <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                    <DogIcon className="w-10 h-10 text-cartoon-pink" />
                    <span className="text-2xl font-black">DoggyHealth</span>
                  </div>
                  <p className="text-gray-400 text-lg">
                    用AI技术守护每一只狗狗的健康 🐕💕
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-black mb-4 text-cartoon-pink">快速链接</h3>
                  <ul className="space-y-2 text-lg">
                    <li><a href="#" className="text-gray-400 hover:text-cartoon-pink transition-colors">🏠 首页</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-cartoon-pink transition-colors">🔍 开始检测</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-cartoon-pink transition-colors">ℹ️ 关于我们</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-black mb-4 text-cartoon-pink">联系我们</h3>
                  <p className="text-gray-400 text-lg">
                    📧 support@doggyhealth.com
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4 mt-4">
                    <HeartIcon className="w-8 h-8 text-cartoon-pink" />
                    <DogIcon className="w-8 h-8 text-cartoon-purple" />
                    <BoneIcon className="w-8 h-8 text-cartoon-orange" />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                <p className="text-gray-400 text-lg">© 2026 DoggyHealth. 保留所有权利。Made with 🐾</p>
              </div>
            </div>
          </footer>
        </div>
      )}
      
      {currentStep === 'questionnaire' && (
        <Questionnaire 
          analysisResult={analysisResult} 
          onComplete={handleQuestionnaireComplete} 
        />
      )}
      
      {currentStep === 'report' && (
        <HealthReport 
          assessmentData={assessmentData} 
          onRestart={handleRestart} 
        />
      )}
    </>
  )
}

export default App