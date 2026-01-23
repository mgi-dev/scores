import React, {createContext, useState, ReactNode} from 'react';

export interface PlayerContextType {
  score: number;
  setScore: (score: number) => void;
  addedScore: number;
  setAddedScore: (score: number) => void;
}

export const PlayerScoreContext = createContext<PlayerContextType | undefined>(
  undefined,
);

export const PlayerScoreProvider = ({children}: {children: ReactNode}) => {
  // TODO: check this memoize thing.
  const [score, setScore] = useState(0);
  const [addedScore, setAddedScore] = useState(0);

  return (
    <PlayerScoreContext.Provider
      value={{score, setScore, addedScore, setAddedScore}}>
      {children}
    </PlayerScoreContext.Provider>
  );
};

export const usePlayerScoreContext = (): PlayerContextType => {
  const context = React.useContext(PlayerScoreContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within PlayerProvider');
  }
  return context;
};
