import { create } from 'zustand';

const useStore = create((set, get) => ({
  currentStep: 'upload',
  preview: null,
  analysisResult: null,
  answers: {},
  report: null,

  history: [],

  setCurrentStep: (step) => set({ currentStep: step }),
  
  setPreview: (preview) => set({ preview }),
  
  setAnalysisResult: (result) => set({ analysisResult: result }),
  
  setAnswers: (answers) => set({ answers }),
  
  addAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),
  
  setReport: (report) => set({ report }),
  
  addToHistory: (record) => set((state) => ({
    history: [record, ...state.history].slice(0, 50)
  })),
  
  resetDetection: () => set({
    currentStep: 'upload',
    preview: null,
    analysisResult: null,
    answers: {},
    report: null
  }),

  loadHistory: () => {
    const saved = localStorage.getItem('doggyhealth_history');
    if (saved) {
      set({ history: JSON.parse(saved) });
    }
  },

  saveHistory: () => {
    const { history } = get();
    localStorage.setItem('doggyhealth_history', JSON.stringify(history));
  }
}));

export default useStore;