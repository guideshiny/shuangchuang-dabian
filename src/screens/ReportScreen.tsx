import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw, LayoutGrid, FileText, CheckCircle, Paperclip, AlertTriangle } from 'lucide-react';
import { Project, ModeDef } from '../types';
import { Card, Chip, ButtonPrimary, ButtonGhost } from '../components/ui';
import { ScoreRing, RadarChart } from '../components/charts';
import { DIMENSION_COLORS } from '../lib/constants';

interface Props {
  project: Project;
  mode: ModeDef;
  onRestart: () => void;
  onReplay: () => void;
}

export default function ReportScreen({ project, mode, onRestart, onReplay }: Props) {
  const radarData = [
    { label: '创新性', value: 88, color: DIMENSION_COLORS.innovation },
    { label: '技术可行性', value: 75, color: DIMENSION_COLORS.technical },
    { label: '市场价值', value: 60, color: DIMENSION_COLORS.market },
    { label: '团队匹配', value: 82, color: DIMENSION_COLORS.team },
    { label: '材料表达', value: 68, color: DIMENSION_COLORS.expression },
    { label: '社会价值', value: 90, color: DIMENSION_COLORS.social },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-20 space-y-8">
      
      {/* Header Card */}
      <Card className="!p-6 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Glow behind score ring */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-[--color-primary] rounded-full blur-[64px] opacity-20 pointer-events-none" />
        
        <div className="shrink-0 relative z-10">
          <ScoreRing score={78} />
        </div>
        
        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
             <Chip color={mode.color} bg={mode.bg} border={mode.border}>
                <div className="flex items-center gap-1.5">
                  <mode.icon size={12} />
                  {mode.name}
                </div>
              </Chip>
            <span className="text-[14px] text-[--color-text-secondary]">{project.name}</span>
          </div>
          <h1 className="text-[24px] font-bold text-[--color-text-primary] mb-3">表现良好，但在商业逻辑上存在明显漏洞。</h1>
          <p className="text-[14px] text-[--color-text-muted] leading-relaxed max-w-xl">
            你的技术阐述非常清晰，但在面对“大厂入局”的高压追问时，未能有效证明商业护城河，逻辑出现了短暂的断层。
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
            <div className="bg-[rgba(30,41,59,0.4)] px-4 py-2 rounded-xl flex flex-col">
              <span className="text-[10px] text-[--color-text-muted] uppercase">训练用时</span>
              <span className="text-[16px] font-bold text-[--color-text-primary] font-timer">08:45</span>
            </div>
             <div className="bg-[rgba(30,41,59,0.4)] px-4 py-2 rounded-xl flex flex-col">
              <span className="text-[10px] text-[--color-text-muted] uppercase">完成轮次</span>
              <span className="text-[16px] font-bold text-[--color-text-primary]">5 轮</span>
            </div>
             <div className="bg-[rgba(30,41,59,0.4)] px-4 py-2 rounded-xl flex flex-col">
              <span className="text-[10px] text-[--color-text-muted] uppercase">超时警告</span>
              <span className="text-[16px] font-bold text-[--color-error]">2 次</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid for Radar and Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="!p-6 flex flex-col items-center justify-center">
          <h3 className="text-[16px] font-bold text-[--color-text-primary] w-full mb-6">六维能力雷达</h3>
          <RadarChart data={radarData} />
        </Card>

        <Card className="!p-6">
           <h3 className="text-[16px] font-bold text-[--color-text-primary] mb-6">能力短板分析</h3>
           <div className="space-y-5">
             {radarData.map(d => (
               <div key={d.label}>
                 <div className="flex justify-between items-end mb-2">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                     <span className="text-[13px] text-[--color-text-secondary] font-medium">{d.label}</span>
                   </div>
                   <span className="text-[14px] font-bold font-timer" style={{ color: d.value < 65 ? 'var(--color-error)' : 'var(--color-text-primary)' }}>
                     {d.value}
                   </span>
                 </div>
                 <div className="h-1.5 bg-[#1e293b] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${d.value}%`, backgroundColor: d.color }}
                    />
                 </div>
               </div>
             ))}
           </div>
        </Card>
      </div>

      {/* Recurring Errors */}
      <Card className="!p-6">
        <div className="mb-6">
          <h3 className="text-[16px] font-bold text-[#fca5a5] flex items-center gap-2">
            <AlertTriangle size={18} className="text-[#fbbf24]" /> 反复出现的同类错误
          </h3>
          <p className="text-[12px] text-[--color-text-secondary] mt-1.5">
            同一类问题在多道题中反复暴露——优先级最高的纠偏项
          </p>
        </div>
        
        <div className="bg-[rgba(159,18,57,0.1)] border border-[rgba(159,18,57,0.3)] rounded-xl p-5">
           <div className="flex justify-between items-start mb-3">
             <h4 className="text-[15px] font-bold text-[#fda4af]">无关内容重复</h4>
             <span className="text-[11px] text-[#fda4af] bg-[rgba(159,18,57,0.3)] border border-[rgba(159,18,57,0.4)] px-3 py-1 rounded-full">
               出现 1 次
             </span>
           </div>
           <p className="text-[13px] text-[--color-text-secondary] mb-4">答非所问</p>
           <p className="text-[13px] text-[#34d399]">
             纠正方法：针对电梯演讲设定的框架进行准备，练习精确完整的答案。
           </p>
        </div>
      </Card>

      {/* Review Accordion */}
      <Card className="!p-6">
         <h3 className="text-[16px] font-bold text-[--color-text-primary] mb-6">关键对局复盘</h3>
         
         <div className="space-y-3">
           <details className="group bg-[rgba(15,20,40,0.4)] border border-[#334155] rounded-2xl overflow-hidden" open>
             <summary className="p-4 flex items-center gap-4 cursor-pointer list-none hover:bg-[rgba(30,41,59,0.3)] transition-colors">
               <div className="w-8 h-8 rounded-lg bg-[--color-primary-muted] text-[--color-primary-hover] font-bold text-[12px] flex items-center justify-center shrink-0">
                 R2
               </div>
               <div className="flex-1 truncate">
                 <p className="text-[14px] text-[--color-text-primary] font-medium truncate">如果腾讯进入这个市场，你们如何应对？</p>
               </div>
               <Chip variant="danger">偏题 / 逻辑断层</Chip>
             </summary>
             <div className="p-4 pt-0 border-t border-[rgba(51,65,85,0.5)] mt-2 mx-4">
               <div className="mt-4 space-y-4">
                 <div>
                   <span className="text-[11px] font-semibold text-[--color-text-muted] uppercase block mb-1.5">你的回答</span>
                   <p className="text-[13px] text-[--color-text-secondary] bg-[#0f1428] p-3 rounded-xl">
                     我们做得很早，现在已经有几十个客户了，大厂如果要抄我们也要时间的。而且我们的算法经过了很多迭代。
                   </p>
                 </div>
                 <div className="bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.2)] rounded-xl p-4">
                   <span className="text-[11px] font-semibold text-[--color-primary-hover] uppercase block mb-1.5 flex items-center gap-1">
                     <CheckCircle size={12} /> AI 优化建议
                   </span>
                   <p className="text-[13px] text-[--color-text-primary]">
                     面对大厂竞争问题，不要用“时间差”做核心防御。应该强调：1. **数据飞轮壁垒**（先发获取的特定场景数据大厂拿不到）；2. **切换成本**（现有客户与系统的深度绑定）；3. **下沉场景的脏活累活**（大厂不愿投入精力的细分垂直领域）。
                   </p>
                 </div>
               </div>
             </div>
           </details>
           
           <details className="group bg-[rgba(15,20,40,0.4)] border border-[#1e293b] hover:border-[#334155] rounded-2xl overflow-hidden transition-colors">
             <summary className="p-4 flex items-center gap-4 cursor-pointer list-none hover:bg-[rgba(30,41,59,0.3)]">
               <div className="w-8 h-8 rounded-lg bg-[rgba(30,41,59,0.6)] text-[--color-text-muted] font-bold text-[12px] flex items-center justify-center shrink-0">
                 R1
               </div>
               <div className="flex-1 truncate">
                 <p className="text-[14px] text-[--color-text-primary] font-medium truncate">请问你们的核心壁垒是什么？</p>
               </div>
               <Chip variant="success">优秀</Chip>
             </summary>
           </details>
         </div>
      </Card>

      {/* Review Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 下一步该怎么改 */}
        <Card className="!p-6">
          <h3 className="text-[16px] font-bold text-[--color-text-primary] mb-4">下一步该怎么改</h3>
          <div className="flex gap-3">
            <div className="w-5 h-5 rounded-full bg-[rgba(99,102,241,0.2)] text-[--color-primary-hover] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <p className="text-[14px] text-[--color-text-secondary] leading-relaxed">
              加强团队协作与共同准备；改进电梯演讲的逻辑和内容衔接；针对评委可能提的问题准备更充分的答案；加强团队背景资料和商业价值的陈述与展示。
            </p>
          </div>
        </Card>

        {/* 该补什么材料 */}
        <Card className="!p-6">
          <h3 className="text-[16px] font-bold text-[#eab308] flex items-center gap-2 mb-4">
            <Paperclip size={16} /> 该补什么材料
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 items-start">
              <span className="text-[#eab308] mt-1 shrink-0">•</span>
              <span className="text-[14px] text-[--color-text-secondary] leading-relaxed">
                缺乏关于团队成员背景和经验的具体描述；缺乏项目进展与成果的可视化图表
              </span>
            </li>
          </ul>
        </Card>

        {/* 承压表现 */}
        <Card className="!p-6">
          <h3 className="text-[13px] font-semibold text-[--color-text-muted] mb-4">承压表现</h3>
          <p className="text-[14px] text-[--color-text-secondary]">
            (提前结束，基于部分问答)
          </p>
        </Card>

        {/* 专项检查点对照 */}
        <Card className="!p-6">
          <h3 className="text-[13px] font-semibold text-[--color-text-muted] mb-4">专项检查点对照</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <span className="text-[--color-primary-hover] mt-1 shrink-0 text-[10px]">●</span>
              <span className="text-[13px] text-[--color-text-secondary] leading-relaxed">
                风险与不足部分是否准确并透明展现项目的真实状态 —— 答辩中未充分论证，需在赛前补强
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-[--color-primary-hover] mt-1 shrink-0 text-[10px]">●</span>
              <span className="text-[13px] text-[--color-text-secondary] leading-relaxed">
                是否能有效展示项目的创新之处，特别是在现有多数成熟的安防厂商背景下 —— 答辩中未充分论证，需在赛前补强
              </span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-[--color-primary-hover] mt-1 shrink-0 text-[10px]">●</span>
              <span className="text-[13px] text-[--color-text-secondary] leading-relaxed">
                项目的技术模型的准确度和稳定性，特别是夜间识别准确率的问题 —— 答辩中未充分论证，需在赛前补强
              </span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Action Row */}
      <div className="flex justify-center gap-4 mt-8">
        <ButtonGhost onClick={onRestart} className="flex items-center gap-2">
          <LayoutGrid size={16} /> 换个项目或模式
        </ButtonGhost>
        <ButtonPrimary onClick={onReplay} className="flex items-center gap-2 px-8">
          <RefreshCw size={16} /> 再练一次
        </ButtonPrimary>
      </div>

    </div>
  );
}
