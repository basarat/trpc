'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export function CreateReviewForm(props: {
  productId: string;
  handleSubmit: (t: string, r: number) => Promise<void>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isCreating, setIsCreating] = useState(false);
  const [text, setText] = useState('');

  async function handleSubmit() {
    setIsCreating(true);
    await props.handleSubmit(text, Math.floor(Math.random() * 5) + 1);
    setIsCreating(false);
    setText('');

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <form className="space-y-2">
      <input
        className="focus:border-vercel-pink focus:ring-vercel-pink block w-full rounded-lg border-none bg-gray-600 px-2 font-medium text-gray-200 focus:ring-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => void handleSubmit()}
        disabled={isCreating || !text || isPending}
        className="bg-vercel-blue hover:bg-vercel-blue/90 disabled:hover:bg-vercel-blue relative w-full items-center space-x-2 rounded-lg px-3 py-1 text-sm font-medium text-white disabled:cursor-not-allowed disabled:text-white/70"
      >
        Submit
      </button>
    </form>
  );
}
