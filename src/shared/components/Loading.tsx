interface LoadingProps {
  theme?: 'dark' | 'light';
}

export const Loading = ({ theme = 'dark' }: LoadingProps) => {
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} flex items-center justify-center`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-zinc-400">Loading analytics data...</p>
      </div>
    </div>
  );
};
