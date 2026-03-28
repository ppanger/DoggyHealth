import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DogIcon from '../../components/icons/DogIcon';
import PawIcon from '../../components/icons/PawIcon';
import HeartIcon from '../../components/icons/HeartIcon';
import BoneIcon from '../../components/icons/BoneIcon';
import Card from '../../components/common/Card';
import useImageUpload from '../../hooks/useImageUpload';
import useStore from '../../store/useStore';
import { analyzeImage } from '../../services/aiService';

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
    
    try {
      const result = await analyzeImage(file);
      setAnalysisResult(result);
      setPreview(preview);
      
      setTimeout(() => {
        setCurrentStep('questionnaire');
        navigate('/questionnaire');
      }, 500);
    } catch (err) {
      console.error('分析失败:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        useStore.getState().setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      handleAnalysis(file);
    }
  };

  return (
    <div className="min-h-screen bg-pattern-hearts relative overflow-hidden">
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

      <nav className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-cartoon-pink rounded-full p-2 animate-pulse-soft">
                <DogIcon className="w-10 h-10 text-white" />
              </div>
              <span className="text-2xl font-black text-gradient">DoggyHealth</span>
            </div>
          </div>
        </div>
      </nav>

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

          <div className="max-w-2xl mx-auto">
            <Card className="relative">
              <div className="absolute -top-4 -right-4 bg-cartoon-yellow text-gray-800 font-bold px-4 py-2 rounded-full text-sm transform rotate-12 shadow-lg">
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
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-2">
                      <HeartIcon className="w-6 h-6 text-cartoon-pink" />
                    </div>
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
                    <p className="text-gray-400 text-sm">稍等片刻哦 🐕</p>
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

      <section className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="text-gradient">✨ 我们的功能 ✨</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-soft-pink text-center group">
              <div className="bg-cartoon-pink rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <DogIcon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">🤖 AI图像分析</h3>
              <p className="text-gray-600">通过先进的AI技术，分析狗狗的外观，初步判断健康状况</p>
            </Card>
            
            <Card className="bg-soft-purple text-center group">
              <div className="bg-cartoon-purple rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-4xl">💬</span>
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">🎯 智能问答</h3>
              <p className="text-gray-600">根据狗狗的状态，生成针对性的问题，收集更多健康信息</p>
            </Card>
            
            <Card className="bg-soft-green text-center group">
              <div className="bg-cartoon-green rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-4xl">📋</span>
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">💝 健康报告</h3>
              <p className="text-gray-600">综合分析结果，生成详细的健康报告和专业的治疗建议</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12">
            <span className="text-gradient">❓ 常见问题 ❓</span>
          </h2>
          
          <div className="space-y-6">
            <Card className="bg-white">
              <h3 className="text-xl font-black text-gray-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">🤔</span>
                检测结果准确吗？
              </h3>
              <p className="text-gray-600">
                我们的AI模型经过大量数据训练，能够识别常见的健康问题。但请注意，这只是初步筛查，不能替代专业兽医的诊断哦！
              </p>
            </Card>
            
            <Card className="bg-white">
              <h3 className="text-xl font-black text-gray-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">🔒</span>
                上传的照片会被保存吗？
              </h3>
              <p className="text-gray-600">
                我们尊重您的隐私，上传的照片仅用于分析，不会被保存或用于其他目的，请放心使用！
              </p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-lg">© 2026 DoggyHealth. 保留所有权利。Made with 🐾</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;