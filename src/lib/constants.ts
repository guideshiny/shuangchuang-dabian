import { Brain, Zap, Target, Flame, Swords, FileSearch } from 'lucide-react';
import { ModeDef, Project } from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: '碳迹云——中小企业碳排放核算与管理 SaaS 平台',
    track: '绿色低碳 / 企业服务',
    summary: '基于大数据分析与区块链技术，为中小企业提供一站式碳排放核算、碳资产管理与减排规划的 SaaS 服务。',
    tags: ['商业计划书已上传', '核心专利 3 项', 'A轮融资']
  },
  {
    id: 'p2',
    name: '智瞳守护——基于机器视觉的工地安全帽智能监测系统',
    track: '人工智能 / 智慧安防',
    summary: '采用边缘计算与轻量化神经网络模型，实现建筑工地复杂场景下的工人安全帽佩戴情况实时高精度检测。',
    tags: ['演示视频已上传', '实体验证阶段']
  },
  {
    id: 'p3',
    name: 'NeuroLink 脑机接口辅助康复系统',
    track: '新一代信息技术',
    summary: '基于非侵入式脑电信号解码的卒中患者上肢运动功能康复外骨骼控制系统。',
    tags: ['初创组', '实验室阶段']
  }
];

export const TRAINING_MODES: ModeDef[] = [
  {
    id: 'standard',
    name: '标准答辩',
    icon: Brain,
    description: '全真模拟答辩，评委自主控场，支持单评委或评委席，支持配置难度风格和问答轮次。',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.10)',
    border: 'rgba(99,102,241,0.30)',
    text: '#a5b4fc',
    tags: ['多轮对话', '动态追问', '六维评审']
  },
  {
    id: 'elevator',
    name: '电梯演讲',
    icon: Zap,
    description: '限时结构化表达训练，1分钟或3分钟版，锻炼高密度陈述与关键信息提炼。',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.10)',
    border: 'rgba(251,191,36,0.30)',
    text: '#fcd34d',
    tags: ['限时表达', '结构训练', '1min/3min']
  },
  {
    id: 'followup',
    name: '高压追问',
    icon: Target,
    description: '评委盯住一个薄弱点连环下钻，不换题直到问透，专项训练逻辑自洽与深度回答。',
    color: '#38bdf8',
    bg: 'rgba(56,189,248,0.10)',
    border: 'rgba(56,189,248,0.30)',
    text: '#7dd3fc',
    tags: ['连环追问', '逻辑深度', '压力训练']
  },
  {
    id: 'weakness',
    name: '弱项突击',
    icon: Flame,
    description: '读取历史评审六维画像，自动定向出题强化最薄弱的维度，精准补短板。',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.10)',
    border: 'rgba(52,211,153,0.30)',
    text: '#6ee7b7',
    tags: ['精准补短', '历史画像', '定向训练']
  },
  {
    id: 'adversarial',
    name: '对抗性演练',
    icon: Swords,
    description: '质疑型评委极限施压，专攻逻辑矛盾、数据漏洞和合规风险，锻炼承压与反驳能力。',
    color: '#fb7185',
    bg: 'rgba(251,113,133,0.10)',
    border: 'rgba(251,113,133,0.30)',
    text: '#fca5a5',
    tags: ['极限施压', '逻辑找茬', '承压能力']
  }
];

export const RECENT_HISTORY = [
  { id: '1', modeId: 'elevator', projectId: 'p1', status: '进行中', stats: '已 1 题' },
  { id: '2', modeId: 'followup', projectId: 'p2', status: '已结束', stats: '得分 72 · 已 2 题' },
  { id: '3', modeId: 'elevator', projectId: 'p2', status: '已结束', stats: '得分 58 · 已 2 题' },
  { id: '4', modeId: 'followup', projectId: 'p2', status: '已结束', stats: '得分 68 · 已 2 题' },
  { id: '5', modeId: 'elevator', projectId: 'p2', status: '已结束', stats: '得分 58 · 已 4 题' },
  { id: '6', modeId: 'standard', projectId: 'p1', status: '已结束', stats: '得分 45 · 已 3 题' },
];

export const DIMENSION_COLORS = {
  innovation: '#818cf8',
  technical: '#38bdf8',
  market: '#34d399',
  team: '#fbbf24',
  expression: '#f472b6',
  social: '#a78bfa'
};
