import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, Sparkles, AlertTriangle, ListChecks, FileSearch, Target, Clock } from 'lucide-react';
import { Project, ModeDef } from '../types';
import { Card, ButtonPrimary, ButtonGhost, Chip } from '../components/ui';

interface Props {
  project: Project;
  mode: ModeDef;
  onStartSession: () => void;
  onBack: () => void;
  skipAnalysis?: boolean;
}

export default function PrepScreen({ project, mode, onStartSession, onBack, skipAnalysis = false }: Props) {
  const [isAnalyzing, setIsAnalyzing] = useState(!skipAnalysis);
  const [loadingText, setLoadingText] = useState('AI 评委正在深度阅读商业计划书...');

  useEffect(() => {
    if (skipAnalysis) return;
    
    const t1 = setTimeout(() => setLoadingText('正在交叉比对赛道历年高频题...'), 1200);
    const t2 = setTimeout(() => setLoadingText('正在提炼亮点与专项检查点...'), 2400);
    const t3 = setTimeout(() => setIsAnalyzing(false), 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [skipAnalysis]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20">
      
      <div className="flex items-center gap-4 mb-8">
        <ButtonGhost onClick={onBack} className="p-2 !px-2 rounded-xl text-[--color-text-secondary]">
          <ArrowLeft size={20} />
        </ButtonGhost>
        <div>
          <h1 className="text-[20px] font-bold text-[--color-text-primary]">全息档案解构与靶向考题预测</h1>
          <p className="text-[13px] text-[--color-text-muted] mt-1">AI 评委视界 (Judge's Horizon) · 赛前高维洞察报告</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-[50vh] gap-6"
          >
            <div className="relative w-20 h-20 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 rounded-full border-t-2 border-[--color-primary] border-r-2 border-transparent"
              />
              <FileSearch size={32} className="text-[--color-primary]" />
            </div>
            <motion.p 
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[15px] font-medium text-[--color-text-secondary]"
            >
              {loadingText}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Context Summary */}
            <Card className="!p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[--color-primary] rounded-full blur-[100px] opacity-10 pointer-events-none" />
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Chip color={mode.color} bg={mode.bg} border={mode.border}>
                    <div className="flex items-center gap-1.5 font-bold">
                      <mode.icon size={14} />
                      {mode.name}
                    </div>
                  </Chip>
                  <span className="text-[16px] font-bold text-[--color-text-primary]">{project.name}</span>
                </div>
                <div className="flex gap-6 text-[13px] text-[--color-text-secondary]">
                  <div className="flex items-center gap-2"><Target size={14} className="text-[--color-text-muted]"/> {project.track}</div>
                  <div className="flex items-center gap-2"><Clock size={14} className="text-[--color-text-muted]"/> 自动调优难度匹配</div>
                </div>
              </div>
              <ButtonPrimary onClick={onStartSession} className="shrink-0 flex items-center gap-2 px-8 h-12 text-[15px]">
                <Play size={16} className="fill-current" />
                正式开始训练
              </ButtonPrimary>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Insights */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="!p-6 h-full border-t-2 border-t-[#34d399]">
                  <h3 className="text-[16px] font-bold text-[--color-text-primary] flex items-center gap-2 mb-6">
                    <Sparkles size={18} className="text-[#34d399]" /> 提取亮点 (Highlights)
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-[rgba(52,211,153,0.05)] border border-[rgba(52,211,153,0.15)] rounded-xl p-4">
                      <h4 className="text-[14px] font-bold text-[#34d399] mb-1">技术壁垒较高</h4>
                      <p className="text-[13px] text-[--color-text-secondary] leading-relaxed">
                        底层算法与专利布局清晰，在同类项目中具备较强的技术护城河与先发优势。
                      </p>
                    </div>
                    <div className="bg-[rgba(52,211,153,0.05)] border border-[rgba(52,211,153,0.15)] rounded-xl p-4">
                      <h4 className="text-[14px] font-bold text-[#34d399] mb-1">团队履历契合</h4>
                      <p className="text-[13px] text-[--color-text-secondary] leading-relaxed">
                        核心团队的过往经验与当前创业方向高度一致，执行力与落地能力可信度高。
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="!p-6 h-full border-t-2 border-t-[#fbbf24]">
                  <h3 className="text-[16px] font-bold text-[--color-text-primary] flex items-center gap-2 mb-6">
                    <AlertTriangle size={18} className="text-[#fbbf24]" /> 核心疑点与找茬点 (Doubts)
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-[rgba(251,191,36,0.05)] border border-[rgba(251,191,36,0.15)] rounded-xl p-4 flex gap-3">
                      <span className="text-[#fbbf24] mt-0.5 shrink-0 text-[14px]">●</span>
                      <div>
                        <h4 className="text-[14px] font-bold text-[--color-text-primary] mb-1">商业化变现路径不清晰</h4>
                        <p className="text-[13px] text-[--color-text-secondary] leading-relaxed">
                          材料中对于客户生命周期价值(LTV)和获客成本(CAC)的测算过于乐观，缺乏早期种子客户的实际付费数据支撑。
                        </p>
                      </div>
                    </div>
                    <div className="bg-[rgba(251,191,36,0.05)] border border-[rgba(251,191,36,0.15)] rounded-xl p-4 flex gap-3">
                      <span className="text-[#fbbf24] mt-0.5 shrink-0 text-[14px]">●</span>
                      <div>
                        <h4 className="text-[14px] font-bold text-[--color-text-primary] mb-1">竞品差异化论证不足</h4>
                        <p className="text-[13px] text-[--color-text-secondary] leading-relaxed">
                          未明确说明当行业巨头（如BAT）下场提供免费竞品时，项目的反制策略与客户留存手段。
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column: Question Pool */}
              <div className="lg:col-span-5">
                <Card className="!p-6 h-full border-t-2 border-t-[--color-primary]">
                  <h3 className="text-[16px] font-bold text-[--color-text-primary] flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ListChecks size={18} className="text-[--color-primary-hover]" /> 智能题库生成
                    </div>
                    <span className="text-[12px] text-[--color-text-muted] font-normal">已备题 12 道</span>
                  </h3>
                  <p className="text-[12px] text-[--color-text-secondary] mb-6">评委将根据优先级在此题库中动态抽题与追问。</p>

                  <div className="space-y-3">
                    {[
                      {
                        priority: '高频必考',
                        color: '#f43f5e',
                        bg: 'rgba(244,63,94,0.1)',
                        text: '请简述你们与市面上现有解决方案最大的差异点是什么？'
                      },
                      {
                        priority: '针对疑点',
                        color: '#fbbf24',
                        bg: 'rgba(251,191,36,0.1)',
                        text: '你们财务预测中明年的营收翻了三倍，请问核心增长逻辑是什么？'
                      },
                      {
                        priority: '针对疑点',
                        color: '#fbbf24',
                        bg: 'rgba(251,191,36,0.1)',
                        text: '如果你们的早期大客户流失，会对现金流造成多大影响？'
                      },
                      {
                        priority: '冷门拓展',
                        color: '#6366f1',
                        bg: 'rgba(99,102,241,0.1)',
                        text: '政策环境如果在未来两年发生收紧，项目将如何合规调整？'
                      }
                    ].map((q, idx) => (
                      <div key={idx} className="p-3 bg-[rgba(15,20,40,0.4)] border border-[#1e293b] rounded-xl hover:border-[#334155] transition-colors">
                        <div className="mb-2">
                          <span 
                            className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                            style={{ color: q.color, backgroundColor: q.bg, border: `1px solid ${q.color}40` }}
                          >
                            {q.priority}
                          </span>
                        </div>
                        <p className="text-[13px] text-[--color-text-primary] leading-relaxed">
                          {q.text}
                        </p>
                      </div>
                    ))}
                    
                    <div className="pt-4 text-center">
                      <button className="text-[12px] text-[--color-primary-hover] hover:underline">
                        查看完整题库
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
