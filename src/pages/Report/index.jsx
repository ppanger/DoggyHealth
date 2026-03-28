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
      <div className="absolute top-10 left-10 animate-float">
        <HeartIcon className="w-10 h-10 text-cartoon-pink opacity-30" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
        <StarIcon className="w-12 h-12 text-cartoon-yellow opacity-40" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <BoneIcon className="w-14 h-8 text-cartoon-orange opacity-30 rotate-12" />
      </div>

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

      <section className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="relative">
            <div className="absolute -top-4 -right-4 bg-cartoon-green text-white font-bold px-4 py-2 rounded-full text-sm transform rotate-12 shadow-lg">
              ✨ 报告已生成
            </div>

            <h1 className="text-4xl font-black text-gray-800 mb-8 text-center">
              📋 狗狗健康评估报告
            </h1>
            
            <div className="mb-8 text-center">
              <h2 className="text-xl font-bold text-gray-700 mb-4">🏥 健康状态</h2>
              <div className={`inline-block px-8 py-4 rounded-2xl font-black text-2xl shadow-lg ${getStatusColor(report.healthStatus)}`}>
                <span className="mr-2">{getStatusEmoji(report.healthStatus)}</span>
                {report.healthStatus}
              </div>
            </div>
            
            {report.possibleIssues.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                  <span className="text-2xl mr-2">⚠️</span>
                  可能的健康问题
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
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <span className="text-2xl mr-2">🤖</span>
                AI图像分析结果
              </h2>
              <div className="bg-soft-blue rounded-2xl p-6 border-4 border-cartoon-blue/20">
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
            
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-700 mb-4 flex items-center">
                <span className="text-2xl mr-2">💝</span>
                专业建议
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

      <footer className="relative z-10 bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-lg">© 2026 DoggyHealth. 保留所有权利。🐕💕</p>
        </div>
      </footer>
    </div>
  );
};

export default Report;