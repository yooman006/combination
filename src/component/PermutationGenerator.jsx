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
  const [uniqueLetters, setUniqueLetters] = useState([]);
  const [showUnique, setShowUnique] = useState(false);
  const [mixingLetters, setMixingLetters] = useState([]);
  const [revealedUnique, setRevealedUnique] = useState([]);

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

  // Helper functions for meaningful words
  const hasVowel = (word) => {
    return /[aeiou]/i.test(word);
  };

  const looksLikeName = (word) => {
    // Check for common name patterns
    const namePatterns = [
      /^[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]/i, // CVC pattern
      /^[bcdfghjklmnpqrstvwxyz][aeiou]{2}/i, // CVV pattern
      /^[aeiou][bcdfghjklmnpqrstvwxyz]/i, // VC pattern
      /^[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz][aeiou]/i, // CVCV pattern
    ];
    
    return namePatterns.some(pattern => pattern.test(word));
  };

  const calculateWordScore = (word) => {
    let score = 0;
    
    // Higher score for longer words (but not too long)
    if (word.length >= 3 && word.length <= 6) score += word.length * 2;
    
    // Higher score for having vowels
    const vowelCount = (word.match(/[aeiou]/gi) || []).length;
    score += vowelCount * 3;
    
    // Higher score for common consonants at start
    if (/^[bcdghjklmnpqrstvwxyz]/i.test(word)) score += 2;
    
    // Higher score for alternating consonant-vowel patterns
    const cvPattern = word.replace(/[bcdfghjklmnpqrstvwxyz]/gi, 'C').replace(/[aeiou]/gi, 'V');
    if (cvPattern.includes('CVC') || cvPattern.includes('VCV')) score += 3;
    
    // Penalty for repeated characters
    const uniqueChars = new Set(word.toLowerCase()).size;
    score += uniqueChars;
    
    return score;
  };

  const handleGenerate = async () => {
    if (input.trim()) {
      setIsGenerating(true);
      setDisplayedPerms([]);
      setTerminalText('');
      setProgress(0);
      setCrackingStatus('CRACKING');
      setShowUnique(false);
      setUniqueLetters([]);
      setRevealedUnique([]);
      
      setTimeout(() => {
        const result = generatePermutations(input.trim());
        setPermutations(result);
        
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
      setShowUnique(false);
      setUniqueLetters([]);
      setRevealedUnique([]);
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

  const handleShowUnique = () => {
    if (!permutations.length) return;
    
    // Filter permutations to find ones that look like meaningful words/names
    const meaningfulWords = permutations.filter(perm => {
      const word = perm.toLowerCase();
      
      // Check if it looks like a name or meaningful word
      return (
        word.length >= 3 && // At least 3 characters
        hasVowel(word) && // Contains vowels
        looksLikeName(word) // Has name-like pattern
      );
    });
    
    // Calculate scores and get top 20
    const scoredWords = meaningfulWords.map(word => ({
      word,
      score: calculateWordScore(word)
    }));
    
    // Sort by score (highest first) and take top 20
    const topWords = scoredWords
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map(item => item.word);
    
    // Get unique words from top 20
    const uniqueWords = [...new Set(topWords)].slice(0, 20);
    
    setUniqueLetters(uniqueWords);
    setMixingLetters(permutations);
    setShowUnique(true);
    setRevealedUnique([]);
    
    uniqueWords.forEach((word, index) => {
      setTimeout(() => {
        setRevealedUnique(prev => [...prev, word]);
      }, 1500 + (index * 200));
    });
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
                
                {/* Unique Words Button */}
                <button
                  onClick={handleShowUnique}
                  disabled={!permutations.length || isGenerating}
                  className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-emerald-600 text-white rounded font-mono font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/50 hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base border-2 border-emerald-400"
                >
                  <Shield className="w-4 h-4" />
                  EXTRACT TOP 20 MEANINGFUL WORDS
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

        {/* Unique Words Animation Section */}
        {showUnique && (
          <div className="bg-gray-900 rounded-lg border-2 border-emerald-500 shadow-2xl shadow-emerald-500/50 overflow-hidden mb-4 sm:mb-6">
            <div className="bg-gray-800 border-b border-emerald-500 px-3 sm:px-4 py-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 font-mono font-bold text-xs sm:text-sm">
                  TOP 20 MEANINGFUL WORDS EXTRACTION
                </span>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 bg-black">
              {/* Mixing Animation Container */}
              <div className="relative h-48 sm:h-64 mb-8 flex items-center justify-center overflow-hidden">
                {/* Swirling/Mixing Words */}
                {revealedUnique.length < uniqueLetters.length && mixingLetters.map((word, index) => (
                  <div
                    key={`mix-${index}`}
                    className="absolute text-xl sm:text-2xl font-bold font-mono text-emerald-400 opacity-80 animate-swirl"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationDuration: `${2 + (index % 3) * 0.5}s`,
                    }}
                  >
                    {word}
                  </div>
                ))}
                
                {/* Central Vortex Effect */}
                {revealedUnique.length < uniqueLetters.length && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 sm:w-48 sm:h-48 border-4 border-emerald-500 rounded-full animate-spin-slow opacity-30"></div>
                    <div className="absolute w-24 h-24 sm:w-36 sm:h-36 border-4 border-emerald-400 rounded-full animate-spin-reverse opacity-40"></div>
                    <div className="absolute w-16 h-16 sm:w-24 sm:h-24 border-4 border-emerald-300 rounded-full animate-spin opacity-50"></div>
                  </div>
                )}
                
                {/* Revealed Unique Words */}
                <div className="relative z-10 flex flex-wrap gap-3 sm:gap-6 justify-center">
                  {revealedUnique.map((word, index) => (
                    <div
                      key={`unique-${index}`}
                      className="animate-pop"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative">
                        <div className="text-2xl sm:text-4xl font-bold font-mono text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse-glow px-4 py-2 bg-black bg-opacity-50 rounded-lg">
                          {word}
                        </div>
                        <div className="absolute -inset-2 bg-emerald-500 opacity-20 blur-xl rounded-lg"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Unique Words Display */}
              {revealedUnique.length === uniqueLetters.length && (
                <div className="animate-fadeIn">
                  <div className="bg-emerald-900 border-2 border-emerald-400 rounded p-4 sm:p-6 text-center mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                      <span className="text-emerald-400 font-mono font-bold text-sm sm:text-lg">
                        TOP 20 MEANINGFUL WORDS EXTRACTED
                      </span>
                    </div>
                    <p className="text-emerald-500 font-mono text-xs">
                      Showing top {uniqueLetters.length} most name-like words from {permutations.length} total sequences
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {uniqueLetters.map((word, index) => (
                      <div
                        key={index}
                        className="bg-gray-900 border-2 border-emerald-500 rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/50 transition-all cursor-pointer animate-fadeIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => handleCopy(word, `unique-${index}`)}
                      >
                        <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 mb-2">
                          {word}
                        </span>
                        <span className="text-emerald-600 font-mono text-xs">
                          Rank #{index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

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
            <p>{'>'} Meaningful words: Top 20 name-like patterns with vowels</p>
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
        @keyframes swirl {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translate(calc(100px * cos(var(--angle, 0))), calc(100px * sin(var(--angle, 0)))) rotate(360deg) scale(1.5);
            opacity: 0.6;
          }
          100% {
            transform: translate(0, 0) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }
        @keyframes pop {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.3) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(16,185,129,0.8));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(16,185,129,1));
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
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
        .animate-swirl {
          animation: swirl linear infinite;
        }
        .animate-pop {
          animation: pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
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