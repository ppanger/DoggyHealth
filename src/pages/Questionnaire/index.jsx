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
  const { analysisResult, addAnswer, setReport, addToHistory, saveHistory } = useStore();
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
      <div className="absolute top-10 left-10 animate-float">
        <HeartIcon className="w-10 h-10 text-cartoon-pink opacity-30" />
      </div>
      <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
        <BoneIcon className="w-12 h-6 text-cartoon-orange opacity-30 rotate-12" />
      </div>
      <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '1s' }}>
        <DogIcon className="w-14 h-14 text-cartoon-purple opacity-20" />
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
        <div className="max-w-3xl mx-auto px-4">
          <Card className="relative">
            <div className="absolute -top-4 -left-4 bg-cartoon-purple text-white font-bold px-4 py-2 rounded-full text-sm transform -rotate-12 shadow-lg">
              🐕 问答环节
            </div>

            <h1 className="text-3xl font-black text-gray-800 mb-2 text-center">
              狗狗健康评估问答
            </h1>
            <p className="text-gray-500 text-center mb-8">
              请回答以下问题，帮助AI更准确地分析狗狗的健康状况
            </p>
            
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-gray-600 mb-3">
                <span className="flex items-center">
                  <span className="text-2xl mr-1">📋</span>
                  问题 {currentQuestion + 1}/{questions.length}
                </span>
                <span className="text-cartoon-pink">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-gray-300">
                <div 
                  className="bg-gradient-to-r from-cartoon-pink to-cartoon-purple h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

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
            )}

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

      <footer className="relative z-10 bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-lg">© 2026 DoggyHealth. 保留所有权利。🐕💕</p>
        </div>
      </footer>
    </div>
  );
};

export default Questionnaire;