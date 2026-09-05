import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, Trophy, Settings, X, Info, Play, Clock, ChevronRight } from 'lucide-react';
import { Card, Chip, ButtonPrimary } from '../components/ui';
import { MOCK_PROJECTS, TRAINING_MODES, RECENT_HISTORY } from '../lib/constants';
import { Project, ModeDef } from '../types';

interface Props {
  onStart: (project: Project, mode: ModeDef) => void;
  onViewReport: (project: Project, mode: ModeDef) => void;
}

export default function SelectorScreen({ onStart, onViewReport }: Props) {
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [selectedMode, setSelectedMode] = React.useState<ModeDef | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleModeClick = (mode: ModeDef) => {
    setSelectedMode(mode);
    setIsDrawerOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16 space-y-12 relative overflow-hidden">
      
      {/* 1. Project Selection */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(30,41,59,0.6)] flex items-center justify-center text-[--color-text-secondary]">
            <Folder size={20} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-[--color-text-primary]">选择答辩项目</h2>
            <p className="text-[12px] text-[--color-text-muted] mt-1">选择已上传资料的项目以加载上下文</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_PROJECTS.map(proj => {
            const isActive = selectedProject?.id === proj.id;
            return (
              <Card 
                key={proj.id} 
                active={isActive}
                onClick={() => { setSelectedProject(proj); setSelectedMode(null); setIsDrawerOpen(false); }}
                className="relative group"
              >
                {isActive && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[--color-primary] shadow-[0_0_8px_var(--color-primary)]" />
                )}
                <div className="mb-3">
                  <Chip variant="neutral">{proj.track}</Chip>
                </div>
                <h3 className="text-[16px] font-semibold text-[--color-text-primary] mb-2 group-hover:text-[--color-primary-hover] transition-colors">{proj.name}</h3>
                <p className="text-[12px] text-[--color-text-secondary] line-clamp-2 mb-4 leading-relaxed">{proj.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-[--color-text-muted] bg-[rgba(30,41,59,0.4)] px-2 py-1 rounded-md">{tag}</span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 2. Mode Selection (Revealed) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Trophy size={20} className="text-[#fbbf24]" />
              <div className="flex items-baseline gap-2">
                <h2 className="text-[18px] font-bold text-[--color-text-primary]">选择训练模式</h2>
                <p className="text-[13px] text-[--color-text-muted]">为「{selectedProject.name}」选择专项训练舱，点击后进入配置</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TRAINING_MODES.map(mode => {
                const Icon = mode.icon;
                return (
                  <Card 
                    key={mode.id}
                    onClick={() => handleModeClick(mode)}
                    className="flex flex-col h-full relative cursor-pointer hover:-translate-y-1 transition-all group"
                  >
                    <ChevronRight size={16} className="absolute top-5 right-5 text-[--color-text-muted] group-hover:text-[--color-text-primary] transition-colors" />
                    
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mb-4"
                         style={{ backgroundColor: mode.bg, color: mode.color, border: `1px solid ${mode.border}` }}>
                      <Icon size={24} />
                    </div>
                    
                    <h3 className="text-[16px] font-bold text-[--color-text-primary] mb-2">{mode.name}</h3>
                    <p className="text-[12px] text-[--color-text-secondary] flex-1 leading-relaxed mb-5">{mode.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {mode.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium border"
                          style={{ borderColor: mode.border, color: mode.text }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. Recent History */}
      <section className="space-y-6 mt-12">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-[--color-text-secondary]" />
          <h2 className="text-[16px] font-bold text-[--color-text-primary]">最近训练记录</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RECENT_HISTORY.map(history => {
            const mode = TRAINING_MODES.find(m => m.id === history.modeId);
            const project = MOCK_PROJECTS.find(p => p.id === history.projectId);
            if (!mode || !project) return null;
            const Icon = mode.icon;
            
            return (
              <Card 
                key={history.id} 
                className="p-5 flex flex-col gap-3 hover:-translate-y-1 transition-transform cursor-pointer group"
                onClick={() => {
                  if (history.status === '已结束') {
                    onViewReport(project, mode);
                  } else {
                    onStart(project, mode);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[14px] font-bold" style={{ color: mode.color }}>
                    <Icon size={16} />
                    <span className="text-[--color-text-primary] group-hover:text-[--color-primary-hover] transition-colors">{mode.name}</span>
                  </div>
                  <Chip variant="neutral" className={`bg-[rgba(30,41,59,0.8)] border-transparent text-[11px] px-2 py-0.5 ${history.status === '进行中' ? 'text-[--color-primary-hover]' : 'text-[--color-text-muted]'}`}>
                    {history.status}
                  </Chip>
                </div>
                <div className="text-[13px] text-[--color-text-secondary] truncate mt-1">
                  {project.name}
                </div>
                <div className="text-[12px] text-[--color-text-muted]">
                  {history.stats}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && selectedMode && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-40"
              onClick={() => setIsDrawerOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0d1424] border-l border-[--color-border-default] z-50 p-6 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <Chip color={selectedMode.color} bg={selectedMode.bg} border={selectedMode.border}>
                    <div className="flex items-center gap-1.5 font-bold text-[13px]">
                      <selectedMode.icon size={14} />
                      {selectedMode.name}
                    </div>
                  </Chip>
                  <button onClick={() => setIsDrawerOpen(false)} className="text-[--color-text-muted] hover:text-[--color-text-primary]">
                    <X size={24} />
                  </button>
                </div>

                <p className="text-[13px] text-[--color-text-secondary] leading-relaxed mb-8">
                  {selectedMode.description}
                </p>

                <div className="space-y-8">
                  <div className="bg-[rgba(15,20,40,0.6)] border rounded-2xl p-4" style={{ borderColor: selectedMode.border }}>
                    <h4 className="text-[12px] font-medium text-[--color-text-muted] mb-2">训练项目</h4>
                    <h3 className="text-[16px] font-bold text-[--color-text-primary] mb-1 truncate">{selectedProject?.name}</h3>
                    <p className="text-[12px] text-[--color-text-secondary] truncate">{selectedProject?.track} {selectedProject?.tags && selectedProject.tags.length > 0 ? `/ ${selectedProject.tags[0]}` : ''}</p>
                  </div>

                  {['followup', 'weakness', 'adversarial'].includes(selectedMode.id as string) && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 bg-[rgba(30,41,59,0.4)] border border-[rgba(51,65,85,0.7)] rounded-xl text-[12px] text-[--color-text-secondary]">
                        <Info size={14} className="shrink-0 text-[--color-text-muted]" />
                        专项训练由系统自动匹配最合适的评委人设，无需手动选择。
                      </div>
                      
                      {selectedMode.id === 'adversarial' && (
                        <div className="p-3 bg-[rgba(244,63,94,0.05)] border border-[rgba(244,63,94,0.3)] rounded-xl text-[13px] text-[#fda4af]">
                          对抗性演练固定使用「高压」风格，评委将以最强质疑姿态进行施压。
                        </div>
                      )}
                      
                      {selectedMode.id === 'followup' && (
                        <div>
                          <h4 className="text-[14px] font-semibold text-[--color-text-primary] mb-3">难度风格</h4>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { title: '友好', sub: '先肯定再建议', active: false },
                              { title: '标准', sub: '中立专业直奔主题', active: true },
                              { title: '高压', sub: '连环追问压力拉满', active: false }
                            ].map((style, idx) => (
                              <button key={idx} className={`flex flex-col items-center justify-center py-3 px-1 rounded-xl border transition-colors ${style.active ? 'border-[--color-primary] bg-[--color-primary-muted]' : 'border-[--color-border-default] bg-transparent hover:border-slate-500'}`}>
                                <span className={`text-[14px] font-medium mb-1 ${style.active ? 'text-[--color-primary-hover]' : 'text-[--color-text-primary]'}`}>{style.title}</span>
                                <span className={`text-[10px] ${style.active ? 'text-[--color-primary-hover] opacity-80' : 'text-[--color-text-muted]'}`}>{style.sub}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedMode.id === 'standard' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[14px] font-semibold text-[--color-text-primary] mb-3">评委模式</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <button className="py-2.5 rounded-xl border border-[--color-primary] bg-[--color-primary-muted] text-[--color-primary-hover] text-[14px] font-medium">单评委</button>
                          <button className="py-2.5 rounded-xl border border-[--color-border-default] text-[--color-text-secondary] hover:border-slate-500 text-[14px] font-medium">评委席</button>
                        </div>
                        <p className="mt-2 text-[12px] text-[--color-text-muted] leading-relaxed">
                          单评委模式将自动匹配最合适的评委人设。
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[14px] font-semibold text-[--color-text-primary] mb-3">难度风格</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { title: '友好', sub: '先肯定再建议', active: false },
                            { title: '标准', sub: '中立专业直奔主题', active: true },
                            { title: '高压', sub: '连环追问压力拉满', active: false }
                          ].map((style, idx) => (
                            <button key={idx} className={`flex flex-col items-center justify-center py-3 px-1 rounded-xl border transition-colors ${style.active ? 'border-[--color-primary] bg-[--color-primary-muted]' : 'border-[--color-border-default] bg-transparent hover:border-slate-500'}`}>
                              <span className={`text-[14px] font-medium mb-1 ${style.active ? 'text-[--color-primary-hover]' : 'text-[--color-text-primary]'}`}>{style.title}</span>
                              <span className={`text-[10px] ${style.active ? 'text-[--color-primary-hover] opacity-80' : 'text-[--color-text-muted]'}`}>{style.sub}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[14px] font-semibold text-[--color-text-primary] mb-3">问答轮次</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {['不限轮次', '3 题', '5 题', '8 题'].map((r, i) => {
                            const isActive = i === 0;
                            return (
                              <button key={r} className={`py-2 rounded-xl border text-[14px] font-medium ${isActive ? 'border-[--color-primary] bg-[--color-primary-muted] text-[--color-primary-hover]' : 'border-[--color-border-default] text-[--color-text-secondary] hover:border-slate-500'}`}>
                                {r}
                              </button>
                            );
                          })}
                        </div>
                        <p className="mt-3 text-[12px] text-[--color-text-muted] leading-relaxed">
                          不限轮次：评委自然控场，问透就收尾，你也可以随时结束进入综合评审。
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[14px] font-semibold text-[--color-text-primary] mb-3">单题时限</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <button className="py-2.5 rounded-xl border border-[--color-border-default] text-[--color-text-secondary] hover:border-slate-500 text-[14px] font-medium">60 秒</button>
                          <button className="py-2.5 rounded-xl border border-[--color-primary] bg-[--color-primary-muted] text-[--color-primary-hover] text-[14px] font-medium">90 秒</button>
                          <button className="py-2.5 rounded-xl border border-[--color-border-default] text-[--color-text-secondary] hover:border-slate-500 text-[14px] font-medium">120 秒</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMode.id === 'elevator' && (
                    <div>
                      <h4 className="text-[14px] font-semibold text-[--color-text-primary] mb-3">演讲时长</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="py-2.5 rounded-xl border border-[--color-primary] bg-[--color-primary-muted] text-[--color-primary-hover] text-[14px] font-medium">1分钟版</button>
                        <button className="py-2.5 rounded-xl border border-[--color-border-default] text-[--color-text-secondary] hover:border-slate-500 text-[14px] font-medium">3分钟版</button>
                      </div>
                    </div>
                  )}

                  {selectedMode.id !== 'standard' && (
                    <div>
                      <h4 className="text-[14px] font-semibold text-[--color-text-primary] mb-3">
                        {['followup', 'weakness', 'adversarial'].includes(selectedMode.id as string) ? '问答轮次' : '训练轮次'}
                      </h4>
                      <div className="grid grid-cols-4 gap-2">
                        {(['followup', 'weakness', 'adversarial'].includes(selectedMode.id as string) ? ['不限轮次', '3 题', '5 题', '8 题'] : ['不限', '3题', '5题', '8题']).map((r, i) => {
                          const isActive = ['followup', 'weakness', 'adversarial'].includes(selectedMode.id as string) ? i === 0 : i === 1;
                          return (
                            <button key={r} className={`py-2 rounded-xl border text-[14px] font-medium ${isActive ? 'border-[--color-primary] bg-[--color-primary-muted] text-[--color-primary-hover]' : 'border-[--color-border-default] text-[--color-text-secondary] hover:border-slate-500'}`}>
                              {r}
                            </button>
                          );
                        })}
                      </div>
                      {['followup', 'weakness', 'adversarial'].includes(selectedMode.id as string) && (
                        <p className="mt-3 text-[12px] text-[--color-text-muted] leading-relaxed">
                          不限轮次：评委自然控场，问透就收尾，你也可以随时结束进入综合评审。
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-[--color-border-default] mt-4">
                <ButtonPrimary 
                  className="w-full h-12 text-[16px] flex items-center justify-center gap-2"
                  onClick={() => selectedProject && onStart(selectedProject, selectedMode)}
                >
                  <Play size={16} className="fill-current" />
                  进入{selectedMode.name}训练舱
                </ButtonPrimary>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
