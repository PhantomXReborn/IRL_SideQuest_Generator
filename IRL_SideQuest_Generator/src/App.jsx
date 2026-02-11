import React, { useState } from 'react';
import { generateSideQuest } from './sideQuestGenerator';

export default function App() {
  const [quest, setQuest] = useState(null);

  return (
    <div>
      <button onClick={() => setQuest(generateSideQuest())}>Generate Quest</button>
      {quest && <div>{quest.objective}</div>}
    </div>
  );
}
