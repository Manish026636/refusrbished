import { FaSyncAlt } from 'react-icons/fa';
import React, { useCallback } from 'react';

function Refresh() {
  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <button onClick={handleRefresh} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
      <FaSyncAlt className="mr-2" />
      Refresh
    </button>
  );
}

export default Refresh;