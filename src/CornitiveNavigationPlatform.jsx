import React, { useState, useEffect, useRef } from 'react';
import {
  Brain, Radar, Shield, Network, Zap, AlertTriangle,
  CheckCircle, Activity, Layers, Radio, Eye,
  TrendingUp
} from 'lucide-react';

const CognitiveNavigationPlatform = () => {
  const [activeModule, setActiveModule] = useState('cognitive');
  const [systemStatus, setSystemStatus] = useState({
    cognitive: 'active',
    navigation: 'active',
    coordination: 'active',
    ewDefense: 'alert',
    security: 'active'
  });
  const [threatLevel, setThreatLevel] = useState(3);
  const [networkNodes, setNetworkNodes] = useState(150);
  const canvasRef = useRef(null);

  // Симуляція роботи системи
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatLevel(prev =>
        Math.max(1, Math.min(5, prev + (Math.random() - 0.5) * 2))
      );
      setNetworkNodes(prev =>
        Math.max(100, Math.min(200, prev + Math.floor((Math.random() - 0.5) * 10)))
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Анімація мережі
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const nodes = [];

    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 2,
        type: Math.random() > 0.8 ? 'leader' : 'follower'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Рух
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // З'єднання
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 1;
      nodes.forEach((node1, i) => {
        nodes.slice(i + 1).forEach(node2 => {
          const dist = Math.sqrt(
            (node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2
          );
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();
          }
        });
      });

      // Вузли
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.type === 'leader' ? '#ef4444' : '#3b82f6';
        ctx.fill();
        if (node.type === 'leader') {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'alert': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getThreatColor = (level) => {
    if (level <= 2) return 'text-green-500';
    if (level <= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const modules = [
    {
      id: 'cognitive',
      name: 'Когнітивний рушій',
      icon: Brain,
      description: 'ШІ-система прийняття рішень з адаптивним навчанням',
      metrics: ['Точність прогнозів: 94.2%', 'Час відгуку: 12ms', 'Адаптацій/год: 340']
    },
    {
      id: 'navigation',
      name: 'Навігаційна система',
      icon: Radar,
      description: 'Багатомодальна навігація з топологічним усвідомленням',
      metrics: ['Точність позиціонування: ±0.3м', 'Покриття: 99.7%', 'Оновлень/сек: 50']
    },
    {
      id: 'coordination',
      name: 'Координатор рою',
      icon: Network,
      description: 'Розподілена координація з ієрархічним управлінням',
      metrics: [`Активних вузлів: ${networkNodes}`, 'Консенсус: 97.1%', 'Латентність: 8ms']
    },
    {
      id: 'ewDefense',
      name: 'Захист від РЕБ',
      icon: Shield,
      description: 'Адаптивна протидія радіоелектронній боротьбі',
      metrics: ['Виявлення загроз: 89.3%', 'Час реакції: 45ms', 'Успішних блокувань: 76%']
    },
    {
      id: 'security',
      name: 'Система безпеки',
      icon: Eye,
      description: 'Крипто-захист та аутентифікація',
      metrics: ['Цілісність даних: 100%', 'Зламаних сесій: 0', 'Алертів/год: 12']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Заголовок */}
      <div className="border-b border-blue-800/50 backdrop-blur-sm bg-slate-900/70">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">COGNINAV Platform</h1>
                <p className="text-sm text-blue-300">
                  Когнітивна навігація автономних систем
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`w-5 h-5 ${getThreatColor(threatLevel)}`} />
                <span className="text-sm">Рівень загроз: {threatLevel}/5</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-500" />
                <span className="text-sm">Система активна</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Головна панель */}
        <div className="lg:col-span-2 space-y-8">
          {/* Модулі */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-blue-400" /> Модулі платформи
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map(module => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                return (
                  <div
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isActive
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? 'text-blue-400' : 'text-slate-400'
                          }`}
                        />
                        <span className="font-medium text-sm">{module.name}</span>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusColor(systemStatus[module.id]).replace('text-', 'bg-')}`}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{module.description}</p>
                    <div className="space-y-1">
                      {module.metrics.map((metric, idx) => (
                        <div key={idx} className="text-xs text-slate-300">{metric}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Візуалізація мережі */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Network className="w-5 h-5 mr-2 text-green-400" /> Топологія розподіленої системи
            </h3>
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                className="w-full border border-slate-600 rounded-lg bg-slate-900/50"
              />
              <div className="absolute top-4 left-4 bg-slate-800/80 rounded-lg p-3 text-sm text-slate-200 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Агенти ({networkNodes - Math.floor(networkNodes * 0.2)})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-yellow-400" />
                  <span>Лідери ({Math.floor(networkNodes * 0.2)})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Бічна панель */}
        <div className="space-y-6">
          {/* Статус системи */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-400" /> Статус системи
            </h3>
            <div className="space-y-3">
              {Object.entries(systemStatus).map(([key, status]) => {
                const module = modules.find(m => m.id === key);
                if (!module) return null;
                const Icon = module.icon;
                return (
                  <div key={key} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{module.name}</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${getStatusColor(status)}`}>
                      {status === 'active' && <CheckCircle className="w-4 h-4" />}
                      {status === 'alert' && <AlertTriangle className="w-4 h-4" />}
                      <span className="text-xs capitalize">{status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* РЕБ */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" /> Протидія РЕБ
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Виявлені загрози</span>
                <span className="font-medium text-red-400">23</span>
              </div>
              <div className="flex justify-between text-sm text-slate-300">
                <span>Заблоковано атак</span>
                <span className="font-medium text-green-400">18</span>
              </div>
              <div className="flex justify-between text-sm text-slate-300">
                <span>Адаптації частот</span>
                <span className="font-medium text-blue-400">145/год</span>
              </div>
              <div className="flex justify-between text-sm text-slate-300">
                <span>Ефективність захисту</span>
                <span className="font-medium text-green-400">89.3%</span>
              </div>
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Radio className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-400">Активна загроза</span>
                </div>
                <p className="text-xs text-slate-300">
                  Виявлено перешкоди GPS сигналу в секторі 7. Перемикання на інерціальну навігацію.
                </p>
              </div>
            </div>
          </div>

          {/* Продуктивність */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" /> Продуктивність
            </h3>
            {/* Бар-чарти по CPU, RAM, Network */}
            {/* (Тут ти можеш додати більше логіки, якщо хочеш зробити їх інтерактивними) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CognitiveNavigationPlatform;
