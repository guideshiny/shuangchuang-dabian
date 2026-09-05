import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Volume2, VolumeX, Send, StopCircle, Clock, CheckCircle2 } from 'lucide-react';
import { Project, ModeDef, Message } from '../types';
import { Card, Chip, ButtonDanger, IconButton } from '../components/ui';

interface Props {
  project: Project;
  mode: ModeDef;
  onFinish: () => void;
}

export default function SessionScreen({ project, mode, onFinish }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isJudgeSpeaking, setIsJudgeSpeaking] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initial bot message
  useEffect(() => {
    setIsStreaming(true);
    setTimeout(() => {
      setIsStreaming(false);
      setMessages([{
        id: '1',
        role: 'judge',
        content: `各位好，我是评委。我看过你们的《${project.name}》项目材料。请问你们的核心壁垒是什么？如果腾讯或百度进入这个市场，你们如何应对？`
      }]);
    }, 1500);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      time: 120 - timeLeft
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTimeLeft(120); // reset timer
    
    // Simulate AI response
    setIsStreaming(true);
    setTimeout(() => {
      setIsStreaming(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'judge',
        content: `你提到算法壁垒，但算法总有被破解或追平的一天。你的商业模式似乎极度依赖先发优势。请具体说明你们的商业闭环是如何设计的？`
      }]);
    }, 2500);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8 h-[100dvh] flex flex-col">
      
      {/* Top Status Bar */}
      <Card className="!p-4 mb-4 shrink-0 flex items-center justify-between" modeHue={mode.color} active>
        <div className="flex items-center gap-4">
          <Chip color={mode.color} bg={mode.bg} border={mode.border}>
            <div className="flex items-center gap-1.5">
              <mode.icon size={12} />
              {mode.name}
            </div>
          </Chip>
          <span className="text-[14px] font-bold text-[--color-text-primary] hidden sm:block">{project.name}</span>
          <span className="text-[12px] text-[--color-text-muted] hidden md:block">| {mode.description}</span>
        </div>
        <div className="flex items-center gap-3">
          <Chip variant="success"><CheckCircle2 size={10} className="mr-1" /> 训练进行中</Chip>
          <span className="text-[12px] text-[--color-text-secondary] bg-[rgba(30,41,59,0.5)] px-2 py-1 rounded-md">Round {Math.floor(messages.length/2) + 1}</span>
        </div>
      </Card>

      {/* Main Content 3-col Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        
        {/* Left: Chat & Input (Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          
          {/* Chat Scroll Area */}
          <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-6" ref={scrollRef}>
            {messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'judge' ? (
                  <div className="flex gap-3 max-w-[90%]">
                    <div className="w-9 h-9 rounded-xl bg-[--color-surface-elevated] shrink-0 flex items-center justify-center text-[--color-text-secondary]">
                      <mode.icon size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 ml-1">
                        <span className="text-[11px] font-medium text-[--color-text-muted]">AI 评委</span>
                        <IconButton icon={isJudgeSpeaking ? VolumeX : Volume2} active={isJudgeSpeaking} onClick={() => setIsJudgeSpeaking(!isJudgeSpeaking)} />
                      </div>
                      <div className="bg-[rgba(30,41,59,0.7)] border border-[rgba(51,65,85,0.7)] rounded-b-2xl rounded-tr-2xl p-4 text-[14px] text-[--color-text-primary] leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[85%] flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1.5 mr-1">
                      <span className="text-[11px] font-medium text-[--color-text-muted]">用时 {formatTime(msg.time || 0)}</span>
                    </div>
                    <div className="bg-[--color-primary-muted] border border-[--color-primary-border] rounded-b-2xl rounded-tl-2xl p-4 text-[14px] text-[--color-text-primary] leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {isStreaming && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-[--color-surface-elevated] shrink-0 flex items-center justify-center text-[--color-text-secondary]">
                  <mode.icon size={18} />
                </div>
                <div>
                  <div className="mb-1.5 ml-1">
                     <Chip color={mode.color} bg={mode.bg} border={mode.border}>正在思考提问...</Chip>
                  </div>
                  <div className="bg-[rgba(30,41,59,0.7)] border border-[rgba(51,65,85,0.7)] rounded-b-2xl rounded-tr-2xl p-4">
                    <div className="w-1.5 h-4 bg-[--color-primary] animate-pulse" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="shrink-0 mt-2 space-y-3">
            {/* Timer Row */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <span className={`font-timer text-[28px] leading-none ${timeLeft < 30 ? 'text-[--color-error]' : 'text-[--color-text-primary]'}`}>
                  {formatTime(timeLeft)}
                </span>
                {timeLeft < 30 && <Chip variant="danger">即将超时</Chip>}
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ${timeLeft < 30 ? 'bg-[--color-error]' : 'bg-[--color-primary]'}`}
                style={{ width: `${(timeLeft / 120) * 100}%` }}
              />
            </div>

            {/* Recording Visualizer */}
            <AnimatePresence>
              {isRecording && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 36, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-[rgba(251,113,133,0.05)] border border-[rgba(251,113,133,0.3)] rounded-xl px-3 flex items-center gap-3 overflow-hidden"
                >
                  <div className="flex items-end gap-1 h-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <motion.div 
                        key={i}
                        className="w-[2px] bg-[--color-error] rounded-full origin-bottom"
                        animate={{ height: ['40%', '100%', '40%'] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1, ease: 'easeInOut' }}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] italic text-[--color-text-secondary]">正在聆听你的回答...</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="在此输入您的回答，或点击下方语音按钮..."
                className={`w-full bg-[rgba(30,41,59,0.6)] text-[--color-text-primary] text-[14px] rounded-xl p-3 pr-12 min-h-[100px] resize-none outline-none transition-colors border ${
                  isRecording ? 'border-[rgba(251,113,133,0.5)]' : 'border-[#334155] focus:border-[--color-primary]'
                }`}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <div className="absolute right-3 bottom-3 flex gap-2">
                 <button 
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isRecording ? 'bg-[rgba(251,113,133,0.3)] text-[--color-error]' : 'bg-[#1e293b] text-[--color-text-muted] hover:text-[--color-text-primary]'
                  }`}
                >
                  <Mic size={16} />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  className="w-8 h-8 rounded-lg bg-[--color-primary] text-white flex items-center justify-center hover:bg-[--color-primary-hover] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </div>
            </div>
            
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="hidden lg:flex flex-col gap-4">
          <Card className="!p-4">
            <h3 className="text-[12px] font-semibold text-[--color-text-muted] uppercase tracking-wider mb-4">评委设定</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[--color-surface-elevated] flex items-center justify-center text-[--color-text-secondary]">
                 <mode.icon size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[14px] font-bold text-[--color-text-primary]">AI 核心评审</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Chip color={mode.color} bg={mode.bg} border={mode.border}>{mode.name}</Chip>
                  <Chip variant="danger">严厉</Chip>
                </div>
              </div>
            </div>
          </Card>

          <Card className="!p-4" modeHue={mode.color}>
            <h3 className="text-[12px] font-semibold text-[--color-text-muted] uppercase tracking-wider mb-3">当前焦点</h3>
            <p className="text-[13px] text-[--color-text-secondary] leading-relaxed">
              系统正在评估你的商业模式抗风险能力。建议用数据或已有的闭环案例来支撑你的论点。
            </p>
          </Card>

          <div className="mt-auto pt-4">
            <ButtonDanger className="w-full flex items-center justify-center gap-2" onClick={onFinish}>
              <StopCircle size={16} />
              结束本次训练并生成报告
            </ButtonDanger>
          </div>
        </div>
      </div>
    </div>
  );
}
