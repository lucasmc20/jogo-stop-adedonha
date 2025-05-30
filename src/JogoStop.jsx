import React, { useState, useEffect } from 'react';
import { AlertCircle, Play, StopCircle, RotateCcw } from 'lucide-react';

const JogoStop = () => {
  const [letra, setLetra] = useState('');
  const [rodando, setRodando] = useState(false);
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(60);
  const [respostas, setRespostas] = useState({
    nome: '',
    cidade: '',
    animal: '',
    fruta: '',
    cor: '',
    profissao: '',
    objeto: '',
    pais: ''
  });
  const [pontuacao, setPontuacao] = useState(0);
  const [historicoJogadas, setHistoricoJogadas] = useState([]);

  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const categorias = [
    { key: 'nome', label: 'Nome' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'animal', label: 'Animal' },
    { key: 'fruta', label: 'Fruta' },
    { key: 'cor', label: 'Cor' },
    { key: 'profissao', label: 'Profissão' },
    { key: 'objeto', label: 'Objeto' },
    { key: 'pais', label: 'País' }
  ];

  useEffect(() => {
    let interval;
    if (jogoIniciado && tempoRestante > 0) {
      interval = setInterval(() => {
        setTempoRestante(prev => prev - 1);
      }, 1000);
    } else if (tempoRestante === 0) {
      finalizarRodada();
    }
    return () => clearInterval(interval);
  }, [jogoIniciado, tempoRestante]);

  const sortearLetra = () => {
    setRodando(true);
    let contador = 0;
    const intervalo = setInterval(() => {
      const letraAleatoria = alfabeto[Math.floor(Math.random() * alfabeto.length)];
      setLetra(letraAleatoria);
      contador++;
      if (contador > 20) {
        clearInterval(intervalo);
        setRodando(false);
        setJogoIniciado(true);
        setTempoRestante(60);
      }
    }, 100);
  };

  const handleInputChange = (categoria, valor) => {
    setRespostas(prev => ({
      ...prev,
      [categoria]: valor
    }));
  };

  const calcularPontos = () => {
    let pontos = 0;
    Object.entries(respostas).forEach(([categoria, resposta]) => {
      if (resposta.trim() && resposta.trim().toUpperCase().startsWith(letra)) {
        pontos += 10;
      }
    });
    return pontos;
  };

  const finalizarRodada = () => {
    const pontos = calcularPontos();
    setPontuacao(prev => prev + pontos);
    setHistoricoJogadas(prev => [...prev, {
      letra,
      respostas: { ...respostas },
      pontos
    }]);
    setJogoIniciado(false);
  };

  const pararJogo = () => {
    finalizarRodada();
  };

  const reiniciarJogo = () => {
    setLetra('');
    setRodando(false);
    setJogoIniciado(false);
    setTempoRestante(60);
    setRespostas({
      nome: '',
      cidade: '',
      animal: '',
      fruta: '',
      cor: '',
      profissao: '',
      objeto: '',
      pais: ''
    });
    setPontuacao(0);
    setHistoricoJogadas([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-600 to-zinc-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-6">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            🎮 Jogo STOP! 🎮
          </h1>

          {/* Área da Letra */}
          <div className="text-center mb-6">
            <div className="inline-block bg-gray-100 rounded-lg p-8 shadow-inner">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {letra || '?'}
              </div>
              {rodando && (
                <div className="text-sm text-gray-500 animate-pulse">
                  Sorteando...
                </div>
              )}
            </div>
          </div>

          {/* Controles */}
          <div className="flex justify-center gap-4 mb-6">
            {!jogoIniciado && !rodando && (
              <button
                onClick={sortearLetra}
                className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Play size={20} />
                SORTEAR LETRA
              </button>
            )}
            {jogoIniciado && (
              <button
                onClick={pararJogo}
                className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
              >
                <StopCircle size={20} />
                STOP!
              </button>
            )}
            <button
              onClick={reiniciarJogo}
              className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw size={20} />
              REINICIAR
            </button>
          </div>

          {/* Timer e Pontuação */}
          <div className="flex justify-between items-center mb-6 bg-gray-100 rounded-lg p-4">
            <div className="text-lg font-semibold">
              Tempo: <span className="text-2xl text-blue-600">{tempoRestante}s</span>
            </div>
            <div className="text-lg font-semibold">
              Pontuação: <span className="text-2xl text-green-600">{pontuacao}</span>
            </div>
          </div>

          {/* Categorias */}
          {jogoIniciado && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {categorias.map(({ key, label }) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={respostas[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={`Digite um(a) ${label.toLowerCase()} com ${letra}`}
                  />
                  {respostas[key] && !respostas[key].toUpperCase().startsWith(letra) && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>Deve começar com {letra}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Histórico */}
          {historicoJogadas.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Histórico</h2>
              <div className="space-y-4">
                {historicoJogadas.map((jogada, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-semibold">
                        Letra: <span className="text-purple-600">{jogada.letra}</span>
                      </span>
                      <span className="text-lg font-semibold">
                        Pontos: <span className="text-green-600">{jogada.pontos}</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(jogada.respostas).map(([cat, resp]) => (
                        <div key={cat} className="flex justify-between">
                          <span className="font-medium capitalize">{cat}:</span>
                          <span className={resp && resp.toUpperCase().startsWith(jogada.letra) ? 'text-green-600' : 'text-red-600'}>
                            {resp || '-'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regras */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">Como Jogar:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Clique em "Sortear Letra" para começar</li>
              <li>Preencha cada categoria com uma palavra que comece com a letra sorteada</li>
              <li>Você tem 60 segundos para completar todas as categorias</li>
              <li>Cada resposta correta vale 10 pontos</li>
              <li>Clique em "STOP!" quando terminar ou deixe o tempo acabar</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JogoStop;