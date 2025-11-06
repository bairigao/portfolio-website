
const Hero = ({ typingText }) => (
  <div className="bg-black bg-opacity-70 p-8 rounded-b-lg font-mono">
    <div className="typing-effect mb-8">
      <span className="text-green-400">$ </span>
      <span className="text-white">{typingText}</span>
      <span className="animate-pulse">_</span>
    </div>

    <h1 className="text-4xl font-bold mb-4">
      Hi, I&apos;m <span className="text-purple-400">Si Li</span>
    </h1>
    <p className="text-xl mb-8">Cloud Computing Engineer & IT Technician</p>
  </div>
);

export default Hero;
