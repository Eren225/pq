import React from 'react';

// Composant Visuel (Frontend / Design) UNIQUEMENT. 
// La logique de validation ou de requête part dans le dossier "services".

export default function Dashboard() {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body p-6 flex flex-col pt-12 items-center">
      
      {/* Header section */}
      <header className="w-full max-w-lg mb-12">
        <h1 className="text-4xl font-display text-on-surface font-extrabold tracking-tight mb-2">
          Le Curated Sanctuary
        </h1>
        <p className="text-on-surface-variant text-lg">
          Gestion du papier de Liège Kots. Soft Minimalism.
        </p>
      </header>

      {/* Main Stats (Glass Gradient) */}
      <section className="w-full max-w-lg hero-gradient p-8 rounded-[2rem] text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm uppercase tracking-wider font-semibold opacity-90 mb-1">
            Status Actuel
          </p>
          <h2 className="text-6xl font-display font-black tracking-tighter">
            14 <span className="text-2xl font-body font-medium opacity-80">Rouleaux</span>
          </h2>
          <button className="mt-8 bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors px-6 py-3 rounded-full text-white font-bold flex items-center gap-2">
             Prendre un rouleau
          </button>
        </div>
        {/* Glow effect background */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full"></div>
      </section>

      {/* Users Stats */}
      <section className="w-full max-w-lg grid grid-cols-2 gap-4">
         {['Mattéo', 'Mathis', 'Erwan', 'Elie'].map((user) => (
           <div key={user} className="surface-card p-6 flex flex-col justify-between">
              <h3 className="font-display text-lg mb-4 text-on-surface">{user}</h3>
              <p className="text-3xl font-display text-primary">0 <span className="text-sm text-on-surface-variant font-body">utilisés</span></p>
           </div>
         ))}
      </section>
      
      {/* Action panel */}
      <div className="fixed bottom-8 p-4 glass-panel rounded-full flex gap-4 shadow-lg border border-surface-variant/30">
         <button className="px-6 py-2 bg-on-surface text-surface rounded-full font-semibold">Nouveau Paquet</button>
         <button className="px-6 py-2 text-on-surface font-medium hover:bg-surface-variant/50 rounded-full transition-colors">Historique</button>
      </div>
      
    </div>
  );
}
