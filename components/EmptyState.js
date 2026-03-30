'use client';

export function EmptyState({ emoji = '📦', title, description, action }) {
  return (
    <div className="text-center py-12 animate-slide-up">
      <div className="text-6xl mb-4">{emoji}</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
