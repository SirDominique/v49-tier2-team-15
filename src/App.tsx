import { useContext } from 'react';

import { Button } from './components/ui/button';
import { ColorContext } from './contexts/ColorContext';
import { ColorContextValue } from './types';
import {
  createBasicColorPrompt,
  createGuidedColorPrompt,
} from '@/helpers/generators';

const BASIC = createBasicColorPrompt({
  initialColor: '#579fde',
  usage: 'social media',
});

const GUIDED = createGuidedColorPrompt({
  initialColor: '#579fde',
  usage: 'social media',
  audience: 'teenagers',
  keywords: ['sky', 'dark'],
  mood: 'sad',
});

export default function App() {
  const { colors, loading, error, updatePrompt } = useContext(
    ColorContext,
  ) as ColorContextValue;

  function handleClick() {
    updatePrompt(GUIDED);
  }

  return (
    <>
      <h1 className="text-2xl">Color App</h1>

      <h2 className="text-xl">Prompt</h2>
      <p>{GUIDED}</p>

      <h2 className="text-xl">Colors</h2>
      <div className="flex gap-4">
        {colors.map((clr) => (
          <div
            className="grid w-20 h-20 font-medium text-white place-items-center"
            style={{ backgroundColor: clr }}
          >
            {clr}
          </div>
        ))}
      </div>

      <h2 className="text-xl">Loading Status</h2>
      {loading ? <div>loading</div> : null}

      <h2 className="text-xl">Errors</h2>
      {error ? <div className="text-red-500">{error?.message}</div> : null}

      <Button onClick={handleClick}>Generate</Button>
    </>
  );
}
