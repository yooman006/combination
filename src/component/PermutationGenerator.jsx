import { useState, useEffect } from 'react';
import { Terminal, Copy, Check, Zap, Shield, Lock, Unlock } from 'lucide-react';

export default function PermutationGenerator() {
  const [input, setInput] = useState('');
  const [permutations, setPermutations] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayedPerms, setDisplayedPerms] = useState([]);
  const [terminalText, setTerminalText] = useState('');
  const [progress, setProgress] = useState(0);
  const [crackingStatus, setCrackingStatus] = useState('');

  const terminalMessages = [
    '> Connecting to target server...',
    '> Bypassing firewall protocols...',
    '> Injecting brute-force algorithm...',
    '> Generating hash combinations...',
    '> Decrypting authentication tokens...',
    '> Cracking access sequence...',
    '> ACCESS GRANTED - Extracting data...'
  ];

  useEffect(() => {
    if (isGenerating) {
      let index = 0;
      let progressValue = 0;
      
      const messageInterval = setInterval(() => {
        if (index < terminalMessages.length) {
          setTerminalText(terminalMessages[index]);
          index++;
        }
      }, 200);

      const progressInterval = setInterval(() => {
        progressValue += Math.random() * 15;
        if (progressValue >= 100) {
          progressValue = 100;
          clearInterval(progressInterval);
        }
        setProgress(Math.min(progressValue, 100));
      }, 150);

      return () => {
        clearInterval(messageInterval);
        clearInterval(progressInterval);
      };
    }
  }, [isGenerating]);

  const generatePermutations = (str) => {
    if (str.length === 0) return [''];
    if (str.length === 1) return [str];
    
    const result = [];
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const remaining = str.slice(0, i) + str.slice(i + 1);
      const perms = generatePermutations(remaining);
      
      for (let perm of perms) {
        result.push(char + perm);
      }
    }
    
    return result;
  };

  const handleGenerate = async () => {
    if (input.trim()) {
      setIsGenerating(true);
      setDisplayedPerms([]);
      setTerminalText('');
      setProgress(0);
      setCrackingStatus('CRACKING');
      
      setTimeout(() => {
        const result = generatePermutations(input.trim());
        setPermutations(result);
        
        // Animate results appearing faster for mobile
        result.forEach((perm, index) => {
          setTimeout(() => {
            setDisplayedPerms(prev => [...prev, perm]);
          }, index * 20);
        });
        
        setTimeout(() => {
          setIsGenerating(false);
          setCrackingStatus('CRACKED');
          setTimeout(() => setCrackingStatus(''), 2000);
        }, 1000);
      }, 100);
    } else {
      setPermutations([]);
      setDisplayedPerms([]);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleCopyAll = () => {
    const allText = permutations.join('\n');
    navigator.clipboard.writeText(allText);
    setCopiedIndex('all');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black py-4 px-3 sm:py-8 sm:px-4 overflow-hidden relative">
      {/* Animated Binary Matrix Background */}
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs sm:text-sm animate-matrix flex flex-col gap-0.5"
            style={{
              left: `${(i * 2)}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            {[...Array(25)].map((_, j) => (
              <div key={j} className={j === 0 ? 'text-green-300 font-bold' : ''}>
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent animate-scan"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-10 left-5 w-32 h-32 sm:w-64 sm:h-64 bg-green-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-5 w-48 h-48 sm:w-96 sm:h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex items-center justify-center mb-3 gap-2">
            <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 animate-pulse" />
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-green-400 via-emerald-400 to-green-300 bg-clip-text text-transparent font-mono leading-tight">
            Yoo_Penerator
          </h1>
          <p className="text-green-400 font-mono text-xs sm:text-sm md:text-base px-2">
            {'[ BRUTE-FORCE SEQUENCE GENERATOR ]'}
          </p>
        </div>

        {/* Main Terminal Window */}
        <div className="bg-gray-900 rounded-lg border-2 border-green-500 shadow-2xl shadow-green-500/50 overflow-hidden mb-4 sm:mb-6">
          {/* Terminal Header */}
          <div className="bg-gray-800 border-b border-green-500 px-3 sm:px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="ml-2 sm:ml-4 text-green-400 font-mono text-xs sm:text-sm hidden sm:inline">
                yoo@crack:~$
              </span>
            </div>
            {crackingStatus && (
              <div className="flex items-center gap-2">
                {crackingStatus === 'CRACKING' ? (
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" />
                ) : (
                  <Unlock className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                )}
                <span className="text-xs sm:text-sm font-mono text-green-400 font-bold">
                  {crackingStatus}
                </span>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="p-3 sm:p-6">
            <div className="mb-3 sm:mb-4">
              <label className="block text-green-400 font-mono text-xs sm:text-sm mb-2 flex items-center gap-2">
                <span>{'>'}</span> TARGET_HASH:
              </label>
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="ABC"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-black border-2 border-green-500 text-green-400 rounded font-mono text-sm sm:text-base focus:outline-none focus:border-green-300 focus:shadow-lg focus:shadow-green-500/50 transition-all placeholder-green-700"
                    maxLength={8}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-mono text-xs">
                    {input.length}/8
                  </div>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-black rounded font-mono font-bold hover:bg-green-400 transition-all shadow-lg shadow-green-500/50 hover:shadow-green-400/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      CRACKING...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      INITIATE ATTACK
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {isGenerating && (
              <div className="mb-4">
                <div className="bg-black border border-green-500 rounded overflow-hidden">
                  <div 
                    className="h-2 bg-gradient-to-r from-green-600 via-green-400 to-green-600 transition-all duration-300 animate-pulse"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-green-400 font-mono text-xs text-right mt-1">
                  {Math.round(progress)}% COMPLETE
                </div>
              </div>
            )}

            {/* Terminal Output */}
            {isGenerating && (
              <div className="bg-black border border-green-500 rounded p-3 sm:p-4 font-mono text-green-400 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="animate-pulse">▊</span>
                  <span className="break-all">{terminalText}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {displayedPerms.length > 0 && (
          <div className="bg-gray-900 rounded-lg border-2 border-green-500 shadow-2xl shadow-green-500/50 overflow-hidden">
            {/* Results Header */}
            <div className="bg-gray-800 border-b border-green-500 px-3 sm:px-4 py-3 flex items-center justify-between flex-wrap gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono font-bold text-xs sm:text-sm">
                  SEQUENCES: {displayedPerms.length}
                </span>
              </div>
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500 text-black hover:bg-green-400 rounded font-mono text-xs sm:text-sm font-bold transition-all"
              >
                {copiedIndex === 'all' ? (
                  <>
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">COPIED!</span>
                    <span className="sm:hidden">✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">COPY_ALL</span>
                    <span className="sm:hidden">COPY</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 sm:p-6 bg-black">
              {/* Cracked Banner */}
              <div className="mb-4 p-3 bg-green-900 border-2 border-green-400 rounded text-center animate-pulse">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Unlock className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <span className="text-green-400 font-mono font-bold text-sm sm:text-lg">
                    ACCESS GRANTED
                  </span>
                </div>
                <p className="text-green-500 font-mono text-xs">
                  All possible combinations extracted
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                  {displayedPerms.map((perm, index) => (
                    <div
                      key={index}
                      className="group relative bg-gray-900 border-2 border-green-600 rounded p-2 sm:p-3 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/50 transition-all cursor-pointer animate-fadeIn active:scale-95"
                      onClick={() => handleCopy(perm, index)}
                      style={{animationDelay: `${index * 0.02}s`}}
                    >
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="font-mono text-green-400 font-bold text-base sm:text-lg">
                          {perm}
                        </span>
                        <div className="text-green-700 text-xs font-mono">
                          #{String(index + 1).padStart(3, '0')}
                        </div>
                      </div>
                      
                      {/* Copy indicator */}
                      <div className={`absolute top-1 right-1 transition-all ${copiedIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100'}`}>
                        {copiedIndex === index ? (
                          <div className="bg-green-400 text-black rounded-full p-1">
                            <Check className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="bg-green-600 text-black rounded-full p-1">
                            <Copy className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      
                      {/* Glowing border on hover */}
                      <div className="absolute inset-0 border-2 border-green-400 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {displayedPerms.length === 0 && !isGenerating && (
          <div className="bg-gray-900 rounded-lg border-2 border-green-500 shadow-2xl shadow-green-500/50 p-8 sm:p-12 text-center">
            <Terminal className="w-16 h-16 sm:w-24 sm:h-24 text-green-600 mx-auto mb-4 sm:mb-6 animate-pulse" />
            <p className="text-green-400 font-mono text-base sm:text-lg mb-2">SYSTEM ARMED</p>
            <p className="text-green-600 font-mono text-xs sm:text-sm">
              {'>'} Enter target hash and initiate brute-force attack
            </p>
          </div>
        )}

        {/* Info Footer */}
        <div className="mt-4 sm:mt-6 bg-gray-900 rounded-lg border border-green-700 p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h3 className="font-mono text-green-400 font-bold text-xs sm:text-sm">ATTACK_SPECS:</h3>
          </div>
          <div className="text-green-600 font-mono text-xs space-y-1 pl-3 sm:pl-4">
            <p>{'>'} Method: Recursive permutation algorithm</p>
            <p>{'>'} Max hash length: 8 characters</p>
            <p>{'>'} Tap sequence to extract to clipboard</p>
            <p>{'>'} Speed: {displayedPerms.length > 0 ? `${displayedPerms.length} sequences/sec` : 'Standby'}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes matrix {
          0% {
            transform: translateY(-20%);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(120vh);
            opacity: 0;
          }
        }
        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-matrix {
          animation: matrix linear infinite;
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4ade80;
        }
      `}</style>
    </div>
  );
}