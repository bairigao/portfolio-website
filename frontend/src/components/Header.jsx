
const Header = ({ text }) => (
  <div className="bg-gray-800 rounded-t-lg p-2 flex items-center">
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
    </div>
    <div className="ml-4 text-sm text-gray-400">{text}</div>
  </div>
);

export default Header;

